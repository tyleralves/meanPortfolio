/**
 * Created by Tyler on 3/24/2016.
 */
function selfSvgDirective($timeout){
    return {
        restrict: 'A',
        scope: {
            onSelfLabelChange:'&'
        },
        link: function(scope, element, attr){
            var selfSvgRef = document.getElementById('self-svg-object');
            var selfSvgDoc, selfPortraitPathArray, selfLabelConnectorPathArray, selfImage, selfSvgPathArray, selfSvgLabelArray, selfImageAngular, testDiv;

            function animateSelfSvg(num){
                if(num<selfPortraitPathArray.length){
                    $timeout(function(){
                        Velocity(selfPortraitPathArray[num], {'stroke-dashoffset': 0, 'stroke-opacity': 1, 'fill-opacity': .5}, {duration: 1400});
                        animateSelfSvg(num+1);
                    },700);
                }else{
                    Velocity(selfPortraitPathArray, {'stroke-opacity': 0, 'fill-opacity':0}, {duration: 1000, delay: 300});
                    Velocity(selfImage, {'opacity':1}, {duration: 2000, delay: 300});
                }
            }

            selfSvgRef.addEventListener('load',function(){
                selfSvgDoc = selfSvgRef.contentDocument;
                selfImage = selfSvgDoc.querySelector('#self-portrait-image');
                testDiv = document.getElementById('testDiv');
                selfImageAngular = angular.element(testDiv);

                selfPortraitPathArray = selfSvgDoc.querySelectorAll('.self-svg-portrait');
                //Sets stroke offset on label lines and hides other label elements
                selfSvgLabelArray = selfSvgDoc.getElementsByClassName('self-svg-label');

                for(var j=0; j<selfSvgLabelArray.length;j++){
                    for(var k=0; k<selfSvgLabelArray[j].childNodes.length;k++){
                        if(selfSvgLabelArray[j].childNodes[k].nodeType!==3 && selfSvgLabelArray[j].childNodes[k].getAttribute('class') === 'self-label-path'){
                            var labelLength = selfSvgLabelArray[j].childNodes[k].getTotalLength();
                            selfSvgLabelArray[j].childNodes[k].setAttribute('stroke-dasharray',labelLength);
                            selfSvgLabelArray[j].childNodes[k].setAttribute('stroke-dashoffset',labelLength);
                        }else if(selfSvgLabelArray[j].childNodes[k].tagName==='text'){
                            selfSvgLabelArray[j].childNodes[k].style.visibility = 'hidden';
                        }
                    }
                }

                for(var i = 0; i < selfPortraitPathArray.length; i++){
                    selfPortraitPathArray[i].setAttribute('stroke-dasharray',6000);
                    selfPortraitPathArray[i].setAttribute('stroke-dashoffset',6000);
                    selfPortraitPathArray[i].setAttribute('fill','black');
                    selfPortraitPathArray[i].setAttribute('fill-opacity',0);
                    //selfSvgPathArray[i].setAttribute('transform',"translate(400,-100)");
                }

                selfSvgRef.style.visibility='visible';
                selfImage.setAttribute('opacity',0);
                animateSelfSvg(1);

                //SVG Hover Events
                var heartLabelCurrentOffset, heartLabelDuration;
                var label, title, summary;
                var labelParts, labelLengthMap;
                var selfSvgMap = selfSvgDoc.querySelectorAll('.self-portrait-map');

                for(var i = 0; i<selfSvgMap.length; i++){
                    selfSvgMap[i].addEventListener('mouseover', function(event){
                        labelParts = event.target.parentNode;
                        label = labelParts.querySelector('.self-label-path');
                        labelLengthMap = label.getTotalLength();
                        title = labelParts.querySelector('.self-label-title');
                        summary = labelParts.querySelector('.self-label-summary');
                        if(window.innerWidth/window.innerHeight>8/5){
                            Velocity(label, 'stop');
                            Velocity(label,{'stroke-dashoffset':0},{duration:1000, complete: function(){
                                Velocity(title,{'fill-opacity':[1,0]},{duration:1000, visibility:'visible'});
                                Velocity(summary,{'fill-opacity':[1,0]},{duration:1000, visibility:'visible'});
                            }});
                        }else{
                            //Display alternate label
                            scope.onSelfLabelChange({label: event.target.id});
                            console.log('mouseover');
                        }
                    });

                    selfSvgMap[i].addEventListener('mouseout', function(event){
                        heartLabelCurrentOffset = parseInt(label.style.strokeDashoffset);
                        heartLabelDuration = ((labelLengthMap - heartLabelCurrentOffset)/labelLength * 1000);
                        if(window.innerWidth/window.innerHeight>8/5) {
                            Velocity(label, 'stop');
                            Velocity(title, 'stop');
                            Velocity(summary, 'stop');
                            Velocity(label, {'stroke-dashoffset': labelLengthMap}, {
                                begin: function () {
                                    Velocity(title, {'fill-opacity': 0});
                                    Velocity(summary, {'fill-opacity': 0}, {queue: false});
                                }, duration: heartLabelDuration
                            });
                        }else{
                            scope.onSelfLabelChange({label: ''});
                            console.log('mouseout!');
                        }
                    });
                }
            },false);
        }
    };

}

function aboutCtrl($scope){
    var ctrl = this;

    ctrl.selfAltLabelChange = function(label){
        $scope.$apply(function(){
            ctrl.selfAltLabel = label;
        });

        console.log(ctrl.selfAltLabel);
    };

    ctrl.selfAltLabelShow = function(label){
        return ctrl.selfAltLabel === label;
    };
}

selfSvgDirective.$inject = ['$timeout'];

angular.module('about-module', [])
    .component('aboutComponent',{
       templateUrl: 'public/views/about.ejs',
        controller: aboutCtrl
    })
    .directive('selfSvg', selfSvgDirective);
    
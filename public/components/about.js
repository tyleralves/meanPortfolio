/**
 * Created by Tyler on 3/24/2016.
 */
function selfSvgDirective($timeout, $interval, $window){
    return {
        restrict: 'A',
        scope: {
            onSelfLabelChange:'&'
        },
        link: function(scope, element, attr){
            var selfSvgRef = document.getElementById('self-svg-object');
            var i, selfSvgDoc, selfPortraitPathArray, selfLabelConnectorPathArray, selfImage, selfSvgPathArray, selfSvgLabelArray, selfMapArray, selfMapLength;
            function animateSelfSvg(num){
                if(num<selfPortraitPathArray.length){
                    $timeout(function(){
                        Velocity(selfPortraitPathArray[num], {'stroke-dashoffset': 0, 'stroke-opacity': 1, 'fill-opacity': .3}, {duration: 1400});
                        animateSelfSvg(num+1);
                    },700);
                }
            }

            function animateMaps(i){
                Velocity(selfMapArray[i], {'fill-opacity': .3}, {duration: 500, loop: 1});
            }

            selfSvgRef.addEventListener('load',function(){

                selfSvgDoc = selfSvgRef.contentDocument;
                //selfImage = selfSvgDoc.querySelector('#self-portrait-image');
                selfMapArray = selfSvgDoc.querySelectorAll('.self-portrait-map');

                selfPortraitPathArray = selfSvgDoc.querySelectorAll('.self-svg-portrait');
                //Sets stroke offset on label lines and hides other label elements
                selfSvgLabelArray = selfSvgDoc.getElementsByClassName('self-svg-label');

                if($window.innerWidth>992){
                    //Sets properties for svg sketch, necessary because mobile view uses initial svg properties
                    for(i = 0; i < selfPortraitPathArray.length; i++){
                        var selfPortraitPathLength = selfPortraitPathArray[i].getTotalLength();
                        selfPortraitPathArray[i].setAttribute('fill-opacity',0);
                        selfPortraitPathArray[i].setAttribute('fill', 'black');
                        selfPortraitPathArray[i].setAttribute('stroke-dasharray', selfPortraitPathLength);
                        selfPortraitPathArray[i].setAttribute('stroke-dashoffset', selfPortraitPathLength);
                    }
                    //Sets svg visibility to visible
                    selfSvgDoc.querySelector('svg').setAttribute('visibility', 'visible');
                    //Begins svg sketch
                    animateSelfSvg(0);
                    //Highlights each hover-over map in turn
                    var count = 0;
                    var mapInterval = $interval(function(){
                        if(count === selfMapArray.length){
                            count=0;
                        }
                        animateMaps(count);
                        count++;
                    }, 3000);
                }else{
                    selfSvgDoc.querySelector('svg').setAttribute('visibility', 'visible');
                    for(i = 0; i<selfMapArray.length; i++){
                        selfMapArray[i].setAttribute('fill-opacity',.3);
                    }
                }


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

                //SVG Hover Label Events
                var heartLabelCurrentOffset, heartLabelDuration;
                var label, title, summary;
                var labelParts, labelLengthMap;
                var selfSvgMap = selfSvgDoc.querySelectorAll('.self-portrait-map');

                for(i = 0; i<selfSvgMap.length; i++){
                    selfSvgMap[i].addEventListener('mouseover', function(event){
                        labelParts = event.target.parentNode;
                        label = labelParts.querySelector('.self-label-path');
                        labelLengthMap = label.getTotalLength();
                        title = labelParts.querySelector('.self-label-title');
                        summary = labelParts.querySelector('.self-label-summary');
                        if(window.innerWidth>992){
                            Velocity(label, 'stop');
                            Velocity(label,{'stroke-dashoffset':0},{duration:1000, complete: function(){
                                Velocity(title,{'fill-opacity':[1,0]},{duration:1000, visibility:'visible'});
                                Velocity(summary,{'fill-opacity':[1,0]},{duration:1000, visibility:'visible'});
                            }});
                        }else{
                            //Display alternate label
                            scope.onSelfLabelChange({label: event.target.id});
                        }
                    });

                    selfSvgMap[i].addEventListener('mouseout', function(event){
                        heartLabelCurrentOffset = parseInt(label.style.strokeDashoffset);
                        heartLabelDuration = ((labelLengthMap - heartLabelCurrentOffset)/labelLength * 1000);
                        if(window.innerWidth>992) {
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

selfSvgDirective.$inject = ['$timeout', '$interval', '$window'];

angular.module('about-module', [])
    .component('aboutComponent',{
       templateUrl: 'public/views/about.ejs',
        controller: aboutCtrl
    })
    .directive('selfSvg', selfSvgDirective);
    
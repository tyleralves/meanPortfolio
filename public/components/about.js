/**
 * Created by Tyler on 3/24/2016.
 */
angular.module('about-module', [])
    .component('aboutComponent',{
       templateUrl: 'public/views/about.ejs',
        controller: aboutCtrl
    });

function aboutCtrl($timeout){
    //Draw name in title
    var selfSvgRef = document.getElementById('self-svg-object');
    var selfSvgDoc, selfPortraitPathArray, selfLabelConnectorPathArray, selfImage, selfSvgPathArray, selfSvgLabelArray;

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
        //selfSvgPathArray = selfSvgDoc.querySelectorAll('path');
        selfPortraitPathArray = selfSvgDoc.querySelectorAll('.self-svg-portrait');
        //Sets stroke offset on label lines and hides other label elements
        selfSvgLabelArray = selfSvgDoc.getElementsByClassName('self-svg-label');
        for(var j=0; j<selfSvgLabelArray.length;j++){
            for(var k=0; k<selfSvgLabelArray[j].children.length;k++){
                //alert();
                if(selfSvgLabelArray[j].children[k].getAttribute('class') === 'self-label-path'){
                    var labelLength = selfSvgLabelArray[j].children[k].getTotalLength();
                    selfSvgLabelArray[j].children[k].setAttribute('stroke-dasharray',labelLength);
                    selfSvgLabelArray[j].children[k].setAttribute('stroke-dashoffset',labelLength);
                }else if(selfSvgLabelArray[j].children[k].tagName==='text'){
                    selfSvgLabelArray[j].children[k].style.visibility = 'hidden';
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
            console.log(selfSvgMap[i].id.slice(selfSvgMap[i].id.lastIndexOf('-')+1));
            selfSvgMap[i].addEventListener('mouseover', function(event){
                labelParts = event.target.parentNode;
                label = labelParts.getElementsByClassName('self-label-path')[0];
                labelLengthMap = label.getTotalLength();
                title = labelParts.getElementsByClassName('self-label-title')[0];
                summary = labelParts.getElementsByClassName('self-label-summary')[0];
                Velocity(label, 'stop');
                Velocity(label,{'stroke-dashoffset':0},{duration:1000, complete: function(){
                    Velocity(title,{'fill-opacity':[1,0]},{duration:1000, visibility:'visible'});
                    Velocity(summary,{'fill-opacity':[1,0]},{duration:1000, visibility:'visible'});
                }});

            });


            selfSvgMap[i].addEventListener('mouseout', function(event){
                heartLabelCurrentOffset = parseInt(label.style.strokeDashoffset);
                heartLabelDuration = ((labelLength - heartLabelCurrentOffset)/labelLength * 1000);
                Velocity(label, 'stop');
                Velocity(title, 'stop');
                Velocity(summary, 'stop');
                Velocity(label, {'stroke-dashoffset':labelLength}, {begin: function(){
                    Velocity(title,{'fill-opacity':0});
                    Velocity(summary,{'fill-opacity':0},{queue:false});
                }, duration: heartLabelDuration});
            });
        }

            //Velocity(label,{'stroke-dashoffset':labelLength}, {duration: 2000});

    },false);


}
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
    var i = 1;
    function animateSelfSvg(num){
        var selfImage = document.getElementById('self-image');
        if(num<5){
            var selfTracePath = document.getElementById('self-svg-' + num);
            $timeout(function(){
                Velocity(selfTracePath, {'stroke-dashoffset': 0, 'fill-opacity': 1}, {duration: 2800});
                animateSelfSvg(i++);
            },700);
        }else{
            //Velocity(selfTracePath, {'stroke-opacity': 0}, {duration: 5000});
            Velocity(selfImage, {'opacity':1}, {duration: 3000, display: 'block'});
        }
    }
    animateSelfSvg(1);
}
/**
 * Created by Tyler on 3/24/2016.
 */
angular.module('meanPortfolio',['ngComponentRouter','about-module', 'projects-module'])
    /*.config(function($locationProvider){
        $locationProvider.html5Mode(true);
    })*/
    .value('$routerRootComponent','main')
    .component('main', {
        template: '<ng-outlet></ng-outlet>',
        controller: MainCtrl,
        $routeConfig: [
            {path: '/about/', name: 'AboutMe', component: 'aboutComponent', useAsDefault:true},
            {path: '/projects/', name: 'Projects', component: 'projectsComponent'}
        ]
    });

function MainCtrl($timeout){
    var ctrl = this;
    ctrl.navShow = false;
    ctrl.toggleNav = function(){
        ctrl.navShow = true;
    };

    //Draw page background grid
    var largeGridPathNode = document.getElementById('largeGridPath');
    var smallGridPathNode = document.getElementById('smallGridPath');
    Velocity(largeGridPathNode, {'stroke-dashoffset': 160}, 0);
    Velocity(largeGridPathNode, {'stroke-dashoffset': 0}, {duration: 1000, delay: 15});

    Velocity(smallGridPathNode, {'stroke-dashoffset': 16}, 0);
    Velocity(smallGridPathNode, {'stroke-dashoffset': 0}, {duration: 500, delay: 985});

    //Draw name in title
    var i = 1;
    function animateText(num){
        if(num<22){
            var nameTracePath = [];
            if(num===6||num===8||num===14){   //TODO:USE INKSCAPE TO COMBINE E's and R
                nameTracePath.push(document.getElementById('name-trace-'+num));
                nameTracePath.push(document.getElementById('name-trace-' + num+1));
            }else{
                nameTracePath.push(document.getElementById('name-trace-' + num));
            }
            var nameFillPath = document.getElementById('name-fill-' + num);
            $timeout(function(){
                //Velocity(nameTracePath, {'stroke-dashoffset': 400}, 0);
                Velocity(nameTracePath, {'stroke-dashoffset': 0,'stroke-width': 0}, {duration: 3000});
                Velocity(nameFillPath, {'fill-opacity': 1}, {duration: 2500});
                animateText(i++);
            },200);
        }
    }
    animateText(1);
}


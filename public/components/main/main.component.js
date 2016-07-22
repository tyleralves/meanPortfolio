/**
 * Created by Tyler on 3/24/2016.
 */
angular.module('meanPortfolio',['ngComponentRouter','about-module', 'projects-module'])
    /*.config(function($locationProvider){
        $locationProvider.html5Mode(true);
    })*/
    .value('$routerRootComponent','main')
    .config(function($locationProvider){
        // use the HTML5 History API
        $locationProvider.html5Mode(true);
    })
    .component('main', {
        template: '<ng-outlet></ng-outlet>',
        controller: 'MainController',
        $routeConfig: [
            {path: '/', name: 'AboutMe', component: 'about', useAsDefault:true},
            {path: '/projects', name: 'Projects', component: 'projects'}
        ]
    });
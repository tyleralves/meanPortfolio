/**
 * Created by Tyler on 3/24/2016.
 */
angular.module('meanPortfolio',['ngComponentRouter','about-module', 'projects-module'])
    /*.config(function($locationProvider){
        $locationProvider.html5Mode(true);
    })*/
    .value('$routerRootComponent','main')
    .component('main', {
        $routeConfig: [
            {path: '/about/', name: 'AboutMe', component: 'aboutComponent', useAsDefault:true},
            {path: '/projects/', name: 'Projects', component: 'projectsComponent'}
        ]
    })
    .controller('MainCtrl', MainCtrl);

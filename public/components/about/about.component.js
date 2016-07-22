/**
 * Created by Tyler on 3/24/2016.
 */

angular.module('about-module', ['meanPortfolio'])
    .component('about',{
       templateUrl: 'public/components/about/about.view.ejs',
        controller: 'AboutController'
    });
    
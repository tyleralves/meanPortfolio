/**
 * Created by Tyler on 3/24/2016.
 */
angular.module('meanPortfolio')
    .component('navBar', {
        templateUrl: 'public/components/nav-bar/nav-bar.view.ejs',
        controller: 'NavBarController',
        bindings: {
            onSelect: '&'
        }
    });
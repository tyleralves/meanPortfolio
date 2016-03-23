/**
 * Created by Tyler on 3/24/2016.
 */
angular.module('meanPortfolio')
    .component('navBar', {
        templateUrl: 'navBar.ejs',
        controller: navBarCtrl
    })
    .controller('navBarCtrl', navBarCtrl);

function navBarCtrl(){
    this.testString = "Hello world";
}



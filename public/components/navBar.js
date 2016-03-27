/**
 * Created by Tyler on 3/24/2016.
 */
angular.module('meanPortfolio')
    .component('navBar', {
        templateUrl: '/views/navBar.ejs',
        controller: navBarCtrl
    })
    .controller('navBarCtrl', navBarCtrl);

function navBarCtrl(){
    var $ctrl = this;
    this.testString = "Hello world";
    this.loggedIn = true;
    this.logInToggle = logInToggle;

    function logInToggle(){
        $ctrl.loggedIn = !$ctrl.loggedIn;
    }
}



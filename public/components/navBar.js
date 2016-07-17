/**
 * Created by Tyler on 3/24/2016.
 */
angular.module('meanPortfolio')
    .component('navBar', {
        templateUrl: 'public/views/navBar.ejs',
        controller: NavBarCtrl,
        bindings: {
            onSelect: '&'
        }
    });

function NavBarCtrl($location){
    var $ctrl = this;
    this.testString = "Hello world";
    this.loggedIn = true;
    this.logInToggle = logInToggle;

    function logInToggle(){
        $ctrl.loggedIn = !$ctrl.loggedIn;
    }
}

NavBarCtrl.$inject = ['$location'];



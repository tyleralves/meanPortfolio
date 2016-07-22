/**
 * Created by Tyler on 7/22/2016.
 */
function NavBarController(){
  var $ctrl = this;
  this.testString = "Hello world";
  this.loggedIn = true;
  this.logInToggle = logInToggle;

  function logInToggle(){
    $ctrl.loggedIn = !$ctrl.loggedIn;
  }
}

angular
  .module('meanPortfolio')
  .controller('NavBarController', NavBarController);
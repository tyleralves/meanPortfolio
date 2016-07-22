/**
 * Created by Tyler on 7/22/2016.
 */
function MainController(){
  var ctrl = this;
  ctrl.navShow = false;

  ctrl.toggleNav = function(){
    ctrl.navShow = true;
  };
}

angular
  .module('meanPortfolio')
  .controller('MainController', MainController);
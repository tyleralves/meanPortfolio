/**
 * Created by Tyler on 7/22/2016.
 */
function MainController(LoadingFactory){
  var ctrl = this;
  //Used to access ctrl.loadingFactory.svgLoaded for loading wheel hide
  ctrl.loadingFactory = LoadingFactory;
  ctrl.navShow = false;

  ctrl.toggleNav = function(){
    ctrl.navShow = true;
  };
}

MainController.$inject = ['LoadingFactory'];
angular
  .module('meanPortfolio')
  .controller('MainController', MainController);
/**
 * Created by Tyler on 7/22/2016.
 */
function AboutController($scope, LoadingFactory){
  var ctrl = this;

  //Used to access ctrl.loadingFactory.svgLoaded for loading wheel hide
  ctrl.loadingFactory = LoadingFactory;

  ctrl.selfAltLabelChange = function(label){
    $scope.$apply(function(){
      ctrl.selfAltLabel = label;
    });
  };

  ctrl.selfAltLabelShow = function(label){
    return ctrl.selfAltLabel === label;
  };
}

AboutController.$inject = ['$scope', 'LoadingFactory'];

angular
  .module('about-module')
  .controller('AboutController', AboutController);
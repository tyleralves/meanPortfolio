/**
 * Created by Tyler on 7/22/2016.
 */
function AboutController($scope){
  var ctrl = this;

  ctrl.selfAltLabelChange = function(label){
    $scope.$apply(function(){
      ctrl.selfAltLabel = label;
    });
  };

  ctrl.selfAltLabelShow = function(label){
    return ctrl.selfAltLabel === label;
  };
}

angular
  .module('about-module')
  .controller('AboutController', AboutController);
/**
 * Created by Tyler on 7/22/2016.
 */
angular
  .module('meanPortfolio')
  .factory('LoadingFactory', LoadingFactory);

function LoadingFactory(){
  var LoadingFactory = {};
  LoadingFactory.svgLoaded = false;

  LoadingFactory.svgLoadedToggle = function(){
    LoadingFactory.svgLoaded = true;
  };

  return LoadingFactory;
}
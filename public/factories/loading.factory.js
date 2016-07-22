/**
 * Created by Tyler on 7/22/2016.
 */
angular
  .module('about-module')
  .factory('LoadingFactory', LoadingFactory);

function LoadingFactory(){
  var LoadingFactory = {};
  LoadingFactory.svgLoaded = false;

  //Called in about.directive.js -> selfSvgDirective
  LoadingFactory.svgLoadedToggle = function(){
    LoadingFactory.svgLoaded = true;
  };

  return LoadingFactory;
}
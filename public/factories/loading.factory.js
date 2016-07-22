/**
 * Created by Tyler on 7/22/2016.
 */
angular
  .module('meanPortfolio')
  .factory('LoadingFactory', LoadingFactory);

function LoadingFactory(){
  var LoadingFactory = {};
  LoadingFactory.svgLoading = true;

  LoadingFactory.svgLoadingToggle = function(){
    LoadingFactory.svgLoading = false;
  };

  return LoadingFactory;
}
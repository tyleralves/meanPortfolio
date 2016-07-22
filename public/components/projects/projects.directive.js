/**
 * Created by Tyler on 7/22/2016.
 */
angular
  .module('projects-module')
  .directive('projectListCurrent', projectListCurrent);
  //.directive('projectImageHighlight', projectImageHighlight);

projectListCurrent.$inject = ['$window', '$timeout'];

function projectListCurrent($window, $timeout){
  return {
    restrict: 'A',
    scope: {
      currentProject: '=',
      isMediumDevice: '='
    },
    link: function(scope, element, attr){
      angular.element(document).ready(function(){
        var projectNodes = document.querySelectorAll('.pl-image-inner-container');
        var currentProjectNode = projectNodes[scope.currentProject-1];
        var scrollOffset = currentProjectNode.scrollHeight-currentProjectNode.offsetHeight;
        $timeout(projectAutoScroll,10);
        scope.$watch('currentProject',
          function(newValue, oldValue){
            angular.element(currentProjectNode).off();
            currentProjectNode = projectNodes[scope.currentProject-1];
            $timeout(projectAutoScroll,10);
            angular.element(currentProjectNode).on('scroll', projectScrollHandler);
          }
        );

        var projectAutoScroll = function(){
          //var scrollbarWidth = myElement.offsetWidth-myElement.clientWidth;
          scrollOffset = currentProjectNode.scrollHeight-currentProjectNode.offsetHeight;
          currentProjectNode.scrollTop = (scrollOffset)*.5;
        };

        var currentProjectChanger = function(projectNumber){
          scope.$apply(function(){
            if(projectNumber>scope.currentProject){
              scope.currentProject < 4?scope.currentProject++:scope.currentProject = 1;
            }else if(projectNumber<scope.currentProject) {
              scope.currentProject > 1?scope.currentProject--:scope.currentProject = 4;
            }
          });
        };

        var scrolling = false;
        var projectScrollHandler = function(event){
          if(!scrolling) {
            scrolling = true;
            var scrollLogicTimeout = $timeout(function(){
              if (currentProjectNode.scrollTop > scrollOffset * .95 || currentProjectNode.scrollTop < scrollOffset * .05) {
                currentProjectChanger(currentProjectNode.scrollTop > scrollOffset * .95?scope.currentProject+1:scope.currentProject-1);
              } else {
                currentProjectNode.scrollTop = scrollOffset*.5;
              }
              scrolling = false;
            },300);
          }
        };



        angular.element(document).on('keydown', function(event){
          if(event.which === 40){
            currentProjectChanger(scope.currentProject+1);
          }else if(event.which === 38){
            currentProjectChanger(scope.currentProject-1);
          }
        });

        angular.element($window).on('resize', function(){
          if($window.innerWidth < 992){
            angular.element(currentProjectNode).off();
            projectAutoScroll();
            angular.element(currentProjectNode).on('scroll', projectScrollHandler);
          }else{
            projectAutoScroll();
            angular.element(currentProjectNode).off();
          }
          scope.$apply(function() {
            scope.isMediumDevice = $window.innerWidth > 992;
          });
        });
      });
    }
  };
}

function projectImageHighlight(){
  return {
    restrict: 'A',
    scope: {
      activeHighlightProject: '='
    },
    link: function(scope, element, attr){
      element.on('mouseover', function(event){
        scope.$apply(function(){
          scope.activeHighlightProject = parseInt(attr.projectNum);
        });
      });

      element.on('mouseout', function(event){
        scope.$apply(function(){
          scope.activeHighlightProject = 0;
        });
      });
    }
  };
}
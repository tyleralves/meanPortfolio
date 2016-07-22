/**
 * Created by Tyler on 7/22/2016.
 */
function ProjectsController($window) {
  var ctrl = this;
  //Current project change/ small vs medium layout setup
  ctrl.currentProject = 1;
  ctrl.isMediumDevice = $window.innerWidth>992;
  ctrl.isCurrentProject = function(projectIndex){
    return ctrl.isMediumDevice || projectIndex===ctrl.currentProject;
  };

  //Allows indicators to change project
  ctrl.changeCurrentProject = function(projectNum) {
    ctrl.currentProject = projectNum;
  };

  //Toggle for showing help screen
  ctrl.showHelp = false;

  //Class for slideout panel in mobile layout
  ctrl.slideOutClass = false;

  //Project image hover highlights project description
  ctrl.activeHighlightProject = 0;

  //Highlights description section based on project hover
  ctrl.changeActiveDesc = function(descNum){
    return ctrl.activeHighlightProject === descNum?'active-project-title':'';
  };

  //
  ctrl.indicatorIsActive = function(indicatorNum){
    return ctrl.currentProject === indicatorNum ? 'active':'';
  };
}

angular
  .module('projects-module')
  .controller('ProjectsController', ProjectsController)
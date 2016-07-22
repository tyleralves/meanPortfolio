/**
 * Created by Tyler on 3/24/2016.
 */
angular.module('projects-module', ['ngTouch'])
  .component('projects', {
      templateUrl: 'public/components/projects/projects.view.ejs',
      controller: 'ProjectsController'
  });
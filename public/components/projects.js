/**
 * Created by Tyler on 3/24/2016.
 */
angular.module('projects-module', [])
    .component('projectsComponent', {
        templateUrl: 'public/views/projects.ejs',
        controller: ProjectCtrl
    })
    .component('projectList', {
        //templateUrl:'/views/projectList.ejs',
        templateUrl: 'public/views/projectList.ejs',
        controller: ProjectListCtrl,
        bindings: {
            projects: '<',
            onActivate: '&'
        }
    })
    .component('projectDetail', {
        templateUrl: 'public/views/projectDetail.ejs',
        bindings: {
            activeProject: '<'
        }
    })
    .directive('projectListCurrent',['$window','$document','$timeout', function($window, $document, $timeout){
        return {
            restrict: 'A',
            scope: {
                currentProject: '=',
                isMediumDevice: '='
            },
            link: function(scope, element, attr){

                $document.on('keydown', function(event){
                    scope.$apply(function(){
                        $window.alert(JSON.stringify(event.which));
                        if(event.which === 40){
                            scope.currentProject < 4?scope.currentProject++:scope.currentProject = 1;
                        }else if(event.which === 38){
                            scope.currentProject > 1?scope.currentProject--:scope.currentProject = 4;
                        }
                    });
                });

                angular.element($window).on('resize', function(){
                    scope.$apply(function() {
                        scope.isMediumDevice = $window.innerWidth > 992;
                    });
                });
            }
        };
    }]);

function ProjectCtrl() {
    var ctrl = this;
    ctrl.activeProject = 0;
    ctrl.projectActivated = false;
    ctrl.list = [
        {
            title: 'Volunteer App',
            description: 'Created an application to connect volunteers with organizations in need across the world'
        },
        {
            title: 'Portfolio',
            description: 'Portfolio website created with the MEAN stack'
        }
    ];

    //Called when user selects item from projectList
    ctrl.activateProject = function(projectIndex){
        ctrl.activeProject = projectIndex;
        ctrl.projectActivated = !ctrl.projectActivated;
    }
}

function ProjectListCtrl($window) {
    var ctrl = this;
    ctrl.currentProject = 1;
    ctrl.isMediumDevice = $window.innerWidth>992;

    ctrl.isCurrentProject = function(projectIndex){
        return ctrl.isMediumDevice || projectIndex===ctrl.currentProject;
    };
}
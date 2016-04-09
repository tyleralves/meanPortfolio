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
    .directive('projectListCurrent',['$window','$document','$timeout', '$location', '$anchorScroll', function($window, $document, $timeout, $location, $anchorScroll){
        return {
            restrict: 'A',
            scope: {
                currentProject: '=',
                isMediumDevice: '='
            },
            link: function(scope, element, attr){
                angular.element(document).ready(function(){
                    var currentProjectNode = document.querySelectorAll('.pl-image-inner-container')[scope.currentProject-1];


                    var projectAutoScroll = function(){
                        //var scrollbarWidth = myElement.offsetWidth-myElement.clientWidth;
                        currentProjectNode.scrollTop = window.innerHeight*.05;
                        angular.element(currentProjectNode).on('scroll', projectScrollHandler);
                    };

                    var currentProjectChanger = function(isIncrement){
                        angular.element(currentProjectNode).off();
                        scope.$apply(function(){
                            if(isIncrement){
                                scope.currentProject < 4?scope.currentProject++:scope.currentProject = 1;
                            }else{
                                scope.currentProject > 1?scope.currentProject--:scope.currentProject = 4;
                            }
                        });
                        currentProjectNode = document.querySelectorAll('.pl-image-inner-container')[scope.currentProject-1];
                        projectAutoScroll();
                    };

                    var scrolling = false,
                        scrollThrottleTimeout;
                    var projectScrollHandler = function(event){
                        if(!scrolling && currentProjectNode.scrollTop > window.innerHeight*.099 || currentProjectNode.scrollTop < window.innerHeight*.001){
                            scrolling = true;
                            currentProjectChanger(currentProjectNode.scrollTop > window.innerHeight*.099);

                            scrollThrottleTimeout = $timeout(function(){
                                scrolling = false;
                            }, 1000);
                        }
                    };

                    projectAutoScroll();
/*
                    angular.element(document).on('keydown', function(event){
                        if(event.which === 40){
                            currentProjectChanger(true);
                        }else if(event.which === 38){
                            currentProjectChanger(false);
                        }
                    });
*/
                    angular.element($window).on('resize', function(){
                        if($window.innerWidth < 992){
                            projectAutoScroll();
                        }else{
                            currentProjectNode.scrollTop = 0;
                            angular.element(currentProjectNode).off();
                        }
                        scope.$apply(function() {
                            scope.isMediumDevice = $window.innerWidth > 992;
                        });
                    });
                });
            }
        };
    }])
    .directive('projectImageHighlight', ['$window', '$document', function($window,$document){
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
    //Current project change/ small vs medium layout setup
    ctrl.currentProject = 1;
    ctrl.isMediumDevice = $window.innerWidth>992;
    ctrl.isCurrentProject = function(projectIndex){
        return ctrl.isMediumDevice || projectIndex===ctrl.currentProject;
    };

    //Project image hover highlights project description
    ctrl.activeHighlightProject = 0;

    ctrl.changeActiveDesc = function(descNum){
        return ctrl.activeHighlightProject === descNum?'active-project-title':'';
    };

}
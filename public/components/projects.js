/**
 * Created by Tyler on 3/24/2016.
 */
angular.module('projects-module', ['ngTouch','ngAnimate'])
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
                angular.element(document).ready(function(){
                    var projectNodes = document.querySelectorAll('.pl-image-inner-container');
                    var currentProjectNode = projectNodes[scope.currentProject-1];
                    var scrollOffset = currentProjectNode.scrollHeight-currentProjectNode.offsetHeight;

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

    //Allows indicators to change project
    ctrl.changeCurrentProject = function(projectNum) {
        ctrl.currentProject = projectNum;
    };

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
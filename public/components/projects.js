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
    });

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

function ProjectListCtrl() {
    var ctrl = this;
}
var token = PokerPlanningToken;

appModule = angular.module("app", ['ngMaterial', 'ngResource'])
.factory('menu', [
  '$location',
  '$rootScope',
  '$http',
  function($location, $rootScope, $http) {

    var self;

    return self = {

      selectProject: function(project) {
        self.currentProject = project;
        var projectId = project.id;
        $http.get("https://www.pivotaltracker.com/services/v5/projects/" + projectId + "/stories", {
          headers: {"X-TrackerToken": token}
        }).success(function (data, status, headers, config) {
          $rootScope.stories = data;
        });
      },
      isProjectSelected: function(project) {
        return self.currentProject === project;
      }
    };

  }
])
.controller("appCtrl", function ($scope, $http, $resource, $materialSidenav, $materialDialog, menu) {

  $scope.menu = menu;
  
  /*
  $http.get('js/token.json?callback=JSON_CALLBACK')
    .success(function (data) {
      token = data[0].token;
  */
      

      $http.get("https://www.pivotaltracker.com/services/v5/projects", {
        headers: {"X-TrackerToken": token}
      }).success(function (data, status, headers, config) {
        $scope.menu.projects = data;
        $scope.menu.selectProject(menu.projects[0]);
      });
    
    //});

  $scope.toggleMenu = function () {
    $materialSidenav('left').toggle();
  };

  $scope.dialog = function (e, story) {
    $materialDialog({
      templateUrl: 'partials/storyCard.tmpl.html',
      targetEvent: e,
      controller: ['$scope', '$hideDialog', function ($scope, $hideDialog) {
        $scope.story = story;
        $scope.close = function () {
          $hideDialog();
        };

      }]
    });
  };

});
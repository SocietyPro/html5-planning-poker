var sections = [{
  name: 'Projects',
  pages: []
}];

appModule = angular.module("app", ['ngMaterial', 'ngRoute', 'ngResource'])
.factory('menu', [
  '$location',
  '$rootScope',
  function($location, $rootScope) {

    var self;

    $rootScope.$on('$locationChangeSuccess', onLocationChange);

    return self = {

      selectSection: function(section) {
        self.openedSection = section;
      },
      toggleSelectSection: function(section) {
        self.openedSection = (self.openedSection === section ? null : section);
      },
      isSectionSelected: function(section) {
        return self.openedSection === section;
      },

      selectPage: function(section, page) {
        page && page.url && $location.path(page.url);
        self.currentSection = section;
        self.currentPage = page;
      },
      isPageSelected: function(section, page) {
        return self.currentPage === page;
      }
    };

    function onLocationChange() {
      var activated = false;
      var path = $location.path();
      sections.forEach(function(section) {
        section.pages.forEach(function(page) {
          if (path === page.url) {
            self.selectSection(section);
            self.selectPage(section, page);
            activated = true;
          }
        });
      });
      if (!activated) {
        self.selectSection(sections[0]);
      }
    }
  }
])
.controller("appCtrl", function ($scope, $http, $resource, $materialSidenav, menu) {

  $scope.menu = menu;

  var token;
  $http.get('js/token.json')
    .success(function (data) {
      token = data[0].token;

      $http.get("https://www.pivotaltracker.com/services/v5/projects", {
        headers: {"X-TrackerToken": token}
      }).success(function (data, status, headers, config) {
        for (var i = 0; i < data.length; i++) {
          var section = sections[0];
          section.pages[i] = {
            name: data[i].name,
            id: data[i].name,
            url: "projects/" + data[i].name
          }
        }
        $scope.menu.sections = sections;
      });
    
    });

  $scope.toggleMenu = function () {
    $materialSidenav('left').toggle();
  };

});
/**
 * @ngdoc module
 * @name sopro.components.content
 *
 * @description
 * Scrollable content
 */
angular.module('sopro.components.content', [
  'sopro.services.registry'
])
  .directive('soproContent', [
    soproContentDirective
  ]);

/**
 * @ngdoc directive
 * @name soproContent
 * @module sopro.components.content
 *
 * @restrict E
 *
 * @description
 * The `<sopro-content>` directive is a container element useful for scrollable content
 *
 * @usage
 * <hljs lang="html">
 *  <sopro-content class="material-content-padding">
 *      Lorem ipsum dolor sit amet, ne quod novum mei.
 *  </sopro-content>
 * </hljs>
 *
 */
function soproContentDirective() {
  return {
    restrict: 'E',
    transclude: true,
    template: '<div class="sopro-content" ng-transclude></div>',
    controller: angular.noop,
    link: function($scope, $element, $attr) {
      $scope.$broadcast('$soproContentLoaded', $element);
    }
  };
}
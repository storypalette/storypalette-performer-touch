angular.module('sp.performer.preview', [
  'ui.router',
])

.config(function($stateProvider) {
  $stateProvider.state('user.preview', {
    url: '/preview', 

    // NB: Reuse perform template.
    templateUrl: 'perform/perform.tpl.html',
    controller: 'PreviewCtrl'
  });
})

// Controller for performing a palette in Preview mode
.controller('PreviewCtrl', function($scope, $location, palettes, socket) {

    $scope.palette = undefined;
    $scope.paletteUpdate = false;

    // Tell the Editor to send the current palette, if any
    socket.emit('requestPalette');

    // We received a palette from Editor
    socket.on('onActivePalette', function(palette) {
      $scope.palette = palette;
    });

    // Palette was updated in Editor, update Performer immediately
    socket.on('onPaletteUpdate', function(palette) {
      console.log('PreviewCtrl.onPaletteUpdate ', palette.name);
      $scope.paletteUpdate = true;
      $scope.palette = palette;
    });

    // Show waiting...
//        $scope.isViewLoading = false;
//        $scope.$on('$routeChangeStart', function() {
//            console.log('route change...');
//            $scope.isViewLoading = true;
//        });
//
//        $scope.$on('$routeChangeSuccess', function() {
//            $scope.isViewLoading = false;
//        });


})
;


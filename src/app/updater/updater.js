angular.module( 'wUpdate.updater', [
    'ui.router',
    'placeholders',
    'ui.bootstrap'
])

    .config(function config( $stateProvider ) {
        $stateProvider.state( 'updater', {
            url: '/updater',
            views: {
                "main": {
                    controller: 'UpdaterCtrl',
                    templateUrl: 'updater/updater.tpl.html'
                }
            },
            data:{ pageTitle: 'Update your marks' }
        });
    })

    .controller( 'UpdaterCtrl', function UpdaterCtrl( $scope ) {


        $scope.loadCSVFile = function($fileContent){
            $scope.content = $fileContent;

            $scope.papaContent = Papa.parse($fileContent,{header: true,skipEmptyLines: true,comments: "#"});

            console.log( $scope.papaContent) ;

            console.log("hello");


        };

    })

.directive('onReadFile', function ($parse) {
    return {
        restrict: 'A',
        scope: false,
        link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);

            element.on('change', function(onChangeEvent) {
                var reader = new FileReader();

                reader.onload = function(onLoadEvent) {
                    scope.$apply(function() {
                        fn(scope, {$fileContent:onLoadEvent.target.result});
                    });
                };

                reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
            });
        }
    };
})

;

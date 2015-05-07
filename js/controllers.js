angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('PlaylistsCtrl', function ($scope) {

    //    $scope.testmsg = "9029145077>02354";
    //    console.log("msg=" + $scope.testmsg);
    //    var len = $scope.testmsg.length;
    //    console.log("Length=" + $scope.testmsg.length);
    //    var index = $scope.testmsg.indexOf(">");
    //    console.log("index=" + index);
    //    console.log($scope.testmsg.substring(index + 1, len));
    var successCallback = function (data, message) {
        $scope.data = data;
        var len = $scope.data.length;
        var index = $scope.data.indexOf(">");
        $scope.code = $scope.data.substring(index + 1, len);
        $scope.message = message;
        $scope.isfail = false;
    };
    var failureCallback = function (data, message) {
        $scope.data = data;
        $scope.message = message;
        $scope.isfail = true;
    };
    smsplugin.startReception(successCallback, failureCallback);
    smsplugin.send('9029145077', "test", successCallback, failureCallback);
})

.controller('PlaylistCtrl', function ($scope, $stateParams) {});
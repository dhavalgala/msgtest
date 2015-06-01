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
        //        var len = $scope.data.length;
        //        var index = $scope.data.indexOf(">");
        //        $scope.code = $scope.data.substring(index + 1, len);
        $scope.message = message;
        $scope.isfail = false;
    };
    var failureCallback = function (data, message) {
        $scope.data = data;
        $scope.message = message;
        $scope.isfail = true;
    };
    //smsplugin.startReception(successCallback, failureCallback);
    //    smsplugin.send('9029145077', "test", successCallback, failureCallback);


    var onSuccess = function (position) {
        console.log(position);
        $scope.displayLocation(position.coords.latitude, position.coords.longitude);
        //        alert('Latitude: ' + position.coords.latitude + '\n' +
        //            'Longitude: ' + position.coords.longitude + '\n' +
        //            'Altitude: ' + position.coords.altitude + '\n' +
        //            'Accuracy: ' + position.coords.accuracy + '\n' +
        //            'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
        //            'Heading: ' + position.coords.heading + '\n' +
        //            'Speed: ' + position.coords.speed + '\n' +
        //            'Timestamp: ' + position.timestamp + '\n');
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError,{ enableHighAccuracy: true });

    $scope.displayLocation = function (latitude, longitude) {
        var request = new XMLHttpRequest();

        var method = 'GET';
        var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true';
        var async = true;

        request.open(method, url, async);
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                var data = JSON.parse(request.responseText);
                var address = data.results[0];
                console.log(data);
                console.log(address);
                $scope.locationofuser = data.results[6].address_components[1].long_name + ", " + data.results[9].address_components[0].short_name;
                console.log($scope.locationofuser);
                //            document.write(address.formatted_address);
            }
        };
        request.send();
    };
})

.controller('PlaylistCtrl', function ($scope, $stateParams) {});
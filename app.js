var app = angular.module("validationFormExample", []);

app.controller("mainController", function($scope) {
    $scope.driverLicense = null;
    $scope.registerNumber = null;

    $scope.hasError = function (field) {
        return (field.$invalid && field.$touched);
    }
});

app.directive('stripLatin', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, mCtrl) {
            var stripLatin = function(value) {
                if (value == undefined) {
                    value = '';
                }
                var stripped = value.replace(/[a-z]/i, '');
                if (stripped != value) {
                    mCtrl.$setViewValue(stripped);
                    mCtrl.$render();
                }
                return stripped;
            };
            mCtrl.$parsers.push(stripLatin);
            stripLatin(scope[attrs.ngModel]);
        }
    };
});

app.directive('capitalize', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, mCtrl) {
            var capitalize = function(value) {
                if(value == undefined) {
                    value = '';
                }
                var capitalized = value.toUpperCase();
                if(capitalized !== value) {
                    mCtrl.$setViewValue(capitalized);
                    mCtrl.$render();
                }
                return capitalized;
            };
            mCtrl.$parsers.push(capitalize);
            capitalize(scope[attrs.ngModel]);  // capitalize initial value
        }
    };
});

app.directive("driverLicenseValidator", function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, mCtrl) {
            var validator = function(value) {
                return value;
            };
            mCtrl.$parsers.push(validator);
        }
    };
});

app.directive("registerNumberValidator", function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, mCtrl) {
            var validator = function(value) {
                return value;
            };
            mCtrl.$parsers.push(validator);
        }
    }
});
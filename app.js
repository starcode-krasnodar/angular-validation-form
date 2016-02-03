var app = angular.module("validationFormExample", []);

app.controller("mainController", function($scope) {
    // модели
    $scope.driverLicense = null;
    $scope.registerNumber = null;

    // ошибки валидации
    $scope.driverLicenseErrors = [];
    $scope.registerNumberErrors = [];

    /**
     * Вызывается при изменении значения поля водительских прав.
     *
     * @param driverLicense
     */
    $scope.driverLicenseChange = function(driverLicense) {
        if (driverLicense.substr(2, 2) != '' && driverLicense.substr(2, 2).match(/[\d+О]/i)) {
            $scope.driverLicense = driverLicense.replace(/О/i, 0);
        }
    };

    /**
     * Валидация водительских прав.
     *
     * @param driverLicense string
     */
    $scope.driverLicenseValidate = function(driverLicense) {
        $scope.driverLicenseErrors = [];

        if (driverLicense == null || driverLicense == '') {
            $scope.driverLicenseErrors.push('Поле не может быть пустым');
        } else {
            if (driverLicense.substr(0, 2) != '' && !driverLicense.substr(0, 2).match(/^\d{2}$/)) {
                $scope.driverLicenseErrors.push('Первые два символа, должны быть цифрами');
            }
            if (driverLicense.substr(2, 2) != '' && !driverLicense.substr(2, 2).match(/^(\d{2}|[А-Я]{2})$/)) {
                $scope.driverLicenseErrors.push('На месте ХХ могут быть цифры или русские буквы в верхнем регистре');
            }
            if (driverLicense.substr(4) == '' || !driverLicense.substr(4).match(/^\d{6}$/)) {
                $scope.driverLicenseErrors.push('Последние шесть символов должны быть цифрами');
            }
        }
    };

    /**
     * Валидация регистрационного номера.
     *
     * @param registerNumber string
     */
    $scope.registerNumberValidate = function(registerNumber) {
        $scope.registerNumberErrors = [];

        if (registerNumber == null || registerNumber == '') {
            $scope.registerNumberErrors.push('Поле не может быть пустым');
        } else {
            if (!registerNumber.match(/^([А-Я])(\d{3})([А-Я]{2})(\d{2,3})$/)) {
                $scope.registerNumberErrors.push('Неверный формат, допустим следующий шаблон А 123 АА 12 или А 123 АА 123');
            }
        }
    };
});

/**
 * Директива to-upper-case, преобразующая все символы в нижнем регистре в верхний.
 */
app.directive('toUpperCase', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attributes, modelCtrl) {
            var toUpperCase = function(value) {
                value = value || '';
                var valueUpperCase = value.toUpperCase();
                if(valueUpperCase !== value) {
                    modelCtrl.$setViewValue(valueUpperCase);
                    modelCtrl.$render();
                }
                return valueUpperCase;
            };
            modelCtrl.$parsers.push(toUpperCase);
            toUpperCase(scope[attributes.ngModel]);
        }
    };
});
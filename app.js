var app = angular.module("validationFormExample", []);

app.controller("mainController", function($scope) {

    var vm = this;

    // модели
    vm.driverLicense = null;
    vm.registerNumber = null;

    // ошибки валидации
    vm.driverLicenseErrors = [];
    vm.registerNumberErrors = [];

    /**
     * Вызывается при изменении значения поля водительских прав.
     *
     * @param driverLicense
     */
    vm.driverLicenseChange = function(driverLicense) {
        if (driverLicense.substr(2, 2) != '' && driverLicense.substr(2, 2).match(/[\d+О]/i)) {
            vm.driverLicense = driverLicense.replace(/О/i, 0);
        }
    };

    /**
     * Валидация водительских прав.
     *
     * @param driverLicense string
     */
    vm.driverLicenseValidate = function(driverLicense) {
        vm.driverLicenseErrors = [];

        if (driverLicense == null || driverLicense == '') {
            vm.driverLicenseErrors.push('Поле не может быть пустым');
        } else {
            if (driverLicense.substr(0, 2) == '' || !driverLicense.substr(0, 2).match(/^\d{2}$/)) {
                vm.driverLicenseErrors.push('Первые два символа, должны быть цифрами');
            }
            if (driverLicense.substr(2, 2) == '' || !driverLicense.substr(2, 2).match(/^(\d{2}|[А-Я]{2})$/)) {
                vm.driverLicenseErrors.push('На месте ХХ могут быть цифры или русские буквы в верхнем регистре');
            }
            if (driverLicense.substr(4) == '' || !driverLicense.substr(4).match(/^\d{6}$/)) {
                vm.driverLicenseErrors.push('Последние шесть символов должны быть цифрами');
            }
        }
    };

    /**
     * Валидация регистрационного номера.
     *
     * @param registerNumber string
     */
    vm.registerNumberValidate = function(registerNumber) {
        vm.registerNumberErrors = [];

        if (registerNumber == null || registerNumber == '') {
            vm.registerNumberErrors.push('Поле не может быть пустым');
        } else {
            if (!registerNumber.match(/^([А-Я])(\d{3})([А-Я]{2})(\d{2,3})$/)) {
                vm.registerNumberErrors.push('Неверный формат, допустим следующий шаблон А 123 АА 12 или А 123 АА 123');
            }
        }
    };

    /**
     * Заглушка отправки данных.
     */
    vm.submit = function() {
        if (vm.driverLicenseErrors.length == 0 && vm.registerNumberErrors.length == 0) {
            console.log('Submit data');
        } else {
            console.error('Validation errors');
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
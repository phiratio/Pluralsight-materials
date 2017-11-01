/// <reference path="localDatabase.js"/>

var viewModel = (function () {

    var vm = {

        homes: ko.observableArray(),
        address: ko.observable(''),
        city: ko.observable(''),
        state: ko.observable(''),
        zip: ko.observable(''),
        comments: ko.observable(''),
        clientId: ko.observable(''),
        buttonLabel: ko.observable('Add'),

        init: function () {

            localDatabase.setErrorPublisher(function (e) {
                debugger;
            });

            localDatabase.open(homesDBModel, function (e) {
                var store = homesDBModel.stores.homes;
                localDatabase.getAll(store.name, function (e) {
                    vm.homes(e);
                });
            });

        },

        createHome: function () {
            return {
                address: vm.address(),
                city: vm.city(),
                state: vm.state(),
                zip: vm.zip(),
                comments: vm.comments(),
                clientId: vm.clientId()
            };
        },

        save: function () {

            if (vm.clientId().length > 0) {

                var
                    updatedHome = vm.createHome(),
                    index = counter = -1;

                ko.utils.arrayForEach(vm.homes(), function (home) {
                    ++counter;
                    if (home.clientId === updatedHome.clientId) {
                        index = counter;
                    }
                });

                var store = homesDBModel.stores.homes;
                localDatabase.update(store.name, updatedHome, updatedHome.clientId, function (home, e) {
                    vm.homes.replace(vm.homes()[index], home);
                    vm.clear();
                });

            } else {

                vm.clientId(localDatabase.createUUID());

                var
                    store = homesDBModel.stores.homes,
                    newHome = vm.createHome();

                localDatabase.insert(store.name, newHome, function (e) {
                    vm.homes.push(newHome);
                })
            }

            vm.clear();

        },

        clear: function (obj, e) {
            vm.address('');
            vm.city('');
            vm.state('');
            vm.zip('');
            vm.comments('');
            vm.clientId('');

            vm.buttonLabel('Add');
        },

        "delete": function (obj, e) {

            vm.clear();

            var
                key = e.currentTarget.getAttribute('data-id'),
                store = homesDBModel.stores.homes;

            localDatabase.delete(store.name, key, function (e) {
                vm.homes.remove(obj);
            });

        },

        select: function (obj, e) {

            var
                key = e.currentTarget.getAttribute('data-id'),
                store = homesDBModel.stores.homes;

            localDatabase.getById(store.name, key, function (e) {

                var home = e.target.result;

                if (home !== null) {

                    vm.address(home.address);
                    vm.city(home.city);
                    vm.state(home.state);
                    vm.zip(home.zip);
                    vm.comments(home.comments);

                    vm.clientId(home.clientId);

                    vm.buttonLabel('Update');
                }
            });
        }

    };

    $(function () {

        if (!window.indexedDB) {

            $('#unsupported').fadeIn();

        } else {

            ko.applyBindings(vm);

            vm.init();

        }

    });

    return vm;

})();
var viewModel = (function () {

    var lfs = localFileSystem;

    lfs.setErrorPublisher(function (e) {
        console.warn(e);
    });

    var vm = {

        directoryName: ko.observable(),

        fileName: ko.observable(),

        content: ko.observable(),

        getPath: function () {

            return vm.directoryName() + '/' + vm.fileName();

        },

        openFile: function () {

            var path = vm.getPath();

            lfs.fileExists(path, function (result) {

                if (result.exists) {

                    lfs.readFile(path, function (contents) {

                        vm.content(contents);

                    });

                } else {

                    vm.content('');

                }

            });

        },

        saveFile: function () {

            var path = vm.getPath();

            var showSavedMessage = function () {

                var $savedMessage = $('#saved-message');

                $savedMessage.fadeIn(function () {

                    var timeout = setTimeout(function () {

                        $savedMessage.fadeOut();

                    }, 2000);

                });

            };

            lfs.fileExists(path, function (result) {

                var content = vm.content();

                if (result.exists) {

                    lfs.replaceFile(path, content, null, function () {

                        showSavedMessage();

                    });

                } else {

                    lfs.createFile(path, function () {

                        lfs.prependFile(path, content, null, function () {

                            showSavedMessage();

                        });

                    });

                }

            });

        }
    };

    $(function () {

        if (!window.requestFileSystem) {

            $('#unsupported').fadeIn();

        } else {

            ko.applyBindings(vm);

        }

    });

    return vm;

})();
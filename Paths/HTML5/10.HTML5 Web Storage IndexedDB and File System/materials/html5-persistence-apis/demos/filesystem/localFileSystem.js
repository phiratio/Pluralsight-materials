var localFileSystem = (function () {

    window.requestFileSystem =
        window.requestFileSystem ||
        window.webkitRequestFileSystem;

    var _err = {

        publisher: null,

        setErrorPublisher: function (publisherCallback) {

            _err.publisher = publisherCallback;

        },

        publishError: function (msg, object) {

            if (_err.publisher) {

                _err.publisher();

            } else {

                $$result.log(msg);

                if (object) {
                    $$result.log(object);
                }

            }

        },

        deniedHandler: null,

        setDeniedHandler: function (deniedHandlerCallback) {

            _err.deniedHandler = deniedHandlerCallback;

        },

        getDeniedHandler: function (deniedHandler) {

            return (deniedHandler === undefined) ?
                    _err.deniedHandler : deniedHandler;

        },

        defaultErrorHandler: function (fileError) {

            var msg = 'Error initializing file system. ';

            switch (fileError.code) {
                case FileError.NOT_FOUND_ERR: // 1
                    msg += 'File or directory not found. ';
                    break;

                case FileError.SECURITY_ERR: //2
                    msg += 'Security error. ';
                    break;

                case FileError.ABORT_ERR: //3
                    msg += 'Abort error. ';
                    break;

                case FileError.NOT_READABLE_ERR: //4
                    msg += 'File or directory not readable. ';
                    break;

                case FileError.ENCODING_ERR: //5
                    msg += 'Encoding error. ';
                    break;

                case FileError.NO_MODIFICATION_ALLOWED_ERR: //6
                    msg += 'No modification allowed. ';
                    break;

                case FileError.INVALID_STATE_ERR: //7
                    msg += 'Invalid state. ';
                    break;

                case FileError.SYNTAX_ERR: //8
                    msg += 'Syntax error. ';
                    break;

                case FileError.INVALID_MODIFICATION_ERR: //9
                    msg += 'Invalid modification. ';
                    break;

                case FileError.QUOTA_EXCEEDED_ERR: //10
                    msg += 'Quota exceeded. ';
                    break;

                case FileError.TYPE_MISMATCH_ERR: //11
                    msg += 'Invalid filetype. ';
                    break;

                case FileError.PATH_EXISTS_ERR: //12
                    msg += 'File or directory already exists. ';
                    break;

                default:
                    msg += 'Unknown error. ';

                    break;
            };

            _err.publishError(msg, fileError);

        },

        getFailHandler: function (fail) {

            return (fail === undefined) ? _err.defaultErrorHandler : fail;

        }

    }

    var _fs = {

        calculateBytesByMegabytes: function (numberOfMegabytes) {
            return numberOfMegabytes * 1048576;
        },

        fileSystem: null,

        request: function (successHandler, deniedHandler) {

            if (_fs.fileSystem != null) {

                successHandler(_fs.fileSystem);
                return;

            }

            var size = _fs.calculateBytesByMegabytes(2);

            navigator.webkitTemporaryStorage.requestQuota(size, function (grantedBytes) {

                if (size == grantedBytes) {

                    window.requestFileSystem(
                        window.TEMPORARY,
                        grantedBytes,
                        function (fileSystem) {

                            _fs.fileSystem = fileSystem;

                            successHandler(fileSystem);

                        },
                        _err.defaultErrorHandler);

                } else {

                    deniedHandler = _err.getDeniedHandler(deniedHandler);

                    if (deniedHandler) {

                        deniedHandler({
                            message: 'The amount of granted bytes by the HTML5 file system is less than the requested size.',
                            requrestedSize: size,
                            grantedBytes: grantedBytes
                        });

                    }

                }

            }, _err.defaultErrorHandler);
        },

        createOptions: function (path, root, recursive, exclusive) {

            if (recursive === undefined) {
                recursive = false;
            }

            if (exclusive === undefined) {
                exclusive = false;
            }

            return {
                root: root,
                path: path,
                recursive: recursive,
                exclusive: exclusive,
                directoryPath: '',
                fileName: ''
            };

        },

        parsePathOrOptions: function (pathOrOptions) {

            var test = pathOrOptions.toString();

            var options;

            if (test === pathOrOptions) {

                options = _fs.createOptions(pathOrOptions, _fs.fileSystem.root);

            } else {

                options = pathOrOptions;

                var ifRootDoesntExist = function () {
                    return options.root === undefined ||
                           options.root === null ||
                           !options.root;
                };

                if (ifRootDoesntExist()) {
                    options.root = _fs.fileSystem.root;
                }

            }

            var pathParts = options.path.split('/');

            if (pathParts.length > 0) {
                if (pathParts[pathParts.length - 1].indexOf('.') !== -1) {
                    options.fileName = pathParts.pop();
                }
            }

            options.directoryPath = pathParts.join('/');


            return options;
        }
    };

    var _dir = {

        createDirectory: function (pathOrOptions, success, fail) {

            _fs.request(function (fileSystem) {

                fail = _err.getFailHandler(fail);

                var options = _fs.parsePathOrOptions(pathOrOptions);

                var isFirstPass = true;

                var _createDirectory = function (directoryNames, rootDirectory) {

                    if (directoryNames.length > 0) {

                        var directoryName = directoryNames[0];

                        rootDirectory.getDirectory(

                            directoryName,

                            {
                                create: true,
                                exclusive: options.exclusive
                            },

                            function (directory) {

                                success(directory, {
                                    isFirstDirectory: isFirstPass,
                                    isLastDirectory: (directoryNames.length === 1)
                                });

                                if (isFirstPass) {
                                    isFirstPass = false;
                                }

                                var remainingDirectoryNames = directoryNames.slice(1);

                                if (remainingDirectoryNames.length > 0) {

                                    _createDirectory(remainingDirectoryNames, directory);

                                }

                            },

                            fail);
                    }

                };

                var directoryNames = options.directoryPath.split('/');

                _createDirectory(directoryNames, options.root);

            });

        },

        getDirectory: function (pathOrOptions, success, fail) {

            _fs.request(function (fileSystem) {

                var options = _fs.parsePathOrOptions(pathOrOptions);

                fail = _err.getFailHandler(fail);

                options.root.getDirectory(options.path, {}, success, fail);

            });

        },

        directoryExists: function (pathOrOptions, success, fail) {

            var result = { exists: false };

            fail = _err.getFailHandler(fail);

            _dir.getDirectory(pathOrOptions, function (directoryEntry) {

                result.exists = true;
                success(result);

            }, function (error) {

                // error #1 is file/directory 
                // not found error
                if (error.code !== 1) {
                    fail(error);
                } else {
                    success(result);
                }

            });


        },

        getDirectoryEntries: function (pathOrOptions, success, fail) {

            _fs.request(function (fileSystem) {

                fail = _err.getFailHandler(fail);

                _dir.getDirectory(pathOrOptions, function (directory) {

                    var rdr = directory.createReader();

                    rdr.readEntries(function (entries) {

                        success(entries);

                    }, fail);

                }, fail);

            });
        },

        deleteDirectory: function (pathOrOptions, success, fail) {

            _fs.request(function (fileSystem) {

                fail = _err.getFailHandler(fail);

                pathOrOptions = _fs.parsePathOrOptions(pathOrOptions);

                _dir.getDirectory(pathOrOptions, function (directory) {

                    if (pathOrOptions.recursive) {

                        directory.removeRecursively(success, fail);

                    } else {

                        directory.remove(success, fail);

                    }

                }, fail);

            });

        },

        moveDirectory: function (pathOrOptions, destinationPath, success, fail) {

            _fs.request(function (fileSystem) {

                var sourceOptions = _fs.parsePathOrOptions(pathOrOptions);

                var destinationOptions = _fs.parsePathOrOptions(destinationPath);

                var fail = _err.getFailHandler(fail);

                _dir.createDirectory(destinationOptions, function (destination) {

                    _dir.getDirectory(sourceOptions, function (source) {

                        source.moveTo(destination);

                        success();

                    }, fail);

                }, fail);

            });

        },

        renameDirectory: function (pathOrOptions, newName, success, fail) {

            _fs.request(function (fileSystem) {

                var options = _fs.parsePathOrOptions(pathOrOptions);

                var fail = _err.getFailHandler(fail);

                _dir.getDirectory(options, function (dir) {

                    dir.getParent(function (parent) {
                        
                        dir.moveTo(parent, newName);

                        success();

                    }, fail);

                }, fail);

            });

        },

        copyDirectory: function (pathOrOptions, destinationPath, success, fail) {

            _fs.request(function (fileSystem) {

                var sourceOptions = _fs.parsePathOrOptions(pathOrOptions);

                var destinationOptions = _fs.parsePathOrOptions(destinationPath);

                var fail = _err.getFailHandler(fail);

                _dir.createDirectory(destinationOptions, function (destination) {

                    _dir.getDirectory(sourceOptions, function (source) {

                        source.copyTo(destination);

                        success();

                    }, fail);

                }, fail);

            });

        }

    };

    var _files = {

        createFile: function (pathOrOptions, success, fail) {

            _fs.request(function (fileSystem) {

                var options = _fs.parsePathOrOptions(pathOrOptions);

                fail = _err.getFailHandler(fail);

                _dir.createDirectory(options, function (directoryEntry, result) {

                    if (result.isLastDirectory) {

                        directoryEntry.getFile(

                                        options.fileName,

                                        {
                                            create: true,
                                            exclusive: options.exclusive
                                        },

                                        success,

                                        fail);

                    }

                }, fail);

            });

        },

        getFile: function (pathOrOptions, success, fail) {

            _fs.request(function (fileSystem) {

                var options = _fs.parsePathOrOptions(pathOrOptions);

                fail = _err.getFailHandler(fail);

                _dir.getDirectory(options.directoryPath, function (directoryEntry) {

                    directoryEntry.getFile(

                            options.fileName,

                            {},

                            success,

                            fail);

                });

            });

        },

        fileExists: function (pathOrOptions, success, fail) {

            _fs.request(function (fileSystem) {

                var options = _fs.parsePathOrOptions(pathOrOptions);

                var result = { exists: false };

                fail = _err.getFailHandler(fail);

                _dir.directoryExists(options.directoryPath, function (dirResult) {

                    if (dirResult.exists) {

                        _files.getFile(options, function (fileEntry) {

                            result.exists = true;
                            success(result);

                        }, function (error) {

                            // error #1 is file/directory 
                            // not found error
                            if (error.code !== 1) {
                                fail(error);
                            } else {
                                success(result);
                            }

                        });

                    } else {

                        success(result);

                    }

                });

            });

        },

        readFile: function (pathOrOptions, success, fail) {

            _fs.request(function (fileSystem) {

                var options = _fs.parsePathOrOptions(pathOrOptions);

                fail = _err.getFailHandler(fail);

                _files.getFile(options, function (fileEntry) {

                    fileEntry.file(function (file) {

                        var rdr = new FileReader();

                        rdr.onloadend = function () {

                            success(this.result);

                        };

                        rdr.onerror = function (e) {

                            fail(e);

                        };

                        rdr.readAsText(file);
                    });

                }, fail);

            });

        },

        prependFile: function (pathOrOptions, data, contentType, success, fail) {

            if (data && data.length > 0) {

                _fs.request(function (fileSystem) {

                    var options = _fs.parsePathOrOptions(pathOrOptions);

                    fail = _err.getFailHandler(fail);

                    if (!contentType) {
                        contentType = 'text/plain';
                    }

                    _files.getFile(options, function (fileEntry) {

                        fileEntry.createWriter(function (writer) {

                            writer.onwriteend = function (e) {
                                success();
                            };

                            writer.onerror = function (e) {
                                fail(e);
                            };

                            var blob = new Blob([data], { type: contentType });

                            writer.write(blob);

                        });

                    }, fail);

                });

            }


        },

        appendFile: function (pathOrOptions, data, contentType, success, fail) {

            _fs.request(function (fileSystem) {

                if (data && data.length > 0) {

                    var options = _fs.parsePathOrOptions(pathOrOptions);

                    fail = _err.getFailHandler(fail);

                    if (!contentType) {
                        contentType = 'text/plain';
                    }

                    _files.getFile(options, function (fileEntry) {

                        fileEntry.createWriter(function (writer) {

                            writer.seek(writer.length);

                            writer.onwriteend = function (e) {
                                success();
                            };

                            writer.onerror = function (e) {
                                fail(e);
                            };

                            var blob = new Blob([data], { type: contentType });

                            writer.write(blob);

                        });

                    }, fail);

                }

            }, fail);

        },

        deleteFile: function (pathOrOptions, success, fail) {

            _fs.request(function (fileSystem) {

                var options = _fs.parsePathOrOptions(pathOrOptions);

                fail = _err.getFailHandler(fail);

                _files.getFile(options, function (fileEntry) {

                    fileEntry.remove(success, fail);

                }, fail);

            });

        },

        replaceFile: function (pathOrOptions, data, contentType, success, fail) {

            _fs.request(function (fileSystem) {

                var options = _fs.parsePathOrOptions(pathOrOptions);

                var fail = _err.getFailHandler(fail);

                _files.deleteFile(pathOrOptions, function () {

                    _files.createFile(options, function () {

                        _files.prependFile(options, data, contentType, success, fail);

                    }, fail);

                }, fail);

            });

        },

        moveFile: function (pathOrOptions, destinationPath, success, fail) {

            _fs.request(function (fileSystem) {

                var options = _fs.parsePathOrOptions(pathOrOptions);

                fail = _err.getFailHandler(fail);

                _dir.createDirectory(destinationPath, function (directoryEntry, info) {

                    if (info.isLastDirectory) {

                        _files.getFile(pathOrOptions, function (fileEntry) {

                            fileEntry.moveTo(directoryEntry);

                            success();

                        }, fail);
                    }

                }, fail);

            });


        },

        renameFile: function (pathOrOptions, newFileName, success, fail) {

            _fs.request(function (fileSystem) {

                var options = _fs.parsePathOrOptions(pathOrOptions);

                fail = _err.getFailHandler(fail);

                _files.getFile(options, function (fileEntry) {

                    _dir.getDirectory(options.directoryPath, function (directoryEntry) {

                        fileEntry.moveTo(directoryEntry, newFileName);

                        success();

                    }, fail);

                }, fail);
            });

        },

        copyFile: function (pathOrOptions, destinationPath, success, fail) {

            _fs.request(function (fileSystem) {

                var options = _fs.parsePathOrOptions(pathOrOptions);

                fail = _err.getFailHandler(fail);

                _dir.createDirectory(destinationPath, function (directoryEntry, info) {

                    if (info.isLastDirectory) {

                        _files.getFile(pathOrOptions, function (fileEntry) {

                            fileEntry.copyTo(directoryEntry);

                            success();

                        }, fail);
                    }

                }, fail);

            });

        }

    };

    return {
        //general
        createOptions: _fs.createOptions,

        // error handling
        defaultErrorHandler: _err.defaultErrorHandler,
        setErrorPublisher: _err.setErrorPublisher,
        setDeniedHandler: _err.setDeniedHandler,

        //directories
        getDirectory: _dir.getDirectory,
        getDirectoryEntries: _dir.getDirectoryEntries,
        deleteDirectory: _dir.deleteDirectory,
        createDirectory: _dir.createDirectory,
        moveDirectory: _dir.moveDirectory,
        renameDirectory: _dir.renameDirectory,
        copyDirectory: _dir.copyDirectory,
        directoryExists: _dir.directoryExists,

        //files
        createFile: _files.createFile,
        getFile: _files.getFile,
        fileExists: _files.fileExists,
        readFile: _files.readFile,
        appendFile: _files.appendFile,
        prependFile: _files.prependFile,
        replaceFile: _files.replaceFile,
        deleteFile: _files.deleteFile,
        moveFile: _files.moveFile,
        renameFile: _files.renameFile,
        copyFile: _files.copyFile
    };

})();
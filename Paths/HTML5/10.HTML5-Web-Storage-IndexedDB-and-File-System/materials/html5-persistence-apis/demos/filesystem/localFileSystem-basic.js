var localFileSystem = (function() {
    
    window.requestFileSystem =
        window.requestFileSystem ||
        window.webkitRequestFileSystem;

    var fs = {

        calculateBytesByMegabytes : function(numberOfMegabytes) {
            return numberOfMegabytes * 1048576;
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

            try {
                $$result.log(msg);
            } catch (e) {
                console.error(msg);
            }
        },

        request: function (successHandler) {

            var size = fs.calculateBytesByMegabytes(2);

            navigator.webkitTemporaryStorage.requestQuota(size, function (grantedBytes) {

                if (grantedBytes != size) {

                    $$result.log('Request for file system denied.');
                    return;

                }

                window.requestFileSystem(
                        window.TEMPORARY,
                        grantedBytes,
                        successHandler,
                        fs.defaultErrorHandler);

                

            }, fs.defaultErrorHandler);

            
        }
    };

    return {
        request: fs.request,
        defaultErrorHandler: fs.defaultErrorHandler
    };

})();
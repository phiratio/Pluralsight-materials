/*
 ps-webrtc-simplewebrtc.js
 Author: Lisa Larson-Kelley (http://learnfromlisa.com)
 WebRTC Fundamentals -- Pluralsight.com
 Version 1.0.0
 --
 Example of basic multiway conferencing with SimpleWebRTC framework
 Adapted from SimpleWebRTC documentation 
 */

window.onload = function () { 
	// Grab the room name from the URL


	// Create our WebRTC connection


	// When it's ready, and we have a room from the URL, join the call


	// Set the room name
	function setRoom(name) {
        $('form').remove();
        $('h1').text('Welcome to room: ' + name);
        $('#subTitle').text('Share this link to have friends join you:');
        $('#roomLink').text(location.href);
        $('body').addClass('active');
    }

    // If there's a room, show it in the UI
    
    // If not, create one when the user submits the form
   


	// Extra credit! Hook up screenshare button
	var button = $('#screenShareButton'),
        setButton = function (bool) {
            button.text(bool ? 'share screen' : 'stop sharing');
        };

        setButton(true);

        if (!webrtc.screenSharingSupport) {
            button[0].disabled = true;
        } else {
            button.click(function () {
                if (webrtc.localScreen) {
                    webrtc.stopScreenShare();
                    setButton(true);
                } else {
                    webrtc.shareScreen();
                    setButton(false);
                }
        });
    }
}
        
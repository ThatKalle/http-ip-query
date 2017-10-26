$(function() {

    // Localization
    if(navigator.language == 'sv' || navigator.language == 'sv-SE') {
        // Swedish
        $('.local-ipv4-info').html('Din lokala IP address är');
        $('.public-ip-info').html('Din publika IP address är');
        $('.local-ip').html('Endast tillgängligt i Chrome eller Firefox, sorry!');
        $('.copy-btn-txt').html('Kopiera till urklipp');
    } else {
        // Everything else
        $('.local-ipv4-info').html('Your local IP address is');
        $('.public-ip-info').html('Your public IP address is');
        $('.local-ip').html("Only available in Chrome or Firefox, sorry!");
        $('.copy-btn-txt').html('Copy to Clipboard');
    }

    // Internet Explorer / Edge preferences
    function isIE () {
        // Check if IE/Edge using 'console.log(navigator.userAgent.toLowerCase())'
        var myNav = navigator.userAgent.toLowerCase();
        return (myNav.indexOf('msie') != -1 || myNav.indexOf('trident') != -1 || myNav.indexOf('edge') != -1) ? true : false;
    }

    if(isIE()) {
        // Display helpful message if WebRTC won't work, and hide button.
        $('.local-btn').css('visibility', 'hidden');
        $('.public-btn').css('visibility', 'hidden');
        $('body').addClass('ie');
    }

    // IP Calculation
    window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var pc = new RTCPeerConnection({iceServers: []}), 
        noop = function () {};

    pc.createDataChannel("");
    pc.createOffer(pc.setLocalDescription.bind(pc), noop);
    pc.onicecandidate = function (ice) {
        if (!ice || !ice.candidate || !ice.candidate.candidate) return;
        var myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
        pc.onicecandidate = noop;
        $('.local-ip').html(myIP);
    };

    // Click events
    $('.local-btn, .local-ip').on('click', function() {
        let val = $('.local-ip').html();
        $('.local-copy').val(val).select();
        document.activeElement.blur();
        document.execCommand('copy');
    });

    $('.public-btn, .public-ip').on('click', function() {
        let val = $('.public-copy').val();
        $('.public-copy').val(val).select();
        document.activeElement.blur();
        document.execCommand('copy');
    });

    setTimeout(function() {
        $('body').addClass('loaded');
    }, 250);
    
});

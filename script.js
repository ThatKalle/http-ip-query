window.onload = function() {
    
    // Variables
    var request = new XMLHttpRequest(),
        body = document.querySelector('body'),
        localBtn = document.querySelector('.local-btn'),
        publicBtn = document.querySelector('.public-btn'),
        btn  = document.querySelectorAll('.btn'),
        localIpv4Info = document.querySelector('.local-ipv4-info'),
        localIp = document.querySelector('.local-ip'),
        localCopy = document.querySelector('.local-copy'),
        publicIpInfo = document.querySelector('.public-ip-info'),
        publicIp = document.querySelector('.public-ip'),
        publicCopy = document.querySelector('.public-copy'),
        ua = navigator.userAgent.toLowerCase();

    // Localization
    if(navigator.language == 'sv' || navigator.language == 'sv-SE') {
        // Swedish
        localIpv4Info.innerHTML = "Din lokala IP address är";
        publicIpInfo.innerHTML = "Din publika IP address är";
        // Display helpful message if WebRTC won't work
        localIp.innerHTML = "Endast tillgängligt i Chrome eller Firefox, sorry!";
        Array.prototype.forEach.call(btn, function(el, i){
            el.value = "Kopiera till urklipp";
        });
    } else {
        // Everything else
        localIpv4Info.innerHTML = "Your local IP address is";
        publicIpInfo.innerHTML = "Your public IP address is";
        // Display helpful message if WebRTC won't work
        localIp.innerHTML = "Only available in Chrome or Firefox, sorry!";
        Array.prototype.forEach.call(btn, function(el, i){
            el.value = "Copy to Clipboard";
        });
    }

    // Internet Explorer / Edge settings
    function isIE () {
        // Check if IE/Edge using 'console.log(navigator.userAgent.toLowerCase())'
        return (ua.indexOf('msie') != -1 || ua.indexOf('trident') != -1 || ua.indexOf('edge') != -1) ? true : false;
    }

    if(isIE()) {
        // Hide the Copy to Clipboard buttons as they are not supported in IE.
        localBtn.style.visibility = 'hidden';
        publicBtn.style.visibility = 'hidden';
        if (body.classList)
            body.classList.add('ie');
        else
            body.ie += ' ' + ie;
    } else {
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
            localIp.innerHTML = myIP;
        };

        // Loaded event
        setTimeout(function() {
            if (body.classList)
                body.classList.add('loaded');
            else
                body.loaded += ' ' + loaded;
        }, 250);
    }

    // Local PHP API
    request.open('GET', 'getIP.php', true);
    
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);

            publicIp.innerHTML = data[0].ip;
            publicCopy.innerHTML = data[0].ip;

        } else {
            console.warn("Error on PHP API Request, getIP.php")
        }
    };
    
    request.onerror = function() {
        console.warn("Error on PHP API Request, getIP.php")
    };
    
    request.send();

    // Click events
    document.addEventListener('click', function (event) {

        if ( event.target.classList.contains('local-btn') || event.target.classList.contains('local-ip') ) {
            let val = localIp.innerHTML;
            localCopy.value = val;
            localCopy.select();
            document.activeElement.blur();
            document.execCommand('copy');
        }

        else if ( event.target.classList.contains('public-btn') || event.target.classList.contains('public-ip') ) {
            let val = publicIp.innerHTML;
            publicCopy.value = val;
            publicCopy.select();
            document.activeElement.blur();
            document.execCommand('copy');
        }

    }, false);

};

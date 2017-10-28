# http-ip-query

A simple HTML/JS/PHP webapp displaying client internal- and external IP information.

It works with a local PHP api [getIP.php](getIP.php) and WebRTC.

<dl>
    <dt>Features:</dt>
    <dd>Copy to Clipboard<br>
    Local IP via WebRTC<br>
    External IP via local PHP api<br>
    Language localization<br>
    HTTPS redirect<br>
    Curl support</dd>
</dl>


![preview](https://github.com/ThatKalle/http-ip-query/blob/master/demo/screenshot.jpg)


### Prerequisites

You'll need a web server with PHP enabled. Pretty much any version above 5.4 should work.

``` php
<?= $_SERVER['REMOTE_ADDR']; ?>
```

### Installing

Deploy the files to a PHP enabled web server.
``` shell
~$ git clone https://github.com/ThatKalle/http-ip-query.git
~$ cp ./http-ip-query/* /var/www/public_html
```

## Localization

Localization is supported and tested to Swedish with English as a default fallback.<br>
Adjustemnts are all handeled in [script.js](script.js).
``` js
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
    } else { ...
```
To find the `navigator.language` value for your language you'll not need to look further than the browser developer tools console.<br>
Open up any site, hit **F12**, type `navigator.language` in the console.

## Usage

This solution is tested and working on all common browsers in their respective latest versions. *Extended work done to incluse IE and Edge*.

[ip.php](ip.php) is set up to easily find you're external IP via shell.<br>
``` shell
~$ curl -L http://ip.kallelab.com/ip
Public IP: 198.51.100.132
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* [imlinus](https://github.com/imlinus)
* [webrtc-ips](https://github.com/diafygi/webrtc-ips)
* [You Might Not Need jQuery](http://youmightnotneedjquery.com/)
* /u/SHIT_PROGRAMMER

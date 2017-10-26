# http-ip-query

A simple HTML/PHP/JS/CSS webapp displaying client internal- and external IP information.

<dl>
    <dt>Features:</dt>
    <dd>Copy to Clipboard<br>
    Local IP via WebRTC<br>
    External IP via PHP<br>
    Language localization</dd>
</dl>

![preveiw](https://github.com/ThatKalle/http-ip-query/blob/master/demo/screenshot.jpg)


### Prerequisites

You'll need a web server with PHP enabled. Pretty much any version above 5.4 should work.

```
<?= $_SERVER['REMOTE_ADDR']; ?>
```

### Installing

Deploy the files to a PHP enabled web server.
```
git clone https://github.com/ThatKalle/http-ip-query.git
cp ./http-ip-query/* /var/www/public_html
```

## Deployment

Make sure you change the `github-corner` address, or remove it entierly, if removed, the corresponding CSS defenitions should be removed aswell.

### Localization

Localization is supported and tested to Swedish with English as a default fallback.<br>
Adjustemnts are done on line 4-18 in [script.js](script.js).
```
    // Localization
    if(navigator.language == 'sv' || navigator.language == 'sv-SE') {
        // Swedish
        $('.local-ipv4-info').html('Din lokala IP address är');
        $('.public-ip-info').html('Din publika IP address är');
        $('.local-ip').html('Endast tillgängligt i Chrome eller Firefox, sorry!');
        $('.copy-btn-txt').html('Kopiera till urklipp');
    } else { ...
```
To find the `navigator.language` value for your language is not further away than Chrome console.<br>
Open up any site, hit **F12**, type `navigator.language` in the console.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* [ImLinus](https://github.com/imlinus)
* [webrtc-ips](https://github.com/diafygi/webrtc-ips)

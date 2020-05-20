window.onload = () => {

  // Variables
  const request = new XMLHttpRequest(),
  const body = document.querySelector('body')
  const localBtn = document.querySelector('.local-btn')
  const publicBtn = document.querySelector('.public-btn')
  const btn  = document.querySelectorAll('.btn')
  const localIpv4Info = document.querySelector('.local-ipv4-info')
  const localIp = document.querySelector('.local-ip')
  const localCopy = document.querySelector('.local-copy')
  const publicIpInfo = document.querySelector('.public-ip-info')
  const publicIp = document.querySelector('.public-ip')
  const publicCopy = document.querySelector('.public-copy')
  const ua = navigator.userAgent.toLowerCase()

  // Localization
  if (navigator.language == 'sv' || navigator.language == 'sv-SE') {
    // Swedish
    localIpv4Info.innerHTML = 'Din lokala IP address är'
    publicIpInfo.innerHTML = 'Din publika IP address är'

    // Display helpful message if WebRTC won't work
    localIp.innerHTML = 'Endast tillgängligt i Chrome eller Firefox, sorry!'

    Array.prototype.forEach.call(btn, (el, i) => {
      el.value = "Kopiera till urklipp"
    })
  } else {
    // Everything else
    localIpv4Info.innerHTML = 'Your local IP address is'
    publicIpInfo.innerHTML = 'Your public IP address is'

    // Display helpful message if WebRTC won't work
    localIp.innerHTML = 'Only available in Chrome or Firefox, sorry!'

    Array.prototype.forEach.call(btn, (el, i) => {
      el.value = 'Copy to Clipboard'
    })
  }

  // Internet Explorer / Edge settings
  function isIE () {
    // Check if IE/Edge using 'console.log(navigator.userAgent.toLowerCase())'
    return (ua.indexOf('msie') != -1 || ua.indexOf('trident') != -1 || ua.indexOf('edge') != -1) ? true : false
  }

  if (isIE()) {
    localBtn.style.visibility = 'hidden'

    if (body.classList) {
      body.classList.add('ie')
    } else {
      body.ie += ' ' + ie
    }
  } else {
    // IP Calculation
    window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection
    const pc = new RTCPeerConnection({ iceServers: [] })
    const noop = function () {}

    pc.createDataChannel('')
    pc.createOffer(pc.setLocalDescription.bind(pc), noop)

    pc.onicecandidate = (ice) => {
      if (!ice || !ice.candidate || !ice.candidate.candidate) return

      const myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1]
      pc.onicecandidate = noop
      localIp.innerHTML = myIP
      localCopy.innerHTML = myIP
    }

    // Loaded event
    setTimeout(() => {
      if (body.classList) {
        body.classList.add('loaded')
      } else {
        body.loaded += ' ' + loaded
      }
    }, 250)
  }

  // Local PHP API
  request.open('GET', 'getIP.php', true)
    
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      const data = JSON.parse(request.responseText)

      publicIp.innerHTML = data[0].ip
      publicCopy.innerHTML = data[0].ip
    } else {
      console.warn('Error in PHP API Request, getIP.php')
    }
  }
    
  request.onerror = () => {
    console.warn('Error in PHP API Request, getIP.php')
  }
    
  request.send()

  // Click events
  document.addEventListener('click', (event) => {
    if (
      event.target.classList.contains('local-btn') ||
      event.target.classList.contains('local-ip')
    ) {
      const range = document.createRange()
      range.selectNode(localCopy)
      window.getSelection().removeAllRanges()
      window.getSelection().addRange(range)
      localCopy.select()

      if (typeof window.orientation !== 'undefined') {
        document.activeElement.blur()
      }

      document.execCommand('copy')
    } else if (
      event.target.classList.contains('public-btn') ||
      event.target.classList.contains('public-ip')
    ) {        
      const range = document.createRange()
      range.selectNode(publicCopy)
      window.getSelection().removeAllRanges()
      window.getSelection().addRange(range)
      publicCopy.select()

      if (typeof window.orientation !== 'undefined') {
        document.activeElement.blur()
      }
      
      document.execCommand('copy')
    }
  }, false)

}

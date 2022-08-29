/* eslint-disable */
let socket = undefined
let reconnectionAttempts = 0
let maxReconnectionAttempts = 8
let intervalID = 0
let initialReconnectDelay = 1000
let currentReconnectDelay = initialReconnectDelay
let maxReconnectDelay = 16000

export default function Socket(data = {}) {
  let { id: appID, wsURL } = data
  if (wsURL) {
    try {
      socket = new WebSocket(wsURL)
    } catch (err) {
      attemptReconnect({ appID })
    }
    socket.onopen = () => {
      reconnectionAttempts = 0
      currentReconnectDelay = initialReconnectDelay
      intervalID = setInterval(() => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(
            JSON.stringify({
              type: 'PING',
              data: 'hi',
            })
          )
        } else {
          attemptReconnect({ appID })
        }
      }, 540000)
      // Reconnect just under 2hrs
      setTimeout(() => {
        attemptReconnect({ appID })
      }, 6660000)
    }
    socket.onmessage = (event) => {
      try {
        let payload = JSON.parse(event.data)
        if (payload.type !== 'PONG') {
          self.postMessage(payload)
        }
      } catch (err) {
        console.error(err)
      }
    }
    socket.onerror = (event) => {
      console.error('WebSocket error: ', JSON.stringify(event, null, 2))
      attemptReconnect({ appID })
    }
    socket.close = (event) => {
      console.info('WebSocket Closed: ', JSON.stringify(event, null, 2))
      // AWS closes the socket with a 1006 that does not trigger the socket close event.
      // We attempt to handle this in the resume handler.
      attemptReconnect({ appID })
    }
  }
}

function attemptReconnect({ appID }) {
  if (
    socket.readyState === WebSocket.CLOSED ||
    socket.readyState === WebSocket.CLOSING
  ) {
    clearInterval(intervalID)
    if (reconnectionAttempts < maxReconnectionAttempts) {
      setTimeout(() => {
        reconnect({ appID })
      }, currentReconnectDelay + Math.floor(Math.random() * 3000))
    } else {
      // Refresh the page or give up ¯\_(ツ)_/¯
      console.error('WebSocket maximum reconnect attempts reached')
    }
  }
}

function reconnect() {
  reconnectionAttempts = reconnectionAttempts + 1
  if (currentReconnectDelay < maxReconnectDelay) {
    currentReconnectDelay *= 2
  }
  fetcher({
    url: `${url}/connect`,
    callback: (err, data) => {
      if (err) {
        console.error(err)
      } else {
        ws(data)
      }
    },
  })
}

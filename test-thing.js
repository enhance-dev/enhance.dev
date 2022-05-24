export default function makeWorker() {
  const scriptText = `
const CREATE = 'create'
const UPDATE = 'update'
const DESTROY = 'destroy'
const LIST = 'list'

self.onmessage = stateMachine

async function stateMachine({ data }) {
  const { data: payload, type } = data
  switch (type) {
    case CREATE:
      try {
        const result = await (
          await fetch('/branch', {
            body: payload,
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST'
          })
        ).json()

        self.postMessage({
          type: CREATE,
          result
        })
      } catch (err) {
        // RESPOND WITH ERROR
        console.error(err)
      }
      break
    case UPDATE:
      try {
        const path = JSON.parse(payload).path
        const result = await (
          await fetch('/branch/'+encodeURIComponent(path), {
            body: payload,
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST'
          })
        ).json()

        self.postMessage({
          type: UPDATE,
          result
        })
      } catch (err) {
        console.error(err)
      }
      break
    case DESTROY:
      try {
        const result = await (
          await fetch('/branch/delete', {
            body: payload,
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST'
          })
        ).json()

        self.postMessage({
          type: DESTROY,
          result
        })
      } catch (err) {
        // RESPOND WITH ERROR
        console.error(err)
      }
      break
    case LIST:
      try {
        const result = await (
          await fetch('/app/branches', {
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'GET'
          })
        ).json()
        self.postMessage({
          type: LIST,
          result
        })
      } catch (err) {
        // RESPOND WITH ERROR
        console.error(err)
      }

      break
  }
}`
  const scriptBase64 = bota(scriptText)
  const scriptURI = 'data:text/javascript;base64,' + scriptBase64
  const myWorker = new Worker(scriptURI)
  return myWorker
}

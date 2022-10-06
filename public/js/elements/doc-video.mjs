/* eslint-disable fp/no-class */
class DocVideo extends HTMLElement {
  constructor() {
    super()
    this.allVids = []
    this.currIndex = 0
    this.$video = this.querySelector('video.placeholder')
    this.$player = this.querySelector('mux-player')
    this.$menu = this.querySelector('nav.doc-video-menu ul')
    this.$menuToggle = this.querySelector('nav.doc-video-menu a')

    const $prevVids = this.querySelectorAll('doc-video-prev')
    const $currVid = this.querySelector('doc-video-current')
    const $nextVids = this.querySelectorAll('doc-video-next')
    if ($prevVids) {
      this.allVids = Array.from($prevVids).map(this.getData)
    }
    if ($currVid) {
      const currVid = this.getData($currVid)
      this.currIndex = this.allVids.length
      this.allVids.push(currVid)
    }
    if ($nextVids) {
      this.allVids = [
        ...this.allVids,
        ...Array.from($nextVids).map(this.getData),
      ]
    }
  }

  getData($el) {
    return {
      playbackId: $el.getAttribute('playback-id'),
      name: $el.getAttribute('name'),
    }
  }

  renderVidMenu() {
    if (this.$menu) {
      const list = []
      for (const [index, vid] of this.allVids.entries()) {
        const li = document.createElement('li')
        li.addEventListener('click', this.changePlaverVid.bind(this, vid))
        li.textContent = vid.name
        if (index === this.currIndex) {
          li.classList.add('current')
        }
        list.push(li)
      }

      this.$menu.replaceChildren(...list)
    }
  }

  showVidMenu() {
    this.$menu?.classList.remove('hide')
  }
  hideVidMenu() {
    this.$menu?.classList.add('hide')
  }
  toggleVidMenu() {
    this.$menu?.classList.toggle('hide')
  }

  changePlaverVid(vid) {
    if (this.$player) {
      const newIndex = this.allVids.indexOf(vid)
      this.currIndex = newIndex
      this.$player.setAttribute('playback-id', vid.playbackId)
      this.renderVidMenu()
    }
  }

  connectedCallback() {
    if (this.$video && this.$player) {
      this.$video.remove()
      this.$player.classList.add('block')

      if (this.allVids.length > 1 && this.$menu && this.$menuToggle) {
        this.renderVidMenu()
        this.$menu.parentElement?.classList.remove('hidden')

        this.$player.addEventListener('pause', this.showVidMenu.bind(this))
        this.$player.addEventListener('ended', this.showVidMenu.bind(this))
        this.$player.addEventListener('play', this.hideVidMenu.bind(this))
        this.$menuToggle.addEventListener(
          'touchstart',
          this.toggleVidMenu.bind(this)
        )
      }
    }
  }
}

customElements.define('doc-video', DocVideo)

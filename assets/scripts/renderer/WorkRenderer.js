import Highway from '@dogstudio/highway'
import store from '../utils/store'
import Videos from '../binders/Videos'
import Images from '../binders/Images'

class WorkRenderer extends Highway.Renderer {
    onLeaveCompleted() {}

    onEnterCompleted() {
        store.unlockDOM()

        this.$items = []
        this.activeProject = null
        this.galeryIndex = 0
        this.galery = []
        this.stopVideoTimeout = null

        this.bindDom()
        Images.lazyload()
    }

    bindDom() {
        const $view = this.wrap

        this.wrap.style.pointerEvents = 'auto'

        this.$fades = $view.querySelectorAll('.js-fade-item')
        this.$links = $view.querySelectorAll('.js-project-link')

        this.$links.forEach((link) => {
            const id = parseInt(link.dataset.project)
            const galery = `.js-project-galery[data-project='${id}']`

            this.$items[id] = {
                galery: $view.querySelector(galery),
                video: link.querySelector('.js-video'),
                pictures: $view.querySelectorAll(`${galery} picture`),
                ribbon: link.querySelector('.js-ribbon'),
            }

            if (this.$items[id].video) {
                Videos.resizeVideo(this.$items[id].video)
            }
        })

        this.$links.forEach((btn) => {
            const id = parseInt(btn.dataset.project)
            btn.addEventListener('click', () => this.disablePageBut(id))
            btn.addEventListener('mouseenter', () => this.hideAllBut(id))
            btn.addEventListener('mouseleave', () => this.showAll())
            btn.addEventListener('mousemove', (e) => this.browseGalery(e))
        })
    }

    browseGalery() {
        if (!this.galery.length) return false

        this.galeryIndex += 0.025
        if (this.galeryIndex >= this.galery.length) this.galeryIndex = 0

        this.galery.forEach((img, i) => {
            img.style.opacity = i === Math.floor(this.galeryIndex) ? 1 : 0
        })
    }

    hideAllBut(id) {
        if (this.hasClick) return false

        this.activeProject = id

        this.$fades.forEach((item) => {
            item.style.opacity = parseInt(item.dataset.project) === id ? 1 : 0
        })

        this.galeryIndex = 0
        this.galery = this.$items[id].pictures

        this.$items.map((item, pId) => {
            const isActive = parseInt(pId) === id
            item.galery.style.opacity = isActive ? 1 : 0
        })

        if (this.$items[id].video) {
            this.$items[id].video.play()
        }
    }

    showAll() {
        if (this.hasClick) return false

        this.$fades.forEach((item) => {
            item.style.opacity = 1
        })

        this.$items.map((item) => (item.galery.style.opacity = 0))
        const activeProject = this.activeProject

        setTimeout(() => {
            const video = this.$items[activeProject].video

            if (video && this.activeProject !== activeProject) {
                video.pause()
            }
        }, 300)

        this.activeProject = null
    }

    disablePageBut(id) {
        this.hideAllBut(id)

        this.$items.map((item) => {
            item.galery.style.opacity = 0
        })

        const ribbon = this.$items[id].ribbon
        if (ribbon) {
            ribbon.style.opacity = 0
        }

        this.hasClick = true
        this.wrap.style.pointerEvents = 'none'
    }
}

export default WorkRenderer

import Highway from '@dogstudio/highway'
import store from '../utils/store'
import Videos from '../binders/Videos'
import Images from '../binders/Images'
import breakpoints from '../constants/breakpoints'

class WorkRenderer extends Highway.Renderer {
    onLeaveCompleted() {
        this.$links.forEach((link) => {
            link.removeEventListener('click', this.onClick)
            link.removeEventListener('mouseenter', this.onMouseEnter)
            link.removeEventListener('mouseleave', this.onMouseLeave)
            link.removeEventListener('mousemove', this.browseGalery)
        })
    }

    onEnterCompleted() {
        this.$items = []
        this.galeryIndex = 0
        this.galery = []

        this.bindDom()
        Images.lazyload()
    }

    bindDom() {
        const $view = this.wrap

        this.$fades = $view.querySelectorAll('.js-fade-item')
        this.$links = $view.querySelectorAll('.js-project-link')
        this.$cover = $view.querySelector('.js-cover')

        this.$links.forEach((link) => {
            const id = parseInt(link.dataset.project)
            const dataName = `[data-project='${id}']`

            this.$items[id] = {
                galery: $view.querySelector(`.js-project-galery${dataName}`),
                video: $view.querySelector(`.js-project-video${dataName} .js-video`),
                pictures: $view.querySelectorAll(`.js-project-galery${dataName} picture`),
                ribbon: link.querySelector('.js-ribbon'),
            }

            if (this.$items[id].video) {
                Videos.resizeVideo(this.$items[id].video)
            }

            link.addEventListener('click', () => this.onClick(id))
            link.addEventListener('mouseenter', () => this.onMouseEnter(id))
            link.addEventListener('mouseleave', () => this.onMouseLeave(id))
            link.addEventListener('mousemove', () => this.browseGalery())
        })
    }

    onClick(id) {
        this.isNavigating = true

        const item = this.$items[id]

        if (item.ribbon) item.ribbon.style.opacity = 0
        if (item.galery) item.galery.style.opacity = 0
    }

    onMouseEnter(id) {
        this.$fades.forEach((item) => {
            item.style.opacity = parseInt(item.dataset.project) === id ? 1 : 0
        })

        const item = this.$items[id]

        this.galeryIndex = 0

        if (item.galery && item.pictures.length) {
            item.galery.style.opacity = 1
            this.galery = item.pictures
        }

        if (item.video && store.windowWidth >= breakpoints.desktop) {
            this.$cover.style.opacity = 1
            item.video.style.opacity = 1
            item.video.play()
        }
    }

    onMouseLeave(id) {
        if (this.isNavigating) return false

        this.galery = []
        this.$fades.forEach((item) => {
            item.style.opacity = 1
        })

        const item = this.$items[id]
        this.$cover.style.opacity = 0

        if (item.galery && item.pictures.length) {
            item.galery.style.opacity = 0
        }

        if (item.video) {
            item.video.style.opacity = 0
            item.video.pause()
        }
    }

    browseGalery() {
        if (!this.galery.length) return false

        this.galeryIndex += 0.05
        if (this.galeryIndex >= this.galery.length) this.galeryIndex = 0

        this.galery.forEach((img, i) => {
            img.style.opacity = i === Math.floor(this.galeryIndex) ? 1 : 0
        })
    }
}

export default WorkRenderer

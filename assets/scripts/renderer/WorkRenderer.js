import Highway from '@dogstudio/highway'
import breakpoints from '../constants/breakpoints'

import Videos from '../binders/Videos'
import Images from '../binders/Images'

import ScrollManager from '../utils/ScrollManager'
import ResizeManager from '../utils/ResizeManager'
import store from '../utils/store'

class WorkRenderer extends Highway.Renderer {
    onLeave() {
        this.$links.forEach((link) => {
            link.removeEventListener('click', this.onClick)
            link.removeEventListener('mouseenter', this.onMouseEnter)
            link.removeEventListener('mouseleave', this.onMouseLeave)
            link.removeEventListener('mousemove', this.browseGalery)
        })

        ScrollManager.removeQueue(this.onScrollIndex)
        ResizeManager.removeQueue(this.resizeIndex)
        Images.lazy.destroy()
    }

    onEnterCompleted() {
        this.$items = []
        this.galeryIndex = 0
        this.galery = []

        Images.lazyload()
        this.bindDom()

        const videos = this.$items.map((item) => item.video)
        Videos.resizeAll(videos)
        this.resizeIndex = ResizeManager.addQueue(() => Videos.resizeAll(videos))
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

            link.addEventListener('click', () => this.onClick(id))
            link.addEventListener('mouseenter', () => this.onMouseEnter(id))
            link.addEventListener('mouseleave', () => this.onMouseLeave(id))
            link.addEventListener('mousemove', () => this.browseGalery())
        })

        this.onScrollIndex = ScrollManager.addQueue(() => {
            if (ScrollManager.isScrolling) {
                this.onMouseLeave()
            }
        })
    }

    onClick(id) {
        this.isNavigating = true

        if (!this.activeId) {
            this.onMouseEnter(id)
        }

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

        this.activeId = id
    }

    onMouseLeave(id) {
        if (this.isNavigating) return false

        this.galery = []
        this.$fades.forEach((item) => {
            item.style.opacity = 1
        })

        const index = id || this.activeId

        const item = this.$items[index]
        this.$cover.style.opacity = 0

        if (!item) return false

        if (item.galery && item.pictures.length) {
            item.galery.style.opacity = 0
        }

        if (item.video) {
            item.video.style.opacity = 0
            item.video.pause()
        }

        this.activeId = null
    }

    browseGalery() {
        if (!this.galery.length) return false

        this.galeryIndex += 0.08
        if (this.galeryIndex >= this.galery.length) this.galeryIndex = 0

        this.galery.forEach((img, i) => {
            img.style.opacity = i === Math.floor(this.galeryIndex) ? 1 : 0
        })
    }
}

export default WorkRenderer

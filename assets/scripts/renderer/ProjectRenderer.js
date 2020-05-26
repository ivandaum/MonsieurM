import Highway from '@dogstudio/highway'
import Images from '../binders/Images'
import Videos from '../binders/Videos'
import RafManager from '../utils/RafManager'
import store from '../utils/store'
import FontLoader from '../utils/FontLoader'

import { lerp, range } from '../functions/object'
import ScrollManager from '../utils/ScrollManager'

const PARALLAX = [-35, 35]

class ProjectRenderer extends Highway.Renderer {
    onLeaveCompleted() {}

    onEnterCompleted() {
        this.$header = this.wrap.querySelector('.js-project-header')
        this.$cover = this.wrap.querySelector('.js-project-cover')

        const videos = this.wrap.querySelectorAll('.js-video')

        Videos.bindAll(videos)
        Videos.resizeAll(videos)
        Images.lazyload()

        this.raf = RafManager.addQueue(this.onRender.bind(this))

        FontLoader.load('Canela').then(() => {
            if (this.$cover) {
                this.bindCover()
            }
        })
    }

    getCoverBox() {
        this.coverBox = {
            top: this.$header.offsetHeight - store.windowHeight,
            bottom: this.$header.offsetHeight + store.windowHeight,
        }

        this.$cover.style.transform = `translateY(${PARALLAX[0]}vh)`
    }

    bindCover() {
        this.getCoverBox()

        const observer = new IntersectionObserver((changes) => {
            const [{ isIntersecting }] = changes
            this.coverIsVisible = isIntersecting
        })

        observer.observe(this.$cover)
    }

    onRender() {
        if (this.coverIsVisible) {
            const progress = range(ScrollManager.scroll, this.coverBox.top, this.coverBox.bottom) * 0.01
            const y = lerp(PARALLAX[0], PARALLAX[1], progress)

            this.$cover.style.transform = `translateY(${y}vh)`
        }
    }
}

export default ProjectRenderer

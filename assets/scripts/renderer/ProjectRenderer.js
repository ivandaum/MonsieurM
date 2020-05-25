import Highway from '@dogstudio/highway'
import Images from '../binders/Images'
import Videos from '../binders/Videos'
import RafManager from '../utils/RafManager'
import store from '../utils/store'
import FontLoader from '../utils/FontLoader'

import { lerp, range } from '../functions/object'

const PARALLAX = [-40, 40]

class ProjectRenderer extends Highway.Renderer {
    onLeaveCompleted() {}

    onEnterCompleted() {
        const videos = this.wrap.querySelectorAll('.js-video')
        Videos.bindAll(videos)
        Videos.resizeAll(videos)
        Images.lazyload()

        FontLoader.load('Canela').then(() => {
            this.bindCover()
            this.raf = RafManager.addQueue(this.onRender.bind(this))
        })
    }

    bindCover() {
        this.$cover = this.wrap.querySelector('.js-cover')

        if (!this.$cover) {
            return false
        }

        const box = this.$cover.getBoundingClientRect()
        this.coverBox = {
            top: box.top - store.windowHeight,
            bottom: box.top + box.height,
        }

        const observer = new IntersectionObserver((changes) => {
            const [{ isIntersecting }] = changes
            this.coverIsIntersecting = isIntersecting
        })

        observer.observe(this.$cover)
        this.$cover.style.transform = `translateY(${PARALLAX[0]}vh)`
    }

    onRender() {
        if (this.coverIsIntersecting) {
            const progress = range(store.scroll, this.coverBox.top, this.coverBox.bottom) * 0.01
            const y = lerp(PARALLAX[0], PARALLAX[1], progress)
            this.$cover.style.transform = `translateY(${y}vh)`
        }
    }
}

export default ProjectRenderer

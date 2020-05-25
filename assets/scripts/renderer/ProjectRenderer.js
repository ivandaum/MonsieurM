import Highway from '@dogstudio/highway'
import Images from '../binders/Images'
import Videos from '../binders/Videos'
import RafManager from '../utils/RafManager'
import store from '../utils/store'
import FontLoader from '../utils/FontLoader'

import { lerp, range } from '../functions/object'

const PARALLAX = [-35, 35]

class ProjectRenderer extends Highway.Renderer {
    onLeaveCompleted() {
        if (this.coverResizeFuncId) {
            store.removeOnResize(this.coverResizeFuncId)
        }
    }

    onEnterCompleted() {
        this.$cover = this.wrap.querySelector('.js-cover')
        const videos = this.wrap.querySelectorAll('.js-video')

        Videos.bindAll(videos)
        Videos.resizeAll(videos)
        Images.lazyload()

        this.raf = RafManager.addQueue(this.onRender.bind(this))

        FontLoader.load('Canela').then(() => {
            if (this.$cover) {
                this.bindCover()
                this.coverResizeFuncId = store.addOnResize(this.getCoverBox.bind(this))
            }
        })
    }

    getCoverBox() {
        const box = this.$cover.getBoundingClientRect()
        this.coverBox = {
            top: box.top - store.windowHeight,
            bottom: box.top + box.height,
        }

        this.$cover.style.transform = `translateY(${PARALLAX[0]}vh)`
    }

    bindCover() {
        this.getCoverBox()

        const observer = new IntersectionObserver((changes) => {
            const [{ isIntersecting }] = changes
            this.coverIsIntersecting = isIntersecting
        })

        observer.observe(this.$cover)
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

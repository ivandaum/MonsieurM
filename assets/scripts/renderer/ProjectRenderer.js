import Highway from '@dogstudio/highway'
import Images from '../binders/Images'
import Videos from '../binders/Videos'
import RafManager from '../utils/RafManager'
import store from '../utils/store'
import ScrollManager from '../utils/ScrollManager'
import ResizeManager from '../utils/ResizeManager'

import { lerp, range } from '../functions/object'

class ProjectRenderer extends Highway.Renderer {
    onLeave() {
        this.raf.map((raf) => RafManager.removeQueue(raf))
        ResizeManager.removeQueue(this.resizeIndex)
    }

    onEnterCompleted() {
        this.raf = []
        this.$header = this.wrap.querySelector('.js-project-header')

        const videos = this.wrap.querySelectorAll('.js-video')

        Videos.bindAll(videos)
        Videos.resizeAll(videos)
        this.resizeIndex = ResizeManager.addQueue(() => Videos.resizeAll(videos))

        Images.lazyload()
        this.bindCover()
    }

    bindCover() {
        const $el = this.wrap.querySelector('.js-project-cover')
        if (!$el) {
            return false
        }

        const $img = $el.querySelector('.js-project-cover picture')
        if (!$img) {
            return false
        }

        this.cover = {
            $el,
            $img,
            heigth: $el.offsetHeight,
            top: this.$header.offsetHeight - store.windowHeight,
            bottom: this.$header.offsetHeight + $el.offsetHeight,
            canRender: false,
            PARALLAX_COVER: store.windowHeight * 0.4,
        }

        const observer = new IntersectionObserver((changes) => {
            const [{ isIntersecting }] = changes
            this.cover.canRender = isIntersecting
        })

        observer.observe(this.cover.$el)

        this.raf.push(RafManager.addQueue(this.renderCover.bind(this)))
    }

    renderCover() {
        if (this.cover.canRender) {
            const progress = range(ScrollManager.scrollEased, this.cover.top, this.cover.bottom) * 0.01
            const y = lerp(-this.cover.PARALLAX_COVER, this.cover.PARALLAX_COVER, progress)

            this.cover.$img.style.transform = `translate3d(0, ${y}px, 0)`
        }
    }
}

export default ProjectRenderer

import Highway from '@dogstudio/highway'

import Images from '../binders/Images'
import Videos from '../binders/Videos'

import store from '../utils/store'
import RafManager from '../utils/RafManager'
import ResizeManager from '../utils/ResizeManager'

import Parallax from '../animations/Parallax'

class ProjectRenderer extends Highway.Renderer {
    onLeave() {
        this.raf.map((raf) => RafManager.removeQueue(raf))
        ResizeManager.removeQueue(this.resizeIndex)
        Images.lazy.destroy()
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

        const parallax = store.windowHeight * 0.4

        this.cover = {
            $el,
            $img,
            top: this.$header.offsetHeight - store.windowHeight,
            bottom: this.$header.offsetHeight + $el.offsetHeight,
            canRender: false,
            parallax: [-parallax, parallax],
        }

        const observer = new IntersectionObserver((changes) => {
            const [{ isIntersecting }] = changes
            this.cover.canRender = isIntersecting
        })

        observer.observe(this.cover.$el)

        this.raf.push(RafManager.addQueue(() => Parallax.block(this.cover)))
    }
}

export default ProjectRenderer

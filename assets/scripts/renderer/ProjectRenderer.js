import Highway from '@dogstudio/highway'
import Images from '../binders/Images'
import Videos from '../binders/Videos'
import RafManager from '../utils/RafManager'
import store from '../utils/store'
import FontLoader from '../utils/FontLoader'
import ScrollManager from '../utils/ScrollManager'
import ResizeManager from '../utils/ResizeManager'

// import { lerp, range } from '../functions/object'

class ProjectRenderer extends Highway.Renderer {
    onLeaveCompleted() {
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
        FontLoader.default(() => {
            // this.bindCover()
            // if (this.coverBox.$el) {
            //     this.raf.push(RafManager.addQueue(this.renderCover.bind(this)))
            // }
        })
    }

    bindCover() {
        this.coverBox = {
            $el: this.wrap.querySelector('.js-project-cover picture'),
            top: this.$header.offsetHeight - store.windowHeight,
            bottom: this.$header.offsetHeight + store.windowHeight,
            parallax: store.windowHeight * 0.4,
        }

        const observer = new IntersectionObserver((changes) => {
            const [{ isIntersecting }] = changes
            this.coverBox.isVisible = isIntersecting
        })

        observer.observe(this.coverBox.$el)
    }

    renderCover() {
        const cover = this.coverBox

        if (cover.isVisible) {
            // const progress = range(ScrollManager.scroll, cover.top, cover.bottom) * 0.01
            // const y = lerp(-cover.parallax, cover.parallax, progress)

            const y = ScrollManager.scroll - cover.top - store.windowHeight
            cover.$el.style.transform = `translateY(${y}px)`
        }
    }
}

export default ProjectRenderer

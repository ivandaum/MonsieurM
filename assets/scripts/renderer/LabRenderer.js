import Highway from '@dogstudio/highway'

import Videos from '../binders/Videos'
import Images from '../binders/Images'

import store from '../utils/store'
import ResizeManager from '../utils/ResizeManager'
import ScrollManager from '../utils/ScrollManager'
import RafManager from '../utils/RafManager'

class LabRenderer extends Highway.Renderer {
    onLeave() {
        this.raf.map((raf) => RafManager.removeQueue(raf))
        ResizeManager.removeQueue(this.resizeIndex)
    }

    onEnterCompleted() {
        this.raf = []
        const $view = this.wrap
        const videos = $view.querySelectorAll('.js-video')
        Videos.bindAll(videos)
        Videos.resizeAll(videos)
        this.resizeIndex = ResizeManager.addQueue(() => Videos.resizeAll(videos))
        Images.lazyload()

        this.bindHeader()
        this.raf.push(RafManager.addQueue(this.renderHeader.bind(this)))
    }

    bindHeader() {
        const $view = this.wrap
        const $el = $view.querySelector('.js-lab-header')

        this.header = {
            $el,
            canRender: false,
            height: $el.offsetHeight,
        }

        const observer = new IntersectionObserver((changes) => {
            const [{ isIntersecting }] = changes
            this.header.canRender = isIntersecting
        })
        observer.observe($el)
    }

    renderHeader() {
        if (!this.header.canRender) return false
        const y = ScrollManager.scrollEased * 0.2
        this.header.$el.style.transform = `translateY(${y}px)`

        const opacity = 1 - (ScrollManager.scrollEased - store.windowHeight * 0.25) / this.header.height
        this.header.$el.style.opacity = opacity
    }
}

export default LabRenderer

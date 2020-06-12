import Highway from '@dogstudio/highway'

import Videos from '../binders/Videos'
import Images from '../binders/Images'

import store from '../utils/store'
import ResizeManager from '../utils/ResizeManager'
import RafManager from '../utils/RafManager'

import Parallax from '../animations/Parallax'

class LabRenderer extends Highway.Renderer {
    onLeave() {
        this.raf.map((raf) => RafManager.removeQueue(raf))
        ResizeManager.removeQueue(this.resizeIndex)
    }

    onEnterCompleted() {
        this.raf = []
        this.medias = []

        const videos = this.wrap.querySelectorAll('.js-video')
        Videos.bindAll(videos)
        Videos.resizeAll(videos)
        this.resizeIndex = ResizeManager.addQueue(() => Videos.resizeAll(videos))
        Images.lazyload()

        this.bindHeader()
    }

    bindHeader() {
        const $el = this.wrap.querySelector('.js-lab-header')

        this.header = {
            $el,
            $strongs: $el.querySelectorAll('strong'),
            $spans: $el.querySelectorAll('span'),
            canRender: false,
            height: $el.offsetHeight,
            offset: [0, -store.windowHeight * 0.25],
        }

        const observer = new IntersectionObserver((changes) => {
            const [{ isIntersecting }] = changes
            this.header.canRender = isIntersecting
        })

        observer.observe($el)
        this.raf.push(RafManager.addQueue(() => Parallax.header(this.header)))
    }
}

export default LabRenderer

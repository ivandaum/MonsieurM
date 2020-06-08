import Highway from '@dogstudio/highway'

import Videos from '../binders/Videos'
import Images from '../binders/Images'

import breakpoints from '../constants/breakpoints'

import store from '../utils/store'
import ScrollManager from '../utils/ScrollManager'
import ResizeManager from '../utils/ResizeManager'
import RafManager from '../utils/RafManager'

import Showreel from '../animations/Showreel'
import MaskPicture from '../animations/MaskPicture'

class HomeRenderer extends Highway.Renderer {
    onLeaveCompleted() {
        this.raf.map((raf) => RafManager.removeQueue(raf))
        ResizeManager.removeQueue(this.Showreel.resizeIndex)
        this.MaskPicture.raf.map((raf) => RafManager.removeQueue(raf))
        ResizeManager.removeQueue(this.MaskPicture.resizeIndex)
    }

    onEnterCompleted() {
        const $view = this.wrap

        const videos = $view.querySelectorAll('.js-video')
        Videos.bindAll($view.querySelectorAll('.js-last-project .js-video'))
        Videos.resizeAll(videos)

        ResizeManager.addQueue(() => Videos.resizeAll(videos))

        Images.lazyload()

        this.raf = []

        this.Showreel = new Showreel({ $view })
        this.MaskPicture = new MaskPicture({ $view })

        this.$aboutCircle = $view.querySelector('.js-about-circle')
        this.aboutRotate = 0

        if (store.windowWidth >= breakpoints.tablet) {
            this.raf.push(RafManager.addQueue(this.renderRotatingCircle.bind(this)))
        }
    }

    renderRotatingCircle() {
        this.aboutRotate += ScrollManager.spinY * 0.15

        if (this.aboutRotate < 0) {
            this.aboutRotate = 360
        } else if (this.aboutRotate > 360) {
            this.aboutRotate = 0
        }

        this.$aboutCircle.style.transform = `rotate(${this.aboutRotate}deg)`
    }
}

export default HomeRenderer

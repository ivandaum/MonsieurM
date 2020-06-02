import Highway from '@dogstudio/highway'

import Videos from '../binders/Videos'
import Images from '../binders/Images'

import breakpoints from '../constants/breakpoints'
import store from '../utils/store'
import ScrollManager from '../utils/ScrollManager'
import RafManager from '../utils/RafManager'

import Showreel from '../animations/Showreel'
import MaskPicture from '../animations/MaskPicture'

class HomeRenderer extends Highway.Renderer {
    onLeaveCompleted() {
        this.raf.map((raf) => RafManager.removeQueue(raf))
    }

    onEnterCompleted() {
        const $view = this.wrap

        Videos.bindAll($view.querySelectorAll('.js-last-project .js-video'))
        Videos.resizeAll($view.querySelectorAll('.js-video'))

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

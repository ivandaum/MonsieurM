import Highway from '@dogstudio/highway'
import Videos from '../binders/Videos'
import Images from '../binders/Images'

import breakpoints from '../constants/breakpoints'
import store from '../utils/store'
import ScrollManager from '../utils/ScrollManager'
import RafManager from '../utils/RafManager'

class HomeRenderer extends Highway.Renderer {
    onLeaveCompleted() {
        this.raf.map((raf) => RafManager.removeQueue(raf))
    }

    onEnterCompleted() {
        const $view = this.wrap

        this.raf = []
        this.rotate = 0

        this.$rotatingCircle = $view.querySelector('.js-circle-rotate')

        Images.lazyload()

        const videos = $view.querySelectorAll('.js-video')
        Videos.bindAll(videos)
        Videos.resizeAll(videos)

        if (store.windowWidth >= breakpoints.tablet) {
            this.raf.push(RafManager.addQueue(this.renderRotatingCircle.bind(this)))
        }
    }

    renderRotatingCircle() {
        this.rotate += ScrollManager.spinY * 0.3

        if (this.rotate < 0) {
            this.rotate = 360
        } else if (this.rotate > 360) {
            this.rotate = 0
        }

        this.$rotatingCircle.style.transform = `rotate(${this.rotate}deg)`
    }
}

export default HomeRenderer

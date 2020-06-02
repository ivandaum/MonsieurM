import Highway from '@dogstudio/highway'

import Videos from '../binders/Videos'
import Images from '../binders/Images'

import breakpoints from '../constants/breakpoints'
import store from '../utils/store'
import ScrollManager from '../utils/ScrollManager'
import RafManager from '../utils/RafManager'

import Showreel from '../animations/Showreel'

class HomeRenderer extends Highway.Renderer {
    onLeaveCompleted() {
        this.raf.map((raf) => RafManager.removeQueue(raf))
    }

    onEnterCompleted() {
        const $view = this.wrap

        Videos.bindAll($view.querySelectorAll('.js-last-project .js-video'))
        Videos.resizeAll($view.querySelectorAll('.js-video'))

        Images.lazyload()

        this.Showreel = new Showreel({ $view })
        this.raf = []

        this.$pic = $view.querySelector('.js-picture')
        this.$picCircle = $view.querySelector('.js-picture-circle')
        this.picPosition = [0, 0]
        this.picPositionEased = [0, 0]
        this.picTop = this.$pic.getBoundingClientRect().top

        this.$aboutCircle = $view.querySelector('.js-about-circle')
        this.aboutRotate = 0

        if (store.windowWidth >= breakpoints.tablet) {
            this.raf.push(RafManager.addQueue(this.renderRotatingCircle.bind(this)))
            this.raf.push(RafManager.addQueue(this.renderPicCircle.bind(this)))

            this.$pic.addEventListener('mousemove', (e) => (this.picPosition = [e.x, e.y - this.picTop]))
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

    renderPicCircle() {
        for (let i = 0; i < this.picPosition.length; i += 1) {
            this.picPositionEased[i] += (this.picPosition[i] - this.picPositionEased[i]) * 0.1
        }

        this.$picCircle.style.transform = `translate(${this.picPositionEased[0]}px,${this.picPositionEased[1]}px)`
    }
}

export default HomeRenderer

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
import Parallax from '../animations/Parallax'

class HomeRenderer extends Highway.Renderer {
    onLeave() {
        this.raf.map((raf) => RafManager.removeQueue(raf))
        this.MaskPicture.raf.map((raf) => RafManager.removeQueue(raf))
        ResizeManager.removeQueue(this.Showreel.resizeIndex)
        ResizeManager.removeQueue(this.MaskPicture.resizeIndex)
        ResizeManager.removeQueue(this.circleResizeIndex)
    }

    onEnterCompleted() {
        const $view = this.wrap
        this.raf = []
        this.$about = $view.querySelector('.js-about')

        const videos = $view.querySelectorAll('.js-video')
        Videos.bindAll($view.querySelectorAll('.js-last-project .js-video'))
        Videos.resizeAll(videos)
        ResizeManager.addQueue(() => Videos.resizeAll(videos))

        Images.lazyload()

        this.Showreel = new Showreel({ $view })
        this.MaskPicture = new MaskPicture({ $view })

        this.bindCircle()
        this.bindHeader()

        this.circleResizeIndex = ResizeManager.addQueue(() => this.bindCircle())
        this.circleResizeIndex = ResizeManager.addQueue(() => this.bindHeader())
    }

    bindCircle() {
        const $el = this.$about.querySelector('.js-about-circle')
        this.circle = {
            $el,
            $rotating: this.$about.querySelector('.js-about-circleRotating'),
            rotation: 0,
            y: 0,
            top: 0,
            canRender: false,
            offset: store.windowHeight - $el.offsetHeight - parseInt(window.getComputedStyle(this.$about).paddingLeft),
        }

        const observer = new IntersectionObserver((changes) => {
            const [{ isIntersecting }] = changes
            this.circle.canRender = isIntersecting
            if (this.circle.top === 0 && isIntersecting) {
                this.circle.top = this.$about.offsetTop
            }
        })
        observer.observe(this.$about)

        if (store.windowWidth >= breakpoints.tablet) {
            this.raf.push(RafManager.addQueue(this.renderCircle.bind(this)))
        }
    }

    bindHeader() {
        const $el = this.wrap.querySelector('.js-introduction-header')

        if ($el) {
            this.header = {
                $el,
                $strongs: $el.querySelectorAll('strong'),
                $spans: $el.querySelectorAll('span'),
                canRender: false,
                height: $el.offsetHeight,
            }

            const observer = new IntersectionObserver((changes) => {
                const [{ isIntersecting }] = changes
                this.header.canRender = isIntersecting
            })
            observer.observe($el)
            this.raf.push(RafManager.addQueue(() => Parallax.header(this.header)))
        }
    }

    renderCircle() {
        if (!this.circle.canRender) return false

        this.circle.y = ScrollManager.scrollEased - this.circle.top + this.circle.offset
        this.circle.rotation += ScrollManager.spinY * 0.15
        this.circle.rotation = this.circle.rotation < 0 ? 360 : this.circle.rotation
        this.circle.rotation = this.circle.rotation > 360 ? 0 : this.circle.rotation

        this.circle.$rotating.style.transform = `rotate(${this.circle.rotation}deg)`
        this.circle.$el.style.transform = `translate3d(0, ${this.circle.y}px, 0)`
    }
}

export default HomeRenderer

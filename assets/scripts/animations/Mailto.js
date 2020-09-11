import Videos from '../binders/Videos'
import { copyToClipboard } from './../functions/dom'
import ScrollManager from '../utils/ScrollManager'
import RafManager from '../utils/RafManager'

const CLASS_EMAIL_HOVER = 'email-is-hover'
const CLASS_MAILTO_INVERTED = 'mailto-color-inverted'

export default {
    labels: {
        hover: document.querySelector('.js-mailto-hover'),
        click: document.querySelector('.js-mailto-click'),
    },
    raf: [],

    update({ $view }) {
        this.raf.map((raf) => RafManager.removeQueue(raf))
        this.raf = []

        const $elements = $view.querySelectorAll('.js-mailto')
        const $mailtos = document.querySelectorAll('a[href*="mailto:"]')

        $mailtos.forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault()
                this.onClick(link)
            })
            link.addEventListener('mouseenter', () => this.onEnter(link))
            link.addEventListener('mouseleave', () => this.onLeave(link))
        })

        $elements.forEach((el) => {
            const trigger = el.querySelector('.js-mailto-trigger')
            const videoContainer = el.querySelector('.js-mailto-video')
            const video = el.querySelector('.js-mailto-video .js-video')
            const wording = el.querySelector('.js-mailto-wording')

            Videos.resizeVideo(video)
            trigger.addEventListener('mouseenter', () => this.toggleVideo({ el, video, wording }))
            trigger.addEventListener('mouseleave', () => this.toggleVideo({ el, video, wording }))

            if (video) {
                this.stickVideoWhenVisible({ el, video: videoContainer, wording })
            }
        })
    },

    stickVideoWhenVisible({ el, video, wording }) {
        const obj = {
            el,
            video,
            wording,
            canRender: false,
        }

        const observer = new IntersectionObserver((changes) => {
            const [{ isIntersecting }] = changes
            obj.canRender = isIntersecting
        })
        observer.observe(el)

        this.raf.push(
            RafManager.addQueue(() => {
                if (obj.canRender) {
                    const translate = `translate3d(0, ${ScrollManager.scrollEased}px, 1px)`
                    if (obj.video) obj.video.style.transform = translate
                    if (obj.wording) obj.wording.style.transform = translate
                }
            }),
        )
    },

    onClick(link) {
        copyToClipboard(link.href.replace('mailto:', ''))
        this.setLabelPosition(link)

        this.labels.hover.classList.remove('is-active')
        this.labels.click.classList.add('is-active')

        setTimeout(() => {
            this.labels.click.classList.remove('is-active')
        }, 1000)
    },

    onEnter(link) {
        this.setLabelPosition(link)
        this.labels.hover.classList.add('is-active')

        if (link.dataset.mailtoInverted) {
            document.body.classList.add(CLASS_MAILTO_INVERTED)
        } else {
            document.body.classList.remove(CLASS_MAILTO_INVERTED)
        }
    },

    onLeave() {
        this.labels.hover.classList.remove('is-active')
    },

    setLabelPosition(el) {
        const h = this.labels.hover.offsetHeight + 10
        const rect = el.getBoundingClientRect()
        const x = rect.x + rect.width * 0.45
        const y = rect.bottom - h - rect.height - 5 // <-- margin

        for (let state in this.labels) {
            this.labels[state].style.transform = `translate3d(${x}px, ${y}px, 1px)`
        }
    },

    toggleVideo({ el, video, wording }) {
        if (document.body.classList.contains(CLASS_EMAIL_HOVER)) {
            video.pause()
            document.body.classList.remove(CLASS_EMAIL_HOVER)
            el.classList.remove(CLASS_EMAIL_HOVER)
        } else {
            video.play()
            document.body.classList.add(CLASS_EMAIL_HOVER)
            el.classList.add(CLASS_EMAIL_HOVER)
        }

        video.style.opacity = !document.body.classList.contains(CLASS_EMAIL_HOVER)
        wording.style.opacity = !document.body.classList.contains(CLASS_EMAIL_HOVER)
    },
}

// RafManager.addQueue(Mailto.setLabelY())

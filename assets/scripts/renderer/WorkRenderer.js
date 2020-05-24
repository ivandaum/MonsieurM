import Highway from '@dogstudio/highway'
import Lazyloading from '../vendor/Lazyloading'
import store from '../utils/store'

class WorkRenderer extends Highway.Renderer {
    onLeaveCompleted() {}

    onEnterCompleted() {
        store.unlockDOM()
        const $view = this.wrap
        this.Lazyloading = new Lazyloading({
            load_delay: 0,
            elements_selector: 'img',
            use_native: false,
        })

        this.wrap.style.pointerEvents = 'auto'
        this.$links = $view.querySelectorAll('.js-project-link')
        this.$fades = $view.querySelectorAll('.js-fade-item')
        this.$galeries = $view.querySelectorAll('.js-project-galery')

        this.galeryIndex = 0
        this.galery = []

        this.$links.forEach((btn) => {
            const id = parseInt(btn.dataset.project)
            btn.addEventListener('click', () => this.disablePageBut(id))
            btn.addEventListener('mouseenter', () => this.hideAllBut(id))
            btn.addEventListener('mouseleave', () => this.showAll())
            btn.addEventListener('mousemove', (e) => this.browseGalery(e))
        })
    }

    browseGalery() {
        if (!this.galery.length) return false

        this.galeryIndex += 0.03
        if (this.galeryIndex >= this.galery.length) this.galeryIndex = 0

        this.galery.forEach((img, i) => {
            img.style.opacity = i === Math.floor(this.galeryIndex) ? 1 : 0
        })
    }

    hideAllBut(id) {
        if (this.hasClick) return false

        this.$fades.forEach((item) => {
            item.style.opacity = parseInt(item.dataset.project) === id ? 1 : 0
        })

        this.galeryIndex = 0
        this.$galeries.forEach((galery) => {
            const isActive = parseInt(galery.dataset.project) === id

            if (isActive) {
                this.galery = galery.querySelectorAll('picture')
            }

            galery.style.opacity = isActive ? 1 : 0
        })
    }

    showAll() {
        if (this.hasClick) return false

        this.$fades.forEach((item) => {
            item.style.opacity = 1
        })

        this.$galeries.forEach((galery) => {
            galery.style.opacity = 0
        })
    }

    disablePageBut(id) {
        this.hideAllBut(id)
        this.$galeries.forEach((galery) => {
            galery.style.opacity = 0
        })

        this.hasClick = true
        this.wrap.style.pointerEvents = 'none'
    }
}

export default WorkRenderer

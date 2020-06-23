import anime from 'animejs'

const easing = 'easeInOutExpo'
const duration = 1500

class Nav {
    constructor() {
        this.menuIsOpen = false
        this.$container = document.querySelector('.js-navbar')
        this.$loader = document.querySelector('.js-navbar-loader')
        this.$items = this.$container.querySelectorAll('.js-navbar-item')
        this.loaderInterval = null
    }

    bindActiveLink({ color }) {
        this.$items.forEach((item) => {
            item.style.color = ''
            if (item.href === window.location.href) {
                item.classList.add('is-active')
            } else {
                item.classList.remove('is-active')
            }
        })

        if (color) {
            this.$items[this.$items.length - 1].style.color = color
        }
    }

    show() {
        anime({
            targets: this.$container.querySelectorAll('li'),
            duration,
            easing,
            opacity: [0, 1],
            delay: anime.stagger(250),
        })
    }

    updateLoader({ color, firstLoading }) {
        if (!firstLoading) {
            this.$loader.classList.add('is-loading')
        }

        if (color) {
            this.$loader.style.backgroundColor = color
        }
    }

    hideLoader({ color }) {
        if (color) {
            setTimeout(() => (this.$loader.style.backgroundColor = color), 500)
        }

        this.$loader.classList.remove('is-loading')
        this.$loader.classList.add('is-over-loading')
        setTimeout(() => {
            this.$loader.classList.remove('is-over-loading')
        }, 1000)
    }
}

export default new Nav()

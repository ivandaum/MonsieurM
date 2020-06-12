import anime from 'animejs'

const easing = 'easeInOutExpo'
const duration = 1500

class Nav {
    constructor() {
        this.menuIsOpen = false
        this.$container = document.querySelector('.js-navbar')
        this.$items = this.$container.querySelectorAll('.js-navbar-item')
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
            targets: this.$items,
            duration,
            easing,
            opacity: [0, 1],
            delay: anime.stagger(250),
        })
    }
}

export default new Nav()

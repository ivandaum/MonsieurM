import anime from 'animejs'

class NavbarAnimation {
    constructor() {
        this.menuIsOpen = false
        this.$container = document.querySelector('.js-navbar')
        this.$items = this.$container.querySelectorAll('.js-navbar-item')
        this.$burger = this.$container.querySelector('.js-burger-button')
        this.$menu = this.$container.querySelector('.js-burger-menu')

        this.$burger.addEventListener('click', this.toggleBurger.bind(this))
        this.$items.forEach((item) =>
            item.addEventListener('click', () => {
                if (this.menuIsOpen) {
                    this.toggleBurger()
                }
            }),
        )

        this.height = document.querySelector('.js-navbar').offsetHeight

        const animation = this.init()
        setTimeout(() => {
            // this.$container.classList.remove('borderless')
            animation.play()
        }, 500)
    }

    init() {
        // this.$container.classList.add('borderless')
        const targets = this.$container.querySelectorAll('.js-navbar-fade')

        return anime({
            targets,
            duration: 1000,
            easing: 'easeInOutQuart',
            opacity: {
                value: [0, 1],
                delay: 50,
            },
            translateY: ['-2rem', '0'],
            autoplay: false,
            delay: anime.stagger(20),
        })
    }

    toggleBurger() {
        if (!this.menuIsOpen) {
            this.$burger.classList.add('is-active')
            this.$menu.classList.add('is-active')
            this.menuIsOpen = true
        } else {
            this.$burger.classList.remove('is-active')
            this.$menu.classList.remove('is-active')
            this.menuIsOpen = false
        }
    }
}

const Navbar = new NavbarAnimation()
export default Navbar

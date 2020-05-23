class Nav {
    constructor() {
        this.menuIsOpen = false
        this.$container = document.querySelector('.js-navbar')
        this.$items = this.$container.querySelectorAll('.js-navbar-item')
    }

    bindActiveLink() {
        this.$items.forEach((item) => {
            if (item.href === window.location.href) {
                item.classList.add('is-active')
            } else {
                item.classList.remove('is-active')
            }
        })
    }
}

export default new Nav()

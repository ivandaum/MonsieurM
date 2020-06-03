import Lazyloading from '../vendor/Lazyloading'

const Images = {
    lazyload: () => {
        Images.lazy = new Lazyloading({
            load_delay: 0,
            elements_selector: 'img:not(.ignore-lazy)',
            use_native: false,
            callback_loaded: (el) => {
                el.parentNode.classList.add('loaded')
            },
        })
    },
}

export default Images

import Lazyloading from '../vendor/Lazyloading'

const Images = {
    lazyload: () => {
        Images.lazy = new Lazyloading({
            load_delay: 10,
            elements_selector: 'img',
            use_native: false,
            callback_loaded: (el) => {
                el.parentNode.classList.add('loaded')
            },
        })
    },
}

export default Images

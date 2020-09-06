import { range } from './object'
import store from '../utils/store'

// import breakpoints from '../utils/breakpoints'
// import store from '../utils/store'

export const getScrollTop = () =>
    document.body.scrollTop ||
    window.scrollY ||
    window.scrollTop ||
    window.pageYOffset ||
    document.getElementsByTagName('html')[0].scrollTop

export const getOffsetTop = ($element) => {
    const bodyRect = document.body.getBoundingClientRect()
    const elemRect = $element.getBoundingClientRect()
    return elemRect.top - bodyRect.top
}

export const scrolledInViewport = ($target, callback) => {
    const observer = new IntersectionObserver(
        (changes) => {
            const [{ isIntersecting, boundingClientRect }] = changes
            const bottom = boundingClientRect.height
            const top = boundingClientRect.top
            const progress = range(top, store.windowHeight, -bottom) * 0.01

            callback({
                isIntersecting,
                progress,
            })
        },
        {
            threshold: Array.from(Array(101), (x, index) => Number(((1 / 100) * index).toFixed(2))),
        },
    )
    observer.observe($target)
}

export const observeVisibility = ($target, callback) => {
    const observer = new IntersectionObserver(
        (changes) => {
            const [{ intersectionRatio }] = changes
            const ratio = $target.offsetHeight / window.innerHeight
            const percent = ratio * intersectionRatio
            callback(percent)
        },
        {
            threshold: Array.from(Array(101), (x, index) => Number(((1 / 100) * index).toFixed(2))),
        },
    )
    observer.observe($target)
}

export const copyToClipboard = (str) => {
    const el = document.createElement('textarea')
    el.value = str
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    if (selected) {
        document.getSelection().removeAllRanges()
        document.getSelection().addRange(selected)
    }
}

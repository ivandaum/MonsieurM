import anime from 'animejs'
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

/**
 * NOTE : function is using animejs
 */
export const scrollTo = ({ y, complete }) => {
    const easing = 'easeInOutExpo'
    const duration = 2000
    const targets = { y: getScrollTop() }
    const container = window

    anime({
        targets,
        y,
        duration,
        easing,
        update: () => {
            container.scrollTo(0, targets.y)
        },
        complete,
    })
}

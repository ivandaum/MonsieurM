export default {
    in({ $view }) {
        const $els = $view.querySelectorAll('.js-fadein')

        $els.forEach(($el) => {
            const observer = new IntersectionObserver((changes) => {
                const [{ isIntersecting }] = changes
                $el.style.opacity = isIntersecting ? 1 : 0
            })
            observer.observe($el)
        })
    },
}

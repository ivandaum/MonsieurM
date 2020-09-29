const RATIO = 16 / 9
const Videos = {
    bindAll: (videos) => {
        videos.forEach((video) => Videos.bindVideo(video))
    },

    resizeAll: (videos) => {
        videos.forEach((video) => Videos.resizeVideo(video))
    },

    bindVideo: (video) => {
        // video.addEventListener('loadeddata', () => (video.readyState >= 3 ? (video.dataset.src = '') : null))
        const observer = new IntersectionObserver((changes) => {
            const [{ isIntersecting }] = changes
            if (isIntersecting) {
                // if (video.dataset.src) video.src = video.dataset.src
                video.play()
            } else {
                // if (video.dataset.src) video.src = ''
                video.pause()
            }
        })
        observer.observe(video)
    },

    resizeVideo: (video) => {
        if (!video) return false

        const parentHeight = video.parentNode.offsetHeight
        const parentWidth = video.parentNode.offsetWidth || window.getComputedStyle(video.parentNode).width

        const r = parseFloat(video.dataset.ratio) || RATIO
        let height = Math.floor(parentWidth * r)

        const fitHeight = video.classList.contains('fit-height')

        if (!fitHeight) {
            video.style.width = parentWidth + 'px'
            video.style.height = height + 'px'
        } else {
            let width = Math.floor(parentHeight / r)
            height = parentHeight

            if (width > parentWidth) {
                height = parentHeight * (parentWidth / width)
                width = parentWidth
            }

            video.style.width = width + 'px'
            video.style.height = height + 'px'
        }
    },
}

export default Videos

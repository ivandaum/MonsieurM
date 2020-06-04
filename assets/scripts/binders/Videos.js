const RATIO = 16 / 9
const Videos = {
    bindAll: (videos) => {
        videos.forEach((video) => Videos.bindVideo(video))
    },

    resizeAll: (videos) => {
        videos.forEach((video) => Videos.resizeVideo(video))
    },

    bindVideo: (video) => {
        const observer = new IntersectionObserver((changes) => {
            const [{ isIntersecting }] = changes
            if (isIntersecting) {
                video.play()
            } else {
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
        const height = parentWidth * r

        if (height <= parentHeight || parentHeight === 0) {
            video.style.width = parentWidth + 'px'
            video.style.height = height + 'px'
        } else {
            video.style.width = parentHeight / r + 'px'
            video.style.height = parentHeight + 'px'
        }
    },
}

export default Videos

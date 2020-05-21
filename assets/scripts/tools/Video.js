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
        const width = video.parentNode.offsetWidth
        const r = parseFloat(video.dataset.ratio) || RATIO
        video.width = width + 'px'
        video.height = width * r + 'px'
    },
}

export default Videos

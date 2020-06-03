import Videos from '../binders/Videos'

const CLASS_EMAIL_HOVER = 'email-is-hover'
export default {
    isHover: false,
    update() {
        this.$el = document.querySelector('.js-footer')
        this.$video = this.$el.querySelector('.js-video')
        this.$email = this.$el.querySelector('a')

        Videos.resizeVideo(this.$video)

        this.$email.addEventListener('mouseenter', this.toggleVideo.bind(this))
        this.$email.addEventListener('mouseleave', this.toggleVideo.bind(this))
    },

    toggleVideo() {
        if (this.isHover) {
            document.body.classList.remove(CLASS_EMAIL_HOVER)
            this.isHover = false
            this.$video.pause()
        } else {
            document.body.classList.add(CLASS_EMAIL_HOVER)
            this.isHover = true
            this.$video.play()
        }
    },
}

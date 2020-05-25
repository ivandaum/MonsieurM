export default {
    load(fontName) {
        this.CUSTOM_FONT = fontName
        return this.loadFont()
    },

    loadFont() {
        return new window.Promise((resolve) => {
            this.raf = setInterval(() => {
                if (document.fonts.check('1rem ' + this.CUSTOM_FONT)) {
                    clearInterval(this.raf)
                    this.raf = null
                    resolve()
                }
            }, 50)
        })
    },
}

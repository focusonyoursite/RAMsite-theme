Alpine.data('dynamicBackground', () => ({
    hue: 200,
    saturation: 70,
    lightness: 60,
    
    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = scrolled / maxScroll;
            
            // Verander kleuren gebaseerd op scroll positie
            this.hue = 200 + (scrollProgress * 160);
            this.saturation = 70 + (scrollProgress * 30);
            this.lightness = 60 - (scrollProgress * 20);
            
            this.$el.style.background = `linear-gradient(45deg, 
                hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%),
                hsl(${this.hue + 60}, ${this.saturation}%, ${this.lightness}%))`;
        });
    }
})); 
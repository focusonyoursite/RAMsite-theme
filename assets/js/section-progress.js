Alpine.data('sectionProgress', () => ({
    progress: 0,
    
    init() {
        window.addEventListener('scroll', () => {
            const section = this.$el;
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Bereken voortgang alleen als sectie in beeld is
            if (rect.top < windowHeight && rect.bottom > 0) {
                const total = rect.height + windowHeight;
                const current = windowHeight - rect.top;
                this.progress = Math.min(Math.max(current / total * 100, 0), 100);
            }
        });
    }
})); 
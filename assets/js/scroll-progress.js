Alpine.data('sectionProgress', () => ({
    progress: 0,
    inView: false,
    
    init() {
        const observer = new IntersectionObserver(
            ([entry]) => {
                this.inView = entry.isIntersecting;
                if (this.inView) this.calculateProgress();
            },
            { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] }
        );
        
        observer.observe(this.$el);
        
        window.addEventListener('scroll', () => {
            if (this.inView) this.calculateProgress();
        });
    },
    
    calculateProgress() {
        const rect = this.$el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const visibleHeight = Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top);
        const totalHeight = Math.min(windowHeight, rect.height);
        this.progress = (visibleHeight / totalHeight) * 100;
    }
})); 
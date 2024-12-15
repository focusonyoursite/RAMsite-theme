Alpine.data('revealEffects', () => ({
    elements: new Map(),
    
    init() {
        // Verzamel alle reveal elementen
        this.$el.querySelectorAll('[data-reveal]').forEach(el => {
            const options = {
                animation: el.dataset.reveal || 'fade-up',
                delay: parseInt(el.dataset.revealDelay) || 0,
                duration: parseInt(el.dataset.revealDuration) || 800,
                stagger: parseInt(el.dataset.revealStagger) || 0,
                threshold: parseFloat(el.dataset.revealThreshold) || 0.2,
                once: el.dataset.revealOnce !== 'false'
            };
            
            this.elements.set(el, { options, revealed: false });
        });
        
        // Setup Intersection Observer
        const observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] }
        );
        
        // Start observing elements
        this.elements.forEach((config, el) => observer.observe(el));
    },
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            const el = entry.target;
            const config = this.elements.get(el);
            
            if (entry.isIntersecting && (!config.revealed || !config.options.once)) {
                this.revealElement(el, config.options);
                config.revealed = true;
            }
        });
    },
    
    revealElement(el, options) {
        // Apply stagger to children if needed
        if (options.stagger && el.children.length) {
            Array.from(el.children).forEach((child, index) => {
                setTimeout(() => {
                    this.animate(child, options.animation);
                }, index * options.stagger);
            });
        } else {
            this.animate(el, options.animation);
        }
    },
    
    animate(el, animation) {
        el.style.animation = `${animation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards`;
    }
})); 
Alpine.data('scrollTrigger', () => ({
    elements: new Map(),
    
    init() {
        // Verzamel alle animeerbare elementen
        document.querySelectorAll('[data-scroll]').forEach(el => {
            this.elements.set(el, {
                animation: el.dataset.scroll,
                triggered: false
            });
        });
        
        // Observeer elementen
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        const config = this.elements.get(el);
                        
                        if (!config.triggered) {
                            this.triggerAnimation(el, config.animation);
                            config.triggered = true;
                        }
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: '0px'
            }
        );
        
        // Start observatie
        this.elements.forEach((config, el) => observer.observe(el));
    },
    
    triggerAnimation(el, animation) {
        switch (animation) {
            case 'fade-up':
                el.style.animation = 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards';
                break;
            case 'fade-in':
                el.style.animation = 'fadeIn 0.6s ease-out forwards';
                break;
            case 'slide-left':
                el.style.animation = 'slideLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards';
                break;
            case 'slide-right':
                el.style.animation = 'slideRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards';
                break;
            case 'scale-up':
                el.style.animation = 'scaleUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards';
                break;
        }
    }
})); 
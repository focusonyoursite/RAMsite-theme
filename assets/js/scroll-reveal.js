Alpine.data('scrollReveal', () => ({
    reveals: new Map(),
    
    init() {
        // Verzamel alle reveal elementen
        this.$el.querySelectorAll('[data-reveal]').forEach(el => {
            const options = {
                animation: el.dataset.reveal || 'fade-up',
                delay: parseInt(el.dataset.revealDelay) || 0,
                duration: parseInt(el.dataset.revealDuration) || 800,
                stagger: parseInt(el.dataset.revealStagger) || 0
            };
            
            if (el.children.length > 0 && options.stagger > 0) {
                // Stagger children animations
                Array.from(el.children).forEach((child, index) => {
                    window.animationManager.register(child, {
                        ...options,
                        delay: options.delay + (index * options.stagger)
                    });
                });
            } else {
                // Single element animation
                window.animationManager.register(el, options);
            }
        });
    }
})); 
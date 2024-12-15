Alpine.data('scrollAnimations', () => ({
    animations: {
        fadeUp: {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
        },
        fadeIn: {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: 'all 0.6s ease-out'
        },
        scaleUp: {
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
        },
        slideInLeft: {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
        },
        slideInRight: {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
        }
    },
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const animation = this.animations[el.dataset.animation];
                    
                    if (animation) {
                        el.style.transition = animation.transition;
                        Object.entries(animation.animate).forEach(([prop, value]) => {
                            if (prop === 'x' || prop === 'y') {
                                el.style.transform = `translate${prop.toUpperCase()}(${value}px)`;
                            } else {
                                el.style[prop] = value;
                            }
                        });
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px'
        });
        
        // Zoek alle elementen met data-animation attribuut
        document.querySelectorAll('[data-animation]').forEach(el => {
            const animation = this.animations[el.dataset.animation];
            if (animation) {
                // Set initial styles
                Object.entries(animation.initial).forEach(([prop, value]) => {
                    if (prop === 'x' || prop === 'y') {
                        el.style.transform = `translate${prop.toUpperCase()}(${value}px)`;
                    } else {
                        el.style[prop] = value;
                    }
                });
                observer.observe(el);
            }
        });
    }
})); 
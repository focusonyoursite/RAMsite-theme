class AnimationManager {
    constructor() {
        this.animations = new Map();
        this.observer = new IntersectionObserver(this.handleIntersection.bind(this), {
            threshold: 0.2,
            rootMargin: '50px'
        });
    }

    register(element, options = {}) {
        const defaults = {
            animation: 'fade-up',
            duration: 800,
            delay: 0,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            once: true
        };

        const config = { ...defaults, ...options };
        this.animations.set(element, { config, played: false });
        this.observer.observe(element);
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animation = this.animations.get(element);

                if (!animation.played || !animation.config.once) {
                    this.playAnimation(element, animation.config);
                    animation.played = true;
                }

                if (animation.config.once) {
                    this.observer.unobserve(element);
                }
            }
        });
    }

    playAnimation(element, config) {
        const keyframes = this.getKeyframes(config.animation);
        
        element.animate(keyframes, {
            duration: config.duration,
            delay: config.delay,
            easing: config.easing,
            fill: 'forwards'
        });
    }

    getKeyframes(animation) {
        const keyframes = {
            'fade-up': [
                { opacity: 0, transform: 'translateY(20px)' },
                { opacity: 1, transform: 'translateY(0)' }
            ],
            'fade-down': [
                { opacity: 0, transform: 'translateY(-20px)' },
                { opacity: 1, transform: 'translateY(0)' }
            ],
            'fade-left': [
                { opacity: 0, transform: 'translateX(-20px)' },
                { opacity: 1, transform: 'translateX(0)' }
            ],
            'fade-right': [
                { opacity: 0, transform: 'translateX(20px)' },
                { opacity: 1, transform: 'translateX(0)' }
            ],
            'zoom-in': [
                { opacity: 0, transform: 'scale(0.95)' },
                { opacity: 1, transform: 'scale(1)' }
            ],
            'zoom-out': [
                { opacity: 0, transform: 'scale(1.05)' },
                { opacity: 1, transform: 'scale(1)' }
            ]
        };

        return keyframes[animation];
    }
}

// Initialiseer en exporteer de animation manager
window.animationManager = new AnimationManager(); 
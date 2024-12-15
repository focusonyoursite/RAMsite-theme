Alpine.data('parallaxSystem', () => ({
    layers: [],
    
    init() {
        // Verzamel alle parallax layers
        this.layers = Array.from(this.$el.querySelectorAll('[data-parallax]')).map(el => ({
            element: el,
            depth: parseFloat(el.dataset.parallax) || 0.5,
            offset: 0
        }));
        
        // Update op scroll
        window.addEventListener('scroll', () => this.update());
        
        // Initial update
        this.update();
    },
    
    update() {
        const scrolled = window.pageYOffset;
        const viewportHeight = window.innerHeight;
        
        this.layers.forEach(layer => {
            const rect = layer.element.getBoundingClientRect();
            const inView = rect.top < viewportHeight && rect.bottom > 0;
            
            if (inView) {
                // Bereken parallax offset
                const scrollProgress = (rect.top + rect.height * 0.5 - viewportHeight * 0.5) / viewportHeight;
                layer.offset = scrollProgress * layer.depth * 100;
                
                // Pas transformatie toe
                layer.element.style.transform = `
                    translate3d(0, ${layer.offset}px, 0)
                    scale(${1 + Math.abs(layer.offset) * 0.001})
                `;
                
                // Voeg blur effect toe voor diepte
                const blur = Math.abs(layer.offset) * 0.05;
                layer.element.style.filter = `blur(${blur}px)`;
            }
        });
    }
})); 
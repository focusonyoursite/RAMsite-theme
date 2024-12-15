Alpine.data('parallaxEffects', () => ({
    layers: [],
    mouse: { x: 0, y: 0 },
    
    init() {
        // Setup parallax layers
        this.layers = Array.from(this.$el.querySelectorAll('[data-parallax]')).map(el => ({
            element: el,
            depth: parseFloat(el.dataset.parallax) || 0.5,
            mouseInfluence: parseFloat(el.dataset.mouseParallax) || 0
        }));
        
        // Mouse movement tracking
        document.addEventListener('mousemove', (e) => {
            this.mouse = {
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: (e.clientY / window.innerHeight) * 2 - 1
            };
            this.updateLayers();
        });
        
        // Scroll tracking
        window.addEventListener('scroll', () => this.updateLayers());
        
        // Initial update
        this.updateLayers();
    },
    
    updateLayers() {
        const scrolled = window.pageYOffset;
        
        this.layers.forEach(layer => {
            const { element, depth, mouseInfluence } = layer;
            
            // Scroll-based parallax
            const yOffset = scrolled * depth;
            
            // Mouse-based parallax
            const mouseX = this.mouse.x * mouseInfluence * 100;
            const mouseY = this.mouse.y * mouseInfluence * 100;
            
            // Apply transformations
            element.style.transform = `
                translate3d(${mouseX}px, ${yOffset + mouseY}px, 0)
                scale(${1 + Math.abs(depth) * 0.1})
            `;
        });
    }
})); 
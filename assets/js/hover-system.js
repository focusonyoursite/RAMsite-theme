Alpine.data('hoverSystem', () => ({
    items: new Map(),
    mouse: { x: 0, y: 0 },
    
    init() {
        // Verzamel alle hover items
        this.$el.querySelectorAll('[data-hover]').forEach(el => {
            const rect = el.getBoundingClientRect();
            this.items.set(el, {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
                width: rect.width,
                height: rect.height,
                rotation: 0,
                scale: 1,
                intensity: parseFloat(el.dataset.hoverIntensity) || 1
            });
        });
        
        // Update mouse position
        document.addEventListener('mousemove', (e) => {
            this.mouse = { x: e.clientX, y: e.clientY };
            this.updateItems();
        });
        
        // Update item positions on scroll/resize
        ['scroll', 'resize'].forEach(event => {
            window.addEventListener(event, () => {
                this.items.forEach((config, el) => {
                    const rect = el.getBoundingClientRect();
                    config.x = rect.left + rect.width / 2;
                    config.y = rect.top + rect.height / 2;
                });
                this.updateItems();
            });
        });
    },
    
    updateItems() {
        this.items.forEach((config, el) => {
            const dx = this.mouse.x - config.x;
            const dy = this.mouse.y - config.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 400; // Maximale afstand voor effect
            
            if (distance < maxDistance) {
                // Bereken intensiteit gebaseerd op afstand
                const intensity = (1 - distance / maxDistance) * config.intensity;
                
                // Bereken transformaties
                const rotation = Math.atan2(dy, dx) * 180 / Math.PI * 0.1;
                const scale = 1 + intensity * 0.1;
                const translateX = dx * intensity * 0.1;
                const translateY = dy * intensity * 0.1;
                
                // Pas transformaties toe met vloeiende overgang
                el.style.transform = `
                    translate(${translateX}px, ${translateY}px)
                    rotate(${rotation}deg)
                    scale(${scale})
                `;
                
                // Pas glow effect toe
                el.style.boxShadow = `
                    0 0 ${intensity * 30}px ${intensity * 10}px 
                    rgba(var(--color-primary-500), ${intensity * 0.3})
                `;
            } else {
                // Reset stijlen
                el.style.transform = '';
                el.style.boxShadow = '';
            }
        });
    }
})); 
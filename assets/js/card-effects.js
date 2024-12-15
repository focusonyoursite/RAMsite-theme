Alpine.data('card3D', () => ({
    rotateX: 0,
    rotateY: 0,
    glowX: 50,
    glowY: 50,
    
    init() {
        this.$el.addEventListener('mousemove', (e) => {
            const rect = this.$el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Bereken rotatie
            this.rotateX = (e.clientY - centerY) / 10;
            this.rotateY = -(e.clientX - centerX) / 10;
            
            // Bereken glow positie
            this.glowX = ((e.clientX - rect.left) / rect.width) * 100;
            this.glowY = ((e.clientY - rect.top) / rect.height) * 100;
            
            // Update stijlen
            this.$el.style.transform = `
                perspective(1000px) 
                rotateX(${this.rotateX}deg) 
                rotateY(${this.rotateY}deg)
                scale3d(1.05, 1.05, 1.05)
            `;
            
            // Update glow effect
            this.$el.style.background = `
                radial-gradient(
                    circle at ${this.glowX}% ${this.glowY}%, 
                    rgba(255, 255, 255, 0.2), 
                    transparent 50%
                )
            `;
        });
        
        this.$el.addEventListener('mouseleave', () => {
            this.$el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            this.$el.style.background = 'none';
        });
    }
})); 
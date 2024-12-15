Alpine.data('customCursor', () => ({
    x: 0,
    y: 0,
    size: 20,
    hovering: false,
    
    init() {
        // Verberg standaard cursor
        document.body.style.cursor = 'none';
        
        // Volg muis bewegingen
        document.addEventListener('mousemove', (e) => {
            this.x = e.clientX;
            this.y = e.clientY;
        });
        
        // Detecteer hover states
        document.querySelectorAll('a, button, [role="button"]').forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.hovering = true;
                this.size = 40;
            });
            
            el.addEventListener('mouseleave', () => {
                this.hovering = false;
                this.size = 20;
            });
        });
    }
})); 
Alpine.data('menuAnimations', () => ({
    activeIndex: null,
    
    init() {
        this.menuItems = this.$el.querySelectorAll('.menu-item');
        this.indicator = this.$el.querySelector('.menu-indicator');
        
        this.updateIndicator();
        this.setupHoverEffects();
    },
    
    updateIndicator(index = null) {
        if (!this.indicator) return;
        
        if (index !== null) {
            const item = this.menuItems[index];
            const rect = item.getBoundingClientRect();
            const parentRect = this.$el.getBoundingClientRect();
            
            this.indicator.style.transform = `
                translateX(${rect.left - parentRect.left}px)
                scaleX(${rect.width / 100})
            `;
        } else {
            this.indicator.style.transform = 'scaleX(0)';
        }
    },
    
    setupHoverEffects() {
        this.menuItems.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                this.activeIndex = index;
                this.updateIndicator(index);
                
                // Magnetic effect op menu items
                const handleMouseMove = (e) => {
                    const rect = item.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const deltaX = (x - centerX) * 0.1;
                    const deltaY = (y - centerY) * 0.1;
                    
                    item.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                };
                
                item.addEventListener('mousemove', handleMouseMove);
                item.addEventListener('mouseleave', () => {
                    item.style.transform = '';
                    item.removeEventListener('mousemove', handleMouseMove);
                }, { once: true });
            });
            
            item.addEventListener('mouseleave', () => {
                this.activeIndex = null;
                this.updateIndicator();
            });
        });
    }
})); 
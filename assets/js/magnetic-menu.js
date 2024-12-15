Alpine.data('magneticMenu', () => ({
    items: [],
    
    init() {
        this.items = this.$el.querySelectorAll('.menu-item');
        
        this.items.forEach(item => {
            const text = item.querySelector('.menu-text');
            
            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = (x - centerX) * 0.1;
                const deltaY = (y - centerY) * 0.1;
                
                text.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                item.style.transform = `translate(${deltaX * 0.05}px, ${deltaY * 0.05}px)`;
            });
            
            item.addEventListener('mouseleave', () => {
                text.style.transform = 'translate(0, 0)';
                item.style.transform = 'translate(0, 0)';
            });
        });
    }
})); 
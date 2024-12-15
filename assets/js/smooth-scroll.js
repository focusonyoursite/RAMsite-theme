Alpine.data('smoothScroll', () => ({
    scrollY: 0,
    targetY: 0,
    ease: 0.1,
    
    init() {
        // Maak een wrapper voor de content
        const content = document.querySelector('#content-wrapper');
        const height = content.getBoundingClientRect().height;
        document.body.style.height = `${height}px`;
        
        // Start animation loop
        this.animate();
        
        // Update target on scroll
        window.addEventListener('scroll', () => {
            this.targetY = window.scrollY;
        });
    },
    
    animate() {
        // Bereken nieuwe scroll positie
        const diff = this.targetY - this.scrollY;
        this.scrollY += diff * this.ease;
        
        // Pas transform toe op content
        const content = document.querySelector('#content-wrapper');
        content.style.transform = `translate3d(0, ${-this.scrollY}px, 0)`;
        
        // Loop animation
        requestAnimationFrame(() => this.animate());
    }
})); 
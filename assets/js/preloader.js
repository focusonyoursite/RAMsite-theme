Alpine.data('preloader', () => ({
    progress: 0,
    loaded: false,
    
    init() {
        // Simuleer laden van assets
        const total = 100;
        let current = 0;
        
        const increment = () => {
            current += Math.random() * 10;
            this.progress = Math.min(Math.round(current), 100);
            
            if (current < total) {
                setTimeout(increment, 100);
            } else {
                setTimeout(() => {
                    this.loaded = true;
                }, 500);
            }
        };
        
        increment();
    }
})); 
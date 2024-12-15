document.addEventListener('alpine:init', () => {
    Alpine.data('skillsAnimation', () => ({
        animatedPercentages: {},
        
        init() {
            // Initialize all percentages to 0
            document.querySelectorAll('[x-ref^="skill"]').forEach(el => {
                const id = el.getAttribute('x-ref');
                this.animatedPercentages[id] = 0;
            });
        },

        startAnimation(categoryId) {
            const skills = this.$el.querySelectorAll(`[data-category="${categoryId}"] [x-ref^="skill"]`);
            
            // Animate category entrance
            const categoryEl = this.$el.querySelector(`[data-category="${categoryId}"]`);
            if (categoryEl) {
                categoryEl.classList.add('animate-scale-up');
            }
            
            skills.forEach((skill, index) => {
                const id = skill.getAttribute('x-ref');
                const target = parseInt(skill.dataset.percentage);
                
                // Easing function for smooth animation
                const easeOutQuart = t => 1 - (--t) * t * t * t;
                
                // Animate the percentage counter
                const duration = 1500;
                const start = this.animatedPercentages[id];
                const range = target - start;
                
                let startTime = null;
                
                const animate = timestamp => {
                    if (!startTime) startTime = timestamp;
                    const progress = (timestamp - startTime) / duration;
                    
                    if (progress < 1) {
                        const eased = easeOutQuart(progress);
                        this.animatedPercentages[id] = Math.round(start + (range * eased));
                        requestAnimationFrame(animate);
                    } else {
                        this.animatedPercentages[id] = target;
                    }
                };
                
                // Add delay based on index for cascade effect
                setTimeout(() => {
                    requestAnimationFrame(animate);
                }, index * 200);
            });

            // Animate the category icon
            const icon = this.$refs[`icon${categoryId}`];
            if (icon) {
                icon.classList.add('animate-bounce');
                setTimeout(() => {
                    icon.classList.remove('animate-bounce');
                }, 1000);
            }
        },

        resetAnimation(categoryId) {
            const skills = this.$el.querySelectorAll(`[data-category="${categoryId}"] [x-ref^="skill"]`);
            const categoryEl = this.$el.querySelector(`[data-category="${categoryId}"]`);
            
            if (categoryEl) {
                categoryEl.classList.remove('animate-scale-up');
            }
            
            skills.forEach(skill => {
                const id = skill.getAttribute('x-ref');
                this.animatedPercentages[id] = 0;
            });
        }
    }));
}); 
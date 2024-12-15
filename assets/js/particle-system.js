class Particle {
    constructor(canvas, x, y, color) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.02;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
        
        if (this.size > 0.2) this.size -= 0.1;
    }

    draw(ctx) {
        ctx.fillStyle = `hsla(${this.color}, 100%, 70%, ${this.life})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

Alpine.data('particleSystem', () => ({
    particles: [],
    ctx: null,
    canvas: null,
    mouse: { x: 0, y: 0 },
    hue: 200,
    
    init() {
        this.canvas = this.$el;
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        
        window.addEventListener('resize', () => this.resizeCanvas());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.addParticles(5);
        });
        
        this.animate();
    },
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    },
    
    addParticles(count) {
        for (let i = 0; i < count; i++) {
            this.particles.push(new Particle(
                this.canvas,
                this.mouse.x,
                this.mouse.y,
                this.hue
            ));
        }
        
        // Update hue for next particles
        this.hue = (this.hue + 1) % 360;
    },
    
    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            particle.update();
            particle.draw(this.ctx);
            
            if (particle.life <= 0) {
                this.particles.splice(index, 1);
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
})); 
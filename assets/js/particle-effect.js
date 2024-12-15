class Particle {
    constructor(canvas, x, y) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsla(${Math.random() * 60 + 200}, 100%, 70%, ${Math.random() * 0.3 + 0.1})`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.1;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

Alpine.data('particleEffect', () => ({
    particles: [],
    ctx: null,
    canvas: null,
    animationFrame: null,

    init() {
        this.canvas = this.$el;
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        this.animate();

        window.addEventListener('resize', () => this.resizeCanvas());
        this.canvas.addEventListener('mousemove', (e) => this.addParticles(e));
    },

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    },

    addParticles(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        for (let i = 0; i < 5; i++) {
            this.particles.push(new Particle(this.canvas, x, y));
        }
    },

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            particle.update();
            particle.draw(this.ctx);

            if (particle.size <= 0.2) {
                this.particles.splice(index, 1);
            }
        });

        this.animationFrame = requestAnimationFrame(() => this.animate());
    }
})); 
Alpine.data('waveEffect', () => ({
    points: [],
    mouse: { x: 0, y: 0 },
    count: 0,

    init() {
        const canvas = this.$el;
        const ctx = canvas.getContext('2d');
        const width = canvas.width = window.innerWidth;
        const height = canvas.height = 200;

        // Create points
        for (let i = 0; i <= width; i += 50) {
            this.points.push({
                x: i,
                y: height / 2,
                originY: height / 2,
                speed: 0.1,
                amplitude: 20
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.beginPath();
            ctx.moveTo(0, height);

            for (let i = 0; i < this.points.length; i++) {
                const point = this.points[i];
                this.count += 0.05;
                
                // Sine wave
                point.y = point.originY + Math.sin(this.count + i * 0.3) * point.amplitude;
                
                // Draw curves between points
                if (i === 0) {
                    ctx.moveTo(point.x, point.y);
                } else {
                    const prevPoint = this.points[i - 1];
                    const cx = (prevPoint.x + point.x) / 2;
                    const cy = (prevPoint.y + point.y) / 2;
                    ctx.quadraticCurveTo(prevPoint.x, prevPoint.y, cx, cy);
                }
            }

            // Complete the wave shape
            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
            ctx.fillStyle = 'url(#gradient)';
            ctx.fill();
            
            requestAnimationFrame(animate);
        };

        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, '#0ea5e9');
        gradient.addColorStop(1, '#d946ef');

        animate();
    }
})); 
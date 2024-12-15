Alpine.data('textScrambler', () => ({
    chars: '!<>-_\\/[]{}—=+*^?#_',
    queue: [],
    frame: 0,
    frameRequest: null,
    
    init() {
        this.originalText = this.$el.innerText;
        this.$el.innerText = '';
        this.resolve = null;
        
        this.$el.addEventListener('mouseenter', () => {
            this.scramble(this.originalText);
        });
    },
    
    scramble(newText) {
        const length = Math.max(this.originalText.length, newText.length);
        const promise = new Promise(resolve => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = this.originalText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    },
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="text-primary-500">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.$el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(() => this.update());
            this.frame++;
        }
    },
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
})); 
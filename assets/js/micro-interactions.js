document.addEventListener('alpine:init', () => {
    // Scroll Progress Indicator
    Alpine.data('scrollProgress', () => ({
        progress: 0,
        init() {
            window.addEventListener('scroll', () => {
                const winScroll = document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                this.progress = (winScroll / height) * 100;
            });
        }
    }));

    // Cursor Spotlight Effect
    Alpine.data('spotlight', () => ({
        spotlightX: 0,
        spotlightY: 0,
        init() {
            document.addEventListener('mousemove', (e) => {
                this.spotlightX = (e.clientX / window.innerWidth) * 100;
                this.spotlightY = (e.clientY / window.innerHeight) * 100;
            });
        }
    }));

    // Section Reveal Animation
    Alpine.data('sectionReveal', () => ({
        revealed: false,
        init() {
            this.$watch('revealed', value => {
                if (value) {
                    this.$el.classList.add('animate-section-reveal');
                }
            });
        }
    }));

    // Voeg toe aan de bestaande Alpine.js initialisatie
    Alpine.data('scrollToTop', () => ({
        visible: false,
        init() {
            window.addEventListener('scroll', () => {
                this.visible = window.pageYOffset > 500;
            });
        },
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }));

    // Voeg smooth scroll voor anker links toe
    Alpine.data('smoothScroll', () => ({
        init() {
            this.$el.addEventListener('click', (e) => {
                const href = this.$el.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        }
    }));

    // Voeg parallax effect toe
    Alpine.data('parallax', () => ({
        offset: 0,
        init() {
            window.addEventListener('scroll', () => {
                this.offset = window.pageYOffset * 0.5;
                this.$el.style.transform = `translateY(${this.offset}px)`;
            });
        }
    }));

    // Text Scramble Effect
    Alpine.data('textScramble', () => ({
        originalText: '',
        displayText: '',
        scrambleInterval: null,
        chars: '!<>-_\\/[]{}—=+*^?#',
        
        init() {
            this.originalText = this.$el.textContent;
            this.scramble();
        },

        scramble() {
            let iteration = 0;
            const maxIterations = this.originalText.length * 2;
            
            clearInterval(this.scrambleInterval);
            
            this.scrambleInterval = setInterval(() => {
                this.displayText = this.originalText
                    .split('')
                    .map((letter, index) => {
                        if (index < iteration / 2) {
                            return this.originalText[index];
                        }
                        return this.chars[Math.floor(Math.random() * this.chars.length)];
                    })
                    .join('');
                
                if (iteration >= maxIterations) {
                    clearInterval(this.scrambleInterval);
                    this.displayText = this.originalText;
                }
                iteration += 1;
            }, 50);
        }
    }));

    // Magnetic Button Effect
    Alpine.data('magnetic', () => ({
        x: 0,
        y: 0,
        
        init() {
            this.$el.addEventListener('mousemove', (e) => {
                const rect = this.$el.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                this.x = (e.clientX - centerX) * 0.2;
                this.y = (e.clientY - centerY) * 0.2;
                
                this.$el.style.transform = `translate(${this.x}px, ${this.y}px)`;
            });
            
            this.$el.addEventListener('mouseleave', () => {
                this.$el.style.transform = 'translate(0px, 0px)';
            });
        }
    }));

    // Voeg toe aan de bestaande Alpine.js initialisatie
    Alpine.data('tiltEffect', () => ({
        init() {
            const card = this.$el;
            
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        }
    }));

    // Text Reveal Effect
    Alpine.data('textReveal', () => ({
        words: [],
        currentIndex: 0,
        interval: null,

        init() {
            this.words = this.$el.textContent.trim().split(' ');
            this.$el.textContent = '';
            this.revealNextWord();
        },

        revealNextWord() {
            if (this.currentIndex < this.words.length) {
                const span = document.createElement('span');
                span.textContent = this.words[this.currentIndex] + ' ';
                span.style.opacity = '0';
                span.style.transform = 'translateY(20px)';
                span.style.display = 'inline-block';
                span.style.transition = 'all 0.5s ease-out';
                
                this.$el.appendChild(span);
                
                requestAnimationFrame(() => {
                    span.style.opacity = '1';
                    span.style.transform = 'translateY(0)';
                });

                this.currentIndex++;
                setTimeout(() => this.revealNextWord(), 100);
            }
        }
    }));

    // Cursor Trail Effect
    Alpine.data('cursorTrail', () => ({
        dots: [],
        mouseX: 0,
        mouseY: 0,

        init() {
            for (let i = 0; i < 20; i++) {
                this.dots.push({
                    x: 0,
                    y: 0,
                    size: (20 - i) / 2,
                    delay: i * 2
                });
            }

            document.addEventListener('mousemove', (e) => {
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;
            });

            this.animate();
        },

        animate() {
            this.dots.forEach((dot, index) => {
                const nextDot = this.dots[index + 1] || this.dots[0];
                dot.x = this.mouseX;
                dot.y = this.mouseY;

                const el = this.$refs[`dot${index}`];
                if (el) {
                    el.style.left = `${dot.x}px`;
                    el.style.top = `${dot.y}px`;
                    el.style.width = `${dot.size}px`;
                    el.style.height = `${dot.size}px`;
                    el.style.background = `hsla(${200 + index * 10}, 100%, 70%, ${0.3 - index * 0.01})`;
                }
            });

            requestAnimationFrame(() => this.animate());
        }
    }));
}); 
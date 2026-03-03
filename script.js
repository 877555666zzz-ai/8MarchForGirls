 // Canvas petals animation
        const canvas = document.getElementById('petals-canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const petals = [];
        const petalCount = 40;

        class Petal {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height - canvas.height;
                this.size = Math.random() * 15 + 10;
                this.speedY = Math.random() * 1 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.rotation = Math.random() * 360;
                this.rotationSpeed = Math.random() * 2 - 1;
                this.opacity = Math.random() * 0.5 + 0.2;
                this.color = `rgba(${200 + Math.random() * 55}, ${150 + Math.random() * 50}, ${150 + Math.random() * 50}, ${this.opacity})`;
            }

            update() {
                this.y += this.speedY;
                this.x += Math.sin(this.y * 0.01) * 0.5 + this.speedX;
                this.rotation += this.rotationSpeed;

                if (this.y > canvas.height) {
                    this.y = -50;
                    this.x = Math.random() * canvas.width;
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation * Math.PI / 180);
                ctx.fillStyle = this.color;
                
                // Draw petal shape
                ctx.beginPath();
                ctx.ellipse(0, 0, this.size, this.size / 2, 0, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.restore();
            }
        }

        function initPetals() {
            for (let i = 0; i < petalCount; i++) {
                petals.push(new Petal());
            }
        }

        function animatePetals() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            petals.forEach(petal => {
                petal.update();
                petal.draw();
            });
            
            requestAnimationFrame(animatePetals);
        }

        initPetals();
        animatePetals();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        // ENVELOPE ANIMATION FUNCTIONS
        function startEnvelopeAnimation() {
            const envelopeContainer = document.getElementById('envelopeContainer');
            envelopeContainer.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Auto-open after 3 seconds if user doesn't click
            setTimeout(() => {
                if (envelopeContainer.classList.contains('active') && !document.getElementById('envelope').classList.contains('open')) {
                    // Just a hint, don't auto-open to let them enjoy the animation
                }
            }, 3000);
        }

        function openEnvelope(event) {
            event.stopPropagation();
            const envelope = document.getElementById('envelope');
            envelope.classList.add('open');
            
            // After animation completes, show modal
            setTimeout(() => {
                document.getElementById('envelopeContainer').classList.remove('active');
                showModal();
            }, 2500);
        }

        function skipToModal() {
            document.getElementById('envelopeContainer').classList.remove('active');
            showModal();
        }

        function showModal() {
            const modal = document.getElementById('modal');
            modal.classList.add('active');
            document.body.style.overflow = 'auto'; // Enable scrolling
            createConfetti();
        }

        function closeElegantModal() {
            const modal = document.getElementById('modal');
            modal.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset envelope for next time
            document.getElementById('envelope').classList.remove('open');
        }

        // Close on backdrop click (only if clicking outside modal-elegant)
        document.getElementById('modal').addEventListener('click', function(e) {
            if (e.target === this) {
                // Don't close on backdrop click, let them use the X button
                // Or you can enable this if you want: closeElegantModal();
            }
        });

        // Elegant confetti
        function createConfetti() {
            const colors = ['#d4a5a5', '#c9b1d4', '#e8b4b8', '#f5e6d3', '#faf7f2'];
            const shapes = ['✿', '❀', '✾', '❁', '✤'];
            
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.style.position = 'fixed';
                    confetti.style.left = Math.random() * 100 + 'vw';
                    confetti.style.top = '-50px';
                    confetti.style.fontSize = (Math.random() * 20 + 15) + 'px';
                    confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.pointerEvents = 'none';
                    confetti.style.zIndex = '9999';
                    confetti.style.opacity = '0.8';
                    confetti.innerHTML = shapes[Math.floor(Math.random() * shapes.length)];
                    
                    const duration = Math.random() * 3 + 2;
                    confetti.style.animation = `confetti-fall ${duration}s ease-out forwards`;
                    
                    document.body.appendChild(confetti);
                    
                    setTimeout(() => confetti.remove(), duration * 1000);
                }, i * 50);
            }
        }

        // Add confetti animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes confetti-fall {
                0% {
                    transform: translateY(0) rotate(0deg) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(720deg) scale(0.5);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Parallax effect on mouse move
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;
            
            const title = document.querySelector('.main-title');
            const poem = document.querySelector('.poem-container');
            
            if (title) {
                title.style.transform = `perspective(1000px) rotateY(${mouseX * 5}deg) rotateX(${-mouseY * 5}deg)`;
            }
            if (poem) {
                poem.style.transform = `translateX(${mouseX * 10}px) translateY(${mouseY * 10}px)`;
            }
        });

        // Smooth scroll behavior
        document.documentElement.style.scrollBehavior = 'smooth';

        // Hide scroll indicator when scrolled
        document.getElementById('modal').addEventListener('scroll', function() {
            const indicator = this.querySelector('.scroll-indicator');
            if (this.scrollTop > 100) {
                indicator.style.opacity = '0';
            } else {
                indicator.style.opacity = '0.7';
            }
        });
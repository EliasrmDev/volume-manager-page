// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Hide skip link after use for accessibility
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function() {
            // Add a small delay to ensure the focus has moved to the target
            setTimeout(() => {
                this.style.display = 'none';
            }, 100);
        });

        // Show skip link again when tabbing (for keyboard users)
        skipLink.addEventListener('focus', function() {
            this.style.display = 'block';
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll effect to navbar
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Add animation class and observe elements
    const animateElements = document.querySelectorAll('.feature-card, .step, .hero-content');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Extension preview animation
    const extensionPreview = document.querySelector('.extension-preview');
    if (extensionPreview) {
        let isHovered = false;

        extensionPreview.addEventListener('mouseenter', function() {
            isHovered = true;
            this.style.transform = 'perspective(1000px) rotateY(-2deg) rotateX(1deg) scale(1.05)';
        });

        extensionPreview.addEventListener('mouseleave', function() {
            isHovered = false;
            this.style.transform = 'perspective(1000px) rotateY(-10deg) rotateX(5deg) scale(1)';
        });

        // Subtle floating animation
        function floatAnimation() {
            if (!isHovered) {
                const currentTime = Date.now() * 0.002;
                const translateY = Math.sin(currentTime) * 5;
                extensionPreview.style.transform = `perspective(1000px) rotateY(-10deg) rotateX(5deg) translateY(${translateY}px)`;
            }
            requestAnimationFrame(floatAnimation);
        }

        floatAnimation();
    }

    // Dynamic typing effect for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        type();
    }

    // Initialize typing effect for hero title (optional)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && window.innerWidth > 768) {
        const originalText = heroTitle.innerHTML;
        setTimeout(() => {
            typeWriter(heroTitle, originalText.replace('<br>', '\n').replace(/<[^>]*>/g, ''), 50);
        }, 1000);
    }

    // Counter animation for stats (if we had them)
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);

            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }

    // Add subtle parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElement = document.querySelector('.hero::before');
        const speed = 0.5;

        if (parallaxElement && scrolled < window.innerHeight) {
            parallaxElement.style.transform = `translateY(${scrolled * speed}px)`;
        }
    });

    // Feature cards hover effect enhancement
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Button click animations
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            const oldRipple = this.querySelector('.ripple');
            if (oldRipple) {
                oldRipple.remove();
            }

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }

        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }

        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Console message for developers
    console.log('%cVolume Manager Promotional Page', 'color: #1597ff; font-size: 20px; font-weight: bold;');
    console.log('%cBuilt with modern web technologies', 'color: #ccc; font-size: 12px;');
    console.log('%cCheck out the extension: https://github.com/EliasrmDev/volume-manager', 'color: #1597ff; font-size: 12px;');
});
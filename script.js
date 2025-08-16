document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to header
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('bg-black/40');
        } else {
            header.classList.remove('bg-black/40');
        }
    });

    // Interactive pricing cards
    const pricingCards = document.querySelectorAll('.product-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Button click animations
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add loading animation to CTA buttons
    const ctaButtons = document.querySelectorAll('button:contains("Start Free Trial"), button:contains("Get Started")');
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            const originalText = button.textContent;
            button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading...';
            button.disabled = true;
            
            // Simulate loading
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check mr-2"></i>Success!';
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                }, 2000);
            }, 1500);
        });
    });

    // Add parallax effect to hero section
    const heroSection = document.querySelector('section:first-of-type');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        if (heroSection) {
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add counter animation for pricing
    const priceElements = document.querySelectorAll('.text-4xl.font-bold');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const priceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const priceElement = entry.target;
                const price = priceElement.textContent.match(/\$(\d+)/);
                if (price) {
                    animateCounter(priceElement, parseInt(price[1]));
                }
                priceObserver.unobserve(priceElement);
            }
        });
    }, observerOptions);

    priceElements.forEach(element => {
        priceObserver.observe(element);
    });

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 30;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = element.textContent.replace(/\$\d+/, `$${Math.floor(current)}`);
        }, 50);
    }

    // Add floating animation to feature icons
    const featureIcons = document.querySelectorAll('.w-12.h-12');
    featureIcons.forEach((icon, index) => {
        icon.style.animation = `float ${2 + index * 0.5}s ease-in-out infinite`;
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
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
        
        .product-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .product-card:hover {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
    `;
    document.head.appendChild(style);

    // Add testimonial carousel (if we add testimonials later)
    let currentTestimonial = 0;
    const testimonials = [
        {
            name: "Sarah Chen",
            role: "Lead Developer",
            company: "TechCorp",
            text: "SandBox Pro has revolutionized our development workflow. We're shipping features 3x faster!"
        },
        {
            name: "Mike Rodriguez",
            role: "DevOps Engineer",
            company: "StartupXYZ",
            text: "The collaboration features are incredible. Our team productivity has increased dramatically."
        },
        {
            name: "Emily Watson",
            role: "CTO",
            company: "InnovateLab",
            text: "Enterprise-grade security with developer-friendly features. Exactly what we needed."
        }
    ];

    // Add newsletter signup functionality
    const newsletterForm = document.createElement('div');
    newsletterForm.innerHTML = `
        <div class="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 mt-8">
            <h4 class="text-2xl font-bold text-white mb-4">Stay Updated</h4>
            <p class="text-gray-300 mb-6">Get the latest updates and tips delivered to your inbox.</p>
            <div class="flex flex-col sm:flex-row gap-4">
                <input type="email" placeholder="Enter your email" class="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500">
                <button class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition duration-300 font-semibold">
                    Subscribe
                </button>
            </div>
        </div>
    `;

    // Insert newsletter form before footer
    const footer = document.querySelector('footer');
    if (footer) {
        footer.parentNode.insertBefore(newsletterForm, footer);
    }

    // Add mobile menu functionality
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuButton.className = 'md:hidden bg-white/10 p-2 rounded-lg';
    
    const nav = document.querySelector('nav');
    if (nav) {
        nav.parentNode.insertBefore(mobileMenuButton, nav);
        
        mobileMenuButton.addEventListener('click', () => {
            nav.classList.toggle('hidden');
        });
    }

    console.log('SandBox Pro - Premium Development Sandboxes loaded successfully!');
});

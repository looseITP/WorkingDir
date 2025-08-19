document.addEventListener('DOMContentLoaded', () => {
<<<<<<< HEAD
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

    // --- Konami Code Easter Egg Logic ---
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            showEasterEggGame1();
            konamiCode = [];
        }
    });

    // Easter Egg Game 1 Modal
    window.showEasterEggGame1 = function() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white/10 backdrop-blur-md rounded-xl p-8 max-w-md w-full border border-white/10 text-center">
                <h3 class="text-2xl font-bold text-white mb-4">🎮 Easter Egg Game 1</h3>
                <p class="text-gray-300 mb-6">You discovered the secret Konami code!<br>Try to click the button as many times as you can in 5 seconds!</p>
                <button id="egg1-start" class="bg-gradient-to-r from-[#002244] to-[#FB4F14] text-white px-6 py-3 rounded-lg font-semibold">Start Game</button>
                <div id="egg1-game" class="mt-6"></div>
                <button class="mt-8 bg-gradient-to-r from-[#002244] to-[#FB4F14] text-white px-4 py-2 rounded-lg font-semibold" onclick="this.closest('.fixed').remove()">Close</button>
            </div>
        `;
        document.body.appendChild(modal);
        document.getElementById('egg1-start').onclick = function() {
            let count = 0;
            const gameDiv = document.getElementById('egg1-game');
            gameDiv.innerHTML = '<button id="egg1-click" class="bg-[#FB4F14] text-white px-6 py-3 rounded-lg font-bold text-lg">Click me!</button><div class="mt-4 text-white">Score: <span id="egg1-score">0</span></div>';
            const clickBtn = document.getElementById('egg1-click');
            const scoreSpan = document.getElementById('egg1-score');
            clickBtn.onclick = () => { count++; scoreSpan.textContent = count; };
            setTimeout(() => {
                clickBtn.disabled = true;
                gameDiv.innerHTML += `<div class='mt-4 text-xl text-[#FB4F14] font-bold'>Time's up! Final Score: ${count}</div>`;
            }, 5000);
        };
    };

    // Easter Egg Game 2 Modal
    window.showEasterEggGame2 = function() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white/10 backdrop-blur-md rounded-xl p-8 max-w-md w-full border border-white/10 text-center">
                <h3 class="text-2xl font-bold text-white mb-4">🧩 Easter Egg Game 2</h3>
                <p class="text-gray-300 mb-6">Memory Challenge!<br>Remember this sequence:</p>
                <div id="egg2-sequence" class="text-2xl font-mono text-[#FB4F14] mb-4"></div>
                <input id="egg2-input" class="bg-white/20 border border-[#FB4F14]/40 rounded-lg px-4 py-2 text-white placeholder-gray-400 mb-4" placeholder="Type the sequence..." />
                <button id="egg2-check" class="bg-gradient-to-r from-[#002244] to-[#FB4F14] text-white px-4 py-2 rounded-lg font-semibold">Check</button>
                <div id="egg2-result" class="mt-4"></div>
                <button class="mt-8 bg-gradient-to-r from-[#002244] to-[#FB4F14] text-white px-4 py-2 rounded-lg font-semibold" onclick="this.closest('.fixed').remove()">Close</button>
            </div>
        `;
        document.body.appendChild(modal);
        // Generate random sequence
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let seq = '';
        for (let i = 0; i < 6; i++) seq += chars[Math.floor(Math.random() * chars.length)];
        document.getElementById('egg2-sequence').textContent = seq;
        document.getElementById('egg2-check').onclick = function() {
            const val = document.getElementById('egg2-input').value.trim().toUpperCase();
            const result = document.getElementById('egg2-result');
            if (val === seq) {
                result.innerHTML = '<span class="text-green-400 font-bold">Correct! 🎉</span>';
            } else {
                result.innerHTML = '<span class="text-red-400 font-bold">Try again!</span>';
            }
        };
    };

    // Attach hero button click handlers
    const egg1Btn = document.querySelector('a[href="/easter-egg-game1.html"]');
    if (egg1Btn) egg1Btn.onclick = (e) => { e.preventDefault(); showEasterEggGame1(); };
    const egg2Btn = document.querySelector('a[href="/easter-egg-game2.html"]');
    if (egg2Btn) egg2Btn.onclick = (e) => { e.preventDefault(); showEasterEggGame2(); };

    console.log('SandBox Pro - Premium Development Sandboxes loaded successfully!');
=======
    const modal = document.getElementById('modal');
    const closeButton = document.getElementById('close-modal');
    const detailsButtons = document.querySelectorAll('.details-button');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalTech = document.getElementById('modal-tech');

    const projects = {
        'hl7-fhir': {
            title: 'HL7 FHIR API Tester',
            description: 'This project involved developing a comprehensive test framework for complex healthcare APIs. We focused on ensuring seamless data exchange between different systems while strictly adhering to HIPAA regulations. Key activities included automated end-to-end testing, performance load testing, and security checks on protected health information (PHI).',
            tech: 'Technologies: Python, Postman, SQL, JIRA, Splunk, HL7spy'
        },
        'mobile-automation': {
            title: 'Mobile Test Automation',
            description: 'In this project, I led the creation of an automated test suite for our mobile application. The framework was built using Appium and Cypress, enabling us to run regression tests on both iOS and Android platforms efficiently. This project significantly reduced our release cycle time and improved overall software quality.',
            tech: 'Technologies: Appium, Cypress.io, JavaScript, Agile SDLC, Visual Studio Code'
        },
        'etl-testing': {
            title: 'ETL Integration Testing',
            description: 'This initiative focused on the quality assurance of our data pipeline. My role involved creating and executing detailed test plans to validate data extraction, transformation, and loading (ETL) processes. I ensured data accuracy and integrity by writing complex SQL and MongoDB queries to compare source and destination data.',
            tech: 'Technologies: SQL, MongoDB, Python, ETL, Snowflake, Git'
        }
    };

    detailsButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.dataset.project;
            const project = projects[projectId];
            if (project) {
                modalTitle.textContent = project.title;
                modalBody.textContent = project.description;
                modalTech.textContent = project.tech;
                modal.classList.remove('hidden');
            }
        });
    });

    closeButton.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
>>>>>>> origin/main
});

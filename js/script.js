// ========== GLOBAL JS: SCROLL ANIMATIONS, EXPANDABLE PROJECTS, LIGHTBOX, EMAILJS ==========

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll animations (Intersection Observer for fade/slide-up)
    const fadeElements = document.querySelectorAll('.scroll-fade');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    fadeElements.forEach(el => observer.observe(el));

    // 2. Projects Page: Generate dynamic cards with actual images
    const projectsGrid = document.getElementById('projectsGrid');
    if (projectsGrid) {
        // Project data with actual image paths
        // 📸 UPDATE THESE PATHS to match your actual image filenames
        const projectsData = [
            { 
                title: "Solar Power System Installation", 
                shortDesc: "Design and installation of a solar power system for residential use.", 
                fullDesc: "Installed a solar power system for a residential property, including battery storage and grid-tie inverter. The system includes solar panel 12v, 12v lithium battery bank, and a hybrid inverter with smart monitoring capabilities. Achieved 30% reduction in electricity bills.",
                technologies: "Solar Panels, Battery Storage, Inverter Design, Power Electronics",
                image: "assets/images/solar-inverter.jpeg",  // ← CHANGE THIS to your filename
                alt: "Solar Power System Installation - Residential Solar Panels and Inverter Setup"
            },
            { 
                title: "pvc conduit house wiring", 
                shortDesc: "Installation of PVC conduits for electrical wiring in a residential building.", 
                fullDesc: "Installed PVC conduit wiring for a residential building, ensuring compliance with electrical codes and safety standards. The project involved measuring the right distances as per the instructions given and complete wiring of distribution boards, and testing for continuity and insulation resistance. The system is designed for durability and ease of maintenance.",
                technologies: "Electrical Wiring, PVC Conduits, Safety Standards, Residential Electrical Systems",
                image: "assets/images/using-pvc-conduit-finished.jpeg",  // ← CHANGE THIS to your filename
                alt: "PVC Conduit House Wiring - Electrical Installation with PVC Conduits"
            },
            { 
                title: "mini trunking system", 
                shortDesc: "Design and implementation of a mini trunking system for cable management.", 
                fullDesc: "Designed and implemented a mini trunking system for efficient cable management in a residential set-up simulation. The system includes custom-designed trunking channels, junction boxes, and cable organizers to route power and data cables neatly along walls and ceilings. This solution improved aesthetics and reduced the risk of cable damage while allowing for easy access for future modifications.",
                technologies: "Cable Management, Trunking Design, Electrical Installation, Residential Set-up",
                image: "assets/images/using-mini-trunking.jpeg",  // ← CHANGE THIS to your filename
                alt: "Mini Trunking System - Cable Management for Residential Set-up"
            }
        ];
        
        projectsGrid.innerHTML = '';
        projectsData.forEach((proj, idx) => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.setAttribute('data-idx', idx);
            
            // Create card with actual image
            card.innerHTML = `
                <div class="project-img-container">
                    <img src="${proj.image}" alt="${proj.alt}" class="project-img" loading="lazy" onerror="this.src='https://via.placeholder.com/400x300?text=${encodeURIComponent(proj.title)}'">
                </div>
                <div class="project-info">
                    <h3>${proj.title}</h3>
                    <p>${proj.shortDesc}</p>
                    <div class="expandable-details">
                        <p><strong> <img src="assets/icons/icons8-clipboard-48.png" alt="Full details" width="24" height="24"> Full details:</strong> ${proj.fullDesc}</p>
                        <p><strong> <img src="assets/icons/icons8-gears-50.png" alt="Full details" width="24" height="24" Technologies:</strong> ${proj.technologies}</p>
                    </div>
                    <button class="btn-expand">▼ Expand</button>
                </div>
            `;
            
            // Expand/Collapse functionality
            const expandBtn = card.querySelector('.btn-expand');
            expandBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                card.classList.toggle('expanded');
                expandBtn.innerHTML = card.classList.contains('expanded') ? '▲ Collapse' : '▼ Expand';
            });
            
            // Image click to open lightbox
            const imgContainer = card.querySelector('.project-img-container');
            imgContainer.addEventListener('click', (e) => {
                e.stopPropagation();
                openLightbox(proj.image, proj.title);
            });
            
            projectsGrid.appendChild(card);
        });
    }

    // 3. Lightbox Modal logic (Updated for actual images)
    const modal = document.getElementById('lightboxModal');
    const modalImg = document.getElementById('modalImage');
    
    if (modal && modalImg) {
        // Close modal when clicking X
        const closeModal = document.querySelector('.close-modal');
        if (closeModal) {
            closeModal.onclick = () => {
                modal.style.display = 'none';
            };
        }
        
        // Close modal when clicking outside the image
        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        };
        
        // Global function to open lightbox with actual image
        window.openLightbox = (imageSrc, title) => {
            modal.style.display = 'flex';
            modalImg.src = imageSrc;
            modalImg.alt = title;
            modalImg.style.display = 'block';
        };
    }

    // 4. EmailJS Integration (Your existing setup - already working!)
    const contactForm = document.getElementById('contactForm');
    if (contactForm && typeof emailjs !== 'undefined') {
        // Your EmailJS credentials (already configured)
        const EMAILJS_SERVICE_ID = 'service_6jvo4go';
        const EMAILJS_TEMPLATE_ID = 'template_3i232tv';
        const EMAILJS_USER_ID = 'nr0e4Va9JoK0zmrsy';
        
        emailjs.init(EMAILJS_USER_ID);
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const feedbackDiv = document.getElementById('formFeedback');
            const sendBtn = document.getElementById('sendBtn');
            sendBtn.disabled = true;
            sendBtn.innerHTML = 'Sending...';
            
            const params = {
                user_name: document.getElementById('user_name').value,
                user_email: document.getElementById('user_email').value,
                message: document.getElementById('message').value
            };
            
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
                .then(() => {
                    feedbackDiv.innerHTML = '<span class="success">✅ Email Sent! I\'ll get back soon.</span>';
                    contactForm.reset();
                })
                .catch((err) => {
                    console.error(err);
                    feedbackDiv.innerHTML = '<span class="error">❌ Try Again! Something went wrong.</span>';
                })
                .finally(() => {
                    sendBtn.disabled = false;
                    sendBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
                });
        });
    }
});
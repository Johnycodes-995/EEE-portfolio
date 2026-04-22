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

    // 2. Projects Page: Generate dynamic cards with GALLERY support (multiple images + videos)
    const projectsGrid = document.getElementById('projectsGrid');
    if (projectsGrid) {
        // Project data with MULTIPLE IMAGES and VIDEO support
        // 📸 ADD your images and videos here - each project can have multiple media files
        const projectsData = [
            { 
                title: "Solar Power System Installation", 
                shortDesc: "Design and installation of a solar power system for residential use.", 
                fullDesc: "Installed a solar power system for a residential property, including battery storage and grid-tie inverter. The system includes solar panel 12v, 12v lithium battery bank, and a hybrid inverter with smart monitoring capabilities. Achieved 30% reduction in electricity bills.",
                technologies: "Solar Panels, Battery Storage, Inverter Design, Power Electronics",
                // NEW: Multiple media (images + videos) for this project
                media: [
                    { type: "image", src: "assets/images/project-1-solar-installation.jpeg", alt: "Solar inverter setup" },
                    { type: "image", src: "assets/images/solar-inverter.jpeg", alt: "Solar inverter" },
                    { type: "video", src: "assets/videos/Final-Solar-Installation-Test.mp4", alt: "Solar system demo", isYouTube: false }
                    // For YouTube videos, add: { type: "video", src: "", alt: "Demo video", isYouTube: true, videoId: "YOUR_YOUTUBE_ID" }
                ]
            },
            { 
                title: "pvc conduit house wiring", 
                shortDesc: "Installation of PVC conduits for electrical wiring in a residential building.", 
                fullDesc: "Installed PVC conduit wiring for a residential building, ensuring compliance with electrical codes and safety standards. The project involved measuring the right distances as per the instructions given and complete wiring of distribution boards, and testing for continuity and insulation resistance. The system is designed for durability and ease of maintenance.",
                technologies: "Electrical Wiring, PVC Conduits, Safety Standards, Residential Electrical Systems",
                // NEW: Multiple media for this project
                media: [
                    { type: "image", src: "assets/images/using-pvc-conduit-finished.jpeg", alt: "PVC conduit finished installation" },
                    { type: "image", src: "assets/images/using-pvc-conduit1.jpeg", alt: "pvc conduit layout" },
                    { type: "image", src: "assets/images/CCU-wiring.jpeg", alt: "Distribution board setup" },
                    { type: "video", src: "assets/videos/Final-Installation-Test-Pvc.mp4", alt: "Wiring demonstration", isYouTube: false }
                ]
            },
           {
    title: "Laptop Disassembly, Hinge Repair & Thermal Maintenance",
    shortDesc: "Disassembled a Lenovo laptop, repaired loose hinges, cleaned internal components, and reapplied thermal paste for improved performance.",
    fullDesc: "Diagnosed and repaired a Lenovo laptop with loose hinges and reduced thermal performance. The process involved carefully disassembling the laptop, identifying and fixing the hinge mechanism, removing dust buildup from internal components, and reapplying thermal paste to the CPU for better heat transfer. The device was then reassembled and tested to ensure structural stability and improved cooling performance.",
    technologies: "Laptop Hardware Repair, Thermal Paste Application, Preventive Maintenance, Troubleshooting",
    
    media: [
        { type: "image", src: "assets/images/dirtylaptop.jpg", alt: "Laptop disassembled showing internal components" },
        { type: "image", src: "assets/images/openlaptop.jpg", alt: "a photo of the laptop" },
    ]
},
            { 
                title: "mini trunking system", 
                shortDesc: "Design and implementation of a mini trunking system for cable management.", 
                fullDesc: "Designed and implemented a mini trunking system for efficient cable management in a residential set-up simulation. The system includes custom-designed trunking channels, junction boxes, and cable organizers to route power and data cables neatly along walls and ceilings. This solution improved aesthetics and reduced the risk of cable damage while allowing for easy access for future modifications.",
                technologies: "Cable Management, Trunking Design, Electrical Installation, Residential Set-up",
                // NEW: Multiple media for this project
                media: [
                    { type: "image", src: "assets/images/preping-mini-trunking.jpeg", alt: "preparing the trunking system" },
                    { type: "image", src: "assets/images/using-mini-trunking.jpeg", alt: "finished trunking system" },
                ]
            }
        ];
        
        projectsGrid.innerHTML = '';
        
        projectsData.forEach((proj, idx) => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.setAttribute('data-idx', idx);
            
            // NEW: Build gallery HTML for multiple images/videos
            let galleryHTML = `
                <div class="project-gallery" data-project-idx="${idx}">
                    <div class="gallery-slides" id="gallerySlides-${idx}">
            `;
            
            proj.media.forEach((item, mediaIdx) => {
                if (item.type === 'image') {
                    galleryHTML += `
                        <div class="gallery-slide" data-media-type="image" data-media-src="${item.src}" data-media-idx="${mediaIdx}">
                            <img src="${item.src}" alt="${item.alt}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x300?text=Image+Not+Found'">
                        </div>
                    `;
                } else if (item.type === 'video') {
                    galleryHTML += `
                        <div class="gallery-slide" data-media-type="video" data-media-src="${item.src}" data-media-idx="${mediaIdx}" data-is-youtube="${item.isYouTube || false}" data-video-id="${item.videoId || ''}">
                            <video controls muted autoplay loop playsinline poster="assets/images/video-thumbnail.jpg">
                                <source src="${item.isYouTube ? '' : item.src}" type="video/mp4">
                            </video>
                        </div>
                    `;
                }
            });
            
            galleryHTML += `
                    </div>
                    <button class="gallery-btn gallery-prev" data-idx="${idx}"><i class="fas fa-chevron-left"></i></button>
                    <button class="gallery-btn gallery-next" data-idx="${idx}"><i class="fas fa-chevron-right"></i></button>
                    <div class="gallery-indicators" id="indicators-${idx}"></div>
                    <div class="media-badge">
                        <i class="fas fa-images"></i> ${proj.media.length} media
                    </div>
                </div>
            `;
            
            // Create card with gallery (keeping your original structure)
            card.innerHTML = galleryHTML + `
                <div class="project-info">
                    <h3>${proj.title}</h3>
                    <p>${proj.shortDesc}</p>
                    <div class="expandable-details">
                        <p><strong> <img src="assets/icons/icons8-clipboard-48.png" alt="Full details" width="24" height="24"> Full details:</strong> ${proj.fullDesc}</p>
                        <p><strong> <img src="assets/icons/icons8-gears-50.png" alt="Technologies" width="24" height="24"> Technologies:</strong> ${proj.technologies}</p>
                    </div>
                    <button class="btn-expand">▼ Expand</button>
                </div>
            `;
            
           // Expand/Collapse functionality - ONLY ONE PROJECT EXPANDED AT A TIME + COLLAPSE ON CLICK OUTSIDE
const expandBtn = card.querySelector('.btn-expand');
const expandableDiv = card.querySelector('.expandable-details');

expandBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // Check if current card is already expanded
    const isCurrentlyExpanded = card.classList.contains('expanded');
    
    // FIRST: Collapse ALL other project cards
    const allProjectCards = document.querySelectorAll('.project-card');
    allProjectCards.forEach(otherCard => {
        if (otherCard !== card && otherCard.classList.contains('expanded')) {
            otherCard.classList.remove('expanded');
            const otherBtn = otherCard.querySelector('.btn-expand');
            if (otherBtn) {
                otherBtn.innerHTML = '▼ Expand';
            }
            // Reset overflow on other cards
            const otherExpandable = otherCard.querySelector('.expandable-details');
            if (otherExpandable) {
                otherExpandable.style.overflowY = '';
            }
        }
    });
    // COLLAPSE WHEN CLICKING OUTSIDE ANY PROJECT CARD
document.addEventListener('click', (e) => {
    // Check if click is NOT inside any project card
    if (!e.target.closest('.project-card')) {
        const expandedCards = document.querySelectorAll('.project-card.expanded');
        expandedCards.forEach(expandedCard => {
            expandedCard.classList.remove('expanded');
            const btn = expandedCard.querySelector('.btn-expand');
            if (btn) {
                btn.innerHTML = '▼ Expand';
            }
            const expandableDiv = expandedCard.querySelector('.expandable-details');
            if (expandableDiv) {
                expandableDiv.style.overflowY = '';
            }
        });
    }
});
    
    // THEN: Toggle the clicked card
    if (!isCurrentlyExpanded) {
        card.classList.add('expanded');
        expandBtn.innerHTML = '▲ Collapse';
        // FIX: On mobile, allow internal scrolling without affecting page scroll
        expandableDiv.style.overflowY = 'auto';
        expandableDiv.style.webkitOverflowScrolling = 'touch';
    } else {
        card.classList.remove('expanded');
        expandBtn.innerHTML = '▼ Expand';
        expandableDiv.style.overflowY = '';
    }
});
            
            // Initialize gallery for this project
            initGalleryForProject(idx, proj.media.length);
            
            // Click on any media to open lightbox (UPDATED for videos)
            const slides = card.querySelectorAll('.gallery-slide');
            slides.forEach((slide, slideIdx) => {
                slide.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const mediaType = slide.getAttribute('data-media-type');
                    const mediaSrc = slide.getAttribute('data-media-src');
                    const isYouTube = slide.getAttribute('data-is-youtube') === 'true';
                    const videoId = slide.getAttribute('data-video-id');
                    
                    openLightbox(mediaType, mediaSrc, isYouTube, videoId, proj.media, slideIdx);
                });
            });
            
            projectsGrid.appendChild(card);
        });
    }
    
    // NEW: Gallery initialization function (for carousel navigation)
    function initGalleryForProject(projectIdx, totalSlides) {
        let currentIndex = 0;
        const slidesContainer = document.getElementById(`gallerySlides-${projectIdx}`);
        const indicatorsContainer = document.getElementById(`indicators-${projectIdx}`);
        const prevBtn = document.querySelector(`.gallery-prev[data-idx="${projectIdx}"]`);
        const nextBtn = document.querySelector(`.gallery-next[data-idx="${projectIdx}"]`);
        
        if (!slidesContainer) return;
        
        // Create indicators (dots)
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'indicator' + (i === 0 ? ' active' : '');
            indicator.addEventListener('click', () => goToSlide(i));
            if (indicatorsContainer) indicatorsContainer.appendChild(indicator);
        }
        
        function goToSlide(index) {
            if (index < 0) index = 0;
            if (index >= totalSlides) index = totalSlides - 1;
            currentIndex = index;
            slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update indicators
            if (indicatorsContainer) {
                const indicators = indicatorsContainer.querySelectorAll('.indicator');
                indicators.forEach((ind, i) => {
                    ind.classList.toggle('active', i === currentIndex);
                });
            }
        }
        
        function nextSlide() {
            if (currentIndex < totalSlides - 1) {
                goToSlide(currentIndex + 1);
            }
        }
        
        function prevSlide() {
            if (currentIndex > 0) {
                goToSlide(currentIndex - 1);
            }
        }
        
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        
        goToSlide(0);
    }

    // 3. Lightbox Modal logic (UPDATED to handle both images AND videos)
    const modal = document.getElementById('lightboxModal');
    const modalImg = document.getElementById('modalImage');
    const modalVideo = document.getElementById('modalVideo');
    
    // If modalVideo doesn't exist in HTML, we'll need to add it (but projects.html already has it)
    
    if (modal && modalImg) {
        // Close modal when clicking X
        const closeModal = document.querySelector('.close-modal');
        if (closeModal) {
            closeModal.onclick = () => {
                modal.style.display = 'none';
                // Stop video playback
                if (modalVideo) modalVideo.innerHTML = '';
            };
        }
        
        // Close modal when clicking outside
        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                if (modalVideo) modalVideo.innerHTML = '';
            }
        };
        
        // Prev/Next buttons for gallery navigation in lightbox
        const prevBtn = document.getElementById('modalPrev');
        const nextBtn = document.getElementById('modalNext');
        let currentMediaArray = [];
        let currentMediaIndex = 0;
        
        // UPDATED: Global function to open lightbox with images OR videos
        window.openLightbox = (mediaType, src, isYouTube, videoId, mediaArray, index) => {
            currentMediaArray = mediaArray;
            currentMediaIndex = index;
            modal.style.display = 'flex';
            updateLightboxContent();
        };
        
        function updateLightboxContent() {
            const item = currentMediaArray[currentMediaIndex];
            if (!item) return;
            
            // Hide both, then show appropriate one
            if (modalImg) modalImg.style.display = 'none';
            if (modalVideo) modalVideo.style.display = 'none';
            if (modalVideo) modalVideo.innerHTML = '';
            
            if (item.type === 'image') {
                if (modalImg) {
                    modalImg.src = item.src;
                    modalImg.style.display = 'block';
                }
            } else if (item.type === 'video') {
                if (modalVideo) {
                    modalVideo.style.display = 'block';
                    if (item.isYouTube) {
                        // YouTube embed
                        const embedUrl = `https://www.youtube.com/embed/${item.videoId}?autoplay=1`;
                        const iframe = document.createElement('iframe');
                        iframe.src = embedUrl;
                        iframe.width = "100%";
                        iframe.height = "400";
                        iframe.style.border = "none";
                        iframe.style.borderRadius = "12px";
                        iframe.allow = "autoplay; fullscreen";
                        modalVideo.appendChild(iframe);
                    } else {
                        // Local video
                        const video = document.createElement('video');
                        video.src = item.src;
                        video.controls = true;
                        video.autoplay = false;
                        video.muted = true;
                        video.style.width = "100%";
                        video.style.maxWidth = "800px";
                        video.style.borderRadius = "12px";
                        modalVideo.appendChild(video);
                    }
                }
            }
        }
        
        function nextMedia() {
            if (currentMediaIndex < currentMediaArray.length - 1) {
                currentMediaIndex++;
                updateLightboxContent();
            }
        }
        
        function prevMedia() {
            if (currentMediaIndex > 0) {
                currentMediaIndex--;
                updateLightboxContent();
            }
        }
        
        if (prevBtn) prevBtn.onclick = prevMedia;
        if (nextBtn) nextBtn.onclick = nextMedia;
    }

    // 4. EmailJS Integration (YOUR EXISTING CODE - PRESERVED)
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
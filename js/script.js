// Fonctions utilitaires
document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    initMobileMenu();
    
    // Témoignages slider
    initTestimonialSlider();
    
    // Formulaire de newsletter
    initNewsletterForm();
    
    // Filtres de galerie
    initGalleryFilters();
    
    // Lightbox pour la galerie
    initLightbox();
    
    // Filtres d'événements
    initEventFilters();
    
    // Formulaire d'inscription aux événements
    initEventRegistration();
    
    // Formulaire de contact
    initContactForm();
    
    // FAQ accordéon
    initFaqAccordion();
    
    // Placeholder pour les images manquantes
    initPlaceholderImages();
});

// Initialisation du menu mobile
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
}

// Initialisation du slider de témoignages
function initTestimonialSlider() {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonialItems.length === 0) return;
    
    let currentIndex = 0;
    
    // Fonction pour afficher un témoignage spécifique
    function showTestimonial(index) {
        testimonialItems.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialItems[index].classList.add('active');
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentIndex = index;
    }
    
    // Événements pour les boutons précédent/suivant
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) {
                newIndex = testimonialItems.length - 1;
            }
            showTestimonial(newIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            let newIndex = currentIndex + 1;
            if (newIndex >= testimonialItems.length) {
                newIndex = 0;
            }
            showTestimonial(newIndex);
        });
    }
    
    // Événements pour les points de navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showTestimonial(index);
        });
    });
    
    // Défilement automatique
    setInterval(function() {
        let newIndex = currentIndex + 1;
        if (newIndex >= testimonialItems.length) {
            newIndex = 0;
        }
        showTestimonial(newIndex);
    }, 5000);
}

// Initialisation du formulaire de newsletter
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterMessage = document.getElementById('newsletter-message');
    
    if (newsletterForm && newsletterMessage) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email === '') {
                newsletterMessage.textContent = 'Veuillez entrer une adresse email valide.';
                newsletterMessage.style.color = '#ff3b30';
                return;
            }
            
            // Simulation d'envoi (à remplacer par un vrai système d'envoi)
            newsletterMessage.textContent = 'Merci pour votre inscription à notre newsletter !';
            newsletterMessage.style.color = '#28a745';
            emailInput.value = '';
            
            // Réinitialisation du message après 5 secondes
            setTimeout(function() {
                newsletterMessage.textContent = '';
            }, 5000);
        });
    }
}

// Initialisation des filtres de galerie
function initGalleryFilters() {
    const filterBtns = document.querySelectorAll('.gallery-filters .filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterBtns.length === 0 || galleryItems.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Mise à jour des boutons actifs
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filtrage des éléments
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Initialisation de la lightbox pour la galerie
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    
    if (!lightbox || galleryItems.length === 0) return;
    
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    let currentIndex = 0;
    
    // Ouverture de la lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const img = item.querySelector('img');
            const title = item.querySelector('.gallery-info h3').textContent;
            const description = item.querySelector('.gallery-info p').textContent;
            
            lightboxImg.src = img.src;
            lightboxTitle.textContent = title;
            lightboxDescription.textContent = description;
            
            lightbox.style.display = 'flex';
            currentIndex = index;
        });
    });
    
    // Fermeture de la lightbox
    if (closeLightbox) {
        closeLightbox.addEventListener('click', function() {
            lightbox.style.display = 'none';
        });
    }
    
    // Navigation dans la lightbox
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            updateLightbox();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % galleryItems.length;
            updateLightbox();
        });
    }
    
    // Mise à jour du contenu de la lightbox
    function updateLightbox() {
        const item = galleryItems[currentIndex];
        const img = item.querySelector('img');
        const title = item.querySelector('.gallery-info h3').textContent;
        const description = item.querySelector('.gallery-info p').textContent;
        
        lightboxImg.src = img.src;
        lightboxTitle.textContent = title;
        lightboxDescription.textContent = description;
    }
    
    // Fermeture de la lightbox en cliquant en dehors
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
    
    // Navigation avec les touches du clavier
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
                updateLightbox();
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % galleryItems.length;
                updateLightbox();
            } else if (e.key === 'Escape') {
                lightbox.style.display = 'none';
            }
        }
    });
}

// Initialisation des filtres d'événements
function initEventFilters() {
    const filterBtns = document.querySelectorAll('.calendar-filters .filter-btn');
    const eventItems = document.querySelectorAll('.event-item');
    
    if (filterBtns.length === 0 || eventItems.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Mise à jour des boutons actifs
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filtrage des événements
            eventItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Initialisation du formulaire d'inscription aux événements
function initEventRegistration() {
    const registerBtns = document.querySelectorAll('.register-btn');
    const registrationForm = document.getElementById('event-registration-form');
    const registrationContainer = document.getElementById('registration-form-container');
    const cancelBtn = document.getElementById('cancel-registration');
    const registrationMessage = document.getElementById('registration-message');
    const eventNameInput = document.getElementById('event-name');
    
    if (registerBtns.length === 0 || !registrationForm || !registrationContainer) return;
    
    // Affichage du formulaire d'inscription
    registerBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const eventName = this.getAttribute('data-event');
            eventNameInput.value = eventName;
            
            registrationContainer.style.display = 'block';
            
            // Scroll vers le formulaire
            registrationContainer.scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Annulation de l'inscription
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            registrationContainer.style.display = 'none';
            registrationForm.reset();
            registrationMessage.textContent = '';
        });
    }
    
    // Soumission du formulaire
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulation d'envoi (à remplacer par un vrai système d'envoi)
            registrationMessage.textContent = 'Votre inscription a été enregistrée avec succès. Vous recevrez une confirmation par email.';
            registrationMessage.style.color = '#28a745';
            
            // Réinitialisation du formulaire après 3 secondes
            setTimeout(function() {
                registrationForm.reset();
                registrationContainer.style.display = 'none';
                registrationMessage.textContent = '';
            }, 3000);
        });
    }
}

// Initialisation du formulaire de contact
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulation d'envoi (à remplacer par un vrai système d'envoi)
            formMessage.textContent = 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.';
            formMessage.style.color = '#28a745';
            
            // Réinitialisation du formulaire après 3 secondes
            setTimeout(function() {
                contactForm.reset();
                formMessage.textContent = '';
            }, 3000);
        });
    }
}

// Initialisation de l'accordéon FAQ
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        question.addEventListener('click', function() {
            // Fermeture des autres réponses
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-answer').style.display = 'none';
                    otherItem.querySelector('.faq-toggle i').className = 'fas fa-plus';
                }
            });
            
            // Ouverture/fermeture de la réponse actuelle
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
                toggle.innerHTML = '<i class="fas fa-plus"></i>';
            } else {
                answer.style.display = 'block';
                toggle.innerHTML = '<i class="fas fa-minus"></i>';
            }
        });
    });
}

// Initialisation des placeholders pour les images manquantes
function initPlaceholderImages() {
    // Placeholder pour l'image d'équipe
    const placeholderImage = document.getElementById('placeholder-image');
    if (placeholderImage) {
        placeholderImage.outerHTML = '<div id="placeholder-image" class="placeholder-image">Image de l\'équipe</div>';
    }
    
    // Placeholder pour les partenaires
    for (let i = 1; i <= 4; i++) {
        const partnerPlaceholder = document.getElementById(`placeholder-partner${i}`);
        if (partnerPlaceholder) {
            partnerPlaceholder.outerHTML = `<div id="placeholder-partner${i}" class="placeholder-partner">Logo Partenaire ${i}</div>`;
        }
    }
    
    // Placeholder pour l'historique
    const historyPlaceholder = document.getElementById('placeholder-history');
    if (historyPlaceholder) {
        historyPlaceholder.outerHTML = '<div id="placeholder-history" class="placeholder-image">Image historique</div>';
    }
    
    // Placeholder pour les membres
    for (let i = 1; i <= 4; i++) {
        const memberPlaceholder = document.getElementById(`placeholder-member${i}`);
        if (memberPlaceholder) {
            memberPlaceholder.outerHTML = `<div id="placeholder-member${i}" class="placeholder-image">Photo Membre ${i}</div>`;
        }
    }
    
    // Placeholder pour les activités
    for (let i = 1; i <= 4; i++) {
        const activityPlaceholder = document.getElementById(`placeholder-activity${i}`);
        if (activityPlaceholder) {
            activityPlaceholder.outerHTML = `<div id="placeholder-activity${i}" class="placeholder-image">Image Activité ${i}</div>`;
        }
    }
    
    // Placeholder pour les événements passés
    for (let i = 1; i <= 3; i++) {
        const pastPlaceholder = document.getElementById(`placeholder-past${i}`);
        if (pastPlaceholder) {
            pastPlaceholder.outerHTML = `<div id="placeholder-past${i}" class="placeholder-image">Image Événement Passé ${i}</div>`;
        }
    }
    
    // Placeholder pour la galerie
    for (let i = 1; i <= 9; i++) {
        const galleryPlaceholder = document.getElementById(`placeholder-gallery${i}`);
        if (galleryPlaceholder) {
            galleryPlaceholder.outerHTML = `<div id="placeholder-gallery${i}" class="placeholder-image">Image Galerie ${i}</div>`;
        }
    }
    
    // Placeholder pour les vidéos
    for (let i = 1; i <= 2; i++) {
        const videoPlaceholder = document.getElementById(`placeholder-video${i}`);
        if (videoPlaceholder) {
            videoPlaceholder.outerHTML = `<div id="placeholder-video${i}" class="placeholder-video">Vidéo ${i}</div>`;
        }
    }
    
    // Placeholder pour la carte
    const mapPlaceholder = document.getElementById('map-placeholder');
    if (mapPlaceholder) {
        mapPlaceholder.innerHTML = '<div class="map-placeholder"><i class="fas fa-map-marked-alt"></i><p>Carte interactive</p></div>';
    }
}

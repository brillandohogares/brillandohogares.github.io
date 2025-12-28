// script.js - Adaptado para Brillando Hogares
// CONFIGURACIÓN EMAILJS - REEMPLAZA CON TUS DATOS
const EMAILJS_PUBLIC_KEY = 'c-mrba8zz1-difgp2'; // Reemplaza con tu clave
const EMAILJS_SERVICE_ID = 'service_ww3blil'; // Reemplaza con tu Service ID
const EMAILJS_TEMPLATE_ID = 'template_tml3c3r'; // Reemplaza con tu Template ID

// Inicializar EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);
console.log('✅ EmailJS inicializado correctamente');

// ============================================
// MENÚ MÓVIL
// ============================================
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    const icon = this.querySelector('i');
    
    navLinks.classList.toggle('active');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        const menuBtnIcon = document.querySelector('.mobile-menu-btn i');
        
        navLinks.classList.remove('active');
        menuBtnIcon.classList.add('fa-bars');
        menuBtnIcon.classList.remove('fa-times');
    });
});

// ============================================
// FORMULARIO DE CONTACTO CON EMAILJS
// ============================================
document.getElementById('formContacto').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener valores del formulario
    const nombre = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const telefono = this.querySelector('input[type="tel"]').value;
    const servicio = this.querySelector('select').value;
    const mensaje = this.querySelector('textarea').value;
    
    // Validación básica
    if (!nombre || !email || !telefono || !servicio || !mensaje) {
        showModal('error', 'Por favor, completa todos los campos requeridos.');
        return;
    }
    
    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showModal('error', 'Por favor, ingresa un email válido.');
        return;
    }
    
    // Mostrar modal de carga
    const loadingModal = showModal('loading', 'Enviando tu solicitud...');
    
    // Preparar parámetros para EmailJS
    const templateParams = {
        from_name: nombre,
        from_email: email,
        telefono: telefono,
        servicio: servicio,
        message: mensaje,
        to_name: 'Brillando Hogares',
        reply_to: email,
        date: new Date().toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };
    
    // Enviar email usando EmailJS
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(function(response) {
            console.log('✅ Email enviado exitosamente!', response.status, response.text);
            
            // Cerrar modal de carga
            if (loadingModal && loadingModal.parentNode) {
                document.body.removeChild(loadingModal);
            }
            
            // Mostrar modal de éxito
            showModal('success', `¡Gracias ${nombre}! Tu solicitud ha sido enviada correctamente. Te contactaremos pronto al teléfono ${telefono} para darle seguimiento.`);
            
            // Limpiar formulario
            e.target.reset();
            
        }, function(error) {
            console.log('❌ Error al enviar email:', error);
            
            // Cerrar modal de carga
            if (loadingModal && loadingModal.parentNode) {
                document.body.removeChild(loadingModal);
            }
            
            // Mostrar modal de error
            let errorMessage = 'Ocurrió un error al enviar tu solicitud. Por favor, intenta de nuevo o contáctanos directamente por teléfono.';
            if (error.text) {
                errorMessage += ` Error: ${error.text}`;
            }
            showModal('error', errorMessage);
        });
});

// ============================================
// FUNCIÓN PARA MOSTRAR MODALES (simplificada)
// ============================================
function showModal(type, message = '') {
    // Eliminar modal existente si hay
    const existingModal = document.querySelector('.custom-modal-overlay');
    if (existingModal) {
        document.body.removeChild(existingModal);
    }
    
    // Crear overlay del modal
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'custom-modal-overlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        animation: fadeIn 0.3s ease-out;
    `;
    
    let modalContent = '';
    
    if(type === 'loading') {
        modalContent = `
            <div class="modal-content" style="
                background: white;
                padding: 40px 30px;
                border-radius: 10px;
                max-width: 450px;
                width: 90%;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                animation: modalAppear 0.4s ease-out;
            ">
                <div class="modal-loader" style="
                    width: 60px;
                    height: 60px;
                    margin: 0 auto 25px;
                    border: 5px solid #f0f0f0;
                    border-top: 5px solid #2a9d8f;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                "></div>
                <h3 style="color: #264653; margin-bottom: 15px;">Enviando...</h3>
                <p style="color: #666;">${message}</p>
            </div>
        `;
    } else if(type === 'success') {
        modalContent = `
            <div class="modal-content" style="
                background: white;
                padding: 50px 30px;
                border-radius: 10px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                animation: modalAppear 0.4s ease-out;
            ">
                <div style="
                    width: 70px;
                    height: 70px;
                    background: #2a9d8f;
                    border-radius: 50%;
                    margin: 0 auto 25px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">
                    <i class="fas fa-check" style="font-size: 35px; color: white;"></i>
                </div>
                <h3 style="color: #264653; margin-bottom: 20px;">¡Solicitud Enviada!</h3>
                <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">${message}</p>
                <button id="modalCloseBtn" style="
                    padding: 12px 35px;
                    background: #2a9d8f;
                    color: white;
                    font-weight: 600;
                    border: none;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: all 0.3s;
                ">Continuar</button>
            </div>
        `;
    } else if(type === 'error') {
        modalContent = `
            <div class="modal-content" style="
                background: white;
                padding: 50px 30px;
                border-radius: 10px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                animation: modalAppear 0.4s ease-out;
            ">
                <div style="
                    width: 70px;
                    height: 70px;
                    background: #e63946;
                    border-radius: 50%;
                    margin: 0 auto 25px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">
                    <i class="fas fa-exclamation-triangle" style="font-size: 35px; color: white;"></i>
                </div>
                <h3 style="color: #264653; margin-bottom: 20px;">Error</h3>
                <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">${message}</p>
                <button id="modalCloseBtn" style="
                    padding: 12px 35px;
                    background: #e63946;
                    color: white;
                    font-weight: 600;
                    border: none;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: all 0.3s;
                ">Intentar de nuevo</button>
            </div>
        `;
    }
    
    modalOverlay.innerHTML = modalContent;
    document.body.appendChild(modalOverlay);
    
    // Añadir estilos de animación
    addModalStyles();
    
    // Configurar eventos de los botones del modal
    setTimeout(() => {
        const closeBtn = document.getElementById('modalCloseBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                document.body.removeChild(modalOverlay);
            });
        }
        
        // Cerrar al hacer clic fuera del modal
        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) {
                document.body.removeChild(modalOverlay);
            }
        });
    }, 10);
    
    return modalOverlay;
}

// ============================================
// ESTILOS PARA LOS MODALES
// ============================================
function addModalStyles() {
    if (document.getElementById('modal-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'modal-styles';
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes modalAppear {
            from {
                opacity: 0;
                transform: translateY(-50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        #modalCloseBtn:hover {
            opacity: 0.9;
            transform: translateY(-2px);
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// HEADER SCROLL EFFECT
// ============================================
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ============================================
// PARTÍCULAS
// ============================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Posición aleatoria
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const size = Math.random() * 4 + 1;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animation = `float ${duration}s infinite ${delay}s`;
        
        // Color con variaciones
        const colorVariations = ['#2a9d8f', '#8ecae6', '#0d6b5c'];
        const color = colorVariations[Math.floor(Math.random() * colorVariations.length)];
        
        particle.style.backgroundColor = color;
        particle.style.opacity = Math.random() * 0.4 + 0.1;
        
        particlesContainer.appendChild(particle);
    }
}

// ============================================
// ANIMACIONES SCROLL
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Retraso secuencial para elementos de la cuadrícula
                if (entry.target.classList.contains('service-card')) {
                    const cards = Array.from(entry.target.parentNode.children);
                    const delay = cards.indexOf(entry.target) * 0.1;
                    entry.target.style.transitionDelay = `${delay}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    document.querySelectorAll('.service-card, .about-text, .about-image, .contact-info, .contact-form').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// ============================================
// EFECTO DE ESCRITURA PARA EL TÍTULO
// ============================================
function typeWriterEffect() {
    const title = document.querySelector('.hero h1');
    if (!title) return;
    
    const originalText = title.textContent;
    title.textContent = '';
    
    // Solo activar en pantallas grandes
    if (window.innerWidth > 768) {
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                title.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            }
        }
        setTimeout(typeWriter, 500);
    } else {
        title.textContent = originalText;
    }
}

// ============================================
// INICIALIZACIÓN CUANDO LA PÁGINA CARGA
// ============================================
window.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes
    createParticles();
    initScrollAnimations();
    typeWriterEffect();
    
    // Añadir clase de animación inicial
    document.body.classList.add('loaded');
    
    // Prevenir reenvío del formulario al recargar la página
    if (window.history.replaceState) {
        window.history.replaceState(null, null, window.location.href);
    }
});
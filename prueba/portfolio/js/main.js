document.addEventListener('DOMContentLoaded', function() {
    // Efecto de scroll en el menú
    const nav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-links a');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Cambio de fuente según la sección activa
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Cerrar menú móvil si está abierto
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }

            // Remover clase active de todos los links
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Obtener la sección objetivo
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            // Cambiar la fuente del body según el data-font
            const font = this.getAttribute('data-font');
            document.body.style.fontFamily = getFontStack(font);

            // Scroll suave a la sección
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    function getFontStack(font) {
        switch(font) {
            case 'playfair':
                return "'Playfair Display', serif";
            case 'rajdhani':
                return "'Rajdhani', sans-serif";
            case 'space-mono':
                return "'Space Mono', monospace";
            default:
                return "'Rajdhani', sans-serif";
        }
    }

    // Menú hamburguesa para móvil
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un link (móvil)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Efecto de typing en la sección de inicio
    const typedTextSpan = document.querySelector('.typed-text');
    if (typedTextSpan) {
        const typedText = new Typed('.typed-text', {
            strings: ['Frontend', 'Desarrollador Web', 'Diseñador UI/UX', 'Creador de Experiencias'],
            typeSpeed: 80,
            backSpeed: 50,
            loop: true,
            loopCount: Infinity,
            showCursor: true,
            cursorChar: '|'
        });
    }

    // Animación de las barras de habilidades al hacer scroll
    const skillBars = document.querySelectorAll('.bar');
    const skillCategories = document.querySelectorAll('.skill-category');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
            }
        });
    }, { threshold: 0.5 });

    skillCategories.forEach(category => {
        observer.observe(category);
    });

    // Animación de los círculos de progreso
    const progressBars = document.querySelectorAll('.progress-bar');
    const progressCircles = document.querySelectorAll('.circle-progress');

    progressCircles.forEach(circle => {
        const percent = circle.getAttribute('data-percent');
        const progressBar = circle.querySelector('.progress-bar');
        const progressText = circle.querySelector('.progress-text');

        let currentPercent = 0;
        const interval = setInterval(() => {
            if (currentPercent >= percent) {
                clearInterval(interval);
            } else {
                currentPercent++;
                progressText.textContent = `${currentPercent}%`;

                const offset = 283 - (283 * currentPercent) / 100;
                progressBar.style.strokeDashoffset = offset;
            }
        }, 20);
    });

    // Efecto parallax en las tarjetas de proyecto
    const projectCards = document.querySelectorAll('.project-card');

    document.addEventListener('mousemove', (e) => {
        projectCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const angleX = (x - centerX) / 20;
            const angleY = (y - centerY) / 20;

            card.style.transform = `perspective(1000px) rotateX(${angleY}deg) rotateY(${angleX}deg) scale(1.02)`;
            card.style.transition = 'transform 0.3s ease-out';
        });
    });

    projectCards.forEach(card => {
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // Cambiar fuente según la sección al cargar la página
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.6
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

                // Remover clase active de todos los links
                navLinks.forEach(link => link.classList.remove('active'));

                // Agregar clase active al link correspondiente
                if (activeLink) {
                    activeLink.classList.add('active');

                    // Cambiar la fuente del body
                    const font = activeLink.getAttribute('data-font');
                    document.body.style.fontFamily = getFontStack(font);
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Inicializar con la primera sección activa
    const firstLink = document.querySelector('.nav-links a:first-child');
    if (firstLink) {
        firstLink.classList.add('active');
        const font = firstLink.getAttribute('data-font');
        document.body.style.fontFamily = getFontStack(font);
    }
});
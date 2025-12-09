document.addEventListener('DOMContentLoaded', function() {
    const bgElements = document.querySelectorAll('.bg-element');

    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        bgElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-speed'));
            const x = (window.innerWidth - mouseX * speed) / 100;
            const y = (window.innerHeight - mouseY * speed) / 100;

            element.style.transform = `translate(${x}px, ${y}px)`;

            // Cambiar opacidad según la posición del ratón
            const rect = element.getBoundingClientRect();
            const distance = Math.sqrt(
                Math.pow(mouseX - (rect.left + rect.width / 2), 2) +
                Math.pow(mouseY - (rect.top + rect.height / 2), 2)
            );

            const maxDistance = Math.max(window.innerWidth, window.innerHeight);
            const opacity = 0.7 - (distance / maxDistance) * 0.5;
            element.style.opacity = Math.max(0.2, opacity);
        });
    });

    // Efecto de parallax al hacer scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;

        bgElements.forEach((element, index) => {
            const speed = parseFloat(element.getAttribute('data-speed'));
            const yPos = scrollPosition * speed * 0.5;
            element.style.transform += ` translateY(${yPos}px)`;
        });
    });

    // Animación inicial de los elementos
    bgElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '0.7';
        }, index * 300);
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Initialize 3D background
    VANTA.NET({
        el: "#hero",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x3fddff,
        backgroundColor: 0x0f0f1a,
        points: 12.00,
        maxDistance: 22.00,
        spacing: 18.00
    });

    // DOM elements
    const mysteryBox = document.querySelector('.mystery-box');
    const navButtons = document.querySelector('.nav-buttons');
    const ctaButton = document.querySelector('.cta-button');
    let isNavOpen = false;

    // Toggle navigation visibility
    function toggleNavigation() {
        if (isNavOpen) {
            // Close navigation
            navButtons.classList.remove('buttons-appear');
            setTimeout(() => {
                navButtons.style.display = 'none';
                mysteryBox.classList.remove('box-open');
            }, 500);
        } else {
            // Open navigation
            navButtons.style.display = 'flex';
            setTimeout(() => {
                navButtons.classList.add('buttons-appear');
                mysteryBox.classList.add('box-open');
            }, 10);
        }
        isNavOpen = !isNavOpen;
    }

    // Event listeners
    mysteryBox.addEventListener('click', toggleNavigation);
    
    ctaButton.addEventListener('click', toggleNavigation);

    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-button').forEach(button => {
        if (button.getAttribute('href') === currentPage) {
            button.classList.add('active');
        }
    });

    // 3D hover effect for CTA button
    ctaButton.addEventListener('mousemove', (e) => {
        const rect = ctaButton.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const angleX = (y - centerY) / 15;
        const angleY = (centerX - x) / 15;
        
        ctaButton.style.transform = `perspective(500px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-5px)`;
    });

    ctaButton.addEventListener('mouseleave', () => {
        ctaButton.style.transform = 'perspective(500px) rotateX(0) rotateY(0) translateY(-5px)';
    });

    // Close nav when clicking outside
    document.addEventListener('click', (e) => {
        if (isNavOpen && 
            !navButtons.contains(e.target) && 
            !mysteryBox.contains(e.target) &&
            !ctaButton.contains(e.target)) {
            toggleNavigation();
        }
    });
});


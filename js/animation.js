// Functie voor de zwevende elementen
function animateFloatingElements() {
    const elements = document.querySelectorAll('.floating-element');
    
    elements.forEach((element, index) => {
        // Verschillende startposities voor elk element
        const delay = index * 0.2;
        
        element.style.animation = `
            float 3s ease-in-out infinite ${delay}s,
            glow 2s ease-in-out infinite ${delay}s
        `;
    });
}

// Voeg de keyframe animaties dynamisch toe
const styleSheet = document.createElement('style');
document.head.appendChild(styleSheet);

styleSheet.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
    }
    
    @keyframes glow {
        0%, 100% { box-shadow: 0 0 5px rgba(99, 102, 241, 0.5); }
        50% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.8); }
    }
`;

// Voeg deze code toe aan je bestaande animation.js
function initializeInteractiveBalls() {
    const container = document.querySelector('.interactive-container');
    const balls = document.querySelectorAll('.interactive-ball');

    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        balls.forEach((ball, index) => {
            const ballCenterX = ball.offsetLeft + ball.offsetWidth / 2;
            const ballCenterY = ball.offsetTop + ball.offsetHeight / 2;

            const deltaX = mouseX - ballCenterX;
            const deltaY = mouseY - ballCenterY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
            const maxDistance = 200;
            const influence = Math.max(0, 1 - distance / maxDistance);
            
            const moveX = deltaX * influence * 0.1;
            const moveY = deltaY * influence * 0.1;
            const scale = 1 + influence * 0.3;
            const glow = influence * 20;

            ball.style.transform = `
                translate(${ball.dataset.baseX || '0px'}, ${ball.dataset.baseY || '0px'})
                translate(${moveX}px, ${moveY}px)
                scale(${scale})
            `;
            ball.style.boxShadow = `0 0 ${glow}px rgba(99, 102, 241, ${influence * 0.8})`;
        });
    });

    // Sla de originele posities op
    balls.forEach((ball) => {
        const style = window.getComputedStyle(ball);
        const transform = style.transform;
        ball.dataset.baseX = transform.split('translate(')[1]?.split(',')[0] || '0px';
        ball.dataset.baseY = transform.split(',')[1]?.split(')')[0] || '0px';
    });

    // Reset posities wanneer muis het container verlaat
    container.addEventListener('mouseleave', () => {
        balls.forEach((ball) => {
            ball.style.transform = `translate(${ball.dataset.baseX}, ${ball.dataset.baseY})`;
            ball.style.boxShadow = '0 0 5px rgba(99, 102, 241, 0.3)';
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const cube = document.querySelector(".cube");
    let rotationY = 0;
    let rotationX = 0;
    let isAnimating = true;
    let speed = 1; // Start snelheid
    let animationFrame;

    function animateCube() {
        if (isAnimating) {
            rotationY += speed; // Voegt snelheid toe aan rotatie
            rotationX += speed / 2; // Zorgt voor variatie in rotatie
            cube.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
        }

        animationFrame = requestAnimationFrame(animateCube);
    }

    // Start de animatie
    animateCube();

    cube.addEventListener("click", () => {
        if (isAnimating) {
            // Soepel vertragen tot stilstand
            const slowdown = () => {
                if (speed > 0.01) {
                    speed *= 0.9; // Verminder de snelheid geleidelijk
                    requestAnimationFrame(slowdown);
                } else {
                    speed = 0;
                    isAnimating = false;
                }
            };
            slowdown();
        } else {
            // Soepel weer versnellen
            const speedUp = () => {
                if (speed < 1) {
                    speed += 0.02; // Verhoog snelheid geleidelijk
                    requestAnimationFrame(speedUp);
                } else {
                    speed = 1;
                    isAnimating = true;
                }
            };
            isAnimating = true;
            speedUp();
        }
    });
});


// Wacht tot de pagina geladen is
document.addEventListener('DOMContentLoaded', initializeCube);


// Start de animaties wanneer de pagina geladen is
document.addEventListener('DOMContentLoaded', () => {
    animateFloatingElements();
    
    // Markeer actieve navigatie link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    initializeInteractiveBalls();
    initializeCube();

    const cube = document.querySelector('.cube');
    let rotationY = 0;
    let rotationX = 0;

    function rotateCube() {
        rotationY += 1; // Verhoog de rotatiehoek voor een vloeiende draai
        cube.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
        requestAnimationFrame(rotateCube);
    }

    // Start de rotatie
    rotateCube();

    // Voeg click event toe om te pauzeren/hervatten
    let isPaused = false;
    cube.addEventListener('click', () => {
        if (isPaused) {
            rotateCube();
        } else {
            cancelAnimationFrame(rotateCube);
        }
        isPaused = !isPaused;
    });
});

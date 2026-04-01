// Эффект шариков за мышкой (Canvas)
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let particles = [];

const colors = ['#00a8ff', '#4cd137', '#00d2d3', '#0097e6', '#44bd32', '#7efff5'];

for (let i = 0; i < 60; i++) {
    particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 15 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        velocity: {
            x: (Math.random() - 0.5) * 1.5,
            y: (Math.random() - 0.5) * 1.5
        }
    });
}

function drawParticles() {
    ctx.clearRect(0, 0, width, height);
    
    particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.shadowColor = 'cyan';
        ctx.shadowBlur = 20;
        ctx.fill();
        
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;
        
        if (particle.x + particle.radius > width || particle.x - particle.radius < 0) {
            particle.velocity.x = -particle.velocity.x;
        }
        if (particle.y + particle.radius > height || particle.y - particle.radius < 0) {
            particle.velocity.y = -particle.velocity.y;
        }
    });
    
    requestAnimationFrame(drawParticles);
}

drawParticles();

window.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    
    particles.forEach(particle => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
            const angle = Math.atan2(dy, dx);
            const force = (100 - distance) / 100;
            particle.x -= Math.cos(angle) * force * 8;
            particle.y -= Math.sin(angle) * force * 8;
        }
    });
});

window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
});
// ========== АНІМАЦІЯ ЛІЧИЛЬНИКІВ ==========
const counters = document.querySelectorAll('.counter-number');

const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-count'));
    let current = 0;
    const increment = target / 50;
    const updateCounter = () => {
        if (current < target) {
            current += increment;
            counter.innerText = Math.ceil(current);
            setTimeout(updateCounter, 30);
        } else {
            counter.innerText = target;
        }
    };
    updateCounter();
};

// Запускаємо анімацію, коли лічильники з'являються на екрані
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            animateCounter(counter);
            observer.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    observer.observe(counter);
});

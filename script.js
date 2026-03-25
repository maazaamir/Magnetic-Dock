// 1. Magnetic Dock Logic
const dockItems = document.querySelectorAll('.dock-item');

dockItems.forEach(item => {
    const xTo = gsap.quickTo(item, "x", { duration: 0.8, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(item, "y", { duration: 0.8, ease: "elastic.out(1, 0.3)" });

    item.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = item.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;

        xTo(deltaX * 0.4);
        yTo(deltaY * 0.4);
    });

    item.addEventListener('mouseleave', () => {
        xTo(0);
        yTo(0);
    });
});

// 2. Background Parallax Text Logic
window.addEventListener("mousemove", (e) => {
    const xPos = (e.clientX / window.innerWidth - 0.5) * 40; // Moves 40px max
    const yPos = (e.clientY / window.innerHeight - 0.5) * 40;

    gsap.to(".bg-text-container", {
        x: xPos,
        y: yPos,
        duration: 1.5,
        ease: "power2.out"
    });
});

// 3. Entry Animations
const tl = gsap.timeline();

tl.from(".bg-text", {
    y: 100,
    opacity: 0,
    stagger: 0.2,
    duration: 1.5,
    ease: "expo.out"
});

tl.from(".mds-dock", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "back.out(1.7)"
}, "-=1");
// 4. Floating Button Pulse & Mouse Glow
const mdsBtn = document.querySelector('.mds-btn');

// Subtle "Breathing" Pulse
gsap.to(mdsBtn, {
    scale: 1.05,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

// Interactive Glow Follow
mdsBtn.addEventListener('mousemove', (e) => {
    const { left, top, width, height } = mdsBtn.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    mdsBtn.style.setProperty('--x', `${x}%`);
    mdsBtn.style.setProperty('--y', `${y}%`);
});

// Entry Animation for CTA
gsap.from(".mds-cta-container", {
    x: 100,
    opacity: 0,
    duration: 1.5,
    ease: "expo.out",
    delay: 1.2
});
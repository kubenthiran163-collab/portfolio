document.addEventListener("DOMContentLoaded", () => {
    
    /* ================= PRELOADER & GSAP INITIALIZATION ================= */
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.visibility = 'hidden';
            document.body.classList.remove('loading');
            
            // GSAP Intro
            if(typeof gsap !== 'undefined') {
                gsap.from(".hero__badge", { y: -30, opacity: 0, duration: 1, ease: "power4.out" });
                gsap.from(".hero__title", { y: 50, opacity: 0, duration: 1.2, delay: 0.2, ease: "power4.out" });
                gsap.from(".hero__subtitle", { y: 30, opacity: 0, duration: 1, delay: 0.4, ease: "power4.out" });
                gsap.from(".hero__description", { y: 30, opacity: 0, duration: 1, delay: 0.6, ease: "power4.out" });
                gsap.from(".hero__buttons", { y: 30, opacity: 0, duration: 1, delay: 0.8, ease: "power4.out" });
                gsap.from(".hologram-wrapper", { scale: 0.5, opacity: 0, duration: 2, delay: 0.4, ease: "expo.out" });
            }
        }, 500);
    }, 1500);

    /* ================= SCROLL PROGRESS & NAV ================= */
    const scrollBar = document.getElementById('scroll-bar');
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollBar.style.width = scrollPercent + '%';
        
        if(scrollTop >= 50) header.classList.add('scroll');
        else header.classList.remove('scroll');
    });

    /* ================= MAGNETIC CURSOR ================= */
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const spotlight = document.querySelector('.spotlight');
    const magneticElements = document.querySelectorAll('.magnetic');

    if(window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 300, fill: "forwards" });

            spotlight.style.opacity = '1';
            spotlight.style.setProperty('--mouse-x', `${posX}px`);
            spotlight.style.setProperty('--mouse-y', `${posY}px`);
        });

        document.addEventListener('mouseleave', () => { spotlight.style.opacity = '0'; });

        magneticElements.forEach(el => {
            el.addEventListener('mouseenter', () => { cursorOutline.classList.add('hover'); });
            el.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('hover');
                if(typeof gsap !== 'undefined') { gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" }); }
            });
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                if(typeof gsap !== 'undefined') { gsap.to(el, { x: x * 0.4, y: y * 0.4, duration: 0.6, ease: "power3.out" }); }
            });
        });
    }

    /* ================= BUTTON RIPPLE ================= */
    const rippleBtns = document.querySelectorAll('.ripple-btn');
    rippleBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            let x = e.clientX - e.target.getBoundingClientRect().left;
            let y = e.clientY - e.target.getBoundingClientRect().top;
            
            let ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            this.appendChild(ripple);
            setTimeout(() => { ripple.remove(); }, 600);
        });
    });

    /* ================= MOBILE MENU TOGGLE ================= */
    const navMenu = document.getElementById('nav-menu'),
          navToggle = document.getElementById('nav-toggle'),
          navClose = document.getElementById('nav-close');

    if(navToggle) { navToggle.addEventListener('click', () => { navMenu.classList.add('show-menu'); }); }
    if(navClose) { navClose.addEventListener('click', () => { navMenu.classList.remove('show-menu'); }); }
    document.querySelectorAll('.nav__link').forEach(link => { link.addEventListener('click', () => { navMenu.classList.remove('show-menu'); }); });

    /* ================= EXACT TYPING EFFECT ================= */
    const typedTextSpan = document.querySelector(".typed-text");
    const textArray = ["AI Engineer", "Machine Learning Engineer", "Python Developer", "Full Stack Developer", "Software Engineer"];
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
      if(!typedTextSpan) return;
      if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 80);
      } else {
        setTimeout(erase, 2000);
      }
    }

    function erase() {
      if(!typedTextSpan) return;
      if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
        charIndex--;
        setTimeout(erase, 40);
      } else {
        textArrayIndex++;
        if(textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, 500);
      }
    }
    setTimeout(type, 2200);

    /* ================= GSAP SCROLL ANIMATIONS ================= */
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        gsap.utils.toArray('.gsap-fade-up').forEach(element => {
            gsap.from(element, {
                scrollTrigger: { trigger: element, start: "top 85%", toggleActions: "play none none reverse" },
                y: 60, opacity: 0, duration: 1, ease: "power4.out"
            });
        });
    }

    /* ================= COUNTERS ================= */
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const inc = target / 50;
                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 40);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));

    /* ================= THREE.JS NEURAL NETWORK BACKGROUND ================= */
    if(typeof THREE !== 'undefined') {
        const container = document.getElementById('canvas-container');
        if(container) {
            const scene = new THREE.Scene();
            scene.fog = new THREE.FogExp2(0x030712, 0.0015);

            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 120;

            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            container.appendChild(renderer.domElement);

            const particlesGeometry = new THREE.BufferGeometry();
            const particlesCount = window.innerWidth < 768 ? 300 : 800;
            const posArray = new Float32Array(particlesCount * 3);
            const colorsArray = new Float32Array(particlesCount * 3);

            for(let i = 0; i < particlesCount * 3; i+=3) {
                posArray[i] = (Math.random() - 0.5) * 400; // x
                posArray[i+1] = (Math.random() - 0.5) * 400; // y
                posArray[i+2] = (Math.random() - 0.5) * 400; // z

                // Cyan / Blue mix
                const isCyan = Math.random() > 0.5;
                colorsArray[i] = isCyan ? 0.0 : 0.2; // R
                colorsArray[i+1] = isCyan ? 0.8 : 0.5; // G
                colorsArray[i+2] = 1.0; // B
            }

            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

            const material = new THREE.PointsMaterial({ size: 2, vertexColors: true, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
            const particlesMesh = new THREE.Points(particlesGeometry, material);
            scene.add(particlesMesh);

            let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
            const windowHalfX = window.innerWidth / 2, windowHalfY = window.innerHeight / 2;

            document.addEventListener('mousemove', (e) => { mouseX = (e.clientX - windowHalfX); mouseY = (e.clientY - windowHalfY); });

            const clock = new THREE.Clock();
            function animate() {
                requestAnimationFrame(animate);
                const elapsedTime = clock.getElapsedTime();

                particlesMesh.rotation.y = elapsedTime * 0.05;
                particlesMesh.rotation.x = elapsedTime * 0.02;

                targetX = mouseX * 0.05;
                targetY = mouseY * 0.05;
                camera.position.x += (targetX - camera.position.x) * 0.02;
                camera.position.y += (-targetY - camera.position.y) * 0.02;
                camera.lookAt(scene.position);

                renderer.render(scene, camera);
            }
            animate();

            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
        }
    }
});

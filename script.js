document.addEventListener("DOMContentLoaded", () => {
    const portal = document.querySelector(".portal");
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    const giftBtn = document.querySelector(".gift-btn");
    const card = document.querySelector(".card");
    const closeCard = document.querySelector(".close-card");
    const music = document.getElementById("bg-music");

    // Portal Animation
    portal.addEventListener("click", () => {
        gsap.to(container, {
            opacity: 0, duration: 1, onComplete: () => {
                container.style.display = "none";
                main.classList.remove("hidden");
                gsap.fromTo(".birthday-text",
                    { y: -50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
                );
                gsap.from(".balloon", { y: 300, opacity: 0, duration: 1.5 });
                gsap.from(".gift-btn", { scale: 0, duration: 0.5 });
                music.play();
            }
        });
    });

    // Gift Button Click
    giftBtn.addEventListener("click", () => {
        card.classList.remove("hidden");
        gsap.from(".card", { scale: 0, duration: 0.5 });
    });

    // Close Card
    closeCard.addEventListener("click", () => {
        gsap.to(".card", {
            scale: 0, duration: 0.5, onComplete: () => {
                card.classList.add("hidden");
            }
        });
    });
});

// Inisialisasi Canvas
const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Array untuk menyimpan efek ledakan
let particles = [];

// Fungsi Membuat Ledakan Berbentuk Hati
function createHeartExplosion(x, y) {
    let colors = ["#ff0000", "#ff00ff", "#ff8800", "#ffff00", "#00ff00", "#00ffff", "#0080ff"];
    let numParticles = 50; // Jumlah partikel diperbanyak

    for (let i = 0; i < numParticles; i++) {
        let angle = (i / numParticles) * Math.PI * 2;
        let speed = Math.random() * 2 + 1; // Kecepatan dikurangi biar lebih lambat
        let color = colors[Math.floor(Math.random() * colors.length)];

        let vx = Math.cos(angle) * speed;
        let vy = Math.sin(angle) * speed;

        particles.push({
            x, y, vx, vy, color, life: 200, size: Math.random() * 5 + 3 // Durasi partikel lebih panjang
        });
    }

    // Menampilkan hati setelah ledakan
    setTimeout(() => drawHeart(x, y, 10, "pink"), 500);
}

// Fungsi untuk menggambar hati
function drawHeart(x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < Math.PI * 2; i += 0.1) {
        let xPos = x + size * 16 * Math.pow(Math.sin(i), 3);
        let yPos = y - size * (13 * Math.cos(i) - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i));
        ctx.fillRect(xPos, yPos, 4, 4);
    }
}

// Update & Render
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.x += p.vx * 0.5; // Gerakan lebih lambat
        p.y += p.vy * 0.5; // Gerakan lebih lambat
        p.life--;
        p.size *= 0.99; // Partikel mengecil lebih perlahan

        if (p.life <= 0) {
            particles.splice(i, 1);
            i--;
        } else {
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    requestAnimationFrame(update);
}

// Event Klik untuk Kembang Api
document.addEventListener("click", (e) => {
    for (let i = 0; i < 3; i++) { // Setiap klik, muncul 3 ledakan
        setTimeout(() => {
            createHeartExplosion(
                e.clientX + Math.random() * 100 - 50,
                e.clientY + Math.random() * 100 - 50
            );
        }, i * 500); // Waktu antar ledakan lebih lama
    }
});

// Ledakan Random Tiap 2 Detik (lebih jarang)
setInterval(() => {
    for (let i = 0; i < 3; i++) { // Sekarang ada 3 ledakan sekaligus!
        let x = Math.random() * canvas.width;
        let y = Math.random() * (canvas.height - 150) + 50;
        setTimeout(() => createHeartExplosion(x, y), i * 500);
    }
}, 2000);

// Resize Canvas jika ukuran layar berubah
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Jalankan Animasi
update();


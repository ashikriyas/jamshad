// ==========================================================================
// ROYAL ISLAMIC WEDDING INVITATION — JAVASCRIPT
// Mohammed Jamshad K.A & Ayishath Safwana (19 Dec 2026)
// ==========================================================================

// --- 1. GOLDEN STARDUST & SPARKLES CANVAS ---
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = window.innerWidth < 768 ? 45 : 85;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class GoldParticle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2.8 + 0.8;
    this.speedY = -(Math.random() * 0.45 + 0.15); // gentle floating upward
    this.speedX = (Math.random() - 0.5) * 0.35;
    this.opacity = Math.random() * 0.7 + 0.2;
    this.fadeSpeed = Math.random() * 0.008 + 0.004;
    this.fadingIn = Math.random() > 0.5;
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;

    // Twinkle opacity
    if (this.fadingIn) {
      this.opacity += this.fadeSpeed;
      if (this.opacity >= 0.85) this.fadingIn = false;
    } else {
      this.opacity -= this.fadeSpeed;
      if (this.opacity <= 0.15) this.fadingIn = true;
    }

    // Reset when off top screen
    if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
      this.y = canvas.height + 10;
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(223, 183, 108, ${this.opacity})`;
    ctx.shadowBlur = this.size * 3;
    ctx.shadowColor = 'rgba(255, 235, 175, 0.8)';
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

for (let i = 0; i < particleCount; i++) {
  particles.push(new GoldParticle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// --- 2. CELEBRATORY CONFETTI & PETALS SYSTEM ---
function launchConfetti(x = 0.5, y = 0.6) {
  const colors = ['#dfb76c', '#fbe5a7', '#ffffff', '#e8c582', '#9e2a2b', '#104f37'];
  const confettiCount = 50;
  
  for (let i = 0; i < confettiCount; i++) {
    const el = document.createElement('div');
    el.style.position = 'fixed';
    el.style.left = (x * window.innerWidth) + 'px';
    el.style.top = (y * window.innerHeight) + 'px';
    el.style.width = Math.random() * 8 + 6 + 'px';
    el.style.height = Math.random() * 12 + 6 + 'px';
    el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    el.style.pointerEvents = 'none';
    el.style.zIndex = '9999';
    el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
    document.body.appendChild(el);

    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 14 + 6;
    let vx = Math.cos(angle) * velocity;
    let vy = Math.sin(angle) * velocity - 5;
    let rot = Math.random() * 360;
    let rotSpeed = (Math.random() - 0.5) * 20;
    let opacity = 1;

    const anim = setInterval(() => {
      vy += 0.45; // gravity
      vx *= 0.98;
      const currentLeft = parseFloat(el.style.left);
      const currentTop = parseFloat(el.style.top);
      rot += rotSpeed;
      opacity -= 0.012;

      el.style.left = (currentLeft + vx) + 'px';
      el.style.top = (currentTop + vy) + 'px';
      el.style.transform = `rotate(${rot}deg)`;
      el.style.opacity = opacity;

      if (opacity <= 0 || currentTop > window.innerHeight + 50) {
        clearInterval(anim);
        el.remove();
      }
    }, 20);
  }
}

// --- 3. AMBIENT SOOTHING SOUNDTRACK (Synthesized Web Audio API) ---
let audioCtx = null;
let isAudioPlaying = false;
let audioTimer = null;

const pentatonicScale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99]; // Warm harp / chime frequencies

function playChimeNote(freq, duration = 3.5) {
  if (!audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    console.error(e);
  }
}

function startAmbientSound() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  isAudioPlaying = true;
  document.getElementById('audio-btn').classList.add('playing');

  function scheduleNextNote() {
    if (!isAudioPlaying) return;
    const note = pentatonicScale[Math.floor(Math.random() * pentatonicScale.length)];
    playChimeNote(note, 3.8);

    // Occasionally play a soft chord
    if (Math.random() > 0.6) {
      setTimeout(() => {
        const chordNote = pentatonicScale[Math.floor(Math.random() * pentatonicScale.length)];
        playChimeNote(chordNote, 4.0);
      }, 400);
    }

    const nextDelay = Math.random() * 1400 + 900;
    audioTimer = setTimeout(scheduleNextNote, nextDelay);
  }

  scheduleNextNote();
}

function stopAmbientSound() {
  isAudioPlaying = false;
  clearTimeout(audioTimer);
  document.getElementById('audio-btn').classList.remove('playing');
}

function toggleAudio() {
  if (isAudioPlaying) {
    stopAmbientSound();
  } else {
    startAmbientSound();
  }
}

document.getElementById('audio-btn').addEventListener('click', toggleAudio);
document.getElementById('confetti-btn').addEventListener('click', () => {
  launchConfetti(0.5, 0.3);
});

// --- 4. 3D ENVELOPE / ROYAL BOX OPENING INTERACTION ---
const envelopeOverlay = document.getElementById('envelope-overlay');
const envelope3D = document.getElementById('envelope-3d');
const waxSealBtn = document.getElementById('wax-seal-btn');
const mainContent = document.getElementById('main-content');

let hasOpened = false;

function openInvitation() {
  if (hasOpened) return;
  hasOpened = true;

  // Start sound
  startAmbientSound();

  // Burst wax seal with confetti
  launchConfetti(0.5, 0.5);

  // Unfold envelope
  envelope3D.classList.add('unfolding');

  setTimeout(() => {
    // Fade out overlay & reveal main invitation
    envelopeOverlay.classList.add('opened');
    mainContent.classList.add('visible');

    // Extra celebratory burst
    setTimeout(() => {
      launchConfetti(0.25, 0.4);
      launchConfetti(0.75, 0.4);
    }, 500);
  }, 1000);
}

waxSealBtn.addEventListener('click', openInvitation);
envelope3D.addEventListener('click', openInvitation);

// --- 5. LIVE COUNTDOWN TIMER (Dec 19, 2026, 16:30 IST) ---
const nikahDate = new Date('2026-12-19T16:30:00+05:30').getTime();

const daysEl = document.getElementById('cd-days');
const hoursEl = document.getElementById('cd-hours');
const minutesEl = document.getElementById('cd-minutes');
const secondsEl = document.getElementById('cd-seconds');

function updateCountdown() {
  const now = new Date().getTime();
  const distance = nikahDate - now;

  if (distance < 0) {
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  daysEl.textContent = String(days).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// --- 6. DOWNLOAD ICAL (.ICS) FILE ---
function downloadICalFile() {
  const icsContent = 
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding Invitation//Jamshad and Safwana//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:Wedding of Mohammed Jamshad & Ayishath Safwana
DESCRIPTION:Nikah: After Asar Namaz. Mr. Zainul Abid & Mrs. Jameela Abid cordially invite you to celebrate the wedding of Mohammed Jamshad K.A and Ayishath Safwana.
LOCATION:Baithul Aysha, Manavaty Nagar Road, Kunhipara, Paika, Kasaragod
DTSTART:20261219T110000Z
DTEND:20261219T160000Z
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT24H
ACTION:DISPLAY
DESCRIPTION:Reminder: Wedding of Jamshad & Safwana Tomorrow!
END:VALARM
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Jamshad_Safwana_Wedding.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast('Calendar event downloaded (.ics)');
}

document.getElementById('btn-ical').addEventListener('click', downloadICalFile);

// --- 7. COPY ADDRESS & TOAST NOTIFICATION ---
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

document.getElementById('btn-copy-address').addEventListener('click', () => {
  const address = "Baithul Aysha, Manavaty Nagar Road, Kunhipara, Paika, Kasaragod";
  navigator.clipboard.writeText(address).then(() => {
    showToast('Venue address copied to clipboard!');
  }).catch(() => {
    showToast('Address: ' + address);
  });
});

// --- 8. RSVP FORM SUBMISSION & WHATSAPP ---
const rsvpForm = document.getElementById('rsvp-form');
const rsvpSuccess = document.getElementById('rsvp-success');
const rsvpWhatsAppBtn = document.getElementById('rsvp-whatsapp-btn');

rsvpForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('rsvp-name').value.trim();
  const phone = document.getElementById('rsvp-phone').value.trim();
  const guests = document.getElementById('rsvp-guests').value;
  const status = document.getElementById('rsvp-status').value;
  const note = document.getElementById('rsvp-note').value.trim();

  // Save to localStorage
  const rsvps = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
  rsvps.push({ name, phone, guests, status, note, timestamp: new Date().toISOString() });
  localStorage.setItem('wedding_rsvps', JSON.stringify(rsvps));

  // Visual success feedback
  rsvpForm.style.display = 'none';
  rsvpSuccess.classList.remove('hidden');
  launchConfetti(0.5, 0.4);
  showToast(`JazakAllah Khair, ${name}! Your RSVP has been confirmed.`);
});

rsvpWhatsAppBtn.addEventListener('click', () => {
  const name = document.getElementById('rsvp-name').value.trim() || 'Guest';
  const guests = document.getElementById('rsvp-guests').value;
  const status = document.getElementById('rsvp-status').value;
  const note = document.getElementById('rsvp-note').value.trim();

  let message = `Assalamu Alaikum!%0A%0A*RSVP for Wedding of Mohammed Jamshad & Ayishath Safwana*%0A👤 *Name:* ${encodeURIComponent(name)}%0A👥 *Guests:* ${guests}%0A✨ *Attendance:* ${encodeURIComponent(status)}`;
  if (note) {
    message += `%0A💌 *Dua/Note:* ${encodeURIComponent(note)}`;
  }

  // Open WhatsApp
  window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
});

// --- 9. WISHES / DUAS GUESTBOOK ---
const wishForm = document.getElementById('wish-form');
const wishesList = document.getElementById('wishes-list');

function loadSavedWishes() {
  const saved = JSON.parse(localStorage.getItem('wedding_wishes') || '[]');
  saved.reverse().forEach(wish => {
    prependWishDOM(wish.author, wish.message, wish.time);
  });
}

function prependWishDOM(author, message, timeText) {
  const item = document.createElement('div');
  item.className = 'wish-item';
  item.innerHTML = `
    <div class="wish-header">
      <span class="wish-author">${escapeHTML(author)}</span>
      <span class="wish-date">${escapeHTML(timeText || 'Just now')}</span>
    </div>
    <p class="wish-text">"${escapeHTML(message)}"</p>
  `;
  wishesList.prepend(item);
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.innerText = str;
  return div.innerHTML;
}

wishForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const author = document.getElementById('wish-author').value.trim();
  const message = document.getElementById('wish-message').value.trim();

  if (!author || !message) return;

  prependWishDOM(author, message, 'Just now');

  // Save to localStorage
  const saved = JSON.parse(localStorage.getItem('wedding_wishes') || '[]');
  saved.push({ author, message, time: 'Recently' });
  localStorage.setItem('wedding_wishes', JSON.stringify(saved));

  wishForm.reset();
  launchConfetti(0.5, 0.4);
  showToast('Your heartfelt dua has been posted!');
});

loadSavedWishes();

// --- 10. SOCIAL SHARE & COPY LINK ---
document.getElementById('btn-share-whatsapp').addEventListener('click', () => {
  const text = `🌸 *Wedding Invitation* 🌸%0A%0AIn the name of Allah, Mr. Zainul Abid & Mrs. Jameela Abid cordially invite you to celebrate the wedding of:%0A%0A💍 *Mohammed Jamshad K.A* & *Ayishath Safwana*%0A%0A🗓 *Date:* Saturday, 19th December 2026 (10 Rajab 1448 AH)%0A🕌 *Nikah:* After Asar Namaz%0A📍 *Venue:* Baithul Aysha, Manavaty Nagar Road, Kunhipara, Paika%0A%0AView the complete invitation card & directions here:%0A${window.location.href}`;
  window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
});

document.getElementById('btn-copy-link').addEventListener('click', () => {
  navigator.clipboard.writeText(window.location.href).then(() => {
    showToast('Invitation link copied to clipboard!');
  }).catch(() => {
    showToast(window.location.href);
  });
});

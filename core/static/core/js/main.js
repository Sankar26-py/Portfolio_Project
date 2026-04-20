// Scroll progress bar
window.addEventListener('scroll', () => {
  const p = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  document.getElementById('scrollBar').style.width = p + '%';
});

// Role tabs in Experience section
function switchRole(idx) {
  document.querySelectorAll('.rtab').forEach((t, i) => t.classList.toggle('active', i === idx));
  document.querySelectorAll('.role-panel').forEach((p, i) => p.classList.toggle('active', i === idx));
}

// Intersection Observer — animate cards on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.edu-card, .ach-card, .proj-card').forEach(el => io.observe(el));

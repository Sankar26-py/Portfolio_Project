// skillData injected by Django template inline <script> before this file

document.addEventListener('DOMContentLoaded', function () {

  /* ── Skills grid ──────────────────────────────────── */
  function renderSkills() {
    var grid = document.getElementById('skillsGrid');
    if (!grid) return;
    grid.innerHTML = '';
    skillData.forEach(function(cat, ci) {
      var card = document.createElement('div'); card.className = 'sk-cat';
      var ttl  = document.createElement('div'); ttl.className  = 'sk-cat-title'; ttl.textContent = cat.category;
      var wrap = document.createElement('div'); wrap.className = 'tags-wrap';
      var row  = document.createElement('div'); row.className  = 'add-row';
      var inp  = document.createElement('input');
      var abtn = document.createElement('button');

      cat.tags.forEach(function(tag, ti) {
        var t = document.createElement('div'); t.className = 'tag';
        var l = document.createElement('span'); l.textContent = tag;
        var r = document.createElement('button'); r.className = 'rm'; r.textContent = '✕';
        r.onclick = function() { skillData[ci].tags.splice(ti, 1); renderSkills(); };
        t.appendChild(l); t.appendChild(r); wrap.appendChild(t);
      });

      inp.className = 'add-in'; inp.placeholder = 'Add skill…'; inp.type = 'text';
      abtn.className = 'add-btn'; abtn.textContent = '+ Add';
      function addSkill() {
        var v = inp.value.trim(); if (!v) return;
        skillData[ci].tags.push(v); inp.value = ''; renderSkills();
        setTimeout(function() { var a = document.querySelectorAll('.add-in'); if (a[ci]) a[ci].focus(); }, 40);
      }
      abtn.onclick = addSkill;
      inp.addEventListener('keydown', function(e) { if (e.key === 'Enter') addSkill(); });
      card.appendChild(ttl); card.appendChild(wrap);
      row.appendChild(inp); row.appendChild(abtn); card.appendChild(row);
      grid.appendChild(card);
    });
  }
  renderSkills();

  /* ── Experience tabs ──────────────────────────────── */
  window.switchRole = function(idx) {
    document.querySelectorAll('.rtab').forEach(function(t, i) { t.classList.toggle('active', i === idx); });
    document.querySelectorAll('.role-panel').forEach(function(p, i) { p.classList.toggle('active', i === idx); });
  };

  /* ── Role tabs: force vertical on mobile via JS ───── */
  function fixRoleTabs() {
    var tabs = document.querySelector('.role-tabs');
    if (!tabs) return;
    if (window.innerWidth <= 768) {
      tabs.style.cssText = 'display:flex !important; flex-direction:column !important; flex-wrap:nowrap !important; gap:0 !important; border:1px solid #252535; border-radius:6px; overflow:hidden; margin-bottom:1.25rem;';
      document.querySelectorAll('.rtab').forEach(function(tab) {
        tab.style.cssText = 'width:100% !important; display:flex !important; align-items:center !important; justify-content:space-between !important; padding:0.85rem 1rem !important; font-size:0.77rem !important; border-radius:0 !important; border:none !important; border-bottom:1px solid #252535 !important; white-space:normal !important; flex-shrink:0 !important; cursor:pointer;';
      });
      // Remove bottom border from last tab
      var allTabs = document.querySelectorAll('.rtab');
      if (allTabs.length) allTabs[allTabs.length - 1].style.borderBottom = 'none';
    } else {
      // Desktop: reset inline styles
      tabs.style.cssText = '';
      document.querySelectorAll('.rtab').forEach(function(tab) { tab.style.cssText = ''; });
    }
  }
  fixRoleTabs();
  window.addEventListener('resize', fixRoleTabs);

  /* ── Card scroll animations ───────────────────────── */
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });
  document.querySelectorAll('.edu-card,.ach-card,.proj-card').forEach(function(el) { observer.observe(el); });

  /* ── Scroll progress bar ──────────────────────────── */
  window.addEventListener('scroll', function() {
    var bar = document.getElementById('scrollBar');
    if (!bar) return;
    var pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    bar.style.width = pct + '%';
  });

  /* ── Mobile hamburger + drawer ────────────────────── */
  var hamburger = document.getElementById('hamburger');
  var drawer    = document.getElementById('navDrawer');
  var overlay   = document.getElementById('navOverlay');
  if (!hamburger || !drawer || !overlay) return;

  // Set drawer base styles via JS — no CSS dependency
  drawer.style.cssText = [
    'position:fixed', 'top:0', 'left:0',
    'width:75vw', 'max-width:300px', 'height:100vh',
    'background:#0a0a0f',
    'border-right:1px solid #2e2e42',
    'display:flex', 'flex-direction:column',
    'justify-content:center', 'padding:3rem 0',
    'z-index:1500',
    'transform:translateX(-110%)',
    'transition:transform 0.38s cubic-bezier(0.4,0,0.2,1)'
  ].join(';');

  overlay.style.cssText = [
    'position:fixed', 'inset:0',
    'background:rgba(0,0,0,0.6)',
    'z-index:1400', 'display:none', 'opacity:0',
    'transition:opacity 0.35s ease'
  ].join(';');

  function openNav() {
    hamburger.classList.add('open');
    drawer.style.transform = 'translateX(0)';
    overlay.style.display  = 'block';
    setTimeout(function() { overlay.style.opacity = '1'; }, 10);
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    hamburger.classList.remove('open');
    drawer.style.transform = 'translateX(-110%)';
    overlay.style.opacity  = '0';
    setTimeout(function() { overlay.style.display = 'none'; }, 350);
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    drawer.style.transform === 'translateX(0px)' ? closeNav() : openNav();
  });

  drawer.querySelectorAll('.drawer-link').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var targetId = link.getAttribute('href');
      closeNav();
      setTimeout(function() {
        var target = document.querySelector(targetId);
        if (!target) return;
        var navH = (document.querySelector('nav') || {}).offsetHeight || 60;
        var top  = target.getBoundingClientRect().top + window.scrollY - navH - 4;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      }, 400);
    });
  });

  overlay.addEventListener('click', closeNav);
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeNav(); });

});

document.addEventListener('DOMContentLoaded', () => {

  // Cada card aparece com um pequeno delay em cascata
  const cards = document.querySelectorAll('.card');

  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('visible');
    }, 80 + index * 70); // 70ms de intervalo entre cada card
  });


  // O grid de pontos se move levemente com o mouse
  const heroBg = document.querySelector('.hero-bg');

  if (heroBg) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      heroBg.style.transform = `translate(${x}px, ${y}px) scale(1.03)`;
    });
  }


  // Efeito de luz que segue o mouse dentro de cada card
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect  = card.getBoundingClientRect();
      const x     = e.clientX - rect.left;
      const y     = e.clientY - rect.top;
      const color = card.dataset.glow || 'rgba(79,142,247,0.06)';

      card.style.background = `
        radial-gradient(200px circle at ${x}px ${y}px, ${color}, transparent 70%),
        var(--bg-surface)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });


  // Garante que links com data-href funcionem
  // (útil quando o card inteiro é clicável)
  cards.forEach(card => {
    const href = card.dataset.href;
    if (href) {
      card.addEventListener('click', (e) => {
        // Evita disparo duplo se o clique foi num <a> interno
        if (e.target.closest('a')) return;
        window.open(href, '_blank', 'noopener noreferrer');
      });
      card.style.cursor = 'pointer';
    }
  });

});

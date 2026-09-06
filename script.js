const phoneAluizio = '5531999519769';
const phoneJose    = '5531996366230';

const defaultMessage      = 'Olá Aluizio, gostaria de saber mais sobre os seus serviços, tenho interesse em fazer um orçamento.';
const defaultMessageJose  = 'Olá José, gostaria de saber mais sobre os seus serviços, tenho interesse em fazer um orçamento.';

function trackEvent(eventName, params = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...params });
}

function buildWhatsAppLink(phone, message) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function applyWhatsAppLinks() {
  document.querySelectorAll('.whatsapp-general').forEach((btn) => {
    btn.href = buildWhatsAppLink(phoneAluizio, defaultMessage);
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
    btn.addEventListener('click', () => trackEvent('clique_whatsapp', { contato: 'Aluizio' }));
  });

  document.querySelectorAll('.whatsapp-jose').forEach((btn) => {
    btn.href = buildWhatsAppLink(phoneJose, defaultMessageJose);
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
    btn.addEventListener('click', () => trackEvent('clique_whatsapp', { contato: 'Jose' }));
  });
}

function setupMeasurementModal() {
  const overlay   = document.getElementById('modalOrcamento');
  const closeBtn  = document.getElementById('modalFechar');
  const pecaLabel = document.getElementById('modalPeca');
  const form      = document.getElementById('formMedidas');

  let currentPiece = '';

  document.querySelectorAll('.product-btn').forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      currentPiece = button.dataset.piece || 'peça';
      pecaLabel.textContent = currentPiece;

      trackEvent('clique_produto_' + currentPiece.toLowerCase().replace(/\s+/g, '_'));

      form.reset();
      document.getElementById('inputQuantidade').value = '1';

      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const largura     = document.getElementById('inputLargura').value.trim();
    const comprimento = document.getElementById('inputComprimento').value.trim();
    const altura      = document.getElementById('inputAltura').value.trim();
    const quantidade  = document.getElementById('inputQuantidade').value.trim() || '1';
    const obs         = document.getElementById('inputObs').value.trim();

    let medidas = '';
    if (largura)     medidas += `\n- Largura: ${largura} cm`;
    if (comprimento) medidas += `\n- Comprimento: ${comprimento} cm`;
    if (altura)      medidas += `\n- Altura/Profundidade: ${altura} cm`;
    medidas += `\n- Quantidade: ${quantidade}`;
    if (obs)         medidas += `\n- Observações: ${obs}`;

    const message =
      `Olá Aluizio! Gostaria de um orçamento para *${currentPiece}*:${medidas}`;

    trackEvent('envio_orcamento', { produto: currentPiece });

    window.open(buildWhatsAppLink(phoneAluizio, message), '_blank', 'noopener,noreferrer');
    closeModal();
  });
}

function setupMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

function setupRevealAnimation() {
  const elements = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('show'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((element) => observer.observe(element));
}

function setupHeaderShadow() {
  const header = document.querySelector('.topbar');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 12
      ? '0 10px 30px rgba(12, 64, 34, 0.08)'
      : 'none';
  });
}

function setupContactForm() {
  const form   = document.getElementById('formContato');
  const erroEl = document.getElementById('contatoErro');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    erroEl.textContent = '';

    const nome     = document.getElementById('contatoNome').value.trim();
    const whats    = document.getElementById('contatoWhats').value.trim();
    const produto  = document.getElementById('contatoProduto').value;
    const medidas  = document.getElementById('contatoMedidas').value.trim();
    const autorizo = document.getElementById('contatoAutorizo').checked;

    if (!nome)     { erroEl.textContent = 'Por favor, informe seu nome.'; return; }
    if (!whats)    { erroEl.textContent = 'Por favor, informe seu WhatsApp.'; return; }
    if (!produto)  { erroEl.textContent = 'Selecione um produto de interesse.'; return; }
    if (!autorizo) { erroEl.textContent = 'Marque a autorização para prosseguir.'; return; }

    let message =
      `Olá Aluizio! Me chamo *${nome}* e gostaria de um orçamento pelo site.\n\n` +
      `*Produto de interesse:* ${produto}\n` +
      `*Meu WhatsApp:* ${whats}`;

    if (medidas) message += `\n*Medidas/Detalhes:* ${medidas}`;

    trackEvent('envio_orcamento', { produto, origem: 'formulario_contato' });

    window.open(buildWhatsAppLink(phoneAluizio, message), '_blank', 'noopener,noreferrer');

    form.reset();
    erroEl.style.color = '#0f7a3d';
    erroEl.textContent = 'Mensagem aberta no WhatsApp! Aguarde o retorno do Aluizio.';
    setTimeout(() => {
      erroEl.textContent = '';
      erroEl.style.color = '';
    }, 6000);
  });
}

function setupMapTracking() {
  const mapWrapper = document.querySelector('.map-wrapper');
  if (!mapWrapper) return;
  let tracked = false;
  mapWrapper.addEventListener('click', () => {
    if (!tracked) {
      trackEvent('clique_mapa');
      tracked = true;
    }
  });
}

function setupCarousels() {
  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const track = carousel.querySelector('.carousel-track');
    const dotsBox = carousel.querySelector('[data-carousel-dots]');
    const prev = carousel.querySelector('[data-carousel-prev]');
    const next = carousel.querySelector('[data-carousel-next]');
    const items = Array.from(track.children);
    if (!items.length) return;

    const perPage = 2;
    const pages = Math.ceil(items.length / perPage);
    let current = 0;

    const dots = Array.from({ length: pages }, (_, page) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', `Ir para o grupo ${page + 1}`);
      dot.addEventListener('click', () => goTo(page));
      dotsBox.appendChild(dot);
      return dot;
    });

    function goTo(page) {
      const target = items[Math.min(page * perPage, items.length - 1)];
      track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: 'smooth' });
    }

    function currentPage() {
      const step = items[1] ? items[1].offsetLeft - items[0].offsetLeft : track.clientWidth;
      return Math.min(pages - 1, Math.round(track.scrollLeft / (step * perPage)));
    }

    function refresh() {
      current = currentPage();
      dots.forEach((dot, page) => dot.classList.toggle('is-active', page === current));
      prev.disabled = current === 0;
      next.disabled = current === pages - 1;
    }

    prev.addEventListener('click', () => goTo(current - 1));
    next.addEventListener('click', () => goTo(current + 1));

    let ticking;
    track.addEventListener('scroll', () => {
      clearTimeout(ticking);
      ticking = setTimeout(refresh, 80);
    });
    window.addEventListener('resize', refresh);

    refresh();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  applyWhatsAppLinks();
  setupMeasurementModal();
  setupContactForm();
  setupMobileMenu();
  setupRevealAnimation();
  setupCarousels();
  setupHeaderShadow();
  setupMapTracking();
});

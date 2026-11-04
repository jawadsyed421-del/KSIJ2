document.addEventListener('click', function (event) {
  const flipButton = event.target.closest('[data-history-flip]');
  if (flipButton) {
    const card = flipButton.closest('.heritage-card');
    if (card) {
      const flipped = card.classList.toggle('is-flipped');
      flipButton.setAttribute('aria-expanded', String(flipped));
    }
    return;
  }

  const readMore = event.target.closest('[data-history-read]');
  if (readMore) {
    const modal = document.querySelector('[data-history-modal]');
    const story = document.querySelector(readMore.getAttribute('data-history-read'));
    if (modal && story) {
      modal.querySelector('[data-history-modal-content]').innerHTML = story.innerHTML;
      modal.hidden = false;
      document.body.classList.add('history-modal-open');
      modal.querySelector('[data-history-close]')?.focus();
    }
    return;
  }

  if (event.target.closest('[data-history-close]') ||
      event.target.matches('[data-history-modal]')) {
    const modal = document.querySelector('[data-history-modal]');
    if (modal) modal.hidden = true;
    document.body.classList.remove('history-modal-open');
  }
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    const modal = document.querySelector('[data-history-modal]');
    if (modal && !modal.hidden) {
      modal.hidden = true;
      document.body.classList.remove('history-modal-open');
    }
  }
});

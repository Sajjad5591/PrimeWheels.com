document.addEventListener('DOMContentLoaded', function() {
    const cardContainers = document.querySelectorAll('.car-card, .car-card1');
    const detailImgs = document.querySelectorAll('.car-box img');
    const modal = document.getElementById('modal');
    if (!modal) return; // if modal not present, nothing to do
    const modalImg = modal.querySelector('.modal-img');
    const modalTitle = modal.querySelector('.modal-title');
    const modalPrice = modal.querySelector('.modal-price');
    const closeBtn = modal.querySelector('.modal-close');

    function openModal(imgEl, container) {
        modalImg.src = imgEl.src;
        modalImg.alt = imgEl.alt || (container && container.querySelector('h3') ? container.querySelector('h3').textContent : 'Car image');
        modalTitle.textContent = container && container.querySelector('h3') ? container.querySelector('h3').textContent : (container && container.querySelector('h2') ? container.querySelector('h2').textContent : '');
        modalPrice.textContent = container && container.querySelector('p') ? container.querySelector('p').textContent : '';
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        // focus close button for accessibility
        closeBtn.focus();
    }

    cardContainers.forEach(card => {
        const img = card.querySelector('img');
        if (!img) return;
        img.tabIndex = 0;
        img.addEventListener('click', (e) => {
            // Prevent navigation if image is inside a link
            if (e && e.preventDefault) e.preventDefault();
            openModal(img, card);
        });
        img.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                img.click();
            }
        });
    });

    detailImgs.forEach(img => {
        img.tabIndex = 0;
        img.addEventListener('click', (e) => {
            if (e && e.preventDefault) e.preventDefault();
            const container = img.closest('.car-box');
            openModal(img, container);
        });
        img.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                img.click();
            }
        });
    });

    closeBtn.addEventListener('click', () => closeModal());

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        modalImg.src = '';
    }
});
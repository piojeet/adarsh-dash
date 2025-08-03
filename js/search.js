const initSidebarPagination = () => {
  const containers = document.querySelectorAll('.form-sidebar');
  const itemsPerPage = 15;

  containers.forEach(container => {
    const listWrapper = container.querySelector('.form-sidebar__result-list');
    const pagination = container.querySelector('.search-pagination');
    const countText = container.querySelector('.form-sidebar__results-count');
    const platformFilter = container.querySelector('.filter__platfoem'); // ✅ updated to class
    let cards = Array.from(listWrapper.querySelectorAll('.result-card'));
    let currentPage = 1;

    function showPage(page, filteredCards) {
      const totalItems = filteredCards.length;
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      currentPage = page;

      const start = (page - 1) * itemsPerPage;
      const end = page * itemsPerPage;

      cards.forEach(card => (card.style.display = 'none'));
      filteredCards.slice(start, end).forEach(card => {
        card.style.display = 'block';
      });

      countText.innerHTML = `Showing ${start + 1} to ${Math.min(end, totalItems)} of ${totalItems} results`;
      renderPagination(totalPages, filteredCards);
    }

    function renderPagination(totalPages, filteredCards) {
      pagination.innerHTML = "";

      if (totalPages <= 1) {
        pagination.style.display = 'none';
        return;
      }

      pagination.style.display = 'flex';

      const prevBtn = document.createElement("button");
      prevBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="m15 18-6-6 6-6" /></svg>`;
      prevBtn.disabled = currentPage === 1;
      prevBtn.addEventListener("click", () => showPage(currentPage - 1, filteredCards));
      pagination.appendChild(prevBtn);

      for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        if (i === currentPage) btn.classList.add("active");
        btn.addEventListener("click", () => showPage(i, filteredCards));
        pagination.appendChild(btn);
      }

      const nextBtn = document.createElement("button");
      nextBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="m9 18 6-6-6-6" /></svg>`;
      nextBtn.disabled = currentPage === totalPages;
      nextBtn.addEventListener("click", () => showPage(currentPage + 1, filteredCards));
      pagination.appendChild(nextBtn);
    }

    function filterCardsByPlatform() {
      const selectedPlatform = platformFilter?.value.toLowerCase() || '';
      cards.forEach(card => {
        const cardPlatform = (card.getAttribute('data-platform') || '').toLowerCase();
        card.style.display = cardPlatform === selectedPlatform ? 'block' : 'none';
      });

      const filteredCards = cards.filter(card => {
        const cardPlatform = (card.getAttribute('data-platform') || '').toLowerCase();
        return cardPlatform === selectedPlatform;
      });

      currentPage = 1;
      showPage(currentPage, filteredCards);
    }

    if (platformFilter) {
      platformFilter.addEventListener('change', filterCardsByPlatform);
    }

    // Initial filter
    filterCardsByPlatform();
  });
};

document.addEventListener("DOMContentLoaded", initSidebarPagination);

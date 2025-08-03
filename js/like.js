document.querySelectorAll('.form-sidebar').forEach((sidebar, index) => {
  // Unique identifier per sidebar block
  const sidebarId = `formSidebar-${index}`;
  sidebar.setAttribute('data-sidebar-id', sidebarId);

  // Like Button Toggle Logic with LocalStorage
  sidebar.querySelectorAll('.result-card__menu-btn').forEach((btn, btnIndex) => {
    const cardId = `${sidebarId}-card-${btnIndex}`;
    const icon = btn.querySelector('svg');

    // Load liked state from localStorage
    const isLiked = localStorage.getItem(cardId) === 'true';
    if (isLiked) {
      btn.classList.add('liked');
      icon.style.fill = '#e03131';
      icon.style.stroke = '#e03131'; // ✅ Also set stroke here
    }

    btn.addEventListener('click', () => {
      const liked = btn.classList.toggle('liked');
      icon.style.fill = liked ? '#e03131' : 'none';
      icon.style.stroke = liked ? '#e03131' : '#000';
      localStorage.setItem(cardId, liked);
    });
  });
});

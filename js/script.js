document.addEventListener('DOMContentLoaded', () => {
  const selector = document.querySelector('.platform-selector');
  const button = selector.querySelector('.platform-selector__button');
  const options = selector.querySelector('.platform-selector__options');

  // Toggle dropdown on button click
  button.addEventListener('click', (e) => {
    e.stopPropagation(); // stop propagation to prevent document click event
    options.classList.toggle('show');
  });

  // Hide dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!selector.contains(e.target)) {
      options.classList.remove('show');
    }
  });
});


const profileBtn = document.querySelectorAll('.header-container');
profileBtn.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();

    // Close all open dropdowns first
    document.querySelectorAll('.header__profile-setting').forEach(profile => {
      if (profile !== btn.querySelector('.header__profile-setting')) {
        profile.classList.remove('active');
      }
    });

    // Toggle the one related to the clicked button
    const currentSetting = btn.querySelector('.header__profile-setting');
    if (currentSetting) {
      currentSetting.classList.toggle('active');
    }
  });
});

// Optional: click outside to close
document.addEventListener('click', () => {
  document.querySelectorAll('.header__profile-setting').forEach(profile => {
    profile.classList.remove('active');
  });
});

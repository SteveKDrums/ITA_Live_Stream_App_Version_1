const player = document.getElementById('ytplayer');
const wrapper = document.getElementById('videoWrapper');
const ringMenu = document.getElementById('ringMenu');

let hideMenuTimer;

// Zoom into a specific camera view
function setZoomed() {
  player.style.width = '200%';
  player.style.height = '200%';
}

// Reset to full view (show all rings)
function setFullView() {
  player.style.width = '100%';
  player.style.height = '100%';
  player.style.top = '0%';
  player.style.left = '0%';
}

// Function to switch camera views
function switchCam(cam) {
  setZoomed();
  switch (cam) {
    case 1:
      player.style.top = '0%';
      player.style.left = '0%';
      break;
    case 2:
      player.style.top = '0%';
      player.style.left = '-100%';
      break;
    case 3:
      player.style.top = '-100%';
      player.style.left = '0%';
      break;
    case 4:
      player.style.top = '-100%';
      player.style.left = '-100%';
      break;
  }
  enterFullscreen();  // Trigger full-screen after switching camera
  hideMenuSoon();
}

// Show all rings in full-screen
function allRings() {
  setFullView();
  enterFullscreen();  // Trigger full-screen when showing all rings
  hideMenuSoon();
}

// Enter Full-Screen mode
function enterFullscreen() {
  const wrapper = document.getElementById('videoWrapper');

  // Trigger full-screen for desktop and mobile
  if (!document.fullscreenElement && wrapper) {
    if (wrapper.requestFullscreen) {
      wrapper.requestFullscreen(); // Standard full-screen
    } else if (wrapper.webkitRequestFullscreen) { // Safari
      wrapper.webkitRequestFullscreen();
    } else if (wrapper.msRequestFullscreen) { // IE/Edge
      wrapper.msRequestFullscreen();
    }

    // Force full-screen mode for mobile
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        if (wrapper.requestFullscreen) {
          wrapper.requestFullscreen();
        }
      }, 100);
    }
  }
}

// Event listener to handle when exiting full-screen
document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    // Reset the video player and layout when exiting full-screen
    resetLayout();
  }
});

// Reset the layout when exiting full-screen
function resetLayout() {
  setFullView();  // Ensure the player is properly sized
  if (window.innerWidth <= 768) {
    // Additional fixes for mobile, if necessary
    document.body.style.overflow = 'auto'; // Re-enable scrolling on mobile
  }
}

// Scroll trick to hide the address bar on mobile
window.addEventListener('load', () => {
  setTimeout(() => {
    window.scrollTo(0, 1);  // Scroll down by 1 pixel to hide the address bar
  }, 300);  // Wait a bit to allow the page to load
});

// Toggle the ring selection menu
function toggleMenu() {
  ringMenu.classList.toggle('visible');
  if (ringMenu.classList.contains('visible')) {
    hideMenuSoon();
  }
}

// Auto-hide the menu after a short period
function hideMenuSoon() {
  clearTimeout(hideMenuTimer);
  hideMenuTimer = setTimeout(() => {
    ringMenu.classList.remove('visible');
  }, 3000);
}

// Close the menu if clicked outside of it
document.addEventListener('click', (e) => {
  if (!ringMenu.contains(e.target) && !e.target.classList.contains('toggle-menu-btn')) {
    ringMenu.classList.remove('visible');
  }
});

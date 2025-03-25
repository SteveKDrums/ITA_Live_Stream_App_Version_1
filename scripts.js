const player = document.getElementById('ytplayer');
const wrapper = document.getElementById('videoWrapper');
const ringMenu = document.getElementById('ringMenu');

let hideMenuTimer;

function setZoomed() {
  player.style.width = '200%';
  player.style.height = '200%';
}

function setFullView() {
  player.style.width = '100%';
  player.style.height = '100%';
  player.style.top = '0%';
  player.style.left = '0%';
}

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

function allRings() {
  setFullView();
  enterFullscreen();  // Trigger full-screen when showing all rings
  hideMenuSoon();
}

function enterFullscreen() {
  const wrapper = document.getElementById('videoWrapper');
  
  // Trigger full-screen on mobile and desktop
  if (!document.fullscreenElement && wrapper) {
    if (wrapper.requestFullscreen) {
      wrapper.requestFullscreen(); // Standard full-screen
    } else if (wrapper.webkitRequestFullscreen) { // Safari
      wrapper.webkitRequestFullscreen();
    } else if (wrapper.msRequestFullscreen) { // IE/Edge
      wrapper.msRequestFullscreen();
    }

    // Force full-screen mode on mobile specifically
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
document.addEventListener('fullscreenchange', (event) => {
  if (!document.fullscreenElement) {
    // Reset the video player and layout when exiting full-screen
    setFullView();
  }
});

function toggleMenu() {
  ringMenu.classList.toggle('visible');
  if (ringMenu.classList.contains('visible')) {
    hideMenuSoon();
  }
}

function hideMenuSoon() {
  clearTimeout(hideMenuTimer);
  hideMenuTimer = setTimeout(() => {
    ringMenu.classList.remove('visible');
  }, 3000);
}

document.addEventListener('click', (e) => {
  if (!ringMenu.contains(e.target) && !e.target.classList.contains('toggle-menu-btn')) {
    ringMenu.classList.remove('visible');
  }
});

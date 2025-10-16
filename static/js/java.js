$(function () {
 $(".menu-link").click(function () {
  $(".menu-link").removeClass("is-active");
  $(this).addClass("is-active");
 });
});

$(function () {
 $(".main-header-link").click(function () {
  $(".main-header-link").removeClass("is-active");
  $(this).addClass("is-active");
 });
});

const dropdowns = document.querySelectorAll(".dropdown");
dropdowns.forEach((dropdown) => {
 dropdown.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdowns.forEach((c) => c.classList.remove("is-active"));
  dropdown.classList.add("is-active");
 });
});

$(".search-bar input")
 .focus(function () {
  $(".header").addClass("wide");
 })
 .blur(function () {
  $(".header").removeClass("wide");
 });

$(document).click(function (e) {
 var container = $(".status-button");
 var dd = $(".dropdown");
 if (!container.is(e.target) && container.has(e.target).length === 0) {
  dd.removeClass("is-active");
 }
});

$(function () {
 $(".dropdown").on("click", function (e) {
  $(".content-wrapper").addClass("overlay");
  e.stopPropagation();
 });
 $(document).on("click", function (e) {
  if ($(e.target).is(".dropdown") === false) {
   $(".content-wrapper").removeClass("overlay");
  }
 });
});

$(function () {
// $(".status-button:not(.open)").on("click", function (e) {
//  $(".overlay-app").addClass("is-active");
// });
 $(".pop-up .close").click(function () {
  $(".overlay-app").removeClass("is-active");
 });
});

//$(".status-button:not(.open)").click(function () {
// $(".pop-up").addClass("visible");
//});

$(".pop-up .close").click(function () {
 $(".pop-up").removeClass("visible");
});

const toggleButton = document.querySelector('.dark-light');

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
});
// --- Backend call helper ---
async function openLabAPI(labName) {
  try {
    const res = await fetch('/api/open_lab', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lab: labName })
    });
    const data = await res.json();
    alert(data.message); // shows success to user
  } catch (err) {
    console.error('openLab error', err);
    alert('Error contacting backend');
  }
}

// --- Attach handlers to all "Open" buttons (assumes .status-button class) ---
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.status-button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // find nearest .app-card and read the visible title
      const card = btn.closest('.app-card');
      let labName = 'Lab';
      if (card) {
        const span = card.querySelector('span');
        if (span) labName = span.textContent.trim();
      }
      openLabAPI(labName);
    });
  });
});
// --- Sidebar click handler ---
document.querySelectorAll('.side-menu a').forEach(link => {
  link.addEventListener('click', async (e) => {
    e.preventDefault();
    const action = link.dataset.action || '';

    // Labs already working
    if (['physics-lab', 'chemistry-lab', 'work-space'].includes(action)) {
      let labName = action.replace('-', ' ');
      try {
        const res = await fetch('/api/open_lab', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lab: labName })
        });
        const data = await res.json();
        alert(data.message);
      } catch (err) {
        console.error('Sidebar lab error:', err);
        alert('Error contacting backend');
      }
    } else {
      // Placeholder for remaining buttons
      switch (action) {
        case 'all-material':
          alert('Opening All Material section...');
          break;
        case 'uploads':
          alert('Uploads feature coming soon!');
          break;
        case 'maths-lab':
          alert('Maths lab page under construction.');
          break;
        case 'design-lab':
          alert('Design lab will be available soon.');
          break;
        case 'computer-lab':
          alert('Computer lab module coming next.');
          break;
        case 'manage-fonts':
          alert('Font management feature is not live yet.');
          break;
        case 'stock':
          alert('Stock dashboard under development.');
          break;
        case 'tutorials':
          alert('Tutorials section launching soon!');
          break;
        default:
          alert(`${action.replace('-', ' ')} feature is coming soon!`);
      }
    }
  });
});
// --- Bell and Cloud icon actions ---
document.addEventListener('DOMContentLoaded', () => {
  const bell = document.getElementById('bellIcon');
  const cloud = document.getElementById('cloudIcon');

  if (bell) {
    bell.addEventListener('click', () => {
      alert('You have 3 new notifications!');
    });
  }

  if (cloud) {
    cloud.addEventListener('click', async () => {
      try {
        const res = await fetch('/api/check_cloud_status');
        const data = await res.json();
        alert(`Cloud status: ${data.status}`);
      } catch (err) {
        console.error(err);
        alert('Error contacting cloud service');
      }
    });
  }
});

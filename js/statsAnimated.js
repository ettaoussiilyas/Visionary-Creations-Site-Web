// function animateValue(id, start, end, duration) {
//     let startTimestamp = null;
//     const step = (timestamp) => {
//         if (!startTimestamp) startTimestamp = timestamp;
//         const progress = Math.min((timestamp - startTimestamp) / duration, 1);
//         const current = Math.floor(progress * (end - start) + start);
//         document.getElementById(id).textContent = current.toLocaleString();
//         if (progress < 1) {
//             window.requestAnimationFrame(step);
//         }
//     };
//     window.requestAnimationFrame(step);
// }
// Easing function
function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - 2 * (1 - t) * (1 - t);
}

// Animation function
function animateValue(id, start, end, duration) {
  const element = document.getElementById(id);
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const current = Math.floor(easeInOut(progress) * (end - start) + start);
    element.textContent = current.toLocaleString();

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}

// Check if element is in viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Handle scroll event
function handleScroll() {
  const statsSection = document.querySelector(".stats");
  if (
    isElementInViewport(statsSection) &&
    !statsSection.classList.contains("animated")
  ) {
    statsSection.classList.add("animated");
    animateValue("users-count", 0, 1000000, 2000);
    animateValue("doctors-count", 0, 50000, 2000);
    animateValue("countries-count", 0, 75, 2000);
    animateValue("consultations-count", 0, 5000000, 2000);
  }
}

// Add event listener
window.addEventListener("scroll", handleScroll);

// Initial check
handleScroll();

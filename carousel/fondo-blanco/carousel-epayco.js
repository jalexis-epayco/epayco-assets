
(() => {
  const track = document.getElementById("logos-track");
  if (!track) return;

  const visibleItems = 4;
  const stepPercent = 100 / visibleItems;
  const itemsCount = track.children.length;
  let timer = null;
  let isAnimating = false;

  const slide = (dir) => {
    if (isAnimating) return;
    isAnimating = true;
    const direction = dir === "prev" ? 1 : -1;
    track.style.transition = "transform 420ms ease";
    track.style.transform = `translateX(${direction * stepPercent}%)`;

    const onTransitionEnd = () => {
      track.removeEventListener("transitionend", onTransitionEnd);
      if (dir === "next") {
        track.append(track.firstElementChild);
      } else {
        track.prepend(track.lastElementChild);
      }
      track.style.transition = "none";
      track.style.transform = "translateX(0)";
      void track.offsetWidth;
      isAnimating = false;
    };

    track.addEventListener("transitionend", onTransitionEnd, { once: true });
  };

  const stop = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  const start = () => {
    stop();
    timer = setInterval(() => slide("next"), 1150);
  };

  document.querySelectorAll(".ep-carousel__nav").forEach((button) => {
    button.addEventListener("click", () => {
      const dir = button.dataset.dir === "prev" ? "prev" : "next";
      slide(dir);
      start();
    });
  });

  const wrapper = document.querySelector(".ep-carousel");
  if (wrapper) {
    wrapper.addEventListener("mouseenter", stop);
    wrapper.addEventListener("mouseleave", start);
  }

  if (itemsCount >= visibleItems) {
    start();
  }
})();

/* FRONT-END SCRIPT (same as earlier, with chart + tabs + counters) */

document.addEventListener("DOMContentLoaded", () => {
  
  // FOOTER YEAR
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ANIMATED COUNTERS
  const counters = document.querySelectorAll(".counter");

  counters.forEach((el) => {
    const target = Number(el.getAttribute("data-value") || 0);
    let current = 0;
    const duration = 900;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      current = Math.floor(progress * target);
      el.textContent = current;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }

    requestAnimationFrame(tick);
  });

  // TABS
  const tabButtons = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".tab-panel");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-tab");

      tabButtons.forEach((b) => b.classList.remove("tab-btn-active"));
      panels.forEach((p) => p.classList.remove("tab-panel-active"));

      btn.classList.add("tab-btn-active");
      document.getElementById(targetId).classList.add("tab-panel-active");
    });
  });

  // GOAL SHARE CHART
  const goalsChartCanvas = document.getElementById("goalsChart");

  if (goalsChartCanvas) {
    const haalandGoals = Number(goalsChartCanvas.dataset.haaland || 260);
    const mbappeGoals = Number(goalsChartCanvas.dataset.mbappe || 320);

    new Chart(goalsChartCanvas, {
      type: "doughnut",
      data: {
        labels: ["Haaland Goals", "Mbappé Goals"],
        datasets: [{ data: [haalandGoals, mbappeGoals] }]
      },
      options: {
        plugins: {
          legend: {
            labels: { color: "#111827", font: { size: 12 } }
          }
        }
      }
    });
  }
});

/* Codnapp - tek seferlik açılış hareketi.
   JavaScript kapalıysa ya da hareket azaltma tercih edilmişse ekran
   doğrudan son değerleriyle görünür. */
(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  var root = document.documentElement;
  var board = document.querySelector(".board");
  var counter = document.querySelector("[data-count]");
  if (!board || !counter) return;

  root.classList.add("js");
  board.classList.add("pre");

  var target = parseInt(counter.getAttribute("data-count"), 10);
  var fmt = function (n) { return n.toLocaleString("tr-TR"); };
  counter.textContent = "0";

  function start() {
    board.classList.remove("pre");
    var t0 = null, dur = 1300;
    function step(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      counter.textContent = fmt(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // İki kare bekle ki başlangıç durumu çizilsin, sonra animasyonu başlat.
  requestAnimationFrame(function () { requestAnimationFrame(start); });
})();

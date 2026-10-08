/* Codnapp - sayfa davranışları:
   1) üst barın kaydırınca gölge alması, 2) mobil menü, 3) aktif bölüm vurgusu,
   4) hero'daki örnek ekranın tek seferlik açılış hareketi.
   JavaScript kapalıysa site yine tam okunur ve çalışır. */
(function () {
  var header = document.querySelector("[data-header]");
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.querySelector("[data-nav]");

  /* 1) Kaydırınca üst bara gölge */
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* 2) Mobil menü */
  function setMenu(open) {
    if (!header || !toggle) return;
    header.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(!header.classList.contains("nav-open"));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { setMenu(false); toggle.focus(); }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 820) setMenu(false);
    });
  }

  /* 3) Hangi bölümdeysen menüde o bağlantı vurgulanır */
  if (nav && "IntersectionObserver" in window) {
    var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var sections = Object.keys(map).map(function (id) { return document.getElementById(id); }).filter(Boolean);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove("is-active"); });
        var a = map[en.target.id];
        if (a) a.classList.add("is-active");
      });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });
    sections.forEach(function (s) { io.observe(s); });
    window.addEventListener("scroll", function () {
      if (window.scrollY < 120) links.forEach(function (a) { a.classList.remove("is-active"); });
    }, { passive: true });
  }

  /* 4) Örnek ekran açılış hareketi (hareket azaltma tercih edilmişse atlanır) */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var board = document.querySelector(".board");
  var counter = document.querySelector("[data-count]");
  if (reduce || !board || !counter) return;

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
  requestAnimationFrame(function () { requestAnimationFrame(start); });
})();

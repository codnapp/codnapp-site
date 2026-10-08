/* Codnapp - sayfa davranışları:
   1) üst barın kaydırınca gölge alması, 2) mobil menü, 3) aktif bölüm vurgusu,
   4) ekran görüntüsü galerisi (oklar ve noktalar).
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
  /* 4) Galeri: oklar, noktalar ve kaydırma durumu */
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var chevL = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var chevR = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  Array.prototype.forEach.call(document.querySelectorAll("[data-carousel]"), function (root) {
    var track = root.querySelector("[data-track]");
    if (!track || track.children.length < 2) return;
    var n = track.children.length, raf = 0, dots = [];
    root.classList.add("has-ui");

    function btn(cls, label, html) {
      var b = document.createElement("button");
      b.type = "button"; b.className = cls; b.setAttribute("aria-label", label);
      if (html) b.innerHTML = html;
      return b;
    }
    function index() { return Math.round(track.scrollLeft / track.clientWidth); }
    function go(i) {
      i = Math.max(0, Math.min(n - 1, i));
      track.scrollTo({ left: i * track.clientWidth, behavior: reduceMotion ? "auto" : "smooth" });
    }
    var prev = btn("carousel-btn carousel-prev", "Önceki ekran", chevL);
    var next = btn("carousel-btn carousel-next", "Sonraki ekran", chevR);
    var dotWrap = document.createElement("div");
    dotWrap.className = "carousel-dots";
    for (var i = 0; i < n; i++) {
      (function (k) {
        var d = btn("carousel-dot", "Ekran " + (k + 1) + " / " + n);
        d.addEventListener("click", function () { go(k); });
        dotWrap.appendChild(d); dots.push(d);
      })(i);
    }
    root.appendChild(prev); root.appendChild(next); root.appendChild(dotWrap);

    function update() {
      var cur = index();
      dots.forEach(function (d, k) {
        d.classList.toggle("is-active", k === cur);
        if (k === cur) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current");
      });
      prev.disabled = cur === 0; next.disabled = cur === n - 1;
    }
    prev.addEventListener("click", function () { go(index() - 1); });
    next.addEventListener("click", function () { go(index() + 1); });
    track.addEventListener("scroll", function () {
      if (raf) return;
      raf = requestAnimationFrame(function () { raf = 0; update(); });
    }, { passive: true });
    window.addEventListener("resize", update);
    update();
  });
})();

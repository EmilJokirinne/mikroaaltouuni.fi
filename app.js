/* mikroaaltouuni.fi – kevyt progressiivinen parannus. Sivusto toimii myös ilman JavaScriptiä. */
(function () {
  "use strict";

  // Sticky-header: varjo, kun sivua on vieritetty
  var header = document.querySelector("[data-header]");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Pudotusvalikot: sulje klikattaessa muualle tai Esc-näppäimellä
  var menus = Array.prototype.slice.call(document.querySelectorAll("[data-dropdown], [data-mobile-menu]"));
  document.addEventListener("click", function (e) {
    menus.forEach(function (d) {
      if (d.open && !d.contains(e.target)) d.open = false;
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    menus.forEach(function (d) {
      if (d.open) {
        d.open = false;
        var s = d.querySelector("summary");
        if (s) s.focus();
      }
    });
  });
  menus.forEach(function (d) {
    d.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { d.open = false; });
    });
  });

  // Avaa FAQ-kysymys, jos osoitteessa on sen ankkuri (#ukk-...)
  function openHash() {
    if (!location.hash) return;
    var el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (el && el.tagName === "DETAILS") el.open = true;
  }
  openHash();
  window.addEventListener("hashchange", openHash);

  // Vertailusivun suodatus
  var form = document.querySelector("[data-filters]");
  if (!form) return;
  form.hidden = false;

  var items = Array.prototype.slice.call(document.querySelectorAll("[data-results] [data-product]"));
  var countEl = form.querySelector("[data-count]");
  var emptyEl = document.querySelector("[data-empty]");
  var results = document.querySelector("[data-results]");
  var keys = ["price", "type", "power", "capacity", "retailer"];
  var total = items.filter(function (el) { return el.tagName === "TR"; }).length;

  function selected(key) {
    return Array.prototype.slice
      .call(form.querySelectorAll('input[name="' + key + '"]:checked'))
      .map(function (i) { return i.value; });
  }

  function apply() {
    var active = {};
    keys.forEach(function (k) { active[k] = selected(k); });
    var shown = 0;
    items.forEach(function (el) {
      var ok = keys.every(function (k) {
        return active[k].length === 0 || active[k].indexOf(el.getAttribute("data-" + k)) !== -1;
      });
      el.hidden = !ok;
      if (ok && el.tagName === "TR") shown++;
    });
    if (countEl) countEl.textContent = shown === total ? "Näytetään " + total + " mallia" : "Näytetään " + shown + " / " + total + " mallia";
    if (emptyEl) emptyEl.hidden = shown !== 0;
    if (results) results.hidden = shown === 0;
  }

  form.addEventListener("change", apply);
  form.addEventListener("reset", function () { setTimeout(apply, 0); });
  form.addEventListener("submit", function (e) { e.preventDefault(); });
  apply();
})();

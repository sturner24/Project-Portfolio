/* Samuel Turner Project Portfolio
 * Projects are defined in projects.js.
 */

const $ = (sel) => document.querySelector(sel);

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// PROJECTS comes from projects.js (a top-level const, so it isn't on window)
const projects = (typeof PROJECTS !== "undefined" ? PROJECTS : [])
  .map((p) => ({ tags: [], images: [], ...p, slug: slugify(p.title) }))
  .sort((a, b) => (b.date || "").localeCompare(a.date || ""));

let current = -1;

// ---------- Helpers ----------
const escapeHTML = (str = "") =>
  str.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const formatDate = (ym, opts = { month: "long", year: "numeric" }) => {
  if (!ym) return "";
  const [y, m] = ym.split("-");
  return new Date(+y, +m - 1).toLocaleDateString(undefined, opts);
};

const pad = (n) => String(n).padStart(2, "0");

// ---------- Index ----------
function renderList() {
  $("#list").innerHTML = projects
    .map(
      (p, n) => `
      <li class="row" data-n="${n}" tabindex="0" style="animation-delay:${n * 80}ms">
        <span class="row-num">${pad(n + 1)}</span>
        ${p.images[0] ? `<img class="row-thumb" src="${escapeHTML(p.images[0])}" alt="" loading="lazy" />` : ""}
        <h3 class="row-title">${escapeHTML(p.title)}</h3>
        <span class="row-tags">${escapeHTML(p.tags.join(", "))}</span>
        <span class="row-year">${p.date ? p.date.slice(0, 4) : ""}</span>
        <span class="row-arrow" aria-hidden="true">→</span>
      </li>`
    )
    .join("");
  $("#count").textContent = projects.length ? pad(projects.length) : "";
  $("#empty").hidden = projects.length > 0;
}

const list = $("#list");
list.addEventListener("click", (e) => {
  const row = e.target.closest(".row");
  if (row) openProject(+row.dataset.n);
});
list.addEventListener("keydown", (e) => {
  const row = e.target.closest(".row");
  if (row && (e.key === "Enter" || e.key === " ")) {
    e.preventDefault();
    openProject(+row.dataset.n);
  }
});

// ---------- Project page ----------
const page = $("#project");

function openProject(n, { push = true } = {}) {
  const p = projects[n];
  if (!p) return;
  current = n;

  $("#pIndex").textContent = `${pad(n + 1)} / ${pad(projects.length)}`;
  $("#pMeta").textContent = [formatDate(p.date), p.tags.join(", ")].filter(Boolean).join("  ·  ");
  $("#pTitle").textContent = p.title;
  $("#pSummary").textContent = p.summary || "";
  $("#pSummary").hidden = !p.summary;

  const [cover, ...rest] = p.images;
  $("#pCover").innerHTML = cover ? `<img src="${escapeHTML(cover)}" alt="${escapeHTML(p.title)}" />` : "";
  $("#pCover").hidden = !cover;

  const facts = [
    ["Date", formatDate(p.date)],
    ["Discipline", p.tags.join(", ")],
    ["Photos", p.images.length ? String(p.images.length) : ""],
  ].filter(([, v]) => v);
  $("#pFacts").innerHTML = facts.map(([k, v]) => `<dl><dt>${k}</dt><dd>${escapeHTML(v)}</dd></dl>`).join("");

  $("#pDesc").innerHTML = (p.description || "")
    .split(/\n{2,}/)
    .filter(Boolean)
    .map((para) => `<p>${escapeHTML(para).replace(/\n/g, "<br>")}</p>`)
    .join("");

  $("#pGallery").innerHTML = rest
    .map((src, i) => `<img src="${escapeHTML(src)}" alt="${escapeHTML(p.title)} photo ${i + 2}" loading="lazy" />`)
    .join("");

  const next = projects[(n + 1) % projects.length];
  $("#pNext").hidden = projects.length < 2;
  $("#pNextTitle").textContent = next.title;

  // Restart entrance animations when switching between projects
  page.classList.remove("open");
  page.offsetHeight;
  page.classList.add("open");
  page.setAttribute("aria-hidden", "false");
  page.scrollTop = 0;
  document.body.classList.add("locked");
  $("#pClose").focus({ preventScroll: true });

  if (push) setURL(`#${p.slug}`);
}

function closeProject({ push = true } = {}) {
  if (current < 0) return;
  const row = list.querySelector(`[data-n="${current}"]`);
  current = -1;
  page.classList.remove("open");
  page.setAttribute("aria-hidden", "true");
  document.body.classList.remove("locked");
  if (push) setURL(location.pathname + location.search);
  row?.focus({ preventScroll: true });
}

$("#pClose").onclick = () => closeProject();
$("#pNext").onclick = () => openProject((current + 1) % projects.length);
addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeProject();
});

// pushState is blocked on file:// pages in some browsers; links still work without it
function setURL(url) {
  try {
    history.pushState(null, "", url);
  } catch {}
}

// Each project has its own link (e.g. /#planetary-gearbox) and the back button works
function syncWithURL() {
  const slug = decodeURIComponent(location.hash.slice(1));
  const n = projects.findIndex((p) => p.slug === slug);
  if (n >= 0) openProject(n, { push: false });
  else closeProject({ push: false });
}
addEventListener("popstate", syncWithURL);

// ---------- Init ----------
$("#year").textContent = new Date().getFullYear();
$("#toTop").onclick = (e) => {
  e.preventDefault();
  scrollTo({ top: 0, behavior: "smooth" });
};
renderList();
syncWithURL();

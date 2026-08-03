const revealEls = document.querySelectorAll(".slide-in");

const io = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => io.observe(el));

const SCRIPT = "loadstring(game:HttpGet('https://raw.githubusercontent.com/p4xt0n3/lqhzhub/refs/heads/main/mewing.lua'))()";

const modal = document.getElementById("modal");
const code = document.getElementById("code");
const copyBtn = document.getElementById("copy-btn");
const codeText = SCRIPT;
code.textContent = codeText;

function openModal() {
  modal.hidden = false;
}

function closeModal() {
  modal.hidden = true;
}

document.getElementById("opt-script").addEventListener("click", openModal);
document.getElementById("opt-order").addEventListener("click", () => {
  window.location.href = "gj.html";
});
document.getElementById("opt-hu").addEventListener("click", () => {
  window.location.href = "hy.html";
});
document.getElementById("modal-close").addEventListener("click", closeModal);
modal.querySelector(".modal-backdrop").addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.hidden) closeModal();
});

async function copyScript() {
  try {
    await navigator.clipboard.writeText(codeText);
  } catch (err) {
    const ta = document.createElement("textarea");
    ta.value = codeText;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
  const old = copyBtn.textContent;
  copyBtn.textContent = "已复制 ✓";
  setTimeout(() => (copyBtn.textContent = old), 1800);
}

copyBtn.addEventListener("click", copyScript);
code.addEventListener("click", copyScript);

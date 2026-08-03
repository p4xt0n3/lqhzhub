const ITEMS = [
  { name: "诅咒苹果", img: "badapple.png", price: 4, color: "pink" },
  { name: "宿挪手指", img: "sz.png", price: 1, color: "red" },
  { name: "诅咒球", img: "zzq.png", price: 3, color: "red" },
  { name: "手术果实", img: "ope.png", price: 2, color: "red" },
  { name: "史莱姆能量", img: "slime.png", price: 3, color: "red" },
  { name: "心", img: "heart.png", price: 3, color: "gold" },
  { name: "龙珠", img: "db.png", price: 3, color: "gold" },
  { name: "黑白球", img: "hbq.png", price: 3, color: "gold" },
  { name: "JJK角色证明", img: "jjkzm.png", price: 2.5, color: "goldred" },
  { name: "五条悟眼罩", img: "wtwyz.png", price: 1.5, color: "gold" },
  { name: "无下限卷轴", img: "wxx.png", price: 1.5, color: "gold" },
  { name: "天逆牟", img: "tnm.png", price: 1, color: "gold" },
  { name: "游云", img: "yy.png", price: 1, color: "gold" },
  { name: "释魂刀", img: "shd.png", price: 1, color: "gold" },
  { name: "天与咒缚觉醒", img: "tyzsjx.png", price: 1, color: "gold" },
  { name: "诅咒手臂", img: "zzsb.png", price: 1, color: "gold" },
  { name: "御厨子物品", img: "yczwp.png", price: 1, color: "gold" },
  { name: "简易领域精华", img: "jyly.png", price: 1, color: "gold" },
  { name: "咒胎九相图", img: "jxt.png", price: 1, color: "gold" },
  { name: "神秘物质", img: "smwz.png", price: 1.5, color: "gold" },
  { name: "腐化箭头", img: "fhjt.png", price: 2, color: "gold" },
  { name: "骨头", img: "bone.png", price: 1, color: "gold" },
  { name: "洛卡卡卡果实", img: "rokakaka.png", price: 2, color: "gold" },
  { name: "橡胶果实", img: "gomu.png", price: 1.5, color: "gold" },
  { name: "沙子果实", img: "sand.png", price: 1, color: "gold" },
  { name: "爱情果实", img: "love.png", price: 0.5, color: "gold" },
  { name: "佛法之轮", img: "wheel.png", price: 1.5, color: "gold" },
  { name: "乙骨犹太的刀", img: "yuta.png", price: 1.5, color: "gold" },
];

const FB_COLOR = {
  red: "rgba(255,107,107,0.55)",
  gold: "rgba(255,215,94,0.55)",
  goldred: "rgba(255,150,90,0.55)",
  pink: "rgba(255,130,200,0.55)",
};

const grid = document.getElementById("items");
const cartPrice = document.getElementById("cart-price");
const cartCount = document.getElementById("cart-count");
const cartList = document.getElementById("cart-list");
const cartEmpty = document.getElementById("cart-empty");
const buyBtn = document.getElementById("buy-btn");

const payModal = document.getElementById("pay-modal");
const payBox = payModal.querySelector(".pay-box");
const payQq = document.getElementById("pay-qq");
const payName = document.getElementById("pay-name");
const payRo = document.getElementById("pay-ro");
const payConfirm = document.getElementById("pay-confirm");

const state = new Map();
let activeFilter = "all";

const fmt = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(1));

function matches(item) {
  if (activeFilter === "all") return true;
  if (activeFilter === "gold") return item.color === "gold" || item.color === "goldred";
  return item.color === activeFilter;
}

function renderCart() {
  cartList.innerHTML = "";
  let count = 0;
  let total = 0;
  for (const item of ITEMS) {
    const qty = state.get(item.name);
    if (!qty) continue;
    count += qty;
    total += item.price * qty;
    const line = document.createElement("div");
    line.className = "cart-line";
    const name = document.createElement("span");
    name.className = "l-name";
    name.textContent = item.name;
    const q = document.createElement("span");
    q.className = "l-qty";
    q.textContent = `× ${qty}`;
    line.append(name, q);
    cartList.appendChild(line);
  }
  cartEmpty.hidden = cartList.children.length > 0;
  cartCount.textContent = count;
  cartPrice.textContent = "¥" + fmt(total);
  buyBtn.disabled = state.size === 0;
}

function syncCard(item, card) {
  const checked = state.has(item.name);
  card.classList.toggle("checked", checked);
  card.querySelector(".item-qty").hidden = !checked;
  if (checked) card.querySelector(".qty-num").textContent = state.get(item.name);
}

function toggle(item, card) {
  if (state.has(item.name)) state.delete(item.name);
  else state.set(item.name, 1);
  syncCard(item, card);
  renderCart();
}

function setQty(item, card, qty) {
  if (qty < 1) qty = 1;
  state.set(item.name, qty);
  card.querySelector(".qty-num").textContent = qty;
  renderCart();
}

function buildCard(item, i) {
  const card = document.createElement("div");
  card.className = "item-card";
  card.style.animationDelay = `${i * 35}ms`;
  card.style.setProperty("--fb", FB_COLOR[item.color]);
  card.innerHTML = `
    <div class="item-check"><span class="box"></span></div>
    <div class="item-img">
      <span class="img-fallback">${item.name[0]}</span>
      <img src="${item.img}" alt="${item.name}" loading="lazy">
    </div>
    <div class="item-name name-${item.color}">${item.name}</div>
    <div class="item-price price-${item.color}">${fmt(item.price)}￥</div>
    <div class="item-qty" hidden>
      <button class="qty-btn minus" type="button" aria-label="减少">−</button>
      <span class="qty-num">1</span>
      <button class="qty-btn plus" type="button" aria-label="增加">＋</button>
    </div>
  `;

  const img = card.querySelector("img");
  img.addEventListener("error", () => img.classList.add("failed"));

  const qtyBox = card.querySelector(".item-qty");
  qtyBox.addEventListener("click", (e) => e.stopPropagation());
  qtyBox.querySelector(".minus").addEventListener("click", () =>
    setQty(item, card, state.get(item.name) - 1)
  );
  qtyBox.querySelector(".plus").addEventListener("click", () =>
    setQty(item, card, state.get(item.name) + 1)
  );

  card.addEventListener("click", () => toggle(item, card));
  return card;
}

function render() {
  grid.innerHTML = "";
  ITEMS.forEach((item, i) => {
    if (!matches(item)) return;
    grid.appendChild(buildCard(item, i));
  });
}

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    activeFilter = btn.dataset.color;
    document.querySelectorAll(".filter-btn").forEach((b) =>
      b.classList.toggle("active", b === btn)
    );
    render();
  });
});

render();
renderCart();

function openPay() {
  if (state.size === 0) return;
  payModal.hidden = false;
}

function closePay() {
  payModal.hidden = true;
}

buyBtn.addEventListener("click", openPay);
payModal.querySelector(".modal-backdrop").addEventListener("click", closePay);
document.getElementById("pay-close").addEventListener("click", closePay);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !payModal.hidden) closePay();
});

function shake() {
  payBox.classList.remove("shake");
  void payBox.offsetWidth;
  payBox.classList.add("shake");
}

function buildBill(qq, name, ro) {
  let rows = "";
  let total = 0;
  for (const item of ITEMS) {
    const qty = state.get(item.name);
    if (!qty) continue;
    const sub = item.price * qty;
    total += sub;
    rows += `<tr><td class="nm">${item.name}</td><td>${fmt(item.price)}￥</td><td>${qty}</td><td>${fmt(sub)}￥</td></tr>`;
  }
  const now = new Date();
  const pad = (v) => String(v).padStart(2, "0");
  const dateStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
  const html = `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>物品账单</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:"PingFang SC","Microsoft YaHei",system-ui,sans-serif; background:#f2f3f5; display:grid; place-items:center; min-height:100vh; padding:24px; }
  .toolbar { text-align:center; margin-bottom:16px; }
  #save {
    border:none; cursor:pointer; padding:12px 26px; border-radius:999px;
    background:#111; color:#fff; font-size:14px; font-weight:600;
    box-shadow:0 8px 20px rgba(0,0,0,.18); transition:transform .2s, opacity .2s;
  }
  #save:hover { transform:translateY(-2px); }
  #save:disabled { opacity:.5; cursor:wait; transform:none; }
  .bill { width:min(440px,100%); background:#fff; border-radius:18px; padding:28px 26px 24px; box-shadow:0 18px 44px rgba(0,0,0,.14); }
  .head { text-align:center; }
  .head .tag { font-size:12px; letter-spacing:3px; color:#b58a00; font-weight:600; }
  .head h1 { margin-top:6px; font-size:24px; letter-spacing:1px; }
  .bill-meta { margin:18px 0; padding:12px 14px; background:#f8f9fb; border-radius:12px; font-size:13px; line-height:1.9; color:#333; }
  .bill-meta b { color:#111; }
  table { width:100%; border-collapse:collapse; font-size:13px; }
  th { text-align:left; color:#999; font-weight:600; font-size:12px; padding:6px 4px; border-bottom:1px solid #eee; }
  td { padding:9px 4px; border-bottom:1px dashed #eee; color:#222; }
  td.r, th.r { text-align:right; }
  td.nm { font-weight:600; }
  .total { display:flex; justify-content:space-between; align-items:center; margin-top:14px; font-size:14px; color:#333; }
  .total .amt { font-size:24px; font-weight:700; color:#ff5c2e; }
  .empty { text-align:center; color:#999; padding:10px 0; font-size:13px; }
  .note { margin-top:22px; padding-top:16px; border-top:1px dashed #ddd; text-align:center; font-size:13px; color:#333; line-height:1.9; }
  .note b { color:#111; }
  @media print { body { background:#fff; padding:0; } .bill { box-shadow:none; } }
</style>
</head>
<body>
<div class="toolbar"><button id="save">保存为图片 (PNG)</button></div>
<div class="bill">
  <div class="head">
    <div class="tag">· ⭕💴 HUB · AUT物品售卖 ·</div>
    <h1>物品账单</h1>
  </div>
  <div class="bill-meta">
    <div>QQ号：<b>${qq}</b></div>
    <div>QQ名称：<b>${name}</b></div>
    <div>Roblox名称：<b>${ro}</b></div>
    <div>下单时间：${dateStr}</div>
  </div>
  <table>
    <tr><th>物品</th><th class="r">单价</th><th class="r">数量</th><th class="r">小计</th></tr>
    ${rows}
  </table>
  <div class="total"><span>合计</span><span class="amt">¥${fmt(total)}</span></div>
  <div class="note">请去QQ寻找 <b>P4XT0N - 1736731564</b> 并将此账单发给他</div>
</div>
<script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
<script>
document.getElementById("save").addEventListener("click", async () => {
  const btn = document.getElementById("save");
  btn.disabled = true;
  btn.textContent = "生成中…";
  try {
    const canvas = await html2canvas(document.querySelector(".bill"), {
      backgroundColor: "#ffffff", scale: 2, useCORS: true
    });
    const a = document.createElement("a");
    a.download = "AUT账单_" + Date.now() + ".png";
    a.href = canvas.toDataURL("image/png");
    a.click();
  } catch (e) {
    alert("保存失败，请重试");
  }
  btn.disabled = false;
  btn.textContent = "保存为图片 (PNG)";
});
</script>
</body>
</html>`;
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank");
  setTimeout(() => URL.revokeObjectURL(url), 120000);
}

payConfirm.addEventListener("click", () => {
  const qq = payQq.value.trim();
  const name = payName.value.trim();
  const ro = payRo.value.trim();
  if (!qq || !name || !ro) {
    shake();
    return;
  }
  buildBill(qq, name, ro);
  closePay();
  payQq.value = "";
  payName.value = "";
  payRo.value = "";
});

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

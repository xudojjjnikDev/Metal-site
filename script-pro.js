// Включаем анимации при скролле
document.documentElement.classList.add('js');
const io = new IntersectionObserver((items) => {
  items.forEach(i => { if (i.isIntersecting) { i.target.classList.add('in'); io.unobserve(i.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

// ===== Каталог: данные и фильтры (правьте список здесь) =====
const TYPES = { hangar: 'Ангары', frame: 'Каркасы зданий', truss: 'Фермы', stairs: 'Лестницы', fence: 'Ограждения', custom: 'Нестандартные' };
const ITEMS = [
  ['Ангар арочный', 'hangar', 'Пролёт до 36 м'],
  ['Ангар каркасный', 'hangar', 'Пролёт до 30 м'],
  ['Каркас склада и цеха', 'frame', 'Шаг колонн 6–12 м'],
  ['Каркас многоэтажного здания', 'frame', 'До 9 этажей'],
  ['Стропильная ферма', 'truss', 'Пролёт до 48 м'],
  ['Лестница маршевая', 'stairs', 'Сталь, настил ПВЛ'],
  ['Ограждение кровли и лестниц', 'fence', 'По ГОСТ 25772'],
  ['Изделие по чертежу', 'custom', 'Любая сложность']
];
const filters = document.getElementById('filters');
const list = document.getElementById('catalog-list');
const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

filters.innerHTML = ['all', ...Object.keys(TYPES)].map(k =>
  `<button class="chip" type="button" data-type="${k}" aria-pressed="${k === 'all'}">${k === 'all' ? 'Все' : TYPES[k]}</button>`).join('');

function render(type) {
  list.innerHTML = ITEMS.filter(i => type === 'all' || i[1] === type).map(i =>
    `<article class="card"><div class="ph">Фото изделия</div><div class="b"><h3>${esc(i[0])}</h3>
     <p class="spec">${esc(i[2])}</p><a class="more" href="#request">Запросить расчёт</a></div></article>`).join('');
}
filters.addEventListener('click', e => {
  const btn = e.target.closest('.chip'); if (!btn) return;
  filters.querySelectorAll('.chip').forEach(b => b.setAttribute('aria-pressed', b === btn));
  render(btn.dataset.type);
});
render('all');

// ===== Форма заявки =====
const form = document.getElementById('request-form');
const result = document.getElementById('request-result');
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = form.elements.name, phone = form.elements.phone, consent = form.elements.consent;
  const bad = [];
  if (!name.value.trim()) bad.push(name);
  if (phone.value.replace(/\D/g, '').length < 10) bad.push(phone);
  [name, phone].forEach(f => f.classList.toggle('err', bad.includes(f)));
  if (bad.length) { result.textContent = 'Укажите имя и телефон полностью.'; bad[0].focus(); return; }
  if (!consent.checked) { result.textContent = 'Подтвердите согласие на обработку данных.'; consent.focus(); return; }
  // Здесь позже: отправка на сервер через fetch
  result.textContent = 'Спасибо, мы свяжемся с вами';
  form.reset();
});

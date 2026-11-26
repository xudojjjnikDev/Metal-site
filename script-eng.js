const root = document.documentElement;
root.classList.add('js');
// Вариант hero: index-eng.html (A) или index-eng.html?hero=b (B)
if (new URLSearchParams(location.search).get('hero') === 'b') root.classList.add('hero-b-on');
// Чтобы линии можно было «прорисовывать»
document.querySelectorAll('.dr path, .dr line').forEach(p => p.setAttribute('pathLength', 1));

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
function countUp(el) {
  const to = +el.dataset.count, suf = el.dataset.suffix || '';
  if (reduce) { el.textContent = to.toLocaleString('ru-RU') + suf; return; }
  const t0 = performance.now();
  (function tick(t) {
    const k = Math.min((t - t0) / 1400, 1);
    el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))).toLocaleString('ru-RU') + suf;
    if (k < 1) requestAnimationFrame(tick);
  })(t0);
}
const io = new IntersectionObserver(items => items.forEach(i => {
  if (!i.isIntersecting) return;
  i.target.classList.add('in');
  if (i.target.dataset.count) countUp(i.target);
  io.unobserve(i.target);
}), { threshold: 0.15 });
document.querySelectorAll('[data-reveal],.dr,.tl,[data-count]').forEach(el => io.observe(el));

// Калькулятор
document.getElementById('calc-form').addEventListener('submit', e => {
  e.preventDefault();
  const v = parseFloat(document.getElementById('calc-size').value);
  document.getElementById('calc-res').textContent =
    v > 0 ? 'Спасибо, мы свяжемся с вами' : 'Укажите площадь или массу.';
});

// Форма заявки
const form = document.getElementById('request-form'), out = document.getElementById('request-res');
form.addEventListener('submit', e => {
  e.preventDefault();
  const { name, phone, consent } = form.elements;
  const bad = [name.value.trim() ? null : name, phone.value.replace(/\D/g, '').length >= 10 ? null : phone].filter(Boolean);
  [name, phone].forEach(f => f.classList.toggle('err', bad.includes(f)));
  if (bad.length) { out.textContent = 'Укажите имя и телефон полностью.'; bad[0].focus(); return; }
  if (!consent.checked) { out.textContent = 'Подтвердите согласие на обработку данных.'; consent.focus(); return; }
  out.textContent = 'Спасибо, мы свяжемся с вами'; // позже: отправка через fetch
  form.reset();
});

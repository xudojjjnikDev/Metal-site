// ===== Калькулятор =====
const calcForm = document.getElementById('calc-form');
const calcResult = document.getElementById('calc-result');

calcForm.addEventListener('submit', (event) => {
  event.preventDefault(); // не перезагружать страницу

  const length = parseFloat(document.getElementById('calc-length').value);
  const width = parseFloat(document.getElementById('calc-width').value);

  if (!(length > 0) || !(width > 0)) {
    calcResult.textContent = 'Укажите длину и ширину в метрах.';
    return;
  }

  // Пока без расчёта: просто благодарим.
  // Позже здесь можно считать цену: площадь = length * width
  calcResult.textContent = 'Спасибо, мы свяжемся с вами';
});

// ===== Форма заявки =====
const orderForm = document.getElementById('order-form');
const orderResult = document.getElementById('order-result');

orderForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = orderForm.elements.name.value.trim();
  const phone = orderForm.elements.phone.value.trim();

  if (!name || phone.replace(/\D/g, '').length < 10) {
    orderResult.textContent = 'Введите имя и телефон полностью.';
    return;
  }

  // Здесь позже можно отправлять данные на сервер (fetch)
  orderResult.textContent = 'Спасибо, ' + name + '! Мы перезвоним вам.';
  orderForm.reset();
});

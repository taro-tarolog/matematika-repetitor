/* ============================================================
   АНАЛИТИКА — впишите два идентификатора ниже (один раз).
   Пока стоят заглушки, счётчики не подключаются и ошибок нет.
   ============================================================ */

/* GA4 Measurement ID — возьмите на analytics.google.com (вид: G-XXXXXXXXXX) */
var GA4_ID = 'G-XXXXXXXXXX';

/* Яндекс.Метрика — номер счётчика с metrika.yandex.ru (только цифры, напр. 98765432) */
var METRIKA_ID = 0;

/* ============================================================ */

(function () {
  var gaOn = GA4_ID && GA4_ID.indexOf('G-') === 0 && GA4_ID !== 'G-XXXXXXXXXX';
  var ymOn = METRIKA_ID && Number(METRIKA_ID) > 0;

  // --- Google Analytics 4 ---
  if (gaOn) {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA4_ID);
  }

  // --- Яндекс.Метрика (с Вебвизором и картой кликов) ---
  if (ymOn) {
    (function (m, e, t, r, i) {
      m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
      m[i].l = 1 * new Date();
      var k = e.createElement(t), a = e.getElementsByTagName(t)[0];
      k.async = 1; k.src = r; a.parentNode.insertBefore(k, a);
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
    ym(Number(METRIKA_ID), 'init', {
      clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true
    });
  }

  // --- Отслеживание кликов по CTA (цели/события) ---
  function track(action, label) {
    if (gaOn && window.gtag) {
      gtag('event', action, { event_category: 'CTA', event_label: label });
    }
    if (ymOn && window.ym) {
      ym(Number(METRIKA_ID), 'reachGoal', action);
    }
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a, button');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (href.indexOf('wa.me') > -1)            track('click_whatsapp', href);
    else if (href.indexOf('t.me') > -1)        track('click_telegram', href);
    else if (href.indexOf('mailto:') > -1)     track('click_email', href);
    else if (a.classList.contains('btn') || /записаться/i.test(a.textContent || '')) {
      track('click_zapis', (a.textContent || '').trim());
    }
  }, true);

  // --- Отправка формы заявки ---
  var form = document.getElementById('leadForm');
  if (form) form.addEventListener('submit', function () { track('lead_submit', 'contacts_form'); });
})();

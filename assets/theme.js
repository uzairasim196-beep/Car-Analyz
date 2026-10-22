(() => {
  const init = (scope = document) => {
    const toggle = scope.querySelector('.menu-toggle');
    if (toggle && !toggle.dataset.bound) {
      toggle.dataset.bound = 'true';
      const nav = document.getElementById('MobileNav');
      toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); nav.hidden = !open; });
      nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { nav.hidden = true; toggle.setAttribute('aria-expanded', 'false'); }));
    }
    scope.querySelectorAll('[data-hin-form]').forEach(form => {
      if (form.dataset.bound) return;
      form.dataset.bound = 'true';
      const input = form.querySelector('input[name="hin"]');
      const error = form.querySelector('[data-hin-error]');
      input.addEventListener('input', () => { input.value = input.value.toUpperCase(); input.removeAttribute('aria-invalid'); error.textContent = ''; });
      input.addEventListener('paste', event => {
        const text = event.clipboardData?.getData('text');
        if (text === undefined) return;
        event.preventDefault();
        input.value = (input.value.slice(0, input.selectionStart) + text + input.value.slice(input.selectionEnd)).toUpperCase();
        input.dispatchEvent(new Event('input', { bubbles: true }));
      });
      form.addEventListener('submit', event => {
        event.preventDefault();
        const hin = input.value.toUpperCase();
        if (!/^[A-Z0-9]{12}$/.test(hin)) { input.setAttribute('aria-invalid', 'true'); error.textContent = form.dataset.error; input.focus(); return; }
        const dialog = document.getElementById('ReportDialog');
        dialog.querySelector('[data-review-hin]').textContent = hin;
        const orderHin = dialog.querySelector('[data-order-hin]');
        if (orderHin) orderHin.value = hin;
        if (!dialog.open) dialog.showModal();
      });
    });
  };
  init();
  document.addEventListener('shopify:section:load', event => init(event.target));
  const dialog = document.getElementById('ReportDialog');
  dialog?.querySelector('[data-close-dialog]')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
})();

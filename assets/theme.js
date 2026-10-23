(() => {
  const requestCart = async (url, options = {}) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(url, {
        ...options,
        credentials: 'same-origin',
        cache: 'no-store',
        signal: controller.signal,
        headers: { Accept: 'application/json', ...options.headers }
      });
      const data = await response.json();
      if (!response.ok) throw new Error('cart_request_failed');
      return data;
    } finally {
      clearTimeout(timeout);
    }
  };
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
      form.noValidate = true;
      const input = form.querySelector('[data-hin-input]');
      const error = form.querySelector('[data-hin-error]');
      const status = form.querySelector('[data-hin-status]');
      const button = form.querySelector('button[type="submit"]');
      const label = form.querySelector('[data-submit-label]');
      const defaultLabel = label.textContent;
      const initiallyDisabled = button.disabled;
      let submitting = false;
      const reset = () => {
        submitting = false;
        button.disabled = initiallyDisabled;
        input.readOnly = false;
        label.textContent = defaultLabel;
        status.textContent = '';
        form.removeAttribute('aria-busy');
      };
      window.addEventListener('pageshow', reset);
      input.addEventListener('input', () => {
        input.removeAttribute('aria-invalid');
        if (!initiallyDisabled) error.textContent = '';
      });
      input.addEventListener('paste', event => {
        const text = event.clipboardData?.getData('text');
        if (text === undefined) return;
        event.preventDefault();
        if (input.readOnly) return;
        input.value = input.value.slice(0, input.selectionStart) + text + input.value.slice(input.selectionEnd);
        input.dispatchEvent(new Event('input', { bubbles: true }));
      });
      form.addEventListener('submit', async event => {
        event.preventDefault();
        if (submitting) return;
        const hin = input.value;
        if (hin.length > 12) { input.setAttribute('aria-invalid', 'true'); error.textContent = form.dataset.error; input.focus(); return; }
        const variantId = form.elements.namedItem('id').value;
        const reportType = form.elements.namedItem('properties[Report Type]').value;
        if (!variantId || initiallyDisabled) { error.textContent = form.dataset.unavailable; return; }
        submitting = true;
        button.disabled = true;
        input.readOnly = true;
        input.removeAttribute('aria-invalid');
        error.textContent = '';
        label.textContent = form.dataset.loading;
        status.textContent = form.dataset.loading;
        form.setAttribute('aria-busy', 'true');
        try {
          const matchesReport = item => String(item.variant_id ?? item.id) === variantId && item.quantity > 0 && (item.properties?.HIN ?? '') === hin && item.properties?.['Report Type'] === reportType;
          const cart = await requestCart(`${form.dataset.cartUrl}.js`);
          if (!Array.isArray(cart.items)) throw new Error('invalid_cart_response');
          if (!cart.items.some(matchesReport)) {
            const added = await requestCart(`${form.dataset.addUrl}.js`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ items: [{ id: variantId, quantity: 1, properties: { HIN: hin, 'Report Type': reportType } }] })
            });
            if (!Array.isArray(added.items) || !added.items.some(matchesReport)) throw new Error('report_not_added');
          }
          window.location.assign(form.dataset.checkoutUrl);
        } catch {
          reset();
          error.textContent = form.dataset.checkoutError;
          button.focus();
        }
      });
    });
  };
  init();
  document.addEventListener('shopify:section:load', event => init(event.target));
})();

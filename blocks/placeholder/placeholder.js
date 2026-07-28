/*
 * Placeholder block: generic authoring block whose "Type" field ("classes"
 * model field: dynamic-menu / promo) is rendered as an extra CSS class on
 * this block's wrapper. In production, the edge function reads that class
 * and replaces this element with the real dynamic-menu/promo block markup
 * before the page reaches the browser, so this decorator only ever runs in
 * contexts the edge doesn't intercept (local authoring/preview).
 */

export default function decorate(block) {
  const idText = block.children[0]?.textContent?.trim() || '';
  const type = block.classList.contains('promo') ? 'promo' : 'dynamic-menu';

  block.textContent = '';
  const box = document.createElement('div');
  box.className = 'placeholder-box';
  box.textContent = `Placeholder: ${type}${idText ? ` (${idText})` : ''}`;
  block.append(box);
}

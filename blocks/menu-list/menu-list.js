/*
 * Menu List Block
 * Renders block rows as a semantic list of menu items (links or plain text).
 * Each row: single cell = text only; two cells = link text + href.
 */

import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rows = [...block.children];
  let titleText = block.dataset.title || '';

  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', titleText || 'Menu');
  const ul = document.createElement('ul');
  ul.className = 'menulist-list';

  let startIndex = 0;
  if (rows.length > 0) {
    const firstRow = rows[0];
    const firstCells = [...firstRow.children];
    if (firstCells.length === 1 && !titleText) {
      titleText = firstCells[0].textContent.trim();
      startIndex = 1;
    }
  }

  if (titleText) {
    const heading = document.createElement('h2');
    heading.className = 'menulist-title';
    heading.textContent = titleText;
    nav.append(heading);
  }

  for (let i = startIndex; i < rows.length; i += 1) {
    const row = rows[i];
    const li = document.createElement('li');
    li.className = 'menulist-item';
    moveInstrumentation(row, li);

    const cells = [...row.children];
    if (cells.length >= 2) {
      const linkText = cells[0].textContent.trim();
      const href = cells[1].textContent.trim();
      const a = document.createElement('a');
      a.href = href || '#';
      a.textContent = linkText;
      if (href) a.setAttribute('aria-label', linkText);
      li.append(a);
    } else if (cells.length === 1) {
      li.textContent = cells[0].textContent.trim();
    }

    ul.append(li);
  }

  block.textContent = '';
  nav.append(ul);
  block.append(nav);
}

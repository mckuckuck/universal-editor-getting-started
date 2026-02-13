/*
 * Menu List Block
 * EDS structure: block > div rows; each row = one card with two cells (image, body).
 * First row with one cell = optional title. Rows with two cells = category cards.
 */

import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rows = [...block.children];
  let titleText = block.dataset.title || '';
  let startIndex = 0;

  if (rows.length > 0) {
    const firstRow = rows[0];
    const firstCells = [...firstRow.children];
    if (firstCells.length === 1 && !titleText) {
      titleText = firstCells[0].textContent.trim();
      startIndex = 1;
    }
  }

  const ul = document.createElement('ul');
  ul.className = 'menulist-list';

  for (let i = startIndex; i < rows.length; i += 1) {
    const row = rows[i];
    const li = document.createElement('li');
    li.className = 'menulist-card';
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && (div.querySelector('picture') || div.querySelector('img'))) {
        div.className = 'menulist-card-image';
      } else {
        div.className = 'menulist-card-body';
        const p = div.querySelector('p');
        if (p) p.classList.add('menulist-card-title');
      }
    });
    ul.append(li);
  }

  block.textContent = '';
  if (titleText) {
    const heading = document.createElement('h2');
    heading.className = 'menulist-title';
    heading.textContent = titleText;
    block.append(heading);
  }
  block.append(ul);
}

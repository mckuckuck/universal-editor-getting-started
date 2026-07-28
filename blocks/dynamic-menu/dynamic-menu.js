/*
 * Dynamic Menu block: never authored directly - the edge function rewrites
 * a "placeholder" block (type "dynamic-menu") into this block's markup
 * before the page reaches the browser. EDS row structure: one row per
 * category, each row = two cells (image, title).
 */

export default function decorate(block) {
  const rows = [...block.children];
  const ul = document.createElement('ul');
  ul.className = 'dynamic-menu-list';

  rows.forEach((row) => {
    const li = document.createElement('li');
    li.className = 'dynamic-menu-item';
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((cell) => {
      cell.className = cell.querySelector('picture, img')
        ? 'dynamic-menu-item-image'
        : 'dynamic-menu-item-body';
    });
    ul.append(li);
  });

  block.textContent = '';
  block.append(ul);
}

/*
 * Promo block: never authored directly - the edge function rewrites a
 * "placeholder" block (type "promo") into this block's markup before the
 * page reaches the browser. EDS row structure: image row, text row, button
 * row (each a single cell), rendered as text + button overlaid on the image.
 */

export default function decorate(block) {
  const [imageRow, textRow, buttonRow] = [...block.children];
  const wrapper = document.createElement('div');
  wrapper.className = 'promo-wrapper';

  const imageCell = imageRow?.children[0];
  if (imageCell) {
    imageCell.className = 'promo-image';
    wrapper.append(imageCell);
  }

  const content = document.createElement('div');
  content.className = 'promo-content';

  const textCell = textRow?.children[0];
  if (textCell) {
    textCell.className = 'promo-text';
    content.append(textCell);
  }

  const buttonCell = buttonRow?.children[0];
  if (buttonCell) {
    buttonCell.className = 'promo-button';
    content.append(buttonCell);
  }

  wrapper.append(content);
  block.textContent = '';
  block.append(wrapper);
}

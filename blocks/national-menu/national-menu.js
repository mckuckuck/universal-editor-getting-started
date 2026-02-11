/**
 * National Menu block: displays editable text content.
 */
export default function decorate(block) {
  const [textRow] = block.children;
  const text = textRow?.textContent?.trim() ?? '';

  const textEl = document.createElement('p');
  textEl.className = 'national-menu-text';
  textEl.textContent = text;

  block.replaceChildren(textEl);
}

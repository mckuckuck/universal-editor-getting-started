/*
 * Raw Markup Block
 * Authors type literal template syntax (e.g. Mustache: {{properties.title}},
 * {{#section}}...{{/section}}) into the content field. This unwraps each
 * paragraph's outer <p> so multi-line sections aren't broken up by per-line
 * wrapping, while keeping inline formatting (<strong>, <a>, etc.) intact.
 * When "Strip Formatting" is enabled, plain text is extracted instead,
 * for cases where rich-text formatting would corrupt the literal syntax.
 */
export default function decorate(block) {
  const [contentRow, stripRow] = block.children;
  const stripFormatting = stripRow?.textContent?.trim().toLowerCase() === 'true';

  const paragraphs = [...contentRow.querySelectorAll('p')];
  const sourceElements = paragraphs.length ? paragraphs : [contentRow];

  const lines = sourceElements.map((el) => (stripFormatting ? el.textContent : el.innerHTML));
  block.outerHTML = lines.join('\n');
}

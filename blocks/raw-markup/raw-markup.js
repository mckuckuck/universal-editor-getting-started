import { moveInstrumentation } from '../../scripts/scripts.js';

/*
 * Raw Markup Block
 * Authors type literal template syntax (e.g. Mustache: {{properties.title}},
 * {{#section}}...{{/section}}) into the content field. This unwraps each
 * paragraph's outer <p> so multi-line sections aren't broken up by per-line
 * wrapping, while keeping inline formatting (<strong>, <a>, etc.) intact.
 * When "Strip Formatting" is enabled, plain text is extracted instead,
 * for cases where rich-text formatting would corrupt the literal syntax.
 *
 * Never replaces block.outerHTML: that would destroy Universal Editor's
 * in-context editing instrumentation (and, when content is still empty right
 * after insertion, would wipe the block from the DOM entirely before an
 * author ever gets to type into it). Only the block's children are replaced;
 * instrumentation is moved onto the new content container so the field stays
 * editable in the canvas.
 */
export default function decorate(block) {
  const [contentRow, stripRow] = block.children;
  const stripFormatting = stripRow?.textContent?.trim().toLowerCase() === 'true';

  const paragraphs = contentRow ? [...contentRow.querySelectorAll('p')] : [];
  const sourceElements = paragraphs.length ? paragraphs : [contentRow].filter(Boolean);

  const lines = sourceElements.map((el) => (stripFormatting ? el.textContent : el.innerHTML));

  const content = document.createElement('div');
  content.className = 'raw-markup-content';
  content.innerHTML = lines.join('\n');
  if (contentRow) moveInstrumentation(contentRow, content);

  block.textContent = '';
  block.append(content);
}

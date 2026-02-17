/*
 * Disclaimer Block
 * One row with description (plaintext) and CTA from field label.
 * Decoration adds classes and converts field-label cell to a CTA link.
 */

export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length === 0) return;
  const row = rows[0];
  row.classList.add('disclaimer-row');
  const cells = [...row.children];
  if (cells.length > 0) cells[0].classList.add('disclaimer-description');
  if (cells.length > 1) {
    const labelCell = cells[1];
    labelCell.classList.add('disclaimer-field-label');
    const text = labelCell.textContent?.trim() || '';
    labelCell.textContent = '';
    const cta = document.createElement('a');
    cta.href = '#';
    cta.className = 'disclaimer-cta';
    cta.textContent = text;
    labelCell.append(cta);
  }
}

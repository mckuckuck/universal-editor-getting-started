/*
 * Disclaimer Block
 * One row with description (plaintext) and optional field label.
 * Decoration adds classes for styling.
 */

export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length === 0) return;
  const row = rows[0];
  row.classList.add('disclaimer-row');
  const cells = [...row.children];
  if (cells.length > 0) cells[0].classList.add('disclaimer-description');
  if (cells.length > 1) cells[1].classList.add('disclaimer-field-label');
}

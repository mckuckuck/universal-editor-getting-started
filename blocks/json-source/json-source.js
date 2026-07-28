/*
 * Json Source Block
 * jsonData is populated by the App Builder Universal Editor extension's
 * panel via a direct Sling POST (not editorActions.update(), which strips
 * tag-like content from any value it saves, regardless of field type).
 * jsonData is a richtext field, so it renders as real markup directly —
 * no un-escaping needed here, unlike when it was a plain text field.
 */

export default function decorate(block) {
  block.classList.add('json-source');
}

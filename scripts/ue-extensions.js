const SELECTION_MESSAGE_TYPE = 'eds-user-text-selection';
const SELECTION_DEBOUNCE_MS = 200;

/**
 * Relays the author's current text selection on the page to the App Builder
 * Universal Editor extension's rail iframe, which has no other way to read
 * character-level text selection (Universal Editor's own editorState API
 * only tracks which component is selected, not a text range within it).
 */
export default function registerUEExtensions() {
  let debounceId;

  const broadcastSelection = (text) => {
    const payload = { type: SELECTION_MESSAGE_TYPE, text };
    const guestFrames = document.querySelectorAll('iframe[data-uix-guest="true"]');

    guestFrames.forEach((frame) => {
      if (!frame.contentWindow) return;
      frame.contentWindow.postMessage(payload, '*');
    });
  };

  document.addEventListener('selectionchange', () => {
    clearTimeout(debounceId);
    debounceId = setTimeout(() => {
      const text = window.getSelection().toString();
      if (text.trim()) broadcastSelection(text);
    }, SELECTION_DEBOUNCE_MS);
  });
}

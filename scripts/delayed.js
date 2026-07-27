import { loadCSS } from './aem.js';

const MARKED_TEXT_RE = /\/\/\[([^\]]+)\]\s*([\s\S]*?)\/\//g;

function isInUniversalEditor() {
  return window.self !== window.top;
}

// Universal Editor strips <span> + inline styling from richtext on save, so
// the RTE style picker extension persists styles as //[class]text// markers
// instead. This turns those markers back into real styled <span>s for
// display, both on published pages and (optionally) inside the editor.
function decorateRTEStyles(main) {
  main.querySelectorAll('p').forEach((paragraph) => {
    MARKED_TEXT_RE.lastIndex = 0;
    if (MARKED_TEXT_RE.test(paragraph.innerHTML)) {
      paragraph.innerHTML = paragraph.innerHTML.replace(
        MARKED_TEXT_RE,
        '<span class="$1">$2</span>',
      );
    }
  });
}

async function loadDelayed() {
  const main = document.querySelector('main');

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);

  if (isInUniversalEditor()) {
    const { default: registerUEExtensions } = await import('./ue-extensions.js');
    registerUEExtensions();

    const showStyled =
      new URLSearchParams(window.location.search).get('edsRTEShowStyled') === 'true';
    if (showStyled) decorateRTEStyles(main);
  } else {
    decorateRTEStyles(main);
  }
}

loadDelayed();

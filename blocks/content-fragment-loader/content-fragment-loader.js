/*
 * Content Fragment Loader Block
 * Author provides a Content Fragment URL and template name. Content is populated by the
 * edge compute function (server-side); minimal client-side logic.
 */

/**
 * Decorate: leave block structure intact so compute can read URL and template name
 * from the block markup and replace with rendered CF content when serving the page.
 */
export default function decorate(block) {
  block.classList.add('content-fragment-loader-placeholder');
}

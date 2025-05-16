/**
 * Converts a string into a URL-friendly slug.
 *
 * This function transforms the input string to lowercase, removes
 * diacritical marks, and replaces spaces with hyphens. It is useful
 * for generating slugs from text that can be used in URLs.
 *
 * @param {string} str - The input string to be converted.
 * @returns {string} The resulting slugified string.
 */
export function Slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ /g, '-');
}

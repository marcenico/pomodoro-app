/**
 * Detecta si la app está corriendo dentro del popup de la extensión de Chrome
 * (en vez de en la web pública), donde existe la API `chrome.runtime`.
 * @returns {boolean}
 */
export const isExtensionContext = () =>
  typeof chrome !== 'undefined' && !!chrome.runtime && !!chrome.runtime.id;

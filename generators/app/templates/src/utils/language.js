/**
 * Helper function to get language string from i18n library
 * @returns {string}
 */
export const getLanguageCode = () => {
  let language = localStorage.getItem('i18nextLng') || 'en';

  // Quick fix for an issue where the i18n library sometimes uses en-US instead of en
  if (language === 'en-US') {
    language = 'en';
  }
  return language;
};

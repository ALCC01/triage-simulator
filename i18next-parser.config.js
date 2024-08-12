export default {
  keepRemoved: false,
  jsx: [{
    lexer: 'JsxLexer',
    attr: 'i18nKey', // Attribute for the keys
    componentFunctions: ['Trans'], // Array of components to match
  }],
  locales: ['it'],
  output: 'src/i18n/$LOCALE-$NAMESPACE.json',
  resetDefaultValueLocale: 'en',
}
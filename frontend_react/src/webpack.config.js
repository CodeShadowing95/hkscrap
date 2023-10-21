export const resolve = {
  mode: 'development',
  target: ['web', 'es5'],
  resolve: {
      extensions: ['.js'],

      /* polyfills used to be included, now they must be manually added. however, they will error out if not added */
      /* thus the :false fallbacks */
      fallback: { "http": false, "https": false, "stream": false, "tty": false, "zlib": false, crypto: false }
  },
};
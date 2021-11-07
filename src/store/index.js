import { store } from 'quasar/wrappers'
import { createStore, createLogger } from 'vuex'

import admin from './admin'
import articles from './articles'
import auth from './auth'
import context from './context'
import csr from './csr'
import messages from './messages'
import profile from './profile'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

const debug = process.env.DEBUGGING

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      admin,
      articles,
      auth,
      context,
      csr,
      messages,
      profile,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: debug,
    plugins: debug ? [createLogger()] : [],
  })

  return Store
})

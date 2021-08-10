import { store } from 'quasar/wrappers'
import { createStore, createLogger } from 'vuex'

import auth from './modules/auth'
import profile from './modules/profile'

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
      auth,
      profile,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: debug,
    plugins: debug ? [createLogger()] : [],
  })

  return Store
})

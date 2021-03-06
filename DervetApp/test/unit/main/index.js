import Vue from 'vue'
Vue.config.devtools = false
Vue.config.productionTip = false

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

// require all src files except index.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
const srcContext = require.context('../../../src/main/service', true)
srcContext.keys().forEach(srcContext)

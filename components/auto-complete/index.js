import AutoCompleteDispatcher from './src/auto-complete.vue'

AutoCompleteDispatcher.install = function (Vue) {
  Vue.component(AutoCompleteDispatcher.name, AutoCompleteDispatcher)
}
AutoCompleteDispatcher.reset = function (options) {
  AutoCompleteDispatcher.inject = [options.providerName]
}

export default AutoCompleteDispatcher

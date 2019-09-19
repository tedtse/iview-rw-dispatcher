import SwitchDispatcher from './src/switch'

SwitchDispatcher.install = function (Vue) {
  Vue.component(SwitchDispatcher.name, SwitchDispatcher)
}
SwitchDispatcher.reset = function (options) {
  SwitchDispatcher.inject = [options.providerName]
}

export default SwitchDispatcher

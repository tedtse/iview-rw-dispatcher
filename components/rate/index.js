import RateDispatcher from './src/rate'

RateDispatcher.install = function (Vue) {
  Vue.component(RateDispatcher.name, RateDispatcher)
}
RateDispatcher.reset = function (options) {
  RateDispatcher.inject = [options.providerName]
}

export default RateDispatcher

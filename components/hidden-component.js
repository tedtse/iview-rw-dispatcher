import _ from 'lodash'
import options from '../options'

export default (h, context) => {
  const { data, children } = context
  return h('div', _.merge({}, data, {
    style: {
      display: 'none',
      width: 0,
      height: 0
    },
    attrs: {
      role: options.hiddenComponentRole
    }
  }), children)
}

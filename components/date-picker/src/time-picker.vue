<script>
import _ from 'lodash'
import helper from 'rw-dispatcher-helper'
import options from '../../../options'
import { joinWithSeperator } from '../../mixins'
import { DEFAULT_FORMATS, TYPE_VALUE_RESOLVER_MAP, formatDate } from './util'

const tag = 'time-picker'

const getParsedValue = (value, type) => {
  const isRange = type.includes('range')
  let val = value.map(date => {
    if (date instanceof Date) {
      return formatDate(date, 'yyyy-MM-dd HH:mm:ss')
    } else {
      return date || ''
    }
  })
  return isRange ? val : val[0]
}

const renderRules = [
  ...helper.genRenderRules(tag),
  {
    // 读状态且不存在 readStateRender 插槽
    match: (context, state) => (helper.isReadStateAndNotRener(context, state)),
    action: (h, context) => {
      const localConfig = _.get(context, `injections.${options.providerName}.${options.providerConfig}`, {})
      const { readStateData } = helper.wrapContext(context, options.uuidAttribute, options.readStateClsPrefix, tag, '-')
      const { value } = context.props
      const type = _.get(context, 'props.type', 'time')
      const rangeSeparator = helper.getDispatcherProp(context, options.namespace, 'range-separator') || localConfig.rangeSeparator || options.rangeSeparator
      const formatDate = val => {
        const format = DEFAULT_FORMATS[type]
        const { formatter, parser } = (
          TYPE_VALUE_RESOLVER_MAP[type] ||
          TYPE_VALUE_RESOLVER_MAP['default']
        )
        const _val = parser(val, context.props.format || format) || ''
        return formatter(_val, context.props.format || format, rangeSeparator)
      }
      const values = value.constructor === Array ? value : [value]
      const parsedValue = getParsedValue(values, type)
      let childNodes
      if (type === 'time') {
        childNodes = [formatDate(parsedValue)]
      } else if (Array.isArray(parsedValue)) {
        childNodes = formatDate(parsedValue).split(rangeSeparator)
      } else {
        childNodes = [formatDate(parsedValue)]
      }
      const vnode = h('div', readStateData, joinWithSeperator(h, childNodes, rangeSeparator))
      // renderHook(context.parent, uuid, tag, _.get(context, 'data.attrs.size'))
      return vnode
    }
  }
]

export default {
  name: 'TimePickerDispatcher',
  functional: true,
  inject: [options.providerName],
  render (h, context) {
    const state = helper.getDispatcherProp(context, options.namespace, 'state') ||
      _.get(context, `injections.${options.providerName}.${options.providerState}`, '')
    const rule = renderRules.find(rule => rule.match(context, state, options))
    if (rule) {
      return rule.action(h, context, options)
    }
    return null
  }
}
</script>

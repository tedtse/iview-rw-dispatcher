<script>
import _ from 'lodash'
import helper from 'rw-dispatcher-helper'
import options from '../../../options'
import { joinWithSeperator } from '../../mixins'
import { DEFAULT_FORMATS, TYPE_VALUE_RESOLVER_MAP } from './util'

const tag = 'date-picker'

const renderRules = [
  ...helper.genRenderRules(tag),
  {
    // 读状态且不存在 readStateRender 插槽
    match: (context, state) => (helper.isReadStateAndNotRener(context, state)),
    action: (h, context) => {
      const localConfig = _.get(context, `injections.${options.providerName}.${options.providerConfig}`, {})
      const { readStateData } = helper.wrapContext(context, options.uuidAttribute, options.readStateClsPrefix, tag, '-')
      const { value } = context.props
      const type = context.props.type || 'date'
      const multiple = context.props.multiple !== undefined
      const separator = helper.getDispatcherProp(context, options.namespace, 'separator') || localConfig.separator || options.separator
      const rangeSeparator = helper.getDispatcherProp(context, options.namespace, 'range-separator') || localConfig.rangeSeparator || options.rangeSeparator
      const formatDate = val => {
        const format = DEFAULT_FORMATS[type]
        if (multiple) {
          const formatter = TYPE_VALUE_RESOLVER_MAP.multiple.formatter
          return formatter(val, context.props.format || format, separator)
        } else {
          const date = val.constructor === Date ? val : new Date(val)
          const { formatter } = (
            TYPE_VALUE_RESOLVER_MAP[type] ||
            TYPE_VALUE_RESOLVER_MAP['default']
          )
          return formatter(date, context.props.format || format, rangeSeparator)
        }
      }
      let childNodes
      let vnode
      if (multiple) {
        const temp = formatDate(value)
        childNodes = typeof temp === 'string' ? temp.split(',') : [temp]
        vnode = h('div', readStateData, joinWithSeperator(h, childNodes, separator))
      } else {
        if (type.match(/^time/)) {
          childNodes = [value]
        } else if (Array.isArray(value)) {
          childNodes = value.map(formatDate)
        } else {
          childNodes = [formatDate(value)]
        }
        vnode = h('div', readStateData, joinWithSeperator(h, childNodes, rangeSeparator))
      }
      // renderHook(context.parent, uuid, tag, _.get(context, 'data.attrs.size'))
      return vnode
    }
  }
]

export default {
  name: 'DatePickerDispatcher',
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

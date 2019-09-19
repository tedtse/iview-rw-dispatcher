<script>
import _ from 'lodash'
import helper from 'rw-dispatcher-helper'
import options from '../../../options'
import { renderHook, joinWithSeperator } from '../../mixins'

const tag = 'slider'

const renderRules = [
  ...helper.genRenderRules(tag),
  {
    // 读状态且不存在 readStateRender 插槽
    match: (context, state) => (helper.isReadStateAndNotRener(context, state)),
    action: (h, context) => {
      const localConfig = _.get(context, `injections.${options.providerName}.${options.providerConfig}`, {})
      const { readStateData, uuid } = helper.wrapContext(context, options.uuidAttribute, options.readStateClsPrefix, tag, '-')
      const rangeSeparator = helper.getDispatcherProp(context, options.namespace, 'range-separator') || localConfig.rangeSeparator || options.rangeSeparator
      const tipFormat = _.get(context, 'props.tipFormat', null)
      const value = _.get(context, 'data.attrs.value', '')
      const tmp = value.constructor === Array ? value : [value]
      const labels = tmp.map(item => (
        typeof tipFormat === 'function' ? tipFormat(item) : item
      ))
      const vnode = h('div', readStateData, joinWithSeperator(h, labels, rangeSeparator))
      renderHook(context.parent, uuid, tag, _.get(context, 'data.attrs.size'))
      return vnode
    }
  }
]

export default {
  name: 'SliderDispatcher',
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

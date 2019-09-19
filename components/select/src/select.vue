<script>
import _ from 'lodash'
import helper from 'rw-dispatcher-helper'
import options from '../../../options'
import { joinWithSeperator } from '../../mixins'

const isOption = component => {
  return component.componentOptions.tag === 'Option'
}
const isOptionGroup = component => {
  return component.componentOptions.tag === 'OptionGroup'
}

const traverse = (vnodes = [], values) => {
  const result = []
  vnodes.forEach(item => {
    if (!item.componentOptions) {
      return
    }
    if (isOptionGroup(item)) {
      result.push(...traverse(item.componentOptions.children, values))
    } else if (isOption(item)) {
      const propsData = item.componentOptions.propsData
      if (values.includes(propsData.value)) {
        result.push({ propsData, children: item.componentOptions.children })
      }
    }
  })
  return result
}

const getLabels = (data, children) => {
  const value = data.model.value
  const values = value.constructor === Array ? value : [value]
  const matcher = traverse(children, values)
  return matcher.map(item => item.propsData.label || item.children)
}

const tag = 'select'

const renderRules = [
  ...helper.genRenderRules('Select'),
  {
    // 读状态且不存在 readStateRender 插槽
    match: (context, state) => (helper.isReadStateAndNotRener(context, state)),
    action: (h, context) => {
      const localConfig = _.get(context, `injections.${options.providerName}.${options.providerConfig}`, {})
      const { readStateData } = helper.wrapContext(context, options.uuidAttribute, options.readStateClsPrefix, tag, '-')
      const { data, children } = context
      const separator = helper.getDispatcherProp(context, options.namespace, 'separator') || localConfig.separator || options.separator
      const vnode = h('div', readStateData, joinWithSeperator(h, getLabels(data, children), separator))
      // renderHook(context.parent, uuid, tag, _.get(context, 'data.attrs.size'))
      return vnode
    }
  }
]

export default {
  name: 'SelectDispatcher',
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

<script>
import _ from 'lodash'
import helper from 'rw-dispatcher-helper'
import options from '../../../options'
// import { renderHook } from '../../mixins'

const isRadio = component => {
  return _.get(component, 'componentOptions.tag', '').toLowerCase() === 'radio'
}

const isRadioButton = component => {
  return _.get(component, 'componentOptions.tag', '').toLowerCase() === 'radio-button'
}

const isHiddenComponent = component => {
  return _.get(component, 'data.attrs.role') === options.hiddenComponentRole
}

const tag = 'radio-group'

const renderRules = [
  ...helper.genRenderRules(tag),
  {
    // 读状态且不存在 readStateRender 插槽
    match: (context, state) => (helper.isReadStateAndNotRener(context, state)),
    action: (h, context) => {
      const { readStateData } = helper.wrapContext(context, options.uuidAttribute, options.readStateClsPrefix, tag, '-')
      const value = _.get(context, 'data.attrs.value')
      const childNodes = []
      const children = _.get(context, 'children', [])
      children.forEach(component => {
        let label = _.get(component, 'data.attrs.label')
        if (isHiddenComponent(component) && label === value) {
          childNodes.push(component.children || label)
          return
        }
        label = _.get(component, 'componentOptions.propsData.label')
        if ((isRadio(component) || isRadioButton(component)) && label === value) {
          childNodes.push(...(component.componentOptions.children || []))
        }
      })
      const cloneData = _.cloneDeep(readStateData)
      _.set(cloneData, 'attrs.type', '')
      const vnode = h('div', cloneData, childNodes)
      // renderHook(context.parent, uuid, tag, _.get(context, 'data.attrs.size'))
      return vnode
    }
  }
]

export default {
  name: 'RadioGroupDispatcher',
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

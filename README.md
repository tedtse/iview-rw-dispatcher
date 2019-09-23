# iview-rw-dispatcher
基于 iView form 组件的分发器，这样表单的编辑和详情就可以一套代码完成，节省了开发成本。

### 安装
npm 安装
```shell
npm i iview-rw-dispatcher
```
yarn 安装
```shell
yarn add iview-rw-dispatcher
```

### 引入
开发者可以选择完整引入和按需引入。下面介绍完整引入

在 main.js 中写入以下内容：

```javascript
import Vue from 'vue'
import iViewRwDispatcher from 'iview-rw-dispatcher'
import 'iview-rw-dispatcher/styles/index.less'
import App from './App.vue'

Vue.use(ElementUiRwDispatcher)

new Vue({
  el: '#app',
  render: h => h(App)
})
```

### 使用
使用分发器比较使用表单只多了三步：
- 添加 `provide` 属性，其中 `rwDispatcherProvider` 的值指向自身
- data属性中添加 `rwDispatcherState` 做状态管理（`read` or `write`）
- 原来表单元素的标签加一个 `Dispatcher` 后缀，其配置保持不变
```html
<template>
  <Form ref="form" :model="form" :label-width="80" size="small">
    <FormItem label="活动名称">
      <InputDispatcher v-model="form.name" />
    </FormItem>
    <FormItem label="活动区域">
      <SelectDispatcher v-model="form.region" placeholder="请选择活动区域">
        <Option label="区域一" value="shanghai" />
        <Option label="区域二" value="beijing" />
      </SelectDispatcher>
    </FormItem>
    <div style="text-align: right">
      <Button
        v-show="rwDispatcherState === 'write'"
        type="primary"
        size="small"
        @click="toggleState"
      >编辑</Button>
      <Button
        v-show="rwDispatcherState === 'read'"
        type="primary"
        size="small"
        @click="toggleState"
      >详情</Button>
    </div>
  </Form>
</template>

<script>
export default {
  provide () {
    return {
      rwDispatcherProvider: this
    }
  },
  data () {
    return {
      rwDispatcherState: 'write',
      form: {
        name: '618电器折扣日',
        region: 'shanghai'
      }
    }
  },
  methods: {
    toggleState () {
      if (this.rwDispatcherState === 'write') {
        this.rwDispatcherState = 'read'
      } else {
        this.rwDispatcherState = 'write'
      }
    }
  }
}
</script>
```

## 全局配置
全局配置在插件初始化时配置。

### 使用
```javascript
import Vue from 'vue'
import iViewRwDispatcher from 'iview-rw-dispatcher'
import 'iview-rw-dispatcher/styles/index.less'

Vue.use(iViewRwDispatcher, {
  namespace: 'rw-dispatcher',
  trueValue: '是',
  falseValue: '否',
  separator: '|',
  rangeSeparator: '-',
  readStateRender: {
    // ...
  }
})
```

### 配置参数
<table>
  <thead>
    <tr>
      <th>参数</th>
      <th>说明</th>
      <th>类型</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>namespace</td>
      <td>
        命名空间，read 状态渲染函数、状态管理、局部配置等参数的前缀。
        <el-tooltip placement="top">
          <div slot="content">
            状态管理参数是 rwDispatcherState（camelCase）；<br />
            InputDispatcher read 状态渲染生成的 class 是 rw-dispatcher-input（kebab-case）。
          </div>
          <i class="el-icon-question" />
        </el-tooltip>
        <br />
        使用过程中如果有参数冲突时可以改这个值。
      </td>
      <td>String</td>
      <td>rw-dispatcher</td>
    </tr>
    <tr>
      <td>trueValue</td>
      <td>值为真时的文字描述</td>
      <td>String</td>
      <td>是</td>
    </tr>
    <tr>
      <td>falseValue</td>
      <td>值为假时的文字描述</td>
      <td>String</td>
      <td>否</td>
    </tr>
    <tr>
      <td>separator</td>
      <td>
        分隔符，组件有多个值且是并列关系，read 状态渲染时用该符号间隔。<br />
        如组件的值为 ['Tom', 'Jerry']，显示 'Tom|Jerry'。
      </td>
      <td>String</td>
      <td>|</td>
    </tr>
    <tr>
      <td>rangeSeparator</td>
      <td>
        连接符，组件有多个值且是区间关系，read 状态渲染时用该符号连接。<br />
        如组件的值为 ['2019/06/15', '2019/08/15']，显示 '2019/06/15-2019/08/15'。
      </td>
      <td>String</td>
      <td>-</td>
    </tr>
    <tr>
      <td>readStateRender</td>
      <td>read 状态自定义渲染函数。具体配置如下</td>
      <td>Object</td>
      <td>{}</td>
    </tr>
  </tbody>
</table>

### 自定义渲染函数
所有自定义函数的参数均为 (h, context) [Vue 函数式组件](https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6)。具体配置如下：

| 可配置项 | 说明 | 类型 |
| ---- | -------- | ---- |
| input | InputDispatcher 自定义渲染函数 | Function |
| inputNumber | InputNumberDispatcher 自定义渲染函数 | Function |
| autocomplete | AutocompleteDispatcher 自定义渲染函数 | Function |
| select | SelectDispatcher 自定义渲染函数 | Function |
| checkbox | CheckboxDispatcher 自定义渲染函数 | Function |
| checkboxGroup | CheckboxGroupDispatcher 自定义渲染函数 | Function |
| radio | RadioDispatcher 自定义渲染函数 | Function |
| radioGroup | RadioGroupDispatcher 自定义渲染函数 | Function |
| switch | SwitchDispatcher 自定义渲染函数 | Function |
| datePicker | DatePickerDispatcher 自定义渲染函数 | Function |
| timePicker | TimePickerDispatcher 自定义渲染函数 | Function |
| rate | RateDispatcher 自定义渲染函数 | Function |
| slider | SliderDispatcher 自定义渲染函数 | Function |

## 局部配置
如果组件的实际配置与全局配置不同，需要用局部配置覆盖全局配置，配置名默认`rwDispatcherConfig`。局部配置与全局配置的唯一区别，是局部配置**没有**命名空间(namespace)选项，而全局配置有。

### 使用
```html
<template>
  <Form ref="form" :model="form" :label-width="80" size="small">
    <FormItem label="活动名称">
      <InputDispatcher v-model="form.name" />
    </FormItem>
    <FormItem label="活动区域">
      <SelectDispatcher v-model="form.region" placeholder="请选择活动区域">
        <Option label="区域一" value="shanghai" />
        <Option label="区域二" value="beijing" />
      </SelectDispatcher>
    </FormItem>
  </Form>
</template>

<script>
export default {
  provide() {
    return {
      rwDispatcherProvider: this
    }
  },
  data() {
    return {
      rwDispatcherState: 'write',
      rwDispatcherConfig: {
        readStateRender: {
          input (h, context) {
            return h('span', {
              style: { color: 'red' }
            }, context.data.attrs.value)
          },
          select (h, context) {
            const { data, children } = context
            const vnode = children.find(item => {
              return item.componentOptions.propsData.value === data.attrs.value
            })
            if (!vnode) {
              return null
            }
            return h('span', {
              style: { color: 'green' }
            }, vnode.componentOptions.propsData.label)
          }
        }
      },
      form: {
        name: '618电器折扣日',
        region: 'shanghai'
      }
    }
  }
}
</script>
```

## 配置优先级

read 状态的渲染函数有多套配置，分别是：

- **全局配置**

  插件初始化时配置。比如命名空间 `namespace`（默认 `rwDispatcher`），用法是：
```js
import Vue from 'vue'
import iViewRwDispatcher from 'iview-rw-dispatcher'

Vue.use(iViewRwDispatcher, {
  // 全局配置
})
```

- **局部配置**

  在 provider 组件中的 `${namespace}Config` 参数（默认 `rwDispatcherConfig`），用法是：
```js
export default {
  data () {
    return {
      rwDispatcherConfig: {
        // 局部配置
      }
    }
  }
}
```

- **组件配置**

  单个组件的 props 和 slot。比如：
```html
<DatePickerDispatcher type="daterange" rw-dispatcher-range-separator="-">
  <template #rwDispatcherRender="{ data, children }">
    <!-- slot -->
  </template>
</DatePickerDispatcher>
```

优先级顺序是：

`组件配置` > `局部配置` > `全局配置`，优先级高的配置会覆盖优先级低的配置。

组件配置中 `slot` > `props`。如下：
```html
<template>
  <InputDispatcher :rw-dispatcher-render="inputRender">
    <template #rwDispatcherRender="{ data, children }">
      <!-- slot -->
    </template>
  </InputDispatcher>
</template>

<script>
export default {
  methods: {
    inputRender (h, context) {
      // render
    }
  }
}
</script>
```
read 转态会应用 slot 的渲染函数。

## 组件配置

### InputDispatcher

#### Attributes

<table>
  <thead>
    <tr>
      <th>参数</th>
      <th>说明</th>
      <th>类型</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${namespace}-state<br />（默认 rw-dispatcher-state，kebeb-case）</td>
      <td>组件状态，可选值为 "read"|"write"，优先级高于局部状态</td>
      <td>Function(h, context)</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>${namespace}-render<br />（默认 rw-dispatcher-render，kebeb-case）</td>
      <td>自定义渲染函数（props 形式）</td>
      <td>Function(h, context)</td>
      <td>undefined</td>
    </tr>
  </tbody>
</table>

#### Scoped Slots

<table>
  <thead>
    <tr>
      <th>name</th>
      <th>说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${namespace}Render<br />（默认 rwDispatcherRender，camelCase）</td>
      <td>
        read 状态自定义渲染函数。参数是<a href="https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6" target="_blank">Vue 函数式组件]</a>中的 context.data 和 context.children
      </td>
    </tr>
  </tbody>
</table>

### InputDispatcher

#### Attributes

<table>
  <thead>
    <tr>
      <th>参数</th>
      <th>说明</th>
      <th>类型</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${namespace}-state<br />（默认 rw-dispatcher-state，kebeb-case）</td>
      <td>组件状态，可选值为 "read"|"write"，优先级高于局部状态</td>
      <td>Function(h, context)</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>${namespace}-render<br />（默认 rw-dispatcher-render，kebeb-case）</td>
      <td>自定义渲染函数（props 形式）</td>
      <td>Function(h, context)</td>
      <td>undefined</td>
    </tr>
  </tbody>
</table>

#### Scoped Slots

<table>
  <thead>
    <tr>
      <th>name</th>
      <th>说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${namespace}Render<br />（默认 rwDispatcherRender，camelCase）</td>
      <td>
        read 状态自定义渲染函数。参数是<a href="https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6" target="_blank">Vue 函数式组件]</a>中的 context.data 和 context.children
      </td>
    </tr>
  </tbody>
</table>

### AutoCompleteDispatcher

#### Attributes

<table>
  <thead>
    <tr>
      <th>参数</th>
      <th>说明</th>
      <th>类型</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${namespace}-state<br />（默认 rw-dispatcher-state，kebeb-case）</td>
      <td>组件状态，可选值为 "read"|"write"，优先级高于局部状态</td>
      <td>Function(h, context)</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>${namespace}-render<br />（默认 rw-dispatcher-render，kebeb-case）</td>
      <td>自定义渲染函数（props 形式）</td>
      <td>Function(h, context)</td>
      <td>undefined</td>
    </tr>
  </tbody>
</table>

#### Scoped Slots

<table>
  <thead>
    <tr>
      <th>name</th>
      <th>说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${namespace}Render<br />（默认 rwDispatcherRender，camelCase）</td>
      <td>
        read 状态自定义渲染函数。参数是<a href="https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6" target="_blank">Vue 函数式组件]</a>中的 context.data 和 context.children
      </td>
    </tr>
  </tbody>
</table>

### InputNumberDispatcher

#### Attributes

<table>
  <thead>
    <tr>
      <th>参数</th>
      <th>说明</th>
      <th>类型</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${namespace}-state<br />（默认 rw-dispatcher-state，kebeb-case）</td>
      <td>组件状态，可选值为 "read"|"write"，优先级高于局部状态</td>
      <td>Function(h, context)</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>${namespace}-render<br />（默认 rw-dispatcher-render，kebeb-case）</td>
      <td>自定义渲染函数（props 形式）</td>
      <td>Function(h, context)</td>
      <td>undefined</td>
    </tr>
  </tbody>
</table>

#### Scoped Slots

<table>
  <thead>
    <tr>
      <th>name</th>
      <th>说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${namespace}Render<br />（默认 rwDispatcherRender，camelCase）</td>
      <td>
        read 状态自定义渲染函数。参数是<a href="https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6" target="_blank">Vue 函数式组件]</a>中的 context.data 和 context.children
      </td>
    </tr>
  </tbody>
</table>

### SelectDispatcher

#### Attributes

<table>
  <thead>
    <tr>
      <th>参数</th>
      <th>说明</th>
      <th>类型</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${namespace}-state<br />（默认 rw-dispatcher-state，kebeb-case）</td>
      <td>组件状态，可选值为 "read"|"write"，优先级高于局部状态</td>
      <td>Function(h, context)</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>${namespace}-render<br />（默认 rw-dispatcher-render，kebeb-case）</td>
      <td>自定义渲染函数（props 形式）</td>
      <td>Function(h, context)</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>${namespace}-separator<br />（默认 rw-dispatcher-separator）</td>
      <td>自定义分隔符</td>
      <td>String</td>
      <td>|</td>
    </tr>
  </tbody>
</table>

#### Scoped Slots

<table>
  <thead>
    <tr>
      <th>name</th>
      <th>说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${namespace}Render<br />（默认 rwDispatcherRender，camelCase）</td>
      <td>
        read 状态自定义渲染函数。参数是<a href="https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6" target="_blank">Vue 函数式组件]</a>中的 context.data 和 context.children
      </td>
    </tr>
  </tbody>
</table>

### RadioDispatcher

#### Radio Attributes

<table>
  <thead>
    <tr>
      <th>参数</th>
      <th>说明</th>
      <th>类型</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${namespace}-state<br />（默认 rw-dispatcher-state，kebeb-case）</td>
      <td>组件状态，可选值为 "read"|"write"，优先级高于局部状态</td>
      <td>Function(h, context)</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>${namespace}-render<br />（默认 rw-dispatcher-render，kebeb-case）</td>
      <td>自定义渲染函数（props 形式）</td>
      <td>Function(h, context)</td>
      <td>undefined</td>
    </tr>
  </tbody>
</table>

#### Radio Scoped Slots

<table>
  <thead>
    <tr>
      <th>name</th>
      <th>说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${namespace}Render<br />（默认 rwDispatcherRender，camelCase）</td>
      <td>
        read 状态自定义渲染函数。参数是<a href="https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6" target="_blank">Vue 函数式组件]</a>中的 context.data 和 context.children
      </td>
    </tr>
  </tbody>
</table>

#### RadioGroup Attributes

<table>
  <thead>
    <tr>
      <th>参数</th>
      <th>说明</th>
      <th>类型</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${namespace}-state<br />（默认 rw-dispatcher-state，kebeb-case）</td>
      <td>组件状态，可选值为 "read"|"write"，优先级高于局部状态</td>
      <td>Function(h, context)</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>${namespace}-render<br />（默认 rw-dispatcher-render，kebeb-case）</td>
      <td>自定义渲染函数（props 形式）</td>
      <td>Function(h, context)</td>
      <td>undefined</td>
    </tr>
  </tbody>
</table>

#### RadioGroup Scoped Slots

<table>
  <thead>
    <tr>
      <th>name</th>
      <th>说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${namespace}Render<br />（默认 rwDispatcherRender，camelCase）</td>
      <td>
        read 状态自定义渲染函数。参数是<a href="https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6" target="_blank">Vue 函数式组件]</a>中的 context.data 和 context.children
      </td>
    </tr>
  </tbody>
</table>

### CheckboxDispatcher

#### Checkbox Attributes

<table>
  <thead>
    <tr>
      <th>参数</th>
      <th>说明</th>
      <th>类型</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${namespace}-state<br />（默认 rw-dispatcher-state，kebeb-case）</td>
      <td>组件状态，可选值为 "read"|"write"，优先级高于局部状态</td>
      <td>Function(h, context)</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>${namespace}-render<br />（默认 rw-dispatcher-render，kebeb-case）</td>
      <td>自定义渲染函数（props 形式）</td>
      <td>Function(h, context)</td>
      <td>undefined</td>
    </tr>
  </tbody>
</table>

#### Checkbox Scoped Slots

<table>
  <thead>
    <tr>
      <th>name</th>
      <th>说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${namespace}Render<br />（默认 rwDispatcherRender，camelCase）</td>
      <td>
        read 状态自定义渲染函数。参数是<a href="https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6" target="_blank">Vue 函数式组件]</a>中的 context.data 和 context.children
      </td>
    </tr>
  </tbody>
</table>

#### CheckboxGroup Attributes

<table>
  <thead>
    <tr>
      <th>参数</th>
      <th>说明</th>
      <th>类型</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${namespace}-state<br />（默认 rw-dispatcher-state，kebeb-case）</td>
      <td>组件状态，可选值为 "read"|"write"，优先级高于局部状态</td>
      <td>Function(h, context)</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>${namespace}-render<br />（默认 rw-dispatcher-render，kebeb-case）</td>
      <td>自定义渲染函数（props 形式）</td>
      <td>Function(h, context)</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>${namespace}-separator<br />（默认 rw-dispatcher-separator）</td>
      <td>自定义分隔符。与属性 multiple 配合使用</td>
      <td>String</td>
      <td>|</td>
    </tr>
  </tbody>
</table>

#### CheckboxGroup Scoped Slots

<table>
  <thead>
    <tr>
      <th>name</th>
      <th>说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${namespace}Render<br />（默认 rwDispatcherRender，camelCase）</td>
      <td>
        read 状态自定义渲染函数。参数是<a href="https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6" target="_blank">Vue 函数式组件]</a>中的 context.data 和 context.children
      </td>
    </tr>
  </tbody>
</table>

### DatePickerDispatcher

#### Attributes

<table>
  <thead>
    <tr>
      <th>参数</th>
      <th>说明</th>
      <th>类型</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${namespace}-state<br />（默认 rw-dispatcher-state，kebeb-case）</td>
      <td>组件状态，可选值为 "read"|"write"，优先级高于局部状态</td>
      <td>Function(h, context)</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>${namespace}-render<br />（默认 rw-dispatcher-render，kebeb-case）</td>
      <td>自定义渲染函数（props 形式）</td>
      <td>Function(h, context)</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>${namespace}-separator<br />（默认 rw-dispatcher-separator）</td>
      <td>自定义分隔符。与属性 multiple 配合使用</td>
      <td>String</td>
      <td>|</td>
    </tr>
    <tr>
      <td>${namespace}-range-separator<br />（默认 rw-dispatcher-range-separator）</td>
      <td>自定义连接符。与属性 type="daterange" 配合使用</td>
      <td>String</td>
      <td>-</td>
    </tr>
  </tbody>
</table>

#### Scoped Slots

<table>
  <thead>
    <tr>
      <th>name</th>
      <th>说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${namespace}Render<br />（默认 rwDispatcherRender，camelCase）</td>
      <td>
        read 状态自定义渲染函数。参数是<a href="https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6" target="_blank">Vue 函数式组件]</a>中的 context.data 和 context.children
      </td>
    </tr>
  </tbody>
</table>

### TimePickerDispatcher

#### Attributes

<table>
  <thead>
    <tr>
      <th>参数</th>
      <th>说明</th>
      <th>类型</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${namespace}-state<br />（默认 rw-dispatcher-state，kebeb-case）</td>
      <td>组件状态，可选值为 "read"|"write"，优先级高于局部状态</td>
      <td>Function(h, context)</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>${namespace}-render<br />（默认 rw-dispatcher-render，kebeb-case）</td>
      <td>自定义渲染函数（props 形式）</td>
      <td>Function(h, context)</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>${namespace}-range-separator<br />（默认 rw-dispatcher-range-separator）</td>
      <td>自定义连接符。与属性 type="timerange" 配合使用</td>
      <td>String</td>
      <td>-</td>
    </tr>
  </tbody>
</table>

#### Scoped Slots

<table>
  <thead>
    <tr>
      <th>name</th>
      <th>说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${namespace}Render<br />（默认 rwDispatcherRender，camelCase）</td>
      <td>
        read 状态自定义渲染函数。参数是<a href="https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6" target="_blank">Vue 函数式组件]</a>中的 context.data 和 context.children
      </td>
    </tr>
  </tbody>
</table>

### SwitchDispatcher

#### Attributes

<table>
  <thead>
    <tr>
      <th>参数</th>
      <th>说明</th>
      <th>类型</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${namespace}-state<br />（默认 rw-dispatcher-state，kebeb-case）</td>
      <td>组件状态，可选值为 "read"|"write"，优先级高于局部状态</td>
      <td>Function(h, context)</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>${namespace}-render<br />（默认 rw-dispatcher-render，kebeb-case）</td>
      <td>自定义渲染函数（props 形式）</td>
      <td>Function(h, context)</td>
      <td>undefined</td>
    </tr>
  </tbody>
</table>

#### Scoped Slots

<table>
  <thead>
    <tr>
      <th>name</th>
      <th>说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${namespace}Render<br />（默认 rwDispatcherRender，camelCase）</td>
      <td>
        read 状态自定义渲染函数。参数是<a href="https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6" target="_blank">Vue 函数式组件]</a>中的 context.data 和 context.children
      </td>
    </tr>
  </tbody>
</table>

### RateDispatcher

#### Attributes

<table>
  <thead>
    <tr>
      <th>参数</th>
      <th>说明</th>
      <th>类型</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${namespace}-state<br />（默认 rw-dispatcher-state，kebeb-case）</td>
      <td>组件状态，可选值为 "read"|"write"，优先级高于局部状态</td>
      <td>Function(h, context)</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>${namespace}-render<br />（默认 rw-dispatcher-render，kebeb-case）</td>
      <td>自定义渲染函数（props 形式）</td>
      <td>Function(h, context)</td>
      <td>undefined</td>
    </tr>
  </tbody>
</table>

#### Scoped Slots

<table>
  <thead>
    <tr>
      <th>name</th>
      <th>说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${namespace}Render<br />（默认 rwDispatcherRender，camelCase）</td>
      <td>
        read 状态自定义渲染函数。参数是<a href="https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6" target="_blank">Vue 函数式组件]</a>中的 context.data 和 context.children
      </td>
    </tr>
  </tbody>
</table>

### SliderDispatcher

#### Attributes

<table>
  <thead>
    <tr>
      <th>参数</th>
      <th>说明</th>
      <th>类型</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${namespace}-state<br />（默认 rw-dispatcher-state，kebeb-case）</td>
      <td>组件状态，可选值为 "read"|"write"，优先级高于局部状态</td>
      <td>Function(h, context)</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>${namespace}-render<br />（默认 rw-dispatcher-render，kebeb-case）</td>
      <td>自定义渲染函数（props 形式）</td>
      <td>Function(h, context)</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>${namespace}-range-separator<br />（默认 rw-dispatcher-range-separator）</td>
      <td>自定义连接符</td>
      <td>String</td>
      <td>-</td>
    </tr>
  </tbody>
</table>

#### Scoped Slots

<table>
  <thead>
    <tr>
      <th>name</th>
      <th>说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${namespace}Render<br />（默认 rwDispatcherRender，camelCase）</td>
      <td>
        read 状态自定义渲染函数。参数是<a href="https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6" target="_blank">Vue 函数式组件]</a>中的 context.data 和 context.children
      </td>
    </tr>
  </tbody>
</table>
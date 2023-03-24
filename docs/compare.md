
# 1.Options API 存在的问题

使用传统OptionsAPI中，新增或者修改一个需求，就需要分别在data，methods，computed里修改 。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4e1453492dde42f38e7eaa80078fb8d0~tplv-k3u1fbpfcp-zoom-1.image) ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ba9921e9f694b11bd775a6489fa3c99~tplv-k3u1fbpfcp-zoom-1.image)

## []()[]()2.Composition API 的优势

我们可以更加优雅的组织我们的代码，函数。让相关功能的代码更加有序的组织在一起。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/89560576cf094b95bad69fe7b149ab96~tplv-k3u1fbpfcp-zoom-1.image) ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce164c30209642d6b37ed523608989b1~tplv-k3u1fbpfcp-zoom-1.image)

## 选项式Api与组合式Api

首先实现一个同样的逻辑(点击切换页面数据)看一下它们直接的区别

+ 选项式Api

```vue
<template>
 <div @click="changeMsg">{{msg}}</div>
</template>
<script>
export default  {
  data(){
    return {
     msg:'hello world'
    }
  },
  methods:{
    changeMsg(){
      this.msg = 'hello juejin'
    }
  }
}
</script>
```


+ 组合式Api

```vue
<template>
 <div @click="changeMsg">{{msg}}</div>
</template>

<script>
import { ref,defineComponent } from "vue";
export default defineComponent({
    setup() {
        const msg = ref('hello world')
        const changeMsg = ()=>{
          msg.value = 'hello juejin'
        }
        return {
          msg,
          changeMsg
        };
    }
});
</script>
```

+ setup 语法糖

```vue
<template>
  <div @click="changeMsg">{{ msg }}</div>
</template>

<script setup>
import { ref } from "vue";

const msg = ref('hello world')
const changeMsg = () => {
  msg.value = 'hello juejin'
}
</script>
```

+ 总结：
选项式Api是将data和methods包括后面的watch，computed等分开管理，而组合式Api则是将相关逻辑放到了一起（类似于原生js开发）。
setup语法糖则可以让变量方法不用再写return，后面的组件甚至是自定义指令也可以在我们的template中自动获得。
ref 和 reactive
我们都知道在选项式api中，data函数中的数据都具有响应式，页面会随着data中的数据变化而变化，而组合式api中不存在data函数该如何呢？所以为了解决这个问题Vue3引入了ref和reactive函数来将使得变量成为响应式的数据




## 2. 多根节点

熟悉 Vue2 的朋友应该清楚，在模板中如果使用多个根节点时会报错，如下所示。

```html
// vue2中在template里存在多个根节点会报错
<template>
  <header></header>
  <main></main>
  <footer></footer>
</template>
 
// 只能存在一个根节点，需要用一个<div>来包裹着
<template>
  <div>
    <header></header>
    <main></main>
    <footer></footer>
  </div>
</template>
```

但是，Vue3 支持多个根节点，也就是 fragment。即以下多根节点的写法是被允许的。

```html
<template>
  <header></header>
  <main></main>
  <footer></footer>
</template>
```


## 5. Teleport

Vue3 提供 Teleport 组件可将部分 DOM 移动到 Vue app 之外的位置。比如项目中常见的 Dialog 弹窗。

```html
<button @click="dialogVisible = true">显示弹窗</button>
<teleport to="body">
  <div class="dialog" v-if="dialogVisible">
    我是弹窗，我直接移动到了body标签下
  </div>
</teleport>
```




## v-model双向绑定

 -   prop：`value` -> `modelValue`；
 -   事件：`input` -> `update:modelValue`；


## 介绍

在 Vue 2.0 发布后，开发者使用 `v-model` 指令时必须使用名为 `value` 的 prop。如果开发者出于不同的目的需要使用其他的 prop，他们就不得不使用 `v-bind.sync`。此外，由于`v-model` 和 `value` 之间的这种硬编码关系的原因，产生了如何处理原生元素和自定义元素的问题。

在 Vue 2.2 中，我们引入了 `model` 组件选项，允许组件自定义用于 `v-model` 的 prop 和事件。但是，这仍然只允许在组件上使用一个 `v-model`。

在 Vue 3 中，双向数据绑定的 API 已经标准化，以减少开发者在使用 `v-model` 指令时的混淆，并且更加灵活。

## 2.x 语法

在 2.x 中，在组件上使用 `v-model` 相当于绑定 `value` prop 并触发 `input` 事件：



```html
<ChildComponent v-model="pageTitle" />

<!-- 是以下的简写: -->

<ChildComponent :value="pageTitle" @input="pageTitle = $event" />
```

如果想要更改 prop 或事件名称，则需要在 `ChildComponent` 组件中添加 `model` 选项：



```html
<!-- ParentComponent.vue -->

<ChildComponent v-model="pageTitle" />
```



```js
// ChildComponent.vue

export default {
  model: {
    prop: 'title',
    event: 'change'
  },
  props: {
    // 这将允许 `value` 属性用于其他用途
    value: String,
    // 使用 `title` 代替 `value` 作为 model 的 prop
    title: {
      type: String,
      default: 'Default title'
    }
  }
}
```

所以，在这个例子中 `v-model` 是以下的简写：



```html
<ChildComponent :title="pageTitle" @change="pageTitle = $event" />
```

### 使用 `v-bind.sync`

在某些情况下，我们可能需要对某一个 prop 进行“双向绑定”(除了前面用 `v-model` 绑定 prop 的情况)。为此，我们建议使用 `update:myPropName` 抛出事件。例如，对于在上一个示例中带有 `title` prop 的 `ChildComponent`，我们可以通过下面的方式将分配新 value 的意图传达给父级：



```js
this.$emit('update:title', newValue)
```

然后父组件可以在需要时监听该事件，并更新本地的 data property。例如：


```html
<ChildComponent :title="pageTitle" @update:title="pageTitle = $event" />
```

为了方便起见，我们可以使用 `.sync` 修饰符来缩写，如下所示：


```html
<ChildComponent :title.sync="pageTitle" />
```

## 3.x 语法

在 3.x 中，自定义组件上的 `v-model` 相当于传递了 `modelValue` prop 并接收抛出的 `update:modelValue` 事件：



```html
<ChildComponent v-model="pageTitle" />

<!-- 是以下的简写: -->

<ChildComponent
  :modelValue="pageTitle"
  @update:modelValue="pageTitle = $event"
/>
```

若需要更改 `model` 的名称，现在我们可以为 `v-model` 传递一个*参数*，以作为组件内 `model` 选项的替代：



```html
<ChildComponent v-model:title="pageTitle" />

<!-- 是以下的简写: -->

<ChildComponent :title="pageTitle" @update:title="pageTitle = $event" />
```


这也可以作为 `.sync` 修饰符的替代，而且允许我们在自定义组件上使用多个 `v-model`。



```html
<ChildComponent v-model:title="pageTitle" v-model:content="pageContent" />

<!-- 是以下的简写： -->

<ChildComponent
  :title="pageTitle"
  @update:title="pageTitle = $event"
  :content="pageContent"
  @update:content="pageContent = $event"
/>
```

除了像 `.trim` 这样的 2.x 硬编码的 `v-model` 修饰符外，现在 3.x 还支持自定义修饰符：



```html
<ChildComponent v-model.capitalize="pageTitle" />
```


我们推荐：

-   检查你的代码库中所有使用 `.sync` 的部分并将其替换为 `v-model`：

    

    ```html
    <ChildComponent :title.sync="pageTitle" />

    <!-- 替换为 -->

    <ChildComponent v-model:title="pageTitle" />
    ```

-   对于所有不带参数的 `v-model`，请确保分别将 prop 和 event 命名更改为 `modelValue` 和 `update:modelValue`

    

    ```html
    <ChildComponent v-model="pageTitle" />
    ```

   

    ``` js
    // ChildComponent.vue

    export default {
      props: {
        modelValue: String // 以前是`value：String`
      },
      emits: ['update:modelValue'],
      methods: {
        changePageTitle(title) {
          this.$emit('update:modelValue', title) // 以前是 `this.$emit('input', title)`
        }
      }
    }
    ```



## 移除 `v-on.native` 修饰符 

`v-on` 的 `.native` 修饰符已被移除。

## 2.x 语法

默认情况下，传递给带有 `v-on` 的组件的事件监听器只能通过 `this.$emit` 触发。要将原生 DOM 监听器添加到子组件的根元素中，可以使用 `.native` 修饰符：



```html
<my-component
  v-on:close="handleComponentEvent"
  v-on:click.native="handleNativeClickEvent"
/>
```

## 3.x 语法

`v-on` 的 `.native` 修饰符已被移除。


```html
<my-component
  v-on:close="handleComponentEvent"
  v-on:click="handleNativeClickEvent"
/>
```

`MyComponent.vue`



```html
<script>
  export default {
    emits: ['close']
  }
</script>
```




## 函数式组件

对变化的总体概述：

-   2.x 中函数式组件带来的性能提升在 3.x 中已经可以忽略不计，因此我们建议只使用有状态的组件
-   函数式组件只能由接收 `props` 和 `context` (即：`slots`、`attrs`、`emit`) 的普通函数创建

## 介绍

在 Vue 2 中，函数式组件主要有两个应用场景：

-   作为性能优化，因为它们的初始化速度比有状态组件快得多
-   返回多个根节点

然而，在 Vue 3 中，有状态组件的性能已经提高到它们之间的区别可以忽略不计的程度。此外，有状态组件现在也支持返回多个根节点。

因此，函数式组件剩下的唯一应用场景就是简单组件，比如创建动态标题的组件。否则，建议你像平常一样使用有状态组件。

## 2.x 语法

使用 `<dynamic-heading>` 组件，负责提供适当的标题 (即：`h1`、`h2`、`h3` 等等)，在 2.x 中，这可以通过单文件组件编写：


```js
// Vue 2 函数式组件示例
export default {
  functional: true,
  props: ['level'],
  render(h, { props, data, children }) {
    return h(`h${props.level}`, data, children)
  }
}
```

或者，对于喜欢在单文件组件中使用 `<template>` 的用户：


```vue
<!-- Vue 2 结合 <template> 的函数式组件示例 -->
<template functional>
  <component
    :is="`h${props.level}`"
    v-bind="attrs"
    v-on="listeners"
  />
</template>

<script>
export default {
  props: ['level']
}
</script>
```

## 3.x 语法

现在，在 Vue 3 中，所有的函数式组件都是用普通函数创建的。换句话说，不需要定义 `{ functional: true }` 组件选项。

它们将接收两个参数：`props` 和 `context`。`context` 参数是一个对象，包含组件的 `attrs`、`slots` 和 `emit` property。

此外，`h` 现在是全局导入的，而不是在 `render` 函数中隐式提供。

以前面提到的 `<dynamic-heading>` 组件为例，下面是它现在的样子。



```js
import { h } from 'vue'

const DynamicHeading = (props, context) => {
  return h(`h${props.level}`, context.attrs, context.slots)
}

DynamicHeading.props = ['level']

export default DynamicHeading
```

### 单文件组件 

在 3.x 中，有状态组件和函数式组件之间的性能差异已经大大减少，并且在大多数用例中是微不足道的。因此，在单文件组件上使用 `functional` 的开发者的迁移路径是删除该 attribute，并将 `props` 的所有引用重命名为 `$props`，以及将 `attrs` 重命名为 `$attrs`。

以之前的 `<dynamic-heading>` 为例，下面是它现在的样子。



```vue
<template>
  <component
    v-bind:is="`h${$props.level}`"
    v-bind="$attrs"
  />
</template>

<script>
export default {
  props: ['level']
}
</script>
```

主要的区别在于：

1.  从 `<template>` 中移除 `functional` attribute
1.  `listeners` 现在作为 `$attrs` 的一部分传递，可以将其删除
2.  
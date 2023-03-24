# vue3不同语法格式对比

### 默认的模板方式，和vue2差不多，在组件中使用`setup`函数
```jsx
// 父组件
<template>
  <div>
    <div>
      <div>{{city}}</div>
      <button @click="changeReactive">改变reactive</button>
      <button @click="handleFather">点击父组件</button>
    </div>
    <Child ref="childRef" @handleBtn="handleBtn" @testClick="testClick" city="成都" />
  </div>
</template>

<script>
import { ref, onMounted, toRefs, reactive } from 'vue'
import Child from './Child.vue'

export default {
  components: {
    Child
  },
  setup () {
    const handleBtn = (val) => {
      console.log('btn', val)
    }

    const testClick = (val) => {
      console.log('testClick', val)
    }

    const childRef = ref(null)

    const handleFather = () => {
      childRef.value.observed.a = 666 //父组件修改子组件的值
      console.log('获取子组件的方法', childRef.value)
      // 子组件需要定义expose，如果不定义，那么需要返回，相应的函数，一般不直接返回，如果页面上没有用到
      //直接通过expose（暴露）需要的方法或者值就行了
    }

    // 通过setup函数的方法写，需要返回，页面上用到的方法，和值
    // 如果是reactve定义的值，通过解构的方式页面上渲染的值不是响应式的,需要通过toRefs转换，然后解构
    // ...toRefs(testReactive)
    
    const testReactive = reactive({
      city: '北京',
      age: 22
    })

    const changeReactive = () => {
      testReactive.city = '重庆'
    }

    return {
      handleBtn,
      testClick,
      handleFather,
      ...toRefs(testReactive),
      changeReactive,
      childRef
    }
  }
}
</script>


//子组件
<template>
  <div>
    {{observed.a}}
    <button @click="handleBtn">点击</button>
  </div>
</template>

<script>
import { defineProps, defineEmits, defineEmit, defineExpose, reactive } from 'vue'

export default {
  props: {
    city: String
  },

  /* 设置这个主要是为了，让ctx.attrs访问不到这个属性 */
  /* props上设置了有的属性，在attrs上，也不会显示 */

  emits: ['testClick'],  //设置这个的目的，是为了让attrs上没有对应的自定义方法，
  //子组件如果设置了peops，那么在attrs上也访问不到对应的值
  //arrts在vue3中功能有所增强，挂载了自定义方法，和class，style
  //在vue2中自定义方法是挂载到,$listeners，在vue3中$liseners已被移除

  setup (props, ctx) {
    const { expose, emit } = ctx
    const handleBtn = () => {
      console.log('btn', ctx)
      emit('testClick', 666)
    }

    const observed = reactive({
      a: 1
    })

    function clickChild (value) {
      observed.a = value
    }

    expose({
      clickChild, //暴露自定义方法，父组件调用
      observed// 暴露子组件的值
    })

    return {
      observed,
      handleBtn
    }
  }
}
</script>
```
### 在script标签上写setup  `<script setup>`
```jsx
// 父组件
<template>
  <div>
    <button @click="handleFather">点击父</button>
    <Child ref="childRef" @handleBtn="handleBtn" @testClick="testClick" city="成都" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Child from './Child.vue'
// 这种方式写不用在return导出页面上用到的方法和值，需要用什么直接在vue上解构出对应的defin
const childRef = ref(null)

const handleBtn = (val) => {
  console.log('btn', val)
}

const testClick = (val) => {
  console.log('testClick', val)
}

const handleFather = () => {
  console.log('获取子组件的方法', childRef.value)
  childRef.value.testFatherClick()  //父组件调用子组件的方法
  // 子组件通过defineExpose暴露出对应的方法
}

</script>


// 子组件
<template>
  <div>
    <button @click="handleBtn">点击</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, defineExpose, reactive } from 'vue'

const props = defineProps({
  city: String
})

const emit = defineEmits(['handleBtn', 'testClick'])

const handleBtn = () => {
  // console.log('btn', props, emit)
  emit('testClick', 12)
}

const testFatherClick = () => {
  console.log('测试父组件点击子组件')
}

const observed = reactive({
  a: 1
})

defineExpose({ //暴露方法给父组价
  testFatherClick,
  observed
})

</script>

<style scoped>
</style>
```
### 通过jsx方式渲染，非常接近react的方式
```jsx
// 父组件
import { ref, reactive } from 'vue'
import Child from './Child.jsx'

const Father = {
  setup() {
    // 在jsx中定义的ref在页面上使用需要通过.value去访问
    const city = ref('北京')

    const changeCity = () => {
      city.value = '杭州'
    }

    const childRef = ref(null)

    const handelFather = (add) => {
      //也是通过在组件暴露expose方法
      // city.value = '杭州'
      console.log('childRef', childRef.value)
    }

    const testChildClick = (val) => {
      console.log('测试子组件点击', val)
    }

    return () => {
      return (
        <div>
          <div>{city.value}</div>
          <button onClick={changeCity}>改变城市</button>
          <button onClick={handelFather}>点击父</button>
          <Child testChildClick={testChildClick} ref={childRef} />
        </div>
      )
    }
  }
}

export default Father


//子组件
import { ref, reactive } from 'vue'

const Child = {
  props: {
    testChildClick: Function
  },

  setup(props, { emit, expose }) {
    const { testChildClick } = props
    const testFatherClick = () => {
      console.log('测试父组件点击子组件')
    }

    const handelBtn = () => {
      // emit('testChildClick') //在jsx中这种方式不行
      // console.log('props', props)
      testChildClick('返回值给父组件')
      // 只能通过这种方法，这也相当于react，相当于传递一个函数给子组件，子组件把值，通过函数传给父组件
    }

    expose({
      testFatherClick
    })

    return () => {
      return (
        <div>
          <button onClick={handelBtn}>子组件传值给父组件</button>
        </div>
      )
    }
  }
}

export default Child
```



jsx中插槽的使用

```jsx

/* 在vue3中用react方式的函数式组件不是响应式的 */
const TestChild = (props) => {
  console.log('props', props)
  const data = reactive({ city: '重庆' })

  const handleChild = () => {
    data.city = '成都'
    console.log('handleChild', data)
  }

  return (
    <div>
      <div>{data.city}</div>
      <div>TestChild</div>
      <button onClick={handleChild}>改变</button>
    </div>
  )
}

/* setup格式的函数式组件是响应式的 */
const TestChild2 = {
  props: {
    city: String
  },
  setup(props, ctx) {
    console.log('propssetup', props, ctx)
    const data = reactive({ city: '北京' })

    const handleChild = () => {
      data.city = '上海'
      console.log('handleChild', data)
    }

    return () => {
      return (
        <div>
          <div>{data.city}</div>
          <div>TestChild2</div>
          <button onClick={handleChild}>改变</button>
          <div>{ctx.slots.default(22)}</div>
          <div>{ctx.slots.slot1(666)}</div>
        </div>
      )
    }
  }
}

//vuejsx中子组件要向父组件传递参数，通过props.fn()
//如果是模板的方法写，需要定义emits
//方式一
<TestChild
  name="AA"
  v-slots={{
    default(val) {
        return <div>TestChildAAA{val}</div>
    },
    slot1(val) {
        return <div>TestChildAAA{val}</div>
    }
  }}
>
//方式二
<TestChild>
  {{
    default(val) {
      return <div>TestChildAAA{val}</div>
    },
    slot1(val) {
      return <div>TestChildAAA{val}</div>
    }
  }}  
</TestChild>

```
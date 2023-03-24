# vue组件传值

## props/$emit父子组件传值：

#### 父传子：

-   父组件：

```html
  <template>
    <div id="app">
      <Home :msg="msg"></Home>
    </div>
  </template>

  <script lang="ts">
  import Vue from 'vue';
  import Home from '@/views/Home';

  export default Vue.extend({
    name: 'App',
    components: {
      Home
    },
    data(){
        return {
            msg:"我是父元素传过来的值"
        }
    }
  });
  </script>
```

-   子组件

```html
  <template>
    <div class="home">
      {{msg}}
    </div>
  </template>

  <script>
  export default {
    name: 'Home',
    components: {

    },
    props:{
        msg:String,
    }
  }
```

#### 子传父:（是通过事件传值来进行具体实现的）

-   子组件:

```html
  <template>
    <div class="home">
      <button @click="toValue">点击</button>
    </div>
  </template>

  <script>
  export default {
    name: 'Home',
    components: {

    },
    methods:{
        toValue(){
            this.$emit("receive","我是子组件传过来的值");
        }
    }
  }
  </script>
```

-   父组件:

```html
  <template>
    <div id="app">
       <p>{{msg}}</p>
      <Home @receive="receive"></Home>
    </div>
  </template>

  <script lang="ts">
  import Vue from 'vue';
  import Home from '@/views/Home';

  export default Vue.extend({
    name: 'App',
    components: {
      Home
    },
    data(){
        return {
            msg:'',
        }
    },
    methods:{
        receive(val){
            this.msg = val;
        }
    }
  });
  </script>
```

## ref与parent/ parent/parent/children父子组件传值:

#### 父传子:

-   父组件

```html
  <template>
    <div id="app">
      <Home ref="home"></Home>
      <button @click="toValue">点击</button>
    </div>
  </template>

  <script lang="ts">
  import Vue from 'vue';
  import Home from '@/views/Home';

  export default Vue.extend({
    name: 'App',
    components: {
      Home
    },
    data(){
        return {
            msg:'',
        }
    },
    methods:{
       toValue(){
          this.msg = "这是父组件的值";
          this.$refs.home.setMsg(this.msg);
       }
    }
  });
  </script>
```

-   子组件:

```html
  <template>
    <div class="home">
      {{msg}}
    </div>
  </template>

  <script>
  export default {
    name: 'Home',
    components: {

    },
    data(){
        return {
            msg:''
        }
    },
    methods:{
        setMsg(val){
            this.msg = val;
        }
    }
  }
  </script>
```

#### 子传父:

-   子组件（如果子组件是公共组件，需判断父组件是否具有该方法）

```html
  <template>
    <div class="home">
      <button @click="setMsg">点击</button>
    </div>
  </template>

  <script>
  export default {
    name: 'Home',
    components: {

    },
    data(){
        return {
            msg:'这是子组件的值'
        }
    },
    methods:{
        setMsg(){
            this.$parent.toValue(this.msg);
        }
    }
  }
  </script>
```

-   父组件

```html
  <template>
    <div id="app">
      {{msg}}
      <Home></Home>
    </div>
  </template>

  <script lang="ts">
  import Vue from 'vue';
  import Home from '@/views/Home';

  export default Vue.extend({
    name: 'App',
    components: {
      Home
    },
    data(){
        return {
            msg:'',
        }
    },
    methods:{
       toValue(val){
          this.msg = val;
       }
    }
  });
  </script>
```

## attrs/ attrs/attrs/**listeners**隔代组件传值（爷孙组件参数互传）

#### 爷传孙

-   爷组件

```html
  <template>
    <div id="app">
      <Home :msg="msg"></Home>
    </div>
  </template>

  <script lang="ts">
  import Vue from 'vue';
  import Home from '@/views/Home';

  export default Vue.extend({
    name: 'App',
    components: {
      Home
    },
    data(){
        return {
            msg:'这是爷组件的值'
        }
    }
  });
  </script>
```

-   父组件(父组件的操作最简单，但不做就会传不过去)

```html
  <template>
    <div class="home">
      <Sun v-bind="$attrs"></Sun>
    </div>
  </template>

  <script>
  import Sun from './component/Sun.vue'
  export default {
    name: 'Home',
    components: {
      Sun
    },
  }
  </script>
```

-   孙组件

```html
  <template>
    <div class="sun">
      {{msg}}
    </div>
  </template>

  <script>
  export default {
    name: 'Sun',
    props:{
        msg:String,
    }
  }
  </script>
```

#### 孙传爷:

-   孙组件

```html
  <template>
    <div class="sun">
      <button @click="toVal">点我</button>
    </div>
  </template>

  <script>
  export default {
    name: 'Sun',
    data(){
        return {
            msg:"这是孙组件的值",
        }
    },
    methods:{
        toVal(){
            this.$emit("setVal",this.msg)
        }
    }
  }
  </script>
```

-   父组件

```html
  <template>
    <div class="home">
      <Sun v-on="$listeners"></Sun>
    </div>
  </template>

  <script>
  import Sun from './component/Sun.vue'
  export default {
    name: 'Home',
    components: {
      Sun
    },
  }
  </script>
```

-   爷组件

```html
  <template>
    <div id="app">
       <p>{{msg}}</p>
      <Home @setVal="setVal"></Home>
    </div>
  </template>

  <script lang="ts">
  import Vue from 'vue';
  import Home from '@/views/Home';

  export default Vue.extend({
    name: 'App',
    components: {
      Home
    },
    data(){
        return {
            msg:''
        }
    },
    methods:{
        setVal(val){
            this.msg = val;
        }
    }
  });
  </script>
```

## provide/inject隔代组件传值（祖先组件传给其任意后代元素）

> 提示：provide 和 inject 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的 property 还是可响应的。如果传入的值是字符串，数字，布尔值等基本类型则会无响应！！！

#### 爷传孙（所有后代组件都能拿到该值，但传动态值必须是个对象！！！）

-   祖先组件(其实不用写那个事件就能完成传值)

```html
  <template>
    <div id="app">
      <button @click="setVal">点击</button>
      <Home></Home>
    </div>
  </template>

  <script lang="ts">
  import Vue from 'vue';
  import Home from '@/views/Home';

  export default Vue.extend({
    name: 'App',
    components: {
      Home
    },
    provide(){
        return {
            data:this.dataObj
        }
    },
    data(){
        return {
            dataObj:{
                msg:'这是爷组件的值',
                num:1
            }
        }
    },
    methods:{
        setVal(){
            this.dataObj.num++;
        }
    }
  });
  </script>
```

-   后代组件（任意一个后代元素通过该写法都能拿到值）

```html
  <template>
    <div class="sun">
      <p>{{txt}}</p>
    </div>
  </template>

  <script>
  export default {
    name: 'Sun',
    inject:['data'],
	computed:{
		txt(){
			return `${this.data.msg}${this.data.num}`;
		}
	}
  }
  </script>
```

## 兄弟组件传值——vuex:(不仅仅局限于兄弟组件）

-   main.js

```js
  import Vue from 'vue';
  import App from './App.vue';
  import router from './router';
  import store from './store';//引入

  Vue.config.productionTip = false;

  new Vue({
    router,
    store,//调用
    render: (h) => h(App),
  }).$mount('#app');
```

-   store/index.js

```js
  import Vue from 'vue';
  import Vuex from 'vuex';

  Vue.use(Vuex);

  const num = {
      state: {//初始化值
            num:0,
      },
      getters:{//获取值
            num:state => state.num
      },
      mutations: {//设置值
            num:state => state.num++
      },
      actions: {//异步
          num ({ commit }) {
              setTimeout(() => {
                  commit('num')
              }, 1000)
          }
      }
  }
  export default new Vuex.Store({
    modules: {//模块儿
        num:num
    },
  });
```

-   任意组件

```html
  <template>
      <div id="app">
        <button @click="setVal">点击</button>
        <Home></Home>
      </div>
  </template>

  <script lang="ts">
    import Vue from 'vue';
    import vuex from 'vuex'
    import Home from '@/views/Home';

    export default Vue.extend({
      name: 'App',
      components: {
        Home
      },
      methods:{
          setVal(){
              this.$store.commit("num");//设置值
              console.log(this.$store.getters.num);//获取值
          }
      }
    });
    </script>
```

-   更简单的获取方式:

> 一般情况下使用会报mapGetters is not defined的错误，先说解决方案吧！

```
  1.安装：npm isntall --save-dev  babel-preset-stage-3
  2.引入方法改写：import {mapGetters} from 'vuex';
```

-   设置值的组件:

```html
<template>
    <div id="app">
      <button @click="setVal">点击</button>
      <Home></Home>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import vuex from 'vuex'
  import Home from '@/views/Home';

  export default Vue.extend({
    name: 'App',
    components: {
      Home
    },
    methods:{
        setVal(){
            this.$store.commit("num");
        }
    }
  });
  </script>
```

-   获取值的组件：

```html
  <template>
      <div class="sun">
          <p>{{num}}</p>
      </div>
  </template>

  <script>
      import {mapGetters} from 'vuex';
      export default {
          name: 'Sun',
          computed: {
              ...mapGetters(["num"])
          }
      }
  </script>
```

存在的问题：1. 页面刷新数据丢失；2.只在当前用户的浏览器中存在

## 兄弟组件通信EventBus

> 调用完之后必须销毁，否则会出现bug！！！

-   src/tools/event-bus.js(建文件)

```js
  import Vue from 'vue'
  export const Bus = new Vue()
```

-   事件总线：

```html
  <template>
      <div id="app">
          <button @click="setVal">点击</button>
          <Home></Home>
      </div>
  </template>

  <script lang="ts">
      import Vue from 'vue';
      import {Bus} from '@/tools/event-bus'
      import Home from '@/views/Home';

      export default Vue.extend({
          name: 'App',
          components: {
              Home
          },
          data() {
              return {
                  msg: 0
              }
          },
          methods: {
              setVal() {
                  this.msg++;
                  Bus.$emit("share", this.msg);
              }
          }
      });
  </script>
```

-   事件接收：

```html
  <template>
      <div class="sun">
          <p>{{msg}}</p>
      </div>
  </template>

  <script>
      import { Bus } from '@/tools/event-bus'
      export default {
          name: 'Sun',
          data(){
              return {
                  msg:''
              }
          },
          methods:{
              setMsg(){
                  Bus.$on("share",(data)=>{
                      this.msg = data;
                  })
              }
          },
          created() {
              this.setMsg();
          },
          destroyed(){
              Bus.$off("share");
          }
      }
  </script>
```
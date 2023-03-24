# vue基本语法


每个 Vue 应用都需要通过实例化 Vue 来实现。

语法格式如下：

```html
 <!DOCTYPE html>
 <html>
 <head>
     <meta charset="utf-8">
     <title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
     <script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
 </head>
 <body>
 <div id="vue_det">
     <h1>site : {{site}}</h1>
     <h1>url : {{url}}</h1>
     <h1>{{details('')}}</h1>
     <h1>{{full}}</h1>
 </div>
 <script>
     Vue.config.devtools = true;
     var vm = new Vue({
         el: '#vue_det',
         data: {
             site: "菜鸟教程",
             url: "www.runoob.com",
             alexa: "10000"
         },
         methods: {
             details: () {
                 console.log('methods');
                 return  this.site + " - 学的不仅是技术，更是梦想！";
             }
         },
         computed: {
             full(){
                 console.log('computed');
                 return this.url + this.alexa
             }
         }
     })
 </script>
 </body>
 </html>
```

-   一个页面只需要实例化一个VUE对象，使用 vm (ViewModel 的缩写) 这个变量名表示 Vue 实例。
-   el标识被vue接管的标签元素，只有被接管的标签中才能使用vue的指令或表达式
-   **data** 用于定义属性，实例中有三个属性分别为：site、url、alexa。
-   methods 用于定义的函数，可以通过 return 来返回函数值。
-   {{ }} 用于输出对象属性和函数返回值。

#### Vue.js 模板语法

##### 插值

###### 文本

数据绑定最常见的形式就是使用双大括号的文本插值：

```html
 <span>Message: {{ msg }}</span>
```

###### 原始 HTML

双大括号会将数据解释为普通文本，而非 HTML 代码。为了输出真正的 HTML，你需要使用 v-html：

```html
 ​
 <div id="app">
     <div v-html="message"></div>
 </div>
     
 <script>
 new Vue({
   el: '#app',
   data: {
     message: '<h1>hello world</h1>'
   }
 })
 </script>
```

###### 属性

html标签中的属性的值，可以是用v-bind指令动态设置：

```html
 <div id="app">
     <a v-bind:href="baidu">百度</a>
     <button v-bind:disabled="disabled">确定</button>
 </div>
 <script>
 new Vue({
   el: '#app',
   data: {
     baidu: 'www.baidu.com',
     disabled:true
   }
 })
 </script>
```

###### 使用 JavaScript 表达式

Vue.js 都提供了完全的 JavaScript 表达式支持。

```html
 <!DOCTYPE html>
 <html>
 <head>
     <meta charset="utf-8">
     <title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
     <script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
 </head>
 <body>
 <div id="app">
     {{5+5}}<br>
     {{ ok ? 'YES' : 'NO' }}<br>
     {{ message.split('').reverse().join('') }}
     <div v-bind:id="'list-' + id">菜鸟教程</div>
 </div>
     
 <script>
 new Vue({
   el: '#app',
   data: {
     ok: true,
     message: 'RUNOOB',
     id : 1
   }
 })
 </script>
 </body>
 </html>
```

##### 指令

指令是带有 v- 前缀的特殊属性。

指令用于在表达式的值改变时，将某些行为应用到 DOM 上。如下例子：

```html
 <div id="app">
     <p v-if="seen">现在你看到我了</p>
 </div>
     
 <script>
 new Vue({
   el: '#app',
   data: {
     seen: true
   }
 })
 </script>
```

###### 参数

一些指令能够接收一个“参数”，在指令名称之后以冒号表示。

例如：

`v-bind` 指令可以用于响应式地更新 HTML attribute，`v-on`指令，它用于监听 DOM 事件：

```html
 <a v-bind:href="url">...</a>
 <a v-on:click="doSomething">
```

###### 修饰符

修饰符是以半角句号 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如， **.prevent** 修饰符告诉 v-on 指令对于触发的事件调用 **event.preventDefault()** ：

```
 <form v-on:submit.prevent="onSubmit"></form>
```

##### 用户输入

在 input 输入框中我们可以使用 v-model 指令来实现双向数据绑定：

```html
 ​
 <div id="app">
     <p>{{ message }}</p>
     <input v-model="message">
 </div>
     
 <script>
 new Vue({
   el: '#app',
   data: {
     message: 'Runoob!'
   }
 })
 </script>
 ​
```

`v-model`指令用来在 input、select、textarea、checkbox、radio 等表单控件元素上创建双向数据绑定，根据表单上的值，自动更新绑定的元素的值。

按钮的事件我们可以使用 v-on 监听事件，并对用户的输入进行响应。

以下实例在用户点击按钮后对字符串进行反转操作：

```html
 ​
 <div id="app">
     <p>{{ message }}</p>
     <button v-on:click="reverseMessage">反转字符串</button>
 </div>
     
 <script>
 new Vue({
   el: '#app',
   data: {
     message: 'Runoob!'
   },
   methods: {
     reverseMessage: function () {
       this.message = this.message.split('').reverse().join('')
     }
   }
 })
 </script>
```

##### 过滤器

Vue.js 允许你自定义过滤器，被用作一些常见的文本格式化。由"管道符"指示, 格式如下：

```html
 <!-- 在两个大括号中 -->
 {{ message | capitalize }}
 ​
 <!-- 在 v-bind 指令中 -->
 <div v-bind:id="rawId | formatId"></div>
```

过滤器函数接受表达式的值作为第一个参数。

以下实例对输入的字符串第一个字母转为大写：

```html
 <div id="app">
   {{ message | capitalize }}
 </div>
     
 <script>
 new Vue({
   el: '#app',
   data: {
     message: 'runoob'
   },
   filters: {
     capitalize: function (value) {
       if (!value) return ''
       value = value.toString()
       return value.charAt(0).toUpperCase() + value.slice(1)
     }
   }
 })
 </script>
```

过滤器可以串联：

```js
 {{ message | filterA | filterB }}
```

过滤器是 JavaScript 函数，因此可以接受参数：

```
 {{ message | filterA('arg1', arg2) }}
```

这里，message 是第一个参数，字符串 'arg1' 将传给过滤器作为第二个参数， arg2 表达式的值将被求值然后传给过滤器作为第三个参数。

##### 缩写

###### v-bind 缩写

Vue.js 为两个最为常用的指令提供了特别的缩写：

```html
 <!-- 完整语法 -->
 <a v-bind:href="url"></a>
 <!-- 缩写 -->
 <a :href="url"></a>
```

###### v-on 缩写

```html
 <!-- 完整语法 -->
 <a v-on:click="doSomething"></a>
 <!-- 缩写 -->
 <a @click="doSomething"></a>
```

#### Vue.js 条件语句

##### 条件判断

###### v-if

条件判断使用 v-if 指令：

```html
 <div id="app">
     <p v-if="seen">现在你看到我了</p>
     <template v-if="ok">
       <h1>菜鸟教程</h1>
       <p>学的不仅是技术，更是梦想！</p>
       <p>哈哈哈，打字辛苦啊！！！</p>
     </template>
 </div>
     
 <script>
 new Vue({
   el: '#app',
   data: {
     seen: true,
     ok: true
   }
 })
 </script>
```

这里， v-if 指令将根据表达式 seen 的值(true 或 false )来决定是否插入 p 元素。

在字符串模板中，我们得像这样写一个条件块：

```html
 <div>
 {{#if ok}}
   <h1>Yes</h1>
 {{/if}}
 </div>
```

###### v-else

可以用 v-else 指令给 v-if 添加一个 "else" 块：

```html
 <div id="app">
     <div v-if="Math.random() > 0.5">
       Sorry
     </div>
     <div v-else>
       Not sorry
     </div>
 </div>
     
 <script>
 new Vue({
   el: '#app'
 })
 </script>
```

###### v-else-if

```html
 <div id="app">
     <div v-if="type === 'A'">
       A
     </div>
     <div v-else-if="type === 'B'">
       B
     </div>
     <div v-else-if="type === 'C'">
       C
     </div>
     <div v-else>
       Not A/B/C
     </div>
 </div>
     
 <script>
 new Vue({
   el: '#app',
   data: {
     type: 'C'
   }
 })
 </script>
```

*注意：v-else 、v-else-if 必须跟在 v-if 或者 v-else-if之后。*

###### v-show

我们也可以使用 v-show 指令来根据条件展示元素：

```html
 <h1 v-show="ok">Hello!</h1>
```

#### Vue.js 循环语句

循环使用 v-for 指令。

v-for 指令需要以 **site in sites** 形式的特殊语法， sites 是源数据数组并且 site 是数组元素迭代的别名。

v-for 可以绑定数据到数组来渲染一个列表：

```html
 <div id="app">
   <ol>
     <li v-for="site in sites">
       {{ site.name }}
     </li>
   </ol>
 </div>
  
 <script>
 new Vue({
   el: '#app',
   data: {
     sites: [
       { name: 'Runoob' },
       { name: 'Google' },
       { name: 'Taobao' }
     ]
   }
 })
 </script>
```

板中使用 v-for：

```html
 <ul>
   <template v-for="site in sites">
     <li>{{ site.name }}</li>
     <li>--------------</li>
   </template>
 </ul>
```

##### v-for 迭代对象

v-for 可以通过一个对象的属性来迭代数据：

```html
 <div id="app">
   <ul>
     <li v-for="value in object">
     {{ value }}
     </li>
   </ul>
   <ul>
     <li v-for="item in list">
     {{ item.name }}
     </li>
   </ul>
 </div>
  
 <script>
 new Vue({
   el: '#app',
   data: {
     object: {
       name: '菜鸟教程',
       url: 'http://www.runoob.com',
       slogan: '学的不仅是技术，更是梦想！'
     },
     list:[
       {name: '菜鸟教程1',url: 'http://www.runoob.com',slogan: '学的不仅是技术，更是梦想！'},
       {name: '菜鸟教程2',url: 'http://www.runoob.com',slogan: '学的不仅是技术，更是梦想！'},
       {name: '菜鸟教程3',url: 'http://www.runoob.com',slogan: '学的不仅是技术，更是梦想！'}
     ]
   }
 })
 </script>
```

你也可以提供第二个的参数为键名：

```html
 <div id="app">
   <ul>
     <li v-for="(value, key) in object">
     {{ key }} : {{ value }}
     </li>
   </ul>
 </div>
```

第三个参数为索引：

```html
 <div id="app">
   <ul>
     <li v-for="(value, key, index) in object">
      {{ index }}. {{ key }} : {{ value }}
     </li>
   </ul>
 </div>
```

##### v-for 迭代整数

v-for 也可以循环整数

```html
 <div id="app">
   <ul>
     <li v-for="n in 10">
      {{ n }}
     </li>
   </ul>
 </div>
```

#### Vue.js 计算属性

计算属性关键词: computed。

计算属性在处理一些复杂逻辑时是很有用的。

可以看下以下反转字符串的例子：

```html
 <div id="app">
   {{ message.split('').reverse().join('') }}
 </div>
```

接下来我们使用计算属性来实现字符串反转的实例：

```html
 <!DOCTYPE html>
 <html>
 <head>
     <meta charset="utf-8">
     <title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
     <script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
 </head>
 <body>
 <div id="app">
     <p>原始字符串: {{ message }}</p>
     <p>计算后反转字符串: {{ reversedMessage }}</p>
     <p>计算后反转字符串: {{ reversedMessage1 }}</p>
     <p>计算后反转字符串: {{ reversedMessage1 }}</p>
     <p>计算后反转字符串: {{ reversedMessage2() }}</p>
     <p>计算后反转字符串: {{ reversedMessage2() }}</p>
 </div>
 ​
 <script>
     var vm = new Vue({
         el: '#app',
         data: {
             message: 'Runoob!'
         },
         computed: {
             reversedMessage: {
                 // 计算属性的 getter
                 get() {
                     return this.message.split('').reverse().join('')
                 },
                 // 计算属性的 setter
                 set(value){
                     this.message=value
                 }
             },
             // 计算属性如果只需要getter，可直接简写
             reversedMessage1(){
                 console.log('调用了计算属性');
                 return this.message.split('').reverse().join('')
             }
         },
 ​
         methods: {
             reversedMessage2() {
                 console.log('调用了method方法');
                 return this.message.split('').reverse().join('')
             }
         }
     })
 </script>
 </body>
 </html>
```

实例中声明了一个计算属性 reversedMessage 。

提供的函数将用作属性 vm.reversedMessage 的 getter 。

vm.reversedMessage 依赖于 vm.message，在 vm.message 发生改变时，vm.reversedMessage 也会更新。

##### 计算属性 vs methods方法

我们可以使用 methods 来替代 computed，效果上两个都是一样的，但是 computed 是基于它的依赖缓存，只有相关依赖发生改变时才会重新取值。而使用 methods ，在重新渲染的时候，函数总会重新调用执行。

#### Vue.js 监听属性

本章节，我们将为大家介绍 Vue.js 监听属性 watch，我们可以通过 watch 来响应数据的变化。

以下实例通过使用 watch 实现计数器：

```html
 <div id = "app">
     <p style = "font-size:25px;">计数器: {{ counter }}</p>
     <button @click = "counter++" style = "font-size:25px;">点我</button>
 </div>
 <script type = "text/javascript">
 var vm = new Vue({
     el: '#app',
     data: {
         counter: 1
     }
 });
 vm.$watch('counter', function(nval, oval) {
     alert('计数器值的变化 :' + oval + ' 变为 ' + nval + '!');
 });
 </script>
```

以下实例进行**千米**与**米**之间的换算：

```html
 <div id = "computed_props">
     千米 : <input type = "text" v-model = "kilometers">
     米 : <input type = "text" v-model = "meters">
 </div>
 <p id="info"></p>
 <script type = "text/javascript">
     var vm = new Vue({
     el: '#computed_props',
     data: {
         kilometers : 0,
         meters:0
     },
     methods: {
     },
     computed :{
     },
     watch : {
         kilometers:function(val) {
             this.kilometers = val;
             this.meters = this.kilometers * 1000
         },
         meters : function (val) {
             this.kilometers = val/ 1000;
             this.meters = val;
         }
     }
     });
     // $watch 是一个实例方法
     vm.$watch('kilometers', function (newValue, oldValue) {
     // 这个回调将在 vm.kilometers 改变后调用
     document.getElementById ("info").innerHTML = "修改前值为: " + oldValue + "，修改后值为: " + newValue;
 })
 </script>
```

以上代码中我们创建了两个输入框，data 属性中， kilometers 和 meters 初始值都为 0。watch 对象创建了 data 对象的两个监控方法： kilometers 和 meters。

当我们再输入框输入数据时，watch 会实时监听数据变化并改变自身的值

#### Vue.js 样式绑定

##### Vue.js class

class 与 style 是 HTML 元素的属性，用于设置元素的样式，我们可以用 v-bind 来设置样式属性。

Vue.js v-bind 在处理 class 和 style 时， 专门增强了它。表达式的结果类型除了字符串之外，还可以是对象或数组。

##### class 属性绑定

我们可以为 v-bind:class 设置一个对象，从而动态的切换 class:

```html
 <!DOCTYPE html>
 <html>
 <head>
 <meta charset="utf-8">
 <title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
 <script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
 <style>
 .active {
   width: 100px;
   height: 100px;
   background: green;
 }
 </style>
 </head>
 <body>
 <div id="app">
   <div v-bind:class="{ 'active': isActive }"></div>
 </div>
 ​
 <script>
 new Vue({
   el: '#app',
   data: {
     isActive: true
   }
 })
 </script>
 </body>
 </html>
```

我们也可以在对象中传入更多属性用来动态切换多个 class 。

```html
 <div class="static"
      v-bind:class="{ 'active' : isActive, 'text-danger' : hasError }">
 </div>
```

以上实例 div class 为：

```html
 <div class="static active text-danger"></div>
```

我们也可以直接绑定数据里的一个对象：

```html
 <!DOCTYPE html>
 <html>
 <head>
 <meta charset="utf-8">
 <title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
 <script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
 <style>
 .active {
   width: 100px;
   height: 100px;
   background: green;
 }
 .text-danger {
   background: red;
 }
 </style>
 </head>
 <body>
 <div id="app">
   <div v-bind:class="classObject"></div>
 </div>
 ​
 <script>
 new Vue({
   el: '#app',
   data: {
     classObject: {
       active: true,
       'text-danger': true
     }
   }
 })
 </script>
 </body>
 </html>
```

此外，我们也可以在这里绑定返回对象的计算属性。这是一个常用且强大的模式：

```js
 new Vue({
   el: '#app',
   data: {
     isActive: true,
     error: {
       value: true,
       type: 'fatal'
     }
   },
   computed: {
     classObject: function () {
       return {
   base: true,
         active: this.isActive && !this.error.value,
         'text-danger': this.error.value && this.error.type === 'fatal',
       }
     }
   }
 })
```

##### 数组语法

我们可以把一个数组传给 **v-bind:class** ，实例如下：

```html
 <!DOCTYPE html>
 <html>
 <head>
 <meta charset="utf-8">
 <title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
 <script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
 <style>
 .active {
   width: 100px;
   height: 100px;
   background: green;
 }
 .text-danger {
   background: red;
 }
 </style>
 </head>
 <body>
 <div id="app">
   <div v-bind:class="[activeClass, errorClass]"></div>
 </div>
 ​
 <script>
 new Vue({
   el: '#app',
   data: {
     activeClass: 'active',
     errorClass: 'text-danger'
   }
 })
 </script>
 </body>
 </html>
```

我们还可以使用三元表达式来切换列表中的 class ：

```html
 <div v-bind:class="[errorClass ,isActive ? activeClass : '']"></div>
```

##### Vue.js style(内联样式)

我们可以在 **v-bind:style** 直接设置样式：

```html
 <div id="app">
     <div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }">菜鸟教程</div>
 </div>
```

以上实例 div style 为：

```html
 <div style="color: green; font-size: 30px;">菜鸟教程</div>
```

v-bind:style 可以使用数组将多个样式对象应用到一个元素上：

```html
 <!DOCTYPE html>
 <html>
 <head>
 <meta charset="utf-8">
 <title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
 <script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
 </head>
 <body>
 <div id="app">
   <div v-bind:style="styleObject">菜鸟教程</div>
 </div>
 ​
 <script>
 new Vue({
   el: '#app',
   data: {
     styleObject: {
       color: 'green',
       fontSize: '30px'
     }
   }
 })
 </script>
 </body>
 </html>
```

#### Vue.js 事件处理器

事件监听可以使用 v-on 指令：

```html
 <div id="app">
   <button v-on:click="counter += 1">增加 1</button>
   <p>这个按钮被点击了 {{ counter }} 次。</p>
 </div>
  
 <script>
 new Vue({
   el: '#app',
   data: {
     counter: 0
   }
 })
 </script>
```

通常情况下，我们需要使用一个方法来调用 JavaScript 方法。

v-on 可以接收一个定义的方法来调用。

```html
 <div id="app">
    <!-- `greet` 是在下面定义的方法名 -->
   <button v-on:click="greet">Greet</button>
 </div>
  
 <script>
 var app = new Vue({
   el: '#app',
   data: {
     name: 'Vue.js'
   },
   // 在 `methods` 对象中定义方法
   methods: {
     greet: function (event) {
       // `this` 在方法里指当前 Vue 实例
       alert('Hello ' + this.name + '!')
       // `event` 是原生 DOM 事件
       if (event) {
           alert(event.target.tagName)
       }
     }
   }
 })
 // 也可以用 JavaScript 直接调用方法
 app.greet() // -> 'Hello Vue.js!'
 </script>
```

调用method方式可以带参数：

```html
 <div id="app">
   <button v-on:click="say1('hi')">Say hi</button>
   <button v-on:click="say2($event,'what')">Say what</button>
 </div>
  
 <script>
 new Vue({
   el: '#app',
   methods: {
     say1: function (message) {
       alert(message)
     },
     say2: function (e,message) {
       alert(e.target.tagName)
       alert(message)
     }
   }
 })
 </script>
```

##### 事件修饰符

Vue.js 为 v-on 提供了事件修饰符来处理 DOM 事件细节，如：event.preventDefault() 或 event.stopPropagation()。

Vue.js 通过由点 . 表示的指令后缀来调用修饰符。

-   `.stop` - 阻止冒泡

-   `.prevent` - 阻止默认事件

-   `.capture` - 捕获模式

-   `.self` - 只监听触发该元素的事件

-   `.once` - 只触发一次

-   `.left` - 左键事件

-   `.right` - 右键事件

-   `.middle` - 中间滚轮事件

```html
 <!-- 阻止单击事件冒泡 -->
 <a v-on:click.stop="doThis"></a>
 <!-- 提交事件不再重载页面 -->
 <form v-on:submit.prevent="onSubmit"></form>
 <!-- 修饰符可以串联  -->
 <a v-on:click.stop.prevent="doThat"></a>
 <!-- 只有修饰符 -->
 <form v-on:submit.prevent></form>
 <!-- 添加事件侦听器时使用事件捕获模式 -->
 <div v-on:click.capture="doThis">...</div>
 <!-- 只当事件在该元素本身（而不是子元素）触发时触发回调 -->
 <div v-on:click.self="doThat">...</div>
 ​
 <!-- click 事件只能点击一次，2.1.4版本新增 -->
 <a v-on:click.once="doThis"></a>

```

##### 按键修饰符

Vue 允许为 v-on 在监听键盘事件时添加按键修饰符：

```html
 <!-- 只有在 keyCode 是 13 时调用 vm.submit() -->
 <input v-on:keyup.13="submit">
```

记住所有的 keyCode 比较困难，所以 Vue 为最常用的按键提供了别名：

```html
 <!-- 同上 -->
 <input v-on:keyup.enter="submit">
 <!-- 缩写语法 -->
 <input @keyup.enter="submit">
```

全部的按键别名：

-   `.enter`
-   `.tab`
-   `.delete` (捕获 "删除" 和 "退格" 键)
-   `.esc`
-   `.space`
-   `.up`
-   `.down`
-   `.left`
-   `.right`
-   `.ctrl`
-   `.alt`
-   `.shift`
-   `.meta`

实例

```html
 <p><!-- Alt + C -->
 <input @keyup.alt.67="clear">
 <!-- Ctrl + Click -->
 <div @click.ctrl="doSomething">Do something</div>
```

#### Vue.js 表单

这节我们为大家介绍 Vue.js 表单上的应用。

你可以用 v-model 指令在表单控件元素上创建双向数据绑定。

v-model 会根据控件类型自动选取正确的方法来更新元素。

```html
 <div id="app">
   <p>input 元素：</p>
   <input v-model="message" placeholder="编辑我……">
   <p>消息是: {{ message }}</p>
     
   <p>textarea 元素：</p>
   <p style="white-space: pre">{{ message2 }}</p>
   <textarea v-model="message2" placeholder="多行文本输入……"></textarea>
 </div>
  
 <script>
 new Vue({
   el: '#app',
   data: {
     message: 'Runoob',
     message2: '菜鸟教程\r\nhttp://www.runoob.com'
   }
 })
 </script>
```

##### 复选框

复选框如果是一个为逻辑值，如果是多个则绑定到同一个数组：

```html
 <div id="app">
   <p>单个复选框：</p>
   <input type="checkbox" id="checkbox" v-model="checked">
   <label for="checkbox">{{ checked }}</label>
     
   <p>多个复选框：</p>
   <input type="checkbox" id="runoob" value="Runoob" v-model="checkedNames">
   <label for="runoob">Runoob</label>
   <input type="checkbox" id="google" value="Google" v-model="checkedNames">
   <label for="google">Google</label>
   <input type="checkbox" id="taobao" value="Taobao" v-model="checkedNames">
   <label for="taobao">taobao</label>
   <br>
   <span>选择的值为: {{ checkedNames }}</span>
 </div>
  
 <script>
 new Vue({
   el: '#app',
   data: {
     checked : false,
     checkedNames: []
   }
 })
 </script>
```

##### 单选按钮

以下实例中演示了单选按钮的双向数据绑定：

```html
 <div id="app">
   <input type="radio" id="runoob" value="Runoob" v-model="picked">
   <label for="runoob">Runoob</label>
   <br>
   <input type="radio" id="google" value="Google" v-model="picked">
   <label for="google">Google</label>
   <br>
   <span>选中值为: {{ picked }}</span>
 </div>
  
 <script>
 new Vue({
   el: '#app',
   data: {
     picked : 'Runoob'
   }
 })
 </script>
```

##### select 列表

以下实例中演示了下拉列表的双向数据绑定：

```html
 <div id="app">
   <select v-model="selected" name="fruit">
     <option value="">选择一个网站</option>
     <option value="www.runoob.com">Runoob</option>
     <option value="www.google.com">Google</option>
   </select>
  
   <div id="output">
       选择的网站是: {{selected}}
   </div>
 </div>
  
 <script>
 new Vue({
   el: '#app',
   data: {
     selected: '' 
   }
 })
 </script>
```

##### 修饰符

###### .lazy

在默认情况下， v-model 在 input 事件中同步输入框的值与数据，但你可以添加一个修饰符 lazy ，从而转变为在 change 事件中同步：

```html
 <!-- 在 "change" 而不是 "input" 事件中更新 -->
 <input v-model.lazy="msg" >
```

###### .number

如果想自动将用户的输入值转为 Number 类型（如果原值的转换结果为 NaN 则返回原值），可以添加一个修饰符 number 给 v-model 来处理输入值：

```html
 <input v-model.number="age" type="number">
```

###### .trim

如果要自动过滤用户输入的首尾空格，可以添加 trim 修饰符到 v-model 上过滤输入：

```html
 <input v-model.trim="msg">
```

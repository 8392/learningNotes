# 生命周期

下表包含：Vue2和Vue3生命周期的差异


| Vue2(选项式API)| Vue3(setup)    |描述             |
| ------------- | --------------- |--------------- |
| beforeCreate  |    -            |实例创建前       |
| created       |    -            |实例创建后       |
| beforeMount   | onBeforeMount   |DOM挂载前调用    |
| mounted       | onMounted       |DOM挂载完成调用  |
| beforeUpdate  | onBeforeUpdate  |数据更新之前被调用|
| updated       | onUpdated       |数据更新之后被调用|
| beforeDestroy | onBeforeUnmount |组件销毁前调用    |
| destroyed     | onUnmounted     |组件销毁完成调用  |

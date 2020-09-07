<!-- aaaaa -->
<template>
  <div>
    <div>我是b组件啊</div>
    <router-link to="b11">子组件b11</router-link> 
    <router-link to="b22">子组件b22</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  }
}
</script>

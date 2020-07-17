<!-- app -->
<template>
  <div>
    <router-view></router-view>
    <FooterGuide></FooterGuide>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide'
export default {
  data() {
    return {

    }
  },
  components: {
    FooterGuide
  }
}
</script>
<style lang='stylus' scoped></style>
<!-- app -->
<template>
  <div>
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
import FooterGuide from "./components/FooterGuide/FooterGuide";
export default {
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getAddress")
  },
  components: {
    FooterGuide,
  },
};
</script>
<style lang='stylus' scoped></style>

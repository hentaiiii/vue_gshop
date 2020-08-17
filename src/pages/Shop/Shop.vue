<!-- shop -->
<template>
  <div>
    <ShopHeader />
    <div class="tab">
      <div class="tab-item">
        <router-link to="/shop/good" replace>点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/rating" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/info" replace>商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import ShopHeader from "../../components/ShopHeader/ShopHeader";
import {mapState} from 'vuex'
export default {
  data() {
    return {};
  },
  mounted() {
    if(this.goods.length === 0){
      this.$store.dispatch("getGoods")
    }
    if(this.goods.length === 0){
      this.$store.dispatch("getRatings")
    }
    if(this.goods.length === 0){
      this.$store.dispatch("getInfo")
    }
  },
  computed: {
    ...mapState({
      goods: state => state.shop.goods,
      info: state => state.shop.info,
      ratings: state => state.shop.ratings,
    })
  },
  components: {
    ShopHeader,
  },
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/mixins.styl'
.tab
  height 40px
  line-height 40px
  background #fff
  bottom-border-1px(rgba(7, 17, 27, 0.1))
  .tab-item
    float left
    width 33.33333%
    text-align center
    font-size 14px
    color rgb(77, 85, 93)
    a
      display block
      position relative
      &.router-link-active
        color #02a774
        &::after
          content ''
          position absolute
          left 50%
          bottom 1px
          width 35px
          height 2px
          transform translateX(-50%)
          background #02a774
</style>
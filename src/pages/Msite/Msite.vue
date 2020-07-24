<template>
  <div class="msite">
    <!--首页头部-->
    <Header :title="address.name || '正在定位中...'">
      <a class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </a>
      <a class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </a>
    </Header>
    <!--首页导航-->
    <nav class="msite_nav border-1px">
      <div class="swiper-container" v-if="categorys.length > 0">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
            <a
              href="javascript:"
              class="link_to_food"
              v-for="(category, index) in categorys"
              :key="index"
            >
              <div class="food_container">
                <img :src="imgBaseUrl + category.image_url" />
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination">
          <span class="swiper-pagination-bullet swiper-pagination-bullet-active"></span>
          <span class="swiper-pagination-bullet"></span>
        </div>
      </div>
      <div v-else>
        <img src="./msite_back.svg" alt />
      </div>
    </nav>
    <!--首页附近商家-->
    <Shop />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Shop from "../../components/Shops/Shops";
// 引入swiper
import Swiper from "swiper";
import "swiper/swiper-bundle.min.css";
export default {
  name: "Msite",
  data() {
    return {
      imgBaseUrl: "http://fuss10.elemecdn.com",
    };
  },
  computed: {
    ...mapState(["address"]),
    ...mapState(["categorys"]),
    categorysArr() {
      const { categorys } = this;
      const arr = []; // 创建目标二维数组
      let minArr = [];
      categorys.forEach((c) => {
        if (minArr.length === 8) {
          minArr = [];
        }
        if (minArr.length === 0) {
          arr.push(minArr);
        }
        minArr.push(c);
      });
      return arr;
    },
  },
  mounted() {
    this.$store.dispatch("getCategories");
    setTimeout(() => {
      new Swiper(".swiper-container", {
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination",
        },
      });
    }, 1000);
  },
  components: {
    Shop,
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.msite
  width 100%
  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff
    .swiper-container
      width 100%
      height 100%
      .swiper-wrapper
        width 100%
        height 100%
        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap
          .link_to_food
            width 25%
            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
      .swiper-pagination
        width 100%
        bottom 3px
        >.swiper-pagination-bullet
          margin 0 4px
        >span.swiper-pagination-bullet-active
          background #02a774
</style>
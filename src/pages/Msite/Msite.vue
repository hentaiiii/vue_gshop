<template>
  <div class="msite">
    <!--首页头部-->
    <Header :title="address.name || '正在定位中...'">
      <a class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </a>
      <a class="header_login" slot="right">
        <span class="header_login_text" @click="$router.push('/login')">登录|注册</span>
      </a>
    </Header>
    <!--首页导航-->
    <nav class="msite_nav border-1px">
      <div class="swiper-container" v-if="categorys.length > 0">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys, index) in categorysArr2" :key="index">
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
          <!-- <span class="swiper-pagination-bullet swiper-pagination-bullet-active"></span>
          <span class="swiper-pagination-bullet"></span>-->
        </div>
      </div>
      <div v-else>
        <img src="./msite_back.svg" />
      </div>
    </nav>
    <!--首页附近商家-->
    <Shop />
  </div>
</template>

<script>
/**
 * swiper创建的时机：要等数据接受以后 页面渲染完成之后创建
 *  因此在mouted里面创建太早会导致页面排版出现问题
 *  解决方案： 1. watch (监听数据变化) + nextTick （在页面渲染完成后执行回调函数）
 *            2. callback (给dispathc穿一个回调参数，在commit之后执行， 这样也可以保证获取到了数据) + nextTick
 *            3. this.$store.dispatch()方法返回的是一个promise 在完成接接受数据以后执行 可以用async await等完全接受数据以后再用nextTick搞定
 */
import { mapState } from "vuex";
import Shop from "../../components/Shops/ShopsList";
import chunk from 'lodash/chunk.js'
// 引入swiper
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
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
    // 使用lodash 工具函数实现数组合并
    categorysArr2() {
      return chunk(this.categorys, 8)
    }
  },
  mounted() {
    this.$store.dispatch("getCategories")
  },
  watch: {
    /**
     * 更新状态数据 ==》 调用监视回调 ==》 异步更新界面
     */
    categorys() {
      this.$nextTick(() => {
        new Swiper(".swiper-container", {
          loop: true, // 循环模式选项
          // 如果需要分页器
          pagination: {
            el: ".swiper-pagination",
          }
        });
      });
    },
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
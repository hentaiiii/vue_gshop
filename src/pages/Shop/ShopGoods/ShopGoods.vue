<!-- shopgoods -->
<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="left">
        <ul ref="leftUl">
          <li class="menu-item" :class="{current: currentIndex == index}" v-for="(good, index) in goods" :key="index" @click="selectItem(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon" />
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="right">
        <ul ref="rightUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                v-for="(food, index) in good.foods"
                :key="index"
              >
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" />
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BScroll from "better-scroll";
export default {
  name: "ShopGoods",
  data() {
    return {
      tops: [], // 右侧li分类top组成的列表
      scrollY: 0, // 右侧列表滑动的li的距离 
    }
  },
  computed: {
    ...mapState({
      goods: (state) => state.shop.goods,
    }),

    currentIndex() {
      const {tops, scrollY} = this
      let index = tops.findIndex((top, index)=> top <= scrollY && scrollY < tops[index+1])
      if(this.index !== index && this.leftScroll){
        const li = this.$refs.leftUl.children[index]
        this.leftScroll.scrollToElement(li, 500)
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.index = index
      return index
    }
  },
  mounted() {
    // 刚开始有数据
    if(this.goods.length> 0){
      this._initScroll()
      this._initTops()
    }
  },
  watch: {
    goods() {
      this.$nextTick(() => {
        // 开始没有数据， 后面才有数据
        this._initScroll()
        this._initTops()
      });
    },
  },
  methods: {
    _initScroll() {
      this.leftScroll = new BScroll(this.$refs.left, {
        click: true
      })
      this.rightScroll = new BScroll(this.$refs.right, {
        click: true,
        probeType: 1, // 触摸 非实时
        // probeType: 2, // 触摸 实时
        // probeType: 3, // 触摸/惯性 实时
      })
      this.rightScroll.on('scroll', (e) => {
        this.scrollY = Math.abs(e.y)
      })
      this.rightScroll.on('scrollEnd', (e) => {
        this.scrollY = Math.abs(e.y)
      })
    },

    _initTops() {
      const tops = []
      let top = 0
      tops.push(top)
      const lis = this.$refs.rightUl.children
      Array.prototype.forEach.call(lis, li => {
        top += li.clientHeight
        tops.push(top)
      })
      this.tops = tops
    },

    selectItem(index) {
      const top = this.tops[index]
      this.scrollY = top
      this.rightScroll.scrollTo(0, -top, 500)
      console.log(index)
    }
  },
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixins.styl'
.goods
  display flex
  position absolute
  top 225px
  bottom 46px
  width 100%
  background #fff
  overflow hidden
  .menu-wrapper
    flex 0 0 80px
    width 80px
    background #f3f5f7
    .menu-item
      display table
      height 54px
      width 56px
      padding 0 12px
      line-height 14px
      &.current
        position relative
        z-index 10
        margin-top -1px
        background #fff
        color $green
        font-weight 700
        .text
          border-none()
      .icon
        display inline-block
        vertical-align top
        width 12px
        height 12px
        margin-right 2px
        background-size 12px 12px
        background-repeat no-repeat
      .text
        display table-cell
        width 56px
        vertical-align middle
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        font-size 12px
  .foods-wrapper
    flex 1
    .title
      padding-left 14px
      height 26px
      line-height 26px
      border-left 2px solid #d9dde1
      font-size 12px
      color rgb(147, 153, 159)
      background #f3f5f7
    .food-item
      display flex
      margin 18px
      padding-bottom 18px
      bottom-border-1px(rgba(7, 17, 27, 0.1))
      &:last-child
        border-none()
        margin-bottom 0
      .icon
        flex 0 0 57px
        margin-right 10px
      .content
        flex 1
        .name
          margin 2px 0 8px 0
          height 14px
          line-height 14px
          font-size 14px
          color rgb(7, 17, 27)
        .desc, .extra
          line-height 10px
          font-size 10px
          color rgb(147, 153, 159)
        .desc
          line-height 12px
          margin-bottom 8px
        .extra
          .count
            margin-right 12px
        .price
          font-weight 700
          line-height 24px
          .now
            margin-right 8px
            font-size 14px
            color rgb(240, 20, 20)
          .old
            text-decoration line-through
            font-size 10px
            color rgb(147, 153, 159)
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom 12px
</style>
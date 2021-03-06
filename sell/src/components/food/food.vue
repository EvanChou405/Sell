<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="food">
      <div>
        <div class="food-content">
          <div class="image-header">
            <img :src="food.image">
            <div class="back" @click="hide">
            <font-awesome-icon icon="arrow-left" class="icon-arrow-left"></font-awesome-icon>
            </div>
          </div>
        </div>

        <div class="content">

          <h1 class="title">{{food.name}}</h1>

          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}</span>
          </div>

          <div class="price">
            <span class="new">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">{{food.oldPrice}}</span>
          </div>

          <div class="cartcontrol-wrapper" v-show="food.count > 0" @click.stop>
            <cartcontrol  @add="addFood" :food="food"></cartcontrol>
          </div>

          <transition name="fade">
          <div @click="addFirst" class="buy" v-show="!food.count || food.count === 0">
            加入购物车
          </div>
          </transition>

        </div>

        <split v-show="food.info"></split>

        <div class="info" v-show="food.info">
          <div class="title">商品情報</div>
          <P class="text">{{food.info}}</P>
        </div>

        <split></split>

        <div class="rating">
          <h1 class="title">商品評価</h1>
        <ratingselect    :selectType="selectType"
                         :onlyContent="onlyContent"
                         :desc="desc"
                         :ratings="food.ratings"
                         @select-change="_selectChange"
                         @targgle="_targgle"
        >

        </ratingselect>
        <div class="rating-wrapper">
          <ul v-show="food.ratings && food.ratings.length">
            <li v-show="needShow(rating.rateType, rating.text)" v-for="rating in food.ratings" :key="rating.key" class="rating-item border-1px">
              <div class="user">
                <span class="name">{{rating.username}}</span>
                <img class="avatar" width="12" height="12" :src="rating.avatar">
              </div>
              <div class="time">{{rating.rateTime}}</div>
              <p class="text">
                <span :class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType === 1}"></span>{{rating.text}}
              </p>
            </li>
          </ul>
          <div class="no-rating" v-show="!food.ratings || !food.ratings.length"></div>
        </div>
        </div>

      </div>

    </div>

  </transition>
</template>

<script>
import BScroll from 'better-scroll'
import cartcontrol from '../cartcontrol/cartcontrol'
import ratingselect from '../ratingselect/ratingselect'
import split from '../split/split'

const EVENT_ADD = 'add'
const ALL = 2

export default {
    props: {
        food: Object
    },
    name: 'food.vue',
    data () {
      return {
          showFlag: false,
          selectType: ALL,
          onlyContent: true,
          desc: {
              all: '全部',
              positive: '推荐',
              negative: '吐槽'
          }
      }
    },
    methods: {
       show () {
         this.showFlag = true
         this.selectType = ALL
         this.onlyContent = false
       },
       hide () {
         this.showFlag = false
       },
       addFirst (event) {
           this.$set(this.food, 'count', 1)
           this.$emit(EVENT_ADD, event.target)
       },
       addFood (target) {
           this.$emit(EVENT_ADD, target)
       },
       needShow (type, text) {
           if (this.onlyContent && !text) {
               return false
           }
           if (this.selectType === ALL) {
               return true
           } else {
               return type === this.selectType
           }
       },
        _selectChange (type) {
            this.selectType = type
            this.$nextTick(() => {
                this.scroll.refresh()
            })
        },
        _targgle (type) {
            this.onlyContent = type
            this.$nextTick(() => {
                this.scroll.refresh()
            })
        }
    },
    components: {
        cartcontrol,
        split,
        ratingselect
    },
    mounted () {
        this.$nextTick(() => {
            if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.food, {click: true})
            } else {
                this.scroll.refresh()
            }
        })
    }
}
</script>

<style scoped lang="stylus">

  @import "../../common/stylus/mixin.styl"

.food
  position: fixed
  left: 0
  top: 0
  bottom: 48px
  z-index: 30
  width: 100%
  background: #fff
  transition: all 0.2s linear
  transform: translate3d(0,0,0)
  &.move-enter, &.move-leave-active
    transform: translate3d(100%,0,0)
  .image-header
    position: relative
    width: 100%
    height: 0
    padding-top: 100%
    img
      position: absolute
      top: 0
      left:0
      width: 100%
      height: 100%
    .back
      position: absolute
      top: 10px
      left: 0
      .icon-arrow-left
        display: block
        padding: 10px
        font-size: 20px
        color: #800080
  .content
    padding: 18px
    position: relative
    .title
      line-height: 14px
      margin-bottom: 8px
      font-size: 14px
      font-weight: 700px
      color: rgb(7,17,27)
    .detail
      margin-bottom: 18px
      height: 10px
      line-height: 10px
      font-size: 0
      .sell-count, .rating
        font-size: 10px
        color: rgb(147,153,159)
      .sell-count
        margin-right: 12px
    .price
      font-weight: 700
      line-height: 24px
      .now
        margin-right: 8px
        font-size: 14px
        color: rgb(240,20,20)
      .old
        text-decoration: line-through
        font-size: 10px
        color: rgb(147,153,159)
    .cartcontrol-wrapper
      position: absolute
      right: 12px
      bottom: 12px
    .buy
      position: absolute
      right: 18px
      bottom: 18px
      z-index: 10
      line-height: 24px
      padding: 0 12px
      box-sizing: border-box
      border-radius: 12px
      font-size: 10px
      color: #fff
      background: rgb(0,160,220)
      opacity: 1
      &.fade-enter-active, &.fade-leave-active
        transition: all 0.3s
      &.fade-enter, &.fade-leave-active
        opacity: 0
        z-index: -1
  .info
    padding: 18px
    .title
      line-height: 14px
      margin-bottom: 16px
      font-size: 14px
      color: rgb(7,17,27)
    .text
      line-height: 24px
      padding: 0 8xp
      font-size: 12px
      color: rgb(77,85,93)
  .rating
    padding-top: 10px
    .title
      line-height: 14px
      margin-left: 18px
      font-size: 14px
      color: rgb(7,17,27)
    .rating-wrapper
      padding: 0 18px
    .rating-item
      position: relative
      padding: 16px 0
      border-1px(rgba(7,17,27,0.1))
      .user
        position: absolute
        right: 0
        top: 16px
        line-height: 12px
        font-size: 0
        .name
          display: inline-block
          margin-right: 6px
          vertical-align: top
          font-size: 10px
          color: rgb(147,153,159)
        .avatar
          border-radius: 50%

      .time
        margin-bottom: 6px
        line-height: 12px
        font-size: 10px
        color: rgb(147,153,159)
      .text
        line-height: 16px
        font-size: 12px
        color: rgb(7,17,27)
      .icon-thumb_up, .icon-thumb_down
        line-height: 16px
        margin-right: 4px
        font-size:12px
      .icon-thumb_up
        color: rgb(0,160,220)
      .icon-thumb_down
        color: rgb(147,153,159)
</style>

<template>
  <div>

    <tab></tab>

    <div class="ratings" ref="ratings">
      <div class="ratings-content">
        <div class="overview">
          <div class="overview-left">
            <h1 class="score">{{seller.score}}</h1>
            <div class="title">综合评分</div>
            <div class="rank">高于周边商家{{seller.rankRate}}%</div>
          </div>
          <div class="overview-right">
            <div class="score-wrapper">
              <span class="title">服务态度</span>
              <star :size="36" :score="seller.serviceScore" class="star"></star>
              <span class="score">{{seller.serviceScore}}</span>
            </div>
            <div class="score-wrapper">
              <span class="title">商品评分</span>
              <star :size="36" :score="seller.foodScore" class="star"></star>
              <span class="score">{{seller.foodScore}}</span>
            </div>
            <div class="delivery-wrapper">
              <span class="title">送达时间</span>
              <span class="delivery">{{seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
        <split></split>
        <ratingselect    :selectType="selectType"
                         :desc="desc"
                         :onlyContent="onlyContent"
                         :ratings="ratings"
                         @select-change="_selectChange"
                         @targgle="_targgle"
        >
        </ratingselect>
        <div class="rating-wrapper">
          <ul>
            <li v-for="rating in ratings" :key="rating.key" class="rating-item" v-show="needShow(rating.rateType, rating.text)">
              <div class="avatar">
                <img width="28px" height="28px" :src="rating.avatar">
              </div>
              <div class="content">
                <h1 class="name">{{rating.username}}</h1>
                <div class="star-wrapper">
                  <star :size="24" :score="rating.score" class="star"></star>
                  <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                </div>
                <p class="text">{{rating.text}}</p>
                <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                  <span class="icon-thumb_up"></span>
                  <span class="item" v-for="item in rating.recommend" :key="item.key">{{item}}</span>
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tab from '../tab/tab'
import star from '../star/star'
import split from '../split/split'
import ratingselect from '../ratingselect/ratingselect'
import BScroll from 'better-scroll'
import axios from 'axios'
import {formatDate} from '../../common/js/data'

const ALL = 2

export default {
    name: 'ratings',
    props: {
      seller: {
        type: Object
      }
    },
    data () {
        return {
            ratings: [],
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
        getRatingsInfo () {
            axios.get('/api/ratings')
                .then(this.getRatingsInfoSucc)
        },
        getRatingsInfoSucc (res) {
            this.ratings = res.data.data
            this.$nextTick(() => {
                this.scroll = new BScroll(this.$refs.ratings, {click: true})
            })
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
    mounted () {
        this.getRatingsInfo()
    },
    filters: {
        formatDate (time) {
            let date = new Date(time)
            return formatDate(date, 'yyyy-MM-dd hh:mm')
        }
    },
    components: {
        tab,
        star,
        split,
        ratingselect
    }
}
</script>

<style lang="stylus" scoped  rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .ratings
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        flex: 0 0 137px
        padding: 6px 0
        width: 137px
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        text-align: center
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
        .score
          margin-bottom: 6px
          line-height: 28px
          font-size: 24px
          color: rgb(255, 153, 0)
        .title
          margin-bottom: 8px
          line-height: 12px
          font-size: 12px
          color: rgb(7, 17, 27)
        .rank
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1
        margin-left: 12px
        @media only screen and (max-width: 320px)
          padding-left: 6px
        .score-wrapper
          margin-bottom: 8px
          font-size: 0
          .title
            display: inline-block
            line-height: 18px
            margin-left: 12px
            vertical-align: top
            font-size: 12px
            color: rgb(7, 17, 27)
          .star
            display: inline-block
            margin: 0 12px
            vertical-align: top
          .score
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(255, 153, 0)
        .delivery-wrapper
          font-size: 0
          margin-left: 12px
          .title
            line-height: 18px
            font-size: 12px
            color: rgb(7, 17, 27)
          .delivery
            margin-left: 12px
            font-size: 12px
            color: rgb(147, 153, 159)
    .rating-wrapper
      padding: 0 18px
      .rating-item
        display: flex
        padding: 18px 0
        border-1px(rgba(7,17,27,0.1))
      .avatar
        flex: 0 0 28px
        width: 28px
        margin-right: 12px
        img
          border-radius: 50%
      .content
        position: relative
        flex: 1
        .name
          margin-bottom: 4px
          line-height: 12px
          font-size: 10px
          color: rgb(7,17,27)
        .star-wrapper
          margin-bottom: 6px
          font-size: 0
          .star
            display: inline-block
            vertical-align: top
            margin-right: 6px
          .delivery
            display: inline-block
            vertical-align: top
            font-size: 10px
            line-height: 12px
            color: rgb(147,153,159)
        .text
          line-height: 18px
          margin-bottom: 8px
          color: rgb(7,17,27)
          font-size: 12px
        .recommend
          line-height: 16px
          font-size: 0
          .icon-thumb_up, .item
            display: inline-block
            margin: 0 8px 4px 0
            font-size: 9px
          .icon-thumb_up
            color: rgb(0,160,220)
          .item
            padding: 0 6px
            border: 1px solid rgba(7,17,27,0.1)
            border-radius: 1px
            color: rgb(147,153,159)
            background: #fff
        .time
          position: absolute
          top: 0
          right: 0
          line-height: 12px
          font-size: 10px
          color: rgb(7,17,27)

</style>

<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight': totalCount>0}">
            <font-awesome-icon icon="shopping-cart" class="icon-shopping-cart" :class="{'highlight': totalCount>0}"></font-awesome-icon>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight': totalCount>0}">￥{{totalPrice}}円</div>
        <div class="desc">配送手数料￥{{deliveryPrice}}円</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        props: {
            selectFoods: {
              type: Array,
              default () {
                  return [
                      {
                          price: 20,
                          count: 1
                      }
                  ]
              }
            },
            deliveryPrice: Number,
            minPrice: Number
        },
        computed: {
            totalPrice () {
                let total = 0
                this.selectFoods.forEach((food) => {
                    total += food.price * food.count
                })
                return total
            },
            totalCount () {
                let count = 0
                this.selectFoods.forEach((food) => {
                    count += food.count
                })
                return count
            },
            payDesc () {
                // eslint-disable-next-line no-irregular-whitespace
              if (this.totalPrice === 0)　{
                  // eslint-disable-next-line no-irregular-whitespace
                  return '￥'　+ this.minPrice　+ '円から配送'
              } else if (this.totalPrice < this.minPrice) {
                  let diff = this.minPrice - this.totalPrice
                  return `あと￥${diff}円で配送`
              } else {
                  return 'カートを見る'
              }
            },
            payClass () {
              if (this.totalPrice < this.minPrice) {
                  return 'not-enough'
              } else {
                  return 'enough'
              }
            }

        }
    }
</script>

<style lang="stylus" scoped>
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255,255,255,0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: rgb(0,160,220)
            .icon-shopping-cart
              margin-top: 8px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #fff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4)
        .price
          display : inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255,255,255,0.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff

</style>
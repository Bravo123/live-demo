<template>
  <div class="shop-wrapper">
    <div class="header">
      <span>视频中同款商品</span>
      <img class="close" @click.stop="close" src="../../static/small-video/icon_close.png" />
    </div>
    <div class="content" @click.stop="showGoodInfo">
      <div class="left">
        <div class="good-img">
          <img mode="aspectFill" :src="good.img" class="good-pic" alt />
          <div class="price">
            <i>￥</i>
            {{good.sell_goods_price}}
          </div>
        </div>
      </div>
      <div class="right">
        <div class="shop-desc">{{good.goods_name}}</div>
        <div class="user">
          <!-- <div class="avatar-list">
            <image class="avatar" v-for="(item, index) in good.people" :src="item" :key="index"/>
          </div>-->
          <div class="watch-num">{{good.goods_input_sales || 0}}人买过</div>
        </div>
        <img class="next" src="../../static/small-video/icon_next.png" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    good: {
      type: Object,
      default: null,
    },
  },
  components: {},
  computed: {},
  data() {
    return {};
  },
  methods: {
    showGoodInfo() {
      this.$emit('showGoodInfo');
    },
    close() {
      this.$emit('close');
    },
  },
  created() {},
  mounted() {},
  watch: {},
};
</script>
<style lang="scss" scoped>
@import '../css/base';
@keyframes fadeIn {
  0% {
    left: -300px;
    opacity: 0.8;
  }
  100% {
    left: 0;
    opacity: 1;
  }
}
.shop-wrapper {
  position: fixed;
  bottom: 480px;
  left: 50px;
  padding: 0 24px 0 34px;
  width: 566px;
  height: 244px;
  background: rgba(255, 255, 255, 1);
  border-radius: 16px;
  animation: fadeIn 0.5s;
  z-index: 100;
  .header {
    position: relative;
    width: 100%;
    margin: 8px 0 10px;
    span {
      height: 40px;
      font-size: 28px;
      font-weight: 600;
      line-height: 40px;
      color: rgba(179, 179, 179, 1);
    }
    .close {
      position: absolute;
      top: 0;
      right: 0;
      width: 40px;
      height: 42px;
    }
  }
  .content {
    display: flex;
    width: 100%;
    height: 167px;
    .left {
      position: relative;
      margin-right: 20px;
      width: 167px;
      height: 167px;
      .good-img {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 16px;
        overflow: hidden;
        .good-pic {
          width: 100%;
          height: 100%;
        }
        .group-buy {
          position: absolute;
          top: 0;
          left: 0;
          width: 180px;
          height: 40px;
          transform: rotate(-45deg) translateX(-45px) translateY(-30px);
          text-align: center;
          line-height: 40px;
          font-size: 22px;
          letter-spacing: 10px;
          background-color: #dc348c;
          color: #fff;
          z-index: 2;
        }
        .price {
          position: absolute;
          left: 50%;
          bottom: 10px;
          transform: translateX(-50%);
          padding: 0 20px;
          // width: fit-content;
          height: 46px;
          font-size: 28px;
          line-height: 46px;
          border-radius: 23px;
          color: rgba(255, 255, 255, 1);
          background: rgba(220, 52, 140, 0.6);
          white-space: nowrap;
          i {
            display: inline;
            font-size: 24px;
            color: #fff;
          }
        }
      }
    }
    .right {
      position: relative;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .shop-desc {
        display: -webkit-box;
        -webkit-line-clamp: 3; /*指定几行出现省略号*/
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 10px;
        width: 282px;
        font-size: 28px;
        font-weight: bold;
        color: rgba(74, 74, 74, 1);
        line-height: 40px;
      }
      .user {
        display: flex;
        .watch-num {
          // margin-left: -50px;
          font-size: 24px;
          font-weight: lighter;
          line-height: 36px;
          height: 36px;
          color: rgba(74, 74, 74, 1);
        }
        .avatar-list {
          display: flex;
          margin-right: 10px;
          // max-width: 90px;
          overflow: hidden;
          // .avatar {
          //   width: 36px;
          //   height: 36px;
          //   border-radius: 50%;
          //   &:nth-of-type(2) {
          //     transform: translateX(-18px);
          //   }
          //   &:nth-of-type(3) {
          //     transform: translateX(-36px);
          //   }
          //   &:nth-of-type(4) {
          //     transform: translateX(-54px);
          //   }
          // }
        }
      }
      .next {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 58px;
        height: 34px;
      }
    }
  }
}
</style>

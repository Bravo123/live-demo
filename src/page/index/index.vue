<template>
  <div id="index">
    <video
      :src="playUrl"
      class="video"
      autoplay
      id="video-ele"
      x5-video-player-type="h5"
      x5-video-player-fullscreen="true"
      webkit-playsinline="true"
      playsinline="true"
      preload
      controls
    />
    <div class="cover" @click.stop="showVideo" @dblclick.stop="dbclickCb"></div>
    <scroll
      @pullup="loadMoreGoods"
      :probeType="2"
      :data="goodsList"
      v-if="isShowGoodsList"
      :scrollY="true"
      class="goods-list"
    >
      <ul>
        <li class="item" v-for="item in goodsList" :key="item.id" @click="showGoodsInfo(item)">
          <div class="good-img">
            <img mode="aspectFill" :src="item.has_goods.img" class="good-pic" alt />
          </div>
          <div class="goods-msg">
            <div class="goods-title">{{item.has_goods.goods_name}}</div>
            <div class="goods-price">
              ¥{{item.has_goods.sell_goods_price}}
              <img
                class="cart"
                src="../../../static/live/icon_shoppingcart.png"
              />
            </div>
          </div>
        </li>
      </ul>
    </scroll>
    <videoGood
      v-if="isShowVideoGood"
      @showGoodInfo="showGoodsInfo"
      @close="closeGood"
      :good="videoGoodObj"
    />
    <scroll
      :probeType="2"
      :data="commentList"
      :scrollY="true"
      class="comment-list"
      ref="barrageScroll"
    >
      <ul>
        <li
          class="comment-item"
          :id="'log' + comment.id"
          v-for="comment in commentList"
          :key="comment.id"
        >
          <span class="nickname">{{comment.nickname}}：</span>
          <span class="content">{{comment.content}}</span>
        </li>
      </ul>
    </scroll>
    <div class="input-box">
      <input
        id="comment-input"
        placeholder="说点什么"
        @keydown.enter="sendComment"
        v-model="commentVal"
        @input="bindFocus"
        @blur="inputBlurCb"
      />
      <img
        class="show-goods-icon"
        src="../../../static/live/icon_shoppingcart.png"
        @click="isShowGoodsList = !isShowGoodsList"
      />

      <!-- 选择分辨率 -->
      <!-- <span class="choose" @click.stop="isShowSelectType = true">{{playType}}</span> -->
      <!-- <div class="choose-box" v-if="isShowSelectType">
        <span
          class="item"
          :class="{active: type === playType}"
          v-for="type in typeList"
          :key="type"
          @click.stop="chooseType(type)"
        >{{type}}</span>
      </div>
    </div> -->

    <!-- 点赞 -->
    <div v-for="(love, index) in loveList" :key="index">
      <love :event="love" />
    </div>
  </div>
</template>

<script>
import { connectLive } from '../../lib/connectLive';
import scroll from '../../components/scroll/';
import VideoGood from '../../components/video-good.vue';
import love from '../../components/love.vue';
export default {
  name: 'index',
  components: {
    scroll,
    VideoGood,
    love,
  },
  data() {
    return {
      loveList: [],
      isShowSelectType: false,
      typeList: ['默认'],
      playType: '默认',
      playUrl: 'http://rtmp.bsy.314live.cn/314live/zg0r9/playlist.m3u8',
      nickname: '游客' + Math.floor(Math.random() * 10000),
      videoGoodObj: {},
      isShowVideoGood: false,
      commentVal: '',
      goodsList: [
        {
          id: 1007020801002535,
          has_goods: {
            goods_name: '天天坚果（活力派）25g',
            sell_goods_price: 5.8,
            img: 'https://static5.laiyifen.com/files/product/image/1562741419253_827.jpg',
          },
        },
        {
          id: 1008020801002502,
          has_goods: {
            goods_name: '天天坚果（萌萌派）',
            sell_goods_price: 3.2,
            img: 'https://static1.laiyifen.com/files/product/image/1562741230338_2069.jpg',
          },
        },
        {
          id: 1007020801012039,
          has_goods: {
            goods_name: '天天坚果（经典派）',
            sell_goods_price: 5.8,
            img: 'https://static4.laiyifen.com/files/product/image/1560751379441_8540.jpg',
          },
        },
        {
          id: 1008020801002448,
          has_goods: {
            goods_name: '天天坚果（温馨派）',
            sell_goods_price: 4.5,
            img: 'https://static4.laiyifen.com/files/product/image/1562741149729_8271.jpg',
          },
        },
      ],
      commentList: [
        {
          id: 0,
          nickname: '系统消息',
          content: '欢迎来到直播间，请遵守法律',
        },
      ],
      isShowGoodsList: false,
    };
  },
  filters: {},
  computed: {
    scrollEle() {
      return this.$refs.barrageScroll;
    },
    inputEle() {
      return document.getElementById('comment-input');
    },
    videoEle() {
      return document.getElementById('video-ele');
    },
  },
  watch: {},
  methods: {
    chooseType(type) {
      this.playType = type;
      // this.playUrl = `http://rtmp.bsy.314live.cn/314live/zg0r9${
      //   type === '默认' ? '' : '_' + type
      // }/playlist.m3u8`;
      this.isShowSelectType = false;
    },
    dbclickCb(e) {
      console.log(e, 'dbclickCb');
      // TODO 出现小红心
      this.loveList.push({
        x: e.clientX,
        y: e.clientY,
      });
      setTimeout(() => {
        this.loveList.shift();
      }, 500);
    },
    closeGood() {
      this.isShowVideoGood = false;
    },
    // 用户正在输入
    bindFocus(e) {
      setTimeout(() => {
        this.inputEle.scrollIntoView();
      }, 100);
    },
    inputBlurCb() {
      window.scroll(0, 0);
    },
    loadMoreGoods() {
      // this.goodsList.push({
      //   id: this.goodsList.length,
      //   has_goods: {
      //     goods_name: `商品${this.goodsList.length + 1}`,
      //     sell_goods_price: 100,
      //     img: 'https://314live.image.alimmdn.com/image/20190423150549_1536.jpg',
      //   },
      // });
    },
    showVideo() {
      this.isShowGoodsList = false;
      this.isShowSelectType = false;
    },
    sendComment() {
      if (!this.commentVal) {
        this.$toast('不能发送空消息');
        return;
      }
      ROP.Publish(
        JSON.stringify({
          id: parseInt(Math.random() * 10000, 10),
          nickname: this.nickname,
          content: this.commentVal,
          type: 1,
        }),
        '99999'
      );
      this.commentVal = '';
      this.inputEle.blur();
      this.$toast('发送成功');
    },
    showGoodsInfo() {
      window.location.href = `http://m.laiyifen.com/detail.html?itemId=${this.videoGoodObj.id}`;
    },
    getMessage() {
      ROP.Subscribe('99999');
      // 获取消息
      ROP.On('publish_data', (data, topic) => {
        let message = {};
        try {
          message = JSON.parse(data);
        } catch (error) {
          console.log(error);
        }
        console.log(message);
        if (Number(message.type) === 1) {
          this.commentList.push({
            id: message.id,
            nickname: message.nickname,
            content: message.content,
          });
          setTimeout(() => {
            this.scrollEle.scrollToElement(
              document.querySelector(`#log${this.commentList[this.commentList.length - 1].id}`)
            );
          }, 500);
        } else {
          this.videoGoodObj = {
            id: message.goods_id,
            img: message.img,
            goods_id: message.goods_id,
            sell_goods_price: message.sell_goods_price,
            is_group: message.is_group || 0,
            goods_name: message.goods_name,
            goods_input_sales: message.goods_input_sales,
          };
          this.isShowVideoGood = true;
          setTimeout(() => {
            this.isShowVideoGood = false;
          }, 5000);
        }
      });
    },
    // getSign() {
    //   var timestamp = parseInt(new Date().getTime() / 1000);
    //   var key = '123_stv_123';
    //   var second = 120;
    //   var t = (second + timestamp).toString(16);
    //   var path = `/314live/zg0r9_${this.playType}`;
    //   var url = 'rtmp://rtmp.bsy.314live.cn';
    //   var sign = md5(key + path + t).toLowerCase();
    //   this.playUrl = url + path + '?sign=' + sign + '&t=' + t;
    // },
  },
  created() {},
  mounted() {
    connectLive();
    this.getMessage();
    wx.ready(() => {
      this.videoEle.addEventListener('click', () => {
        this.videoEle.play();
      });
      // 退出全屏监听 视频自动暂停并进入非全屏时候的样子
      this.videoEle.addEventListener('x5videoexitfullscreen', () => {});
      // 进入全屏监听  视频自动播放并全屏
      this.videoEle.addEventListener('x5videoenterfullscreen', () => {});
      this.videoEle.play();
    });
    this.$nextTick(() => {
      setTimeout(() => {
        this.scrollEle.scrollToElement(
          document.querySelector(`#log${this.commentList[this.commentList.length - 1].id}`)
        );
      }, 500);
    });
  },
};
</script>
<style lang='scss' scoped>
@import './index.scss';
@import '../../css/base';
#index {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cover {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80%;
  z-index: 99;
  background: transparent;
}

.input-box {
  position: fixed;
  bottom: 50px;
  left: 50px;
  display: flex;
  align-items: center;
  // width: 600px;
  height: 80px;
  z-index: 100;

  input {
    padding-left: 20px;
    width: 400px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 40px;
    color: #fff;
    &::placeholder {
      color: #fff;
    }
  }

  .show-goods-icon {
    margin: 0 50px;
    width: 60px;
    height: 60px;
  }

  .choose {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    width: 120px;
    border-radius: 30px;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
  }

  .choose-box {
    position: absolute;
    top: -280px;
    left: 560px;
    display: flex;
    flex-direction: column;
    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
      height: 60px;
      width: 120px;
      border-radius: 30px;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;

      &.active {
        background: rgba(220, 52, 140, 1);
        border: 1px solid rgba(220, 52, 140, 1);
      }
    }
  }
}

.comment-list {
  position: fixed;
  bottom: 150px;
  left: 50px;
  width: 400px;
  height: 300px;
  padding: 0 20px;
  border-radius: 12px;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  z-index: 100;
  .comment-item {
    position: relative;
    margin: 10px 0;
    &:last-of-type {
      padding-bottom: 40px;
    }
  }
}

.goods-list {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0 32px;
  width: 100%;
  height: 600px;
  background-color: #fff;
  border-radius: 24px 24px 0 0;
  z-index: 101;

  .item {
    position: relative;
    display: flex;
    align-items: center;
    padding: 26px 0 24px 0;
    width: 100%;
    height: 218px;
    border-bottom: 1px solid #ddd;
    background: #fff;

    &:last-of-type {
      margin-bottom: 50px;
    }

    .good-img {
      position: relative;
      width: 167px;
      height: 167px;
      margin-right: 32px;

      .good-pic {
        width: 100%;
        height: 100%;
        border-radius: 10px;
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

      .top-btn {
        position: absolute;
        right: 10px;
        bottom: 10px;
        width: 110px;
        line-height: 40px;
        text-align: center;
        background: rgba(236, 77, 123, 1);
        border-radius: 4px;
        font-size: 24px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }

    .goods-msg {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      width: 392px;

      .goods-title {
        @include doubleRowOmit;
        font-size: 32px;
        line-height: 46px;
        height: 92px;
        word-spacing: -1px;
        color: rgba(74, 74, 74, 1);
      }
    }

    .goods-price {
      display: flex;
      justify-content: space-between;
      font-size: 48px;
      line-height: 58px;
      font-weight: 400;
      color: rgba(220, 52, 140, 1);

      .cart {
        width: 68px;
        height: 68px;
      }
    }
  }
}
</style>

import storage from '../lib/storage';
import { isWxBrowser, isIos } from '../lib/utils';
import { env } from '../config';
// import axios from 'axios';
// axios.defaults.headers.post['Accept'] = 'application/json';
// axios.defaults.headers.post['Content-Type'] = 'application/json';
import { ajax } from '../lib/ajax';
// import Vue from 'vue';

// let appId = '';
let configWX = {};
let firstSDK = false;

/**
 * 获取微信openid
 */
export function wechatGetOpenId() {
  if (isWxBrowser()) {
    let openId = storage.get('open_id');
    if (openId) {
      return openId;
    } else {
      // 因为使用微信登陆暂无
    }
  }
  return '';
}

/**
 * 微信支付
 * @param {object} data
 */
export function wechatPay(data) {
  return new Promise((resolve, reject) => {
    WeixinJSBridge &&
      WeixinJSBridge.invoke('getBrandWCPayRequest', data, res => {
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          // 支付成功
          resolve(res);
        } else {
          reject(res);
        }
      });
  });
}

/**
 * 微信分享
 * @param {string} title
 * @param {string} desc
 * @param {string} link
 * @param {string} imgUrl
 * @param {string} type
 * @param {function} success
 * @param {function} cancel
 */
export function wxShare(shareOptions, isHideShare = false) {
  let { link, desc } = shareOptions;
  wx.config(configWX);
  wx.ready(() => {
    const userId = storage.get('fakeid');
    // Vue.prototype.$toast(userId);
    // link = link.split('#')[1];
    // link = `${env.url}/#${link}`;
    const wxAccountId = storage.get('wxAccountId');
    link = link.split('&from=')[0];
    if (userId) {
      if (link.indexOf('referee_id=') === -1) {
        if (link.indexOf('?') === -1) {
          link += `?referee_id=${userId}`;
        } else {
          link += `&referee_id=${userId}`;
        }
      } else {
        link = link.replace(/referee_id=[0-9]{9}/g, `referee_id=${userId}`);
      }
    }
    if (link.indexOf('wechat_account_id=') === -1) {
      if (link.indexOf('?') === -1) {
        link += `?wechat_account_id=${wxAccountId}`;
      } else {
        link += `&wechat_account_id=${wxAccountId}`;
      }
    }
    // Vue.prototype.$toast(link);
    if (desc) {
      desc.toString();
      desc = desc.replace(/(\n)/g, '');
      desc = desc.replace(/(\t)/g, '');
      desc = desc.replace(/(\r)/g, '');
      desc = desc.replace(/<\/?[^>]*>/g, '');
      desc = desc.replace(/\s*/g, '');
    }
    if (link.indexOf('&token=') >= 0) {
      const urlArr = link.split('&token=');
      const paramArr = urlArr[1].split('&');
      paramArr.shift();
      console.log(1, paramArr);
      link = `${urlArr[0]}&${paramArr.join('&')}`;
    } else if (link.indexOf('?token=') >= 0) {
      const urlArr = link.split('?token=');
      const paramArr = urlArr[1].split('&');
      paramArr.shift();
      console.log(2, paramArr);
      link = `${urlArr[0]}?${paramArr.join('&')}`;
    }
    console.log(link);
    // Vue.prototype.$toast(link);
    shareOptions.link = link;
    shareOptions.title = shareOptions.title || env.title;
    shareOptions.imgUrl = shareOptions.imgUrl || env.logo;
    shareOptions.desc = desc || env.desc;
    wx.onMenuShareTimeline(shareOptions);
    wx.onMenuShareAppMessage(shareOptions);
    wx.onMenuShareQQ(shareOptions);
    if (isHideShare) {
      wx.hideMenuItems({
        menuList: [
          'menuItem:share:timeline',
          'menuItem:copyUrl',
          'menuItem:share:appMessage',
          'menuItem:share:qq',
          'menuItem:share:weiboApp',
          'menuItem:favorite',
          'menuItem:share:facebook',
          'menuItem:share:QZone',
          'menuItem:editTag',
          'menuItem:delete',
          'menuItem:copyUrl',
          'menuItem:originPage',
          'menuItem:readMode',
          'menuItem:openWithQQBrowser',
          'menuItem:openWithSafari',
          'menuItem:share:email',
          'menuItem:share:brand',
        ], // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮
      });
      console.log('hidden');
    }
  });
  wx.error(function(res) {
    // Vue.prototype.$toast('失败');
    // location.reload();
  });
}

/**
 * 微信分享
 * @param {string} title
 * @param {string} desc
 * @param {string} link
 * @param {string} imgUrl
 * @param {string} type
 * @param {function} success
 * @param {function} cancel
 */
export function wechatShare(
  {
    title = document.title,
    desc = document.title,
    link = location.href,
    imgUrl = '',
    type = 'link',
    success = null,
    cancel = null,
  } = {},
  isHideShare = false
) {
  if (!isWxBrowser()) {
    return;
  }
  if (!storage.get('token')) {
    return false;
  }
  // filter html tags
  if (desc) {
    desc.toString();
    desc = desc.replace(/(\n)/g, '');
    desc = desc.replace(/(\t)/g, '');
    desc = desc.replace(/(\r)/g, '');
    desc = desc.replace(/<\/?[^>]*>/g, '');
    desc = desc.replace(/\s*/g, '');
  }
  if (link.indexOf('&token=') >= 0) {
    link = link.split('&token=')[0];
  } else if (link.indexOf('?token=') >= 0) {
    link = link.split('?token=')[0];
  }
  let shareOptions = {
    title,
    desc,
    link,
    imgUrl,
    type,
    success,
  };
  if (isIos() && firstSDK) {
    wxShare(shareOptions, isHideShare);
    return false;
  }
  firstSDK = true;
  let url = location.href.split('#')[0];
  // Vue.prototype.$toast(link);
  // ajax.post('/wxapis/wechat/mp/get/js-config', { url }).then(config => {
  ajax({
    api: `wechat/mp/get/js-config`,
    method: 'post',
    data: {
      url,
      wechat_account_id: storage.get('wxAccountId'),
    },
  }).then(config => {
    // appId = config.data.appId;
    config.data.debug = false;
    config.data.jsApiList = [
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'hideMenuItems',
      'startRecord',
      'stopRecord',
      'playVoice',
      'onVoicePlayEnd',
      'uploadVoice',
      'downloadVoice',
      'stopVoice',
      'pauseVoice',
      'getLocation',
      'chooseImage',
      'previewImage',
      'uploadImage',
      'openLocation',
      'chooseWXPay',
      'getNetworkType',
      'openAddress',
      'scanQRCode',
      'chooseImage',
      'uploadImage',
    ];
    configWX = config.data;
    wxShare(shareOptions, isHideShare);
  });
}

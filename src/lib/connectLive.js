import storage from './storage';
import Vue from 'vue';

const env = {
  pub_key: 'pub_8c39d07cef813d282a523abd12611bef',
  sub_key: 'sub_f34363724596e5d1cc676374b7220599',
  s_key: 's_018454a6ad7a73f44b87bebcb192bc55',
};

export function connectLive() {
  let enterROP = () => {
    ROP.Enter(env.pub_key, env.sub_key, parseInt(Math.random() * 100000, 10) + '', true);
  };
  enterROP();
  ROP.On('enter_suc', () => {
    console.log('enter success');
    storage.set('dmsSuc', true);
  });

  ROP.On('enter_fail', err => {
    console.log(err);
    storage.remove('dmsSuc');
    enterROP();
  });

  // 离线，断连以及开始重连的事件
  ROP.On('reconnect', () => {
    console.log('reconnect:');
    // enterROP();
    storage.set('isRegetMessage', true);
  });
  ROP.On('offline', err => {
    console.log('offline:' + err);
    // enterROP();
    // storage.set('isRegetMessage', true);
  });
  ROP.On('connectold', () => {
    console.log('connectold');
    // enterROP();
    // storage.set('isRegetMessage', true);
    Vue.prototype.$toast('账号已在其他地方登录，2秒后重新进入', 2000, {
      color: '#ffffff',
      backgroundColor: 'rgba(244, 104, 104, .8)',
    });
    location.reload();
  });
  ROP.On('losed', () => {
    console.log('Losed');
    // enterROP();
    // storage.set('isRegetMessage', true);
  });

  // ROP.On('publish_data', (data, topic) => {
  //   console.log(data, topic);
  // });
}

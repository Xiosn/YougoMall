// pages/auth/index.js
import {wxlogin} from "../../request/auth"
import {login} from "../../utils/asyncWx.js";

Page({
  //获取用户信息
  async handleGetUserInfo(e) {
    // 1 获取用户信息
    const {encryptedData, rawData, iv, signature} = e.detail;
    // 2 获取小程序登录成功后的code
    const {code} = await login();
    // wxlogin({
    //   encryptedData:encryptedData,
    //   rawData:rawData,
    //   iv:iv,
    //   signature:signature,
    //   code:code
    // }).then(res=> {
    //   console.log(res);
    // })

    wx.showToast({
      title: '没有企业账户 难受~',
      icon: 'none',
      image: '',
      duration: 1500,
      mask: true
    })
  },

})
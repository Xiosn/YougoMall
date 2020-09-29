/**
 *  1 页面加载的时候
 *     1 从缓存中获取购物车数据 渲染到页面中
 *     2 这些数据 checked=true
 *  2 企业账户的小程序后台中 必须 给开发者 添加白名单
 *    1 一个appid 可以同时绑定多个开发者
 *    2 这些开发者就可以公用这个appid  和  它的开发权限
 * 3 支付按钮
 *  1 先判断缓存中有没有token
 *  2 没有 跳转到授权页面 进行获取token
 *  3 有token。。。
 *  4 创建订单 获取订单编号
 */
// import {getSetting, chooseAddress, openSetting, showModal ,showToast} from "../../utils/asyncWx.js";
import {ordCreate} from "../../request/order"

//es7 用于解决提供报错异常的包
// import regeneratorRuntime from "../../lib/runtime/runtime"
Page({
  data:{
    address:{},
    cart:[],
    totalPrice:0,
    totalNum:0
  },
  onShow() {
    //获取缓存中的收货地址信息
    const address = wx.getStorageSync("address");
    //获取缓存中的购物车数据
    let cart = wx.getStorageSync("cart")||[];
    //过滤后的购物车数组
    cart = cart.filter(v=>v.checked);
    this.setData({address})

     // 1 总价格 总数量
     let totalPrice = 0;
     let totalNum = 0;
     cart.forEach(v => {
         totalPrice += v.num * v.goods_price;
         totalNum += v.num;
     })

     this.setData({
       cart,
       totalPrice, totalNum,
       address
     })
  },
  
  //支付点击事件
  handleOrderPay(){
    
    // 获取token
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET',
      data: {
        grant_type:"client_credential",
        appid:'wxab03951d5272f99a',
        secret:'38771a5523697e12ba843c7483b6c18b'
      },
      method: 'GET',
      success: (res)=>{
        wx.setStorageSync('token', res.data.access_token) 
      }
    })
    

    const token = wx.getStorageSync('token');
    if(!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      })
    }

    // 创建订单  准备 请求头参数
    const headers = {Authorization: token};
    // 准备  请求体参数
    const order_price = this.data.totalPrice;
    const consignee_addr = this.data.address.provinceName + this.data.address.cityName + this.data.address.countyName + this.data.address.detailInfo;
    const cart = this.data.cart;
    let goods=[];
    cart.forEach(v=>goods.push({
      goods_id:v.goods_id,
      goods_number:v.num,
      goods_price:v.goods_price
    }))

    //创建订单号
    ordCreate({
      order_price:order_price,
      consignee_addr:consignee_addr,
      goods:goods
    }).then(res=>{
      console.log(res);
    })
  }
})
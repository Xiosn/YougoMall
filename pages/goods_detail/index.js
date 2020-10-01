/**
 * 1 发送请求获取数据
 * 2 点击轮播图 预览大图
 *    1 给轮播图绑定点击事件
 *    2 调用小程序的api previewImage
 * 3 点击 加入购物车
 *    1 先绑定事件
 *    2 获取缓存中的购物车数据 数组格式
 *    3 先判断 当前的商品是否已经存在于购物车
 *    4 已经存在 修改商品数据 执行购物车数量++ 重新把购物车数组 填充回缓存中
 *    5 不存在购物车的数组中 直接给购物车数组添加一个新元素 新元素 带上 购买数量num 重新把购物车数组 填充回缓存中
 *    6 弹出提示
 */

import {getDetail}from "../../request/category"
// import regeneratorRuntime from "../../lib/runtime/runtime"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{},
    goods_id:'',
    isCollect: false
  },
  //  商品对象
  GoodsInfo:{},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options;
    this.goods_id=goods_id;
    this._getDetail()
  },
  
  //获取商品详情数据
  _getDetail() {
    getDetail(this.goods_id).then(res=> {
      this.GoodsInfo=res.message;
      this.setData({
        goodsObj:{
          goods_name:res.message.goods_name,
          goods_price:res.message.goods_price,
          goods_introduce:res.message.goods_introduce,
          pics:res.message.pics
        }
      })
    })
  },
  onShow() {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1]
    console.log(currentPage)
    let options = currentPage.options
    this.getGoodsDetailData(options)
    // 1.获取缓存中的购物车数据
    let collect = wx.getStorageSync("collect") || [];
    // 2.判断该商品是否存在于缓存数组中
    // some() 方法用于检测数组中的元素是否满足指定条件（函数提供）
    let isCollect = collect.some(item => {
      return item.goods_id === this.GoodsInfo.goods_id
    })
    this.setData({
      goodsInfo: options.goods_id,
      isCollect
    })
  },
  //点击轮播图 放大预览
  handlePreviewImage(e) {
    // 1 先构造要预览的图片数组
    const urls = this.GoodsInfo.pics.map(v=>v.pics_mid);
    // 2 接收传递过来的图片url
    const current = e.currentTarget.dataset.url;
    wx:wx.previewImage({
      current,
      urls: urls,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },

  //点击 加入购物车
  handleCartAdd() {
    // 1 获取缓存中的购物车数据 数组格式
    let cart=wx.getStorageSync("cart")||[];
    // 2 判断 当前的商品是否已经存在于购物车
    // findIndex()函数也是查找目标元素，找到就返回元素的位置，找不到就返回-1。
    let index=cart.findIndex(i=>i.goods_id===this.GoodsInfo.goods_id)
    if(index===-1) {
      //没找到 不存在 第一次添加
      this.GoodsInfo.num=1;
      this.GoodsInfo.checked=true;
      cart.push(this.GoodsInfo)
    }else {
      //已经存在购物车数据 执行 num++
      cart[index].num++;
    }
    // 把购物车重新添加回缓存中
    wx.setStorageSync('cart',cart);
    // 弹窗提示
    wx.showToast({
      title: '添加成功',
      icon:'success',
      //true 防止用户 手抖 疯狂点击添加购物车按钮
      mask: true
    }); 

  },
   // 收藏事件
   handleCollect() {
    // 1.获取缓存中的购物车数据
    let collect = wx.getStorageSync("collect") || [];
    // 2.判断该商品是否存在于缓存数组中
    let index = collect.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    if (index === -1) {
      // 表示商品不存在于缓存数组中
      collect.push(this.GoodsInfo)
      isCollect=true;
      wx.showToast({
        title: '收藏成功',
        mask: true
      });
    } else{
      // 表示商品存在于缓存数组中,删除该商品
      //splice修改原数组
      collect.splice(index,1)
      isCollect=false;
      wx.showToast({
        title: '取消收藏',
        mask: true
      });
    }
     //把数组存入到缓存中
     wx.setStorageSync("collect", collect);
     this.setData({
       isCollect:!this.data.isCollect
     })
   }
})
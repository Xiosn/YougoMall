import { swiperdata,catitems,floorList } from "../../request/home.js"
Page({
  data: {
    swiperList:[],//轮播图数组
    cateList:[],//导航菜单数组
    floorList:[]//楼层数据
  },
  //页面开始加载 就会触发
  onLoad: function(options){
    // 1 发送异步请求获取轮播图数据
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result)=>{
    //     console.log(result.data.message)
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   }
    // });
    this._swiperdata();
    this._getCatitems();
    this._getFloorList();
  },
  _swiperdata() {//获取轮播图数据
    swiperdata().then(res => {
      this.setData({
        swiperList:res.message
      })
    })
  },
  
  _getCatitems() {//获取分类导航菜单
    catitems().then(res => {
      this.setData({
        cateList:res.message
      })
    })
  },

  _getFloorList() {//获取分类导航菜单
    floorList().then(res => {
      this.setData({
        floorList:res.message
      })
    })
  }
});
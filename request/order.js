import request from './request'

//创建订单
export function ordCreate(data) {
    const token = wx.getStorageSync('token');
    console.log(token);
    return request({
        url: '/my/orders/create',
        method:'post',
        data,
        headers:{
            Authorization:token
        }
    })
}

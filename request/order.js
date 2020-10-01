import request from './request'

//创建订单
export function ordCreate(data) {
    const token = wx.getStorageSync('token');
    return request({
        url: '/my/orders/create',
        method:'post',
        data,
        headers:{
            Authorization:token
        }
    })
}

//历史订单查询
export function ordersAll(params) {
    const token = wx.getStorageSync('token');
    return request({
        url: '/my/orders/all',
        method:'get',
        params,
        headers:{
            Authorization:token
        }
    })
}

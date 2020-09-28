import { baseURL,timeout } from './config.js'

//同时发送异步代码的次数标记
let ajaxTimes = 0;

function request(options) {
    ajaxTimes++;
    wx.showLoading({
        title: "数据加载中ing"
    })

    return new Promise((resolve, rej) => {
        var reqTask = wx.request({
            url: baseURL + options.url,
            data: options.data,
            timeout: timeout,
            success: (result)=>{
                resolve(result.data)
            },
            fail: rej,
            complete: (res)=>{
                ajaxTimes--;
                if(ajaxTimes===0) {
                    wx.hideLoading()
                }
            }
        });
    })
}

export default request;
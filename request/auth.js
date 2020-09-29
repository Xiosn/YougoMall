import request from './request'

//获取用户token
export function wxlogin(data) {
    return request({
        url: '/users/wxlogin',
        method:'post',
        data
    })
}

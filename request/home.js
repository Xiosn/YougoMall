import request from './request'

//轮播图
export function swiperdata(params) {
    return request({
        url: '/home/swiperdata',
        method:'get',
        params
    })
}

//导航菜单
export function catitems(params) {
    return request({
        url: '/home/catitems',
        method:'get',
        params
    })
}

//楼层
export function floorList(params) {
    return request({
        url: '/home/floordata',
        method:'get',
        params
    })
}
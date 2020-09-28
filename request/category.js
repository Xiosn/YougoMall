import request from './request'

//获取分类数据
export function getCates(params) {
    return request({
        url: '/categories',
        method:'get',
        params
    })
}

//获取商品列表数据
export function getGoodsList(params) {
    return request({
        url:'/goods/search',
        method:'get',
        params
    })
}

//获取商品详情
export function getDetail(goods_id) {
    return request({
        url:`/goods/detail?goods_id=${goods_id}`,
        method:'get'
    })
}
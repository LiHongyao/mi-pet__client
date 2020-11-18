import request from '../utils/request'

/**
 * 商品列表数据（包括数据搜索/过滤/筛选）
 * @param {*} data 
 * data.isRecommend 商品是否随机推荐（1为随机0为不随机）
 * data.status  商品状态id（0为待审核1为上架2为下架），传入status查对应状态，不传则默认查1，2状态
 * data.typeId  商品分类id（主粮、用品、零食等）
 * data.breedId 商品品种id（猫猫、狗狗等）
 * data.brand   商品品牌
 * data.keyword      商品品牌标题关键词搜索
 * data.orderName    商品排序名：sales销量salePrice售价
 * data.orderVal     商品排序：asc升序desc降序
 * data.pageSize
 * data.page
 */
export function goodsList(data) {
  return request({
    url: '/goods/list',
    method: 'POST',
    data
  })
}

/**
 * 获取商品类型列表
 */
export function goodstypes() {
  return request({
    url: '/goodstypes/list'
  })
}

/**
 * 商品详情
 * @param {*} goodsId 
 */
export function goodsDetails(goodsId) {
  return request({
    url: `/goods/${goodsId}`
  })
}

/**
 * 获取商品评论
 * @param {*} data 
 * data.goodsId
 * data.pageSize
 * data.page
 */
export function goodsComments(data) {
  return request({
    url: '/goodscomments/list',
    method: 'POST',
    data
  })
}

/**
 * 商品筛选条件（品种/品牌）
 * @param {*} goodsTypeId 商品类型id（主粮，零食...）
 */
export function screeningConditions(goodsTypeId) {
  return request({
    url: `/goodsfilters/${goodsTypeId}`
  })
}
import request from '../utils/request'

/**
 * 宠物档案-添加/修改
 * @param {*} data 
 */
export function petUpdate(data){
  return request({
    url: '/pet/update',
    method: 'POST',
    data
  }, '处理中，请稍后...')
}


/**
 * 宠物档案列表
 */
export function petFiles() {
  return request({
    url: '/pet/list'
  })
}

/**
 * 宠物档案详情
 * @param {*} id 
 */
export function petFileDetails(id) {
  return request({
    url: `/pet/${id}`,
  })
}
/**
 * 删除宠物档案
 * @param {*} petId 
 */
export function deletePetFile(petId) {
  return request({
    url: '/pet/delete',
    method: 'POST',
    data: { petId }
  }, '删除中，请稍后...')
}
import request from '../utils/request'

/**
 * 登录
 * @param {*} code 
 */
export function login(code) {
  return request({
    url: '/user/login',
    method: 'POST',
    data: { code }
  })
}

/**
 * 编辑用户信息
 * @param {*} data 
 * data.nickname  
 * data.avatar  
 */
export function edit(data) {
  return request({
    url: '/user/edit',
    method: 'POST',
    data
  })
}

/**
 * 获取用户信息
 */
export function user() {
  return request({
    url: '/user'
  });
}

/**
 * 编辑手机号码
 * @param {*} data 
 */
export function editPhone(data) {
  return request({
    url: '/user/editphone',
    method: 'POST',
    data
  })
}


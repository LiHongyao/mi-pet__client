import request from '../utils/request'

/**
 * 文件上传
 * @param {*} images 
 */
export function uploadFile(images) {
  return request({
    url: '/file/upload',
    method: 'POST',
    data: images
  }, '处理中，请稍后...');
}


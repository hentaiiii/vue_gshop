/**
 * 包含多个接口请求函数的模块
 */
import ajax from './ajax'
const BASE = '/api'

/**
 * 根据经纬度获取位置详情
 */
export const reqAddress = (latitude, longitude) => ajax({
  method: 'GET',
  url: BASE + `/position/${latitude},${longitude}`

})
/**
 * 获取食品分类列表
 */
export const reqCategory = () => ajax.get(BASE +'/index_category')

/**
 * 根据经纬度获取商铺列表
 */
export const reqShopList = ({latitude, longitude}) => ajax({
  url: BASE + "/shops",
  params: {
    latitude,
    longitude
  }
})

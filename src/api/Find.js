import { request } from '@/utils/request'

export const getCity = () => {
  return request({
    url: '/area/city',
    data: {
      k: 1
    }
  })
}

// 获取热门城市
export const getHotCity = () => {
  return request({
    url: '/area/hot'
  })
}

// 获取所有城市
export const getAllCity = (level) => {
  return request({
    url: 'area/city',
    params: {
      level
    }
  })
}

/**
 * 获取小区名称
 * @param {请求信息} name
 * @returns
 */
export const getVillageName = ({ name, id }) => {
  return request({
    url: '/area/community',
    params: {
      name,
      id
    }
  })
}

/**
 * 获取房屋信息
 * @floor 楼层
 * @oriented 朝向
 *  @roomType 户型
 *@supporting 房屋配置
 */
export const getHouses = (params) => {
  return request({
    url: '/houses/params',
    params
  })
}

/**
 * 发布房源
 * @param {*} param0
 * @returns
 */
export const addHouse = ({ title, description, houseImg, oriented, supporting, price, roomType, size, floor, community }) => {
  return request({
    url: 'user/houses',
    params: {
      title, description, houseImg, oriented, supporting, price, roomType, size, floor, community
    }
  })
}

export const findHouses = (params) => {
  return request({
    url: 'houses',
    params
  })
}

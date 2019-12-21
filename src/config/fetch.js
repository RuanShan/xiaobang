import { baseUrl } from './env'
import fetch from 'cross-fetch';
import queryString from 'query-string'

export default async (url = '', data = {}, type = 'GET', method = 'fetch') => {
  // 大屏游戏控制端，使用 /gapi/*,
  // 经过授权回调的 /api/wxopen_oauth/gameshare-done， session中有number 和 openid
  const parsed = queryString.parse(location.search)
  let number = parsed.number
  let openid = parsed.openid

  type = type.toUpperCase()
  url = baseUrl + url

  if (type == 'GET') {
    let dataStr = '' // 数据拼接字符串
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&'
    })

    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
      url = url + '?' + dataStr
    }
  }

    let requestConfig = {
      credentials: 'include',
      method: type,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Zgame-Token':number + '_' +openid,
      },
      mode: 'cors',
      cache: 'force-cache'
    }

    let preview = parsed.preview
    if(preview){
      requestConfig.headers['X-Zgame-Preview'] = preview
    }

    if (type == 'POST' || type == 'PUT') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      })
    }

    try {
      let data = location.pathname
      let code = data.substring(data.indexOf('/')+1,data.indexOf('.'))
      console.log('code-----:',code);
      const response = await fetch(url, requestConfig)

      if (response.status == 401) {
        window.location.href = process.env.GAME_URL_BASE+"/game/unauthorized?code="+code+'&number='+number
      }else if (response.status >= 400) {
        throw new Error("Bad response from server");
      }

      let responseJson = await response.json()

      return responseJson
    } catch (error) {

      console.log(url+error)
      throw new Error(error)

    }


}

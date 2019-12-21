// fix bug in https://github.com/ZyqGitHub1/co-wechat-open-api/blob/master/lib/api_common.js #556
// url is https://api.weixin.qq.com/sns/oauth2/component/access_token
const httpx = require('httpx');

const {
  ComponentAPI, Oauth
} = require('es-wechat-open-api');

const UserAccessToken = Oauth.UserAccessToken;

class WxopenOauth2 {
  /**
   *
   * 使用方式如下
   * const api = new WeChatOpenApi(config.open.appId, config.open.appSecret, appId,
   * async () {
   *   let ticket = await redis.get(`${config.open.appId}:ComponentVerifyTicket`,config.wxCacheDb);
   *   return ticket;
   * },
   * async (){
   *   let result = await redis.get(`${config.open.appId}:componentAccessToken`,config.wxCacheDb);
   *   return JSON.parse(result);
   * },
   * async (token) {
   *   await redis.set(`${config.open.appId}:componentAccessToken`,JSON.stringify(token),config.wxCacheDb);
   * },
   * //this.openApis[appId] = api;
   * return api;
   * ```
   * @param {String} componentAppId 第三方平台appid
   * @param {String} componentAppSecret 第三方平台appSecret
   * @param {String}
   * @param {Function} getComponentTicket componentVerifyTicket 微信后台推送的ticket，
   * https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1453779503&lang=zh_CN
   * @param {Function} getComponentToken 必选。获取全局token对象的方法，多进程模式部署时需在意
   * @param {Function} saveComponentToken 必选的。保存全局token对象的方法，多进程模式部署时需在意
   * 文档地址 https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1419318590&token=8bf3492060bf2d58260b1c3e7878fc72867a891e&*lang=zh_CN
   */
  constructor({componentAppId, componentAppSecret, getComponentTicket, getComponentToken, saveComponentToken, authorizerAppId, getUserToken, saveUserToken, componentApi, appId, appSecret, isMiniProgram = false }) {
    if (componentApi && componentApi instanceof ComponentAPI) {
      this.componentApi = componentApi;
      this.componentAppId = componentApi.componentAppId;
      this.componentAppSecret = componentApi.componentAppSecret;
    } else if (componentAppId &&  componentAppSecret && getComponentTicket && getComponentToken && saveComponentToken) {
      componentApi = new ComponentAPI({componentAppId, componentAppSecret, getComponentTicket, getComponentToken, saveComponentToken});
      this.componentApi = componentApi;
      this.componentAppId = componentApi.componentAppId;
      this.componentAppSecret = componentApi.componentAppSecret;
    } else if (appSecret) {
      this.appSecret = appSecret;
    } else {
      throw new Error('参数不完整');
    }
    this.appId = authorizerAppId || appId;
    this.isMiniProgram = isMiniProgram;
    this.ensureComponentToken = async function() {
      if (this.appSecret) {
        return {};
      }
      return await componentApi.ensureComponentToken();
    };
    this.getUserToken = getUserToken || async function(openid) {
      return this.users[openid].data;
    };
    this.saveUserToken = saveUserToken || async function (openid, token) {
      this.users[openid] = token;
      if (process.env.NODE_ENV === 'production') {
        console.warn('Don\'t save token in memory, when cluster or multi-computer!');
      }
    };
    this.users = {};
    this.prefix = 'https://api.weixin.qq.com/cgi-bin/';
    this.mpPrefix = 'https://mp.weixin.qq.com/cgi-bin/';
    this.defaults = {};
  }


  /**
   * 用于设置urllib的默认options * Examples:
   * ```
   * api.setOpts({timeout: 15000});
   * ```
   * @param {Object} opts 默认选项
   */
  setOpts(opts) {
    this.defaults = opts;
  }

  /**
   * 设置urllib的hook
   */
  async request(url, opts) {
    let options = {};
    Object.assign(options, this.defaults);
    opts || (opts = {});
    let keys = Object.keys(opts);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      if (key !== 'headers') {
        options[key] = opts[key];
      } else {
        if (opts.headers) {
          options.headers = options.headers || {};
          Object.assign(options.headers, opts.headers);
        }
      }
    }
    let res = await httpx.request(url, options);
    if (res.statusCode < 200 || res.statusCode > 204) {
      let err = new Error(`url: ${url}, status code: ${res.statusCode}`);
      err.name = 'WeChatAPIError';
      throw err;
    }

    let buffer = await httpx.read(res);
    let contentType = res.headers['content-type'] || '';
    if (contentType.indexOf('application/json') !== -1 || contentType.indexOf('text/plain') !== -1) {
      let data;
      try {
        data = JSON.parse(buffer);
      } catch (ex) {
        let err = new Error('JSON.parse error. buffer is ' + buffer.toString());
        err.name = 'WeChatAPIError';
        throw err;
      }

      if (data && data.errcode) {
        let err = new Error(data.errmsg);
        err.name = 'WeChatAPIError';
        err.code = data.errcode;

        throw err;
      }

      return data;
    }

    return buffer;
  }

  async getUserAccessToken (code) {
    let params;
    if (this.componentApi) {
      let componentAccessToken = await this.ensureComponentToken();
      params = {
        appid: this.appId,
        code: code,
        grant_type: 'authorization_code',
        component_appid: this.componentAppId,
        component_access_token: componentAccessToken.componentAccessToken
      };
    } else {
      params = {
        appid: this.appId,
        secret: this.appSecret,
        code: code,
        grant_type: 'authorization_code'
      };
    }
    let url = this.getRequestUrl('https://api.weixin.qq.com/sns/oauth2/component/access_token', params)

    let args = {
      method: 'post',
      data: JSON.stringify({}),
      timeout: 10000,
      dataType: 'json',
      contentType: 'json'
    };
    let data = await this.request(url, args);
    data.create_at = new Date().getTime();
    let token = new UserAccessToken(data);
    await this.saveUserToken(data.openid, data);
    return token;
  }


  toUrl (url, query, excepts) {
    return `${url}?${Object.keys(query).filter(key => !~excepts.indexOf(key)).map(key => `${key}=${query[key]}`).join('&')}`;
  }

  getRequestUrl (url, query) {
    if (this.appSecret) {
      return this.toUrl(url, query, ['component_appid', 'component_access_token']);
    }
    return this. toUrl(url, query, ['secret']);
  }

  async refreshUserAccessToken (refreshToken) {
    let params;
    if (this.componentApi) {
      let componentAccessToken = await this.ensureComponentToken();
      // let url = `https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=${this.appId}&refresh_token=${refreshToken}&grant_type=refresh_token&component_appid=${this.componentAppId}&component_access_token=${componentAccessToken.componentAccessToken}`;
      params =  {
        appid: this.appId,
        secret: this.appSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
        component_appid: this.componentAppId,
        component_access_token: componentAccessToken.componentAccessToken
      };
    } else {
      params = {
        appid: this.appId,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }
    }
    let url = this.getRequestUrl('https://api.weixin.qq.com/sns/oauth2/component/refresh_token', params)
    let args = {
      method: 'post',
      data: JSON.stringify({}),
      timeout: 10000,
      dataType: 'json',
      contentType: 'json'
    };
    let data = await this.request(url, args);
    data.create_at = new Date().getTime();
    let token = new UserAccessToken(data);
    await this.saveUserToken(data.openid, token);
    return token;
  }

  async _getUser (options, accessToken) {
    let url = `https://api.weixin.qq.com/sns/userinfo?access_token=${accessToken}&openid=${options && options.openid || options}&lang=${options && options.lang || 'zh_CN'}`;
    let args = {
      method: 'post',
      data: JSON.stringify({}),
      timeout: 10000,
      dataType: 'json',
      contentType: 'json'
    };
    return await this.request(url, args);
  }

  /**
   * 根据授权获取到的code，换取小程序的session key和openid（以及有条件下的unionid）
   * 获取openid之后，可以调用`wechat.API`来获取更多信息
   * Examples:
   * ```
   * api.getSessionKey(code, callback);
   * ```
   * Callback:
   *
   * - `err`, 获取session key出现异常时的异常对象
   * - `result`, 成功时得到的响应结果
   *
   * Result:
   * ```
   * {
   *  data: {
   *    "session_key": "SESSION_KEY",
   *    "openid": "OPENID",
   *    "unionid": "UNIONID"
   *  }
   * }
   * ```
   * @param {String} code 授权获取到的code
   */
  async getSessionKey (code) {
    let params;
    if (this.componentApi) {
      let componentAccessToken = await this.ensureComponentToken();
      params = {
        appid: this.appId,
        secret: this.appSecret,
        js_code: code,
        grant_type: 'authorization_code',
        component_appid: this.componentAppId,
        component_access_token: componentAccessToken.componentAccessToken
      };
    } else {
      params = {
        appid: this.appId,
        secret: this.appSecret,
        js_code: code,
        grant_type: 'authorization_code',
      };
    }
    let url = this.getRequestUrl('https://api.weixin.qq.com/sns/jscode2session', params)

    let args = {
      method: 'post',
      data: JSON.stringify({}),
      timeout: 10000,
      dataType: 'json',
      contentType: 'json'
    };
    return await this.request(url, args);
  }

  /**
   * 根据服务器保存的sessionKey对从小程序客户端获取的加密用户数据进行解密
   * Examples:
   * ```
   * api.decryptMiniProgramUser({encryptedData, iv}, callback);
   * ```
   * Callback:
   *
   * - `err`, 解密用户信息出现异常时的异常对象
   * - `result`, 成功时得到的响应结果
   *
   * Result:
   * ```
   *{
   *    "openId": "OPENID",
   *    "nickName": "NICKNAME",
   *    "gender": "GENDER",
   *    "city": "CITY",
   *    "province": "PROVINCE",
   *    "country": "COUNTRY",
   *    "avatarUrl": "AVATARURL",
   *    "unionId": "UNIONID",
   *    "watermark":
   *    {
   *        "appid":"APPID",
   *        "timestamp":TIMESTAMP
   *    }
   *}
  * ```
  * @param {Object} options 需要解密的对象
  * @param {String} options.encryptedData 从小程序中获得的加密过的字符串
  * @param {String} options.iv 从小程序中获得的加密算法初始向量
  */
  decryptMiniProgramUser  (options) {
    var decrypter = new WxBizDataCrypt(this.appId, options.sessionKey);
    return decrypter.decryptData(options.encryptedData, options.iv);
  }

  async getUserByCode (options) {
    let lang, code;
    if (typeof options === 'string') {
      code = options;
    } else {
      lang = options.lang;
      code = options.code;
    }
    let user;
    let data;
    if (this.isMiniProgram) {
      data = await this.getSessionKey(code);
      try {
        user = this.decryptMiniProgramUser({
          sessionKey: data.session_key,
          encryptedData: options.encryptedData,
          iv: options.iv,
        });
      } catch (e) {
        console.error(e)
        return data;
      }
      return {...data, ...user};
    }
    let token = await this.getUserAccessToken(code);
    return await this.getUser({openid: token.data.openid, lang: lang});
  }

  async getUser (options) {
    if (typeof options !== 'object') {
      options = {
        openid: options
      };
    }
    let data = await this.getUserToken(options.openid);
    if (!data) {
      let error = new Error('No token for ' + options.openid + ', please authorize first.');
      error.name = 'NoOAuthTokenError';
      throw error;
    }
    let token = new UserAccessToken(data);
    let user;
    if (token.isValid()) {
      user = await this._getUser(options, token.data.access_token);
    } else {
      token = await this.refreshUserAccessToken(token.data.refresh_token);
      user = await this._getUser(options, token.data.access_token);
    }
    return user;
  }


  /**
   * 获取授权页面的URL地址
   * @param {String} redirect 授权后要跳转的地址
   * @param {String} state 开发者可提供的数据
   * @param {String} scope 作用范围，值为snsapi_userinfo和snsapi_base，前者用于弹出，后者用于跳转
   */

  getAuthorizeURL (redirect, state, scope) {
    if (this.componentAppId) {
      return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appId}&component_appid=${this.componentAppId}&response_type=code&scope=${scope || 'snsapi_base'}&state=${state}&redirect_uri=${redirect}#wechat_redirect`;
    }
    return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appId}&response_type=code&scope=${scope || 'snsapi_base'}&state=${state}&redirect_uri=${redirect}#wechat_redirect`;

  }

  /**
   * 获取授权页面的URL地址
   * @param {String} redirect 授权后要跳转的地址
   * @param {String} state 开发者可提供的数据
   * @param {String} scope 作用范围，值为snsapi_login，前者用于弹出，后者用于跳转
   */
  getAuthorizeURLForWebsite (redirect, state, scope) {
    if (this.componentAppId) {
      return `https://open.weixin.qq.com/connect/qrconnect?appid=${this.appId}&component_appid=${this.componentAppId}&response_type=code&scope=${scope || 'snsapi_login' }&state=${state}&redirect_uri=${redirect}#wechat_redirect`;
    }
    return `https://open.weixin.qq.com/connect/qrconnect?appid=${this.appId}&response_type=code&scope=${scope || 'snsapi_login' }&state=${state}&redirect_uri=${redirect}#wechat_redirect`;
  }
}

module.exports= WxopenOauth2

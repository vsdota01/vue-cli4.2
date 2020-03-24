/**
 * 此处封装公共js函数供业务调用
 * 待添加
 */
import querystring from "querystring";
const callHandle = window.callHandle;
const registerHandle = window.registerHandle;

const wk = (function() {
  function getPlatform() {
    var na = navigator.userAgent.toLowerCase();
    if (na.match(/com.aiways.auto/)) {
      if (na.match(/android/)) {
        return "android";
      }
      return "ios";
    }
    return "web";
  }
  function back() {
    callHandle("common.pageGoback");
  }
  function exit() {
    callHandle("common.pageExit");
  }
  /**
   *
   * @param {Object} data
   * showTitle:true/false
   * showBack:true/false
   */
  function pop(data) {
    callHandle("common.pagePop", data);
  }
  /**
   * data{key:value}
   * @param String key
   * @param {Object} value
   */
  function saveData(data) {
    callHandle("common.pageSaveData", { data });
  }
  /**
   *
   * @param String key
   * @param Function callback
   */
  function getData(data, callback) {
    callHandle("common.pageGetData", { get_data: data.key }, function(resp) {
      if (callback) callback.call(this, resp);
    });
  }
  /**
   *
   * @param String key
   */
  function deleteData(data) {
    callHandle("common.pageDeleteData", { delete_data: data.key });
  }

  function setTitle(data) {
    callHandle("common.setTitle", { title: data.title });
  }
  function clearData() {
    callHandle("common.pageClearData");
  }
  function getUserInfo(data, callback) {
    callHandle("common.getUserInfo", {}, function(resp) {
      if (callback) callback.call(this, resp);
    });
  }
  function getClientInfo(data, callback) {
    callHandle("common.getClientInfo", {}, function(resp) {
      if (callback) callback.call(this, resp);
    });
  }
  function getLocation(data, callback) {
    callHandle("common.getLocation", {}, function(resp) {
      if (callback) callback.call(this, resp);
    });
  }
  function isLogin(data, callback) {
    callHandle("common.isLogin", {}, function(resp) {
      if (callback) callback.call(this, resp);
    });
  }
  function login() {
    callHandle("common.login");
  }
  function logout() {
    callHandle("common.logout");
  }
  /**
   *
   * @param {Object} data
   * @param Function callback
   */
  function share(data, callback) {
    callHandle("common.share", data, function(resp) {
      if (callback) callback.call(this, resp);
    });
  }
  function setShareInfo(data, callback) {
    callHandle("common.setShareInfo", data, function(resp) {
      if (callback) callback.call(this, resp);
    });
  }
  /**
   *
   * @param {Object} data
   * @param Function callback
   */
  function httpRequest(data, callback) {
    callHandle("common.httpRequest", data, function(resp) {
      callback.call(this, resp);
    });
  }
  function screenShot(data, callback) {
    callHandle("common.screenShotListen", {}, function(resp) {
      callback.call(this, resp);
    });
  }
  function showLoading() {
    callHandle("common.showLoading");
  }
  function hideLoading() {
    callHandle("common.hideLoading");
  }
  function getClipboard(data, callback) {
    callHandle("common.getClipboard", {}, function(resp) {
      callback.call(this, resp);
    });
  }
  /**
   *
   * @param {Object} data
   */
  function setClipboard(data) {
    callHandle("common.setClipboard", { data: data });
  }
  function scanCamera(data, callback) {
    callHandle("common.scanCamera", {}, function(resp) {
      if (callback) callback.call(this, resp);
    });
  }
  /**
   *
   * @param String jsFunName
   * @param Function jscallback
   */
  function receiveInfo(jsFunName, jscallback) {
    registerHandle(jsFunName, jscallback);
  }
  /**
   *
   * @param {*} Vue 用于vue框架安装插件
   */
  function install(Vue) {
    Vue.prototype.$wk = wk;
  }

  /**
   * page:marvellous/topic
   * type:common/liked/follow
   * data:number/boolean/boolean
   * id:number精彩/话题id
   */
  function dataChange(data) {
    callHandle("home.dataChange", {
      page: data.page,
      id: data.id,
      type: data.type,
      data: data.data,
      total: data.total
    });
  }
  /**
   *url:h5地址
   */
  function openWebview(data) {
    callHandle("common.router", {
      url: "aiwaysautoapp://web/auto/h5/normal?url=" + encodeURI(data.url)
    });
  }
  /**
   * url：view模块地址
   */
  function viewRoute(data) {
    callHandle("common.router", { url: formatViewUrl(data.url) });
  }
  function formatViewUrl(v) {
    var params = v.params;
    var h = "?";
    for (var i in params) {
      h += i + "=" + params[i] + "&";
    }
    h = h.substring(0, h.length - 1);
    return "aiwaysautoapp://native/" + params.url + h;
  }
  /**
   * url:视频资源地址
   */
  function showVideo(data) {
    callHandle("meta.showVideo", { url: data.url });
  }
  /**
   *pushRouter h5跳native
   * outside: boolean 是否是外部web跳转至app
   * data:
   *	path: url
   * type: native 默认； web = normal 打开全屏webview； toolBar 打开带导航的webview
   * 	query: object url传参
   *
   * 示例
   * native {
   * 	type: 'native',
   * 	path: '/auto/main',
   * 	query: {}
   * }
   * webview {
   * 	type: 'toolBar',
   * 	path: 'https://app-dev.ai-ways.com/#/carmall/order',
   * 	query: {}
   * }
   */
  function pushRouter(data) {
    let platform = getPlatform();
    let url = typeof data === "string" ? data : "aiwaysautoapp://";
    let { path, query = {}, type = "native" } = data;
    let qs = typeof query === "object" ? querystring.stringify(query) : "";
    type = type === "web" ? "normal" : type;
    if (path) {
      const nativeUrl = `${type}${path}?${qs}`;
      const webUrl = `web/auto/h5/${type}?url=${encodeURIComponent(
        path + "?" + qs
      )}`;
      url += type === "native" ? nativeUrl : webUrl;
    }
    if (platform === "android") {
      callHandle("common.router", {
        url
      });
      return;
    }
    window.location.href = url;
  }

  /**
   * 唤醒APP选择地址，并获取用户所选地址信息
   * @param {} callback
   */
  function getAddress(data, callback) {
    callHandle("common.getAddress", {}, function(resp) {
      callback.call(this, resp);
    });
  }

  /**
   * 传递toolbar信息
   * @param {} callback
   */
  function toolBar(data, callback) {
    if (data.share) {
      data.share.title =
        (data.share.title && data.share.title.substring(0, 50)) ||
        "来自爱驰汽车App分享";
      data.share.desc =
        (data.share.desc && data.share.desc.substring(0, 50)) ||
        "来自爱驰汽车App分享";
      data.share.content =
        (data.share.content && data.share.content.substring(0, 50)) ||
        "来自爱驰汽车App分享";
    }
    callHandle("common.toolBar", data, function(resp) {
      callback.call(this, resp);
    });
  }
  /* pv统计 */
  function statistics(data, callback) {
    callHandle("common.statistics", data, function(resp) {
      if (callback) callback.call(this, resp);
    });
  }

  /* 网络类型 */
  function networkType(data, callback) {
    callHandle("common.networkType", {}, function(resp) {
      if (callback) callback.call(this, resp);
    });
  }
  /* 发布 */
  function commentRelease(data, callback) {
    callHandle("home.commentRelease", data, function(resp) {
      if (callback) callback.call(this, resp);
    });
  }
  /* 图片放大轮播 */
  function photoView(data, callback) {
    let param = {
      imgs: data.arr || [],
      index: data.index || 0
    };
    callHandle("common.photoView", param, function(resp) {
      if (callback) callback.call(this, resp);
    });
  }

  /* 支付 */
  function aiwaysPay(data, callback) {
    callHandle("common.awPay", data, function(resp) {
      if (callback) callback.call(this, resp);
    });
  }

  return {
    getPlatform,
    back,
    exit,
    pop,
    saveData,
    getData,
    deleteData,
    clearData,
    getUserInfo,
    getClientInfo,
    setTitle,
    getLocation,
    isLogin,
    login,
    logout,
    share,
    httpRequest,
    screenShot,
    showLoading,
    hideLoading,
    getClipboard,
    setClipboard,
    scanCamera,
    receiveInfo,
    install,
    dataChange,
    openWebview,
    viewRoute,
    registerHandler: registerHandle,
    setShareInfo,
    showVideo,
    pushRouter,
    getAddress,
    toolBar,
    statistics,
    networkType,
    commentRelease,
    photoView,
    aiwaysPay
  };
})();

export default wk;

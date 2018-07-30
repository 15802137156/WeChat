App({
  onLaunch: function () {
    // 显示当前页面的转发按钮
    wx.showShareMenu({
      withShareTicket: true
    })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // 获取用户当前的授权状态
        wx.setStorageSync('confirmLanding', true);
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              //this.getcurrent();
            } else {
              wx.authorize({
                scope: 'scope.userInfo',
                success() {
                  wx.getSetting();
                }
              })
            }
          }
        })
      },
      fail: err => {
        wx.login({
          success: res => {
            wx.login();
          }
        })
      }
    })
  },
  getcurrent: function() {
    wx.getUserInfo({
      success: res => {
        this.userInfo = res.userInfo
        console.log(this.userInfo)
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      }
    })
  },
  userInfo: {}
})
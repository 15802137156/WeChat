const app = getApp();
Page({
  data: {
    confirmLanding: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '用户中心'
    });
    //获取全局变量
    // console.log(app.userInfo)
    this.setData({
      confirmLanding: wx.getStorageSync('confirmLanding')
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  loggedOut: function () {
    wx.removeStorageSync('confirmLanding');
    this.setData({
      confirmLanding: wx.getStorageSync('confirmLanding')
    })
  },

  login: function () {
    var self = this;
    wx.login({
      success: function (res) {
        wx.setStorageSync('confirmLanding', true);
        self.setData({
          confirmLanding: wx.getStorageSync('confirmLanding')
        })
      }
    });
  }
})
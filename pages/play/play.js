// pages/play/play.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listArray: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '娱乐类型'
    });
    this.init();
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

  init: function () {
    wx.showLoading({
      title: '努力加载中······'
    });
    var self = this;
    wx.request({
      url: 'http://stark.longzhu.com/api/home',
      data: {
        'version': '3.9.3',
        'packageId': '1',
        'device': '6',
        'tab': 'entertainment'
      },
      success: res => {
        if (res.data.data.items) {
          self.setData({
            listArray: res.data.data.items
          });
        }
        wx.hideLoading();
      }
    });
  },

  jumpPage: function (e) {
    var id = e.currentTarget.dataset.index.id;
    var name = e.currentTarget.dataset.index.name;
    wx.navigateTo({
      url: '/pages/list/list?id=' + id + '&name=' + name
    })
  },

  passRoomId: function (e) {
    var roomid = e.currentTarget.dataset.index.room.id;
    var name = e.currentTarget.dataset.index.room.name;
    wx.navigateTo({
      url: '/pages/video/video?roomid=' + roomid + '&name=' + name
    })
  }
})
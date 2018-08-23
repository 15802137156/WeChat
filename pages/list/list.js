Page({

  /**
   * 页面的初始数据
   */
  data: {
    listArray: [],
    obj: {},
    startIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      obj: options
    });
    wx.setNavigationBarTitle({
      title: options.name
    });
    this.loading();
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
    wx.startPullDownRefresh({
      success: res => {
        wx.showToast({
          title: '数据已是最新拉！！！'
        })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数 （下拉加载）
   */
  onReachBottom: function () {
    if (this.data.startIndex <= this.data.listArray.length - 30) {
      this.setData({
        startIndex: this.data.startIndex += 30
      });
      this.loading();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  loading: function () {
    wx.showLoading({
      title: '努力加载中······'
    });
    var self = this;
    wx.request({
      url: 'http://stark.longzhu.com/api/streams/search',
      data: {
        'start-index': this.data.startIndex,
        'max-result': 30,
        'game': this.data.obj.id,
        'tag': this.data.obj.name,
        'device': '6',
        'sort-by': 'views',
        'version': '3.9.3',
        'packageId': '1',
      },
      success: json => {
        if (json.data.data.items[0].streams) {
          self.setData({
            listArray: [...this.data.listArray, ...json.data.data.items[0].streams]
          });
        }
        wx.hideLoading();
      }
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

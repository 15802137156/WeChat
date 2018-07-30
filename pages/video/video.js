function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoUrl: '',
    inputValue: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.name
    });
    this.loading(options.roomid);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  // 输入框
  bindInputBlur: function (e) {
    this.setData({
      inputValue: e.detail.value
    });
  },
  // 发送弹幕
  bindSendDanmu: function () {
    var title = '';
    if (this.data.inputValue) {
      this.videoContext.sendDanmu({
        text: this.data.inputValue,
        color: getRandomColor()
      })
      title = '发送成功～';
    } else {
      title = '(。-`ω´-)您好像啥都没说哦~';
    }
    wx.showToast({
      title: title,
      icon: 'none'
    });
    this.setData({
      inputValue: ''
    })
  },
  // 获取视频URL
  loading: function (roomid) {
    var self = this;
    wx.request({
      url: 'http://liveapi.plu.cn/liveapp/roomstatus',
      data: {
        'version': '3.9.3',
        'device': '6',
        'roomId': roomid
      },
      success: res => {
        if (res.data.streamUri) {
          self.setData({
            videoUrl: res.data.streamUri
          });
        }
      }
    })
  }
})
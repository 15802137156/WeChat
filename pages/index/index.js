//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    accordTotal: [],
    imgUrls: [],
    advertsArray: [],
  },
  onLoad: function () {
    this.homePage();
  },
  homePage: function() {
    wx.showLoading({
      title: '努力加载中······'
    });
    var self = this;
    wx.request({
      url: 'http://stark.longzhu.com/api/home',
      data: {
        'device': '6',
        'tab': 'hot',
        'version': '3.9.3'
      },
      success: res => {
        if (res.data.data) {
          self.setData({
            imgUrls: res.data.data['banner'],
            accordTotal: res.data.data['items'],
            advertsArray: res.data.data['adverts'],
          });
        }
        wx.hideLoading();
      }
    })
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

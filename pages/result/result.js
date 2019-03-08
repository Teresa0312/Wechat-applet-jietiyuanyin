var app = getApp()
Page({
  data: {
    userInfo: {},
    result:1, //0通过 1没通过
  },
  onLoad:function (options) {
    var that = this
    console.log(options)
    that.setData({
        result:options.res
    })
  },
  navtoQues:function(){
    wx.reLaunch({url: '../index/index'})
  },
  navtoRecmd:function(){
    wx.navigateBack({delta: 1})
  }
})
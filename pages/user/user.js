var app = getApp()
Page({
  data: {
    userInfo: {}
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  navtoAlter:function(){
    wx.navigateTo({
      url: '../alter/alter'
    })
  },
  navtoSet:function(){
    wx.navigateTo({
      url:'../setque/setque'
    })
  },
  navtoFback:function(){
    wx.navigateTo({
      url:'../fback/fback'
    })
  },
  navtoMistake:function(event){
    wx.navigateTo({
      url:'../que/que?type=2'
    })
  },
  navtoCollect:function(event){
    wx.navigateTo({
      url:'../que/que?type=1'
    })
  }
})
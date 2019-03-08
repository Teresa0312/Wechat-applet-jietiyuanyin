var app = getApp()
Page({
  data: {
    userInfo: {},
    level:12
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })  
      console.log("111111111111")
      console.log(userInfo)

    })
  },
  navtoQues:function(){
    wx.navigateTo({
      url: '../types/types'
    })
  },
  navtoRecmd:function(){
    wx.navigateTo({
      url: '../recmd/recmd'
    })
  },
  navtoSetque:function(){
    wx.navigateTo({
      url: '../setque/setque'
    })
  },
  navtofeedBack:function(){
    wx.navigateTo({
      url: '../fback/fback'
    })
  },
  navtoL_types:function(){
    wx.navigateTo({
      url: '../l_types/l_types'
    })
  },
  navtoU_types:function(){
    wx.navigateTo({
      url: '../u_types/u_types'
    })
  },
})
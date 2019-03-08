var app = getApp()

Page({
  data: {
    userInfo: {},
    comment:"",
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
  navtoQues:function(){
    wx.navigateTo({
      url: '../types/types'
    })
  },
  bindTextAreaBlur: function(e) {
    var com=e.detail.value
    com=com.trim()
     this.setData({
      comment:com
     }) 
  },
  bindFormSubmit:function(e){
    this.bindTextAreaBlur(e)
    var isnull=0  //0不为空 1为空
    var that = this  
    var user=that.data.userInfo.id;
    var com=that.data.comment;
    if(!com)
      isnull=1
    console.log(isnull)
    if(!isnull){
      wx.showToast({  
            title: '正在提交',  
            icon: 'loading',  
            duration: 2000  
        })
      wx.request({
      url: 'http://120.24.15.224:8089/index.php/Admin/Api/feedbackAdds',
      data: {userid:user,content:com},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },// 设置请求的 header
      success: function (res) {
        if(res.data.success){
           
              wx.showToast({  
            title: '反馈成功',  
            icon: 'success',  
            duration: 2000  
        })
           
          }
          else{
            wx.showToast({  
              title: "出现错误",  
              icon: 'none',  
              duration: 2000  
            })
          }
        


      },
      fail: function () {
        console.log("index.js wx.request CheckCallUser fail");
        wx.showToast({  
            title: '失败',  
            icon: 'none',  
            duration: 2000  
        })
      },
      complete: function () {
        // complete
      }
    })
    }
    else{
       wx.showToast({  
            title: '内容不能为空',  
            icon: 'none',  
            duration: 2000  
        })
    }


    
    

  }
})
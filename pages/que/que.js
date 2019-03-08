var app = getApp()
Page({
  data: {
    type:"",
    userInfo: {},
    queList:[{"id":0,"type":"0","content":"类Person里面有个方法sleep()，如果直接用Person.sleep()，则方法sleep前面必须用的关键词是？","num":"34"},
    {"id":1,"type":"1","content":"类Person里面有个方法sleep()，如果直接用Person.sleep()，则方法sleep前面必须用的关键词是？","num":"34"},
    {"id":2,"type":"0","content":"类Person里面有个方法sleep()，如果直接用Person.sleep()，则方法sleep前面必须用的关键词是？","num":"34"},
    {"id":3,"type":"1","content":"类Person里面有个方法sleep()，如果直接用Person.sleep()，则方法sleep前面必须用的关键词是？","num":"34"},
    {"id":4,"type":"1","content":"类Person里面有个方法sleep()，如果直接用Person.sleep()，则方法sleep前面必须用的关键词是？","num":"34"},
    {"id":5,"type":"0","content":"类Person里面有个方法sleep()，如果直接用Person.sleep()，则方法sleep前面必须用的关键词是？","num":"34"},
    {"id":6,"type":"0","content":"类Person里面有个方法sleep()，如果直接用Person.sleep()，则方法sleep前面必须用的关键词是？","num":"34"},
    {"id":7,"type":"0","content":"类Person里面有个方法sleep()，如果直接用Person.sleep()，则方法sleep前面必须用的关键词是？","num":"34"}]
  },
  onLoad: function(options) {    
    var that=this
    var type=options.type
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    wx.request({
      url: 'http://120.24.15.224:8089/index.php/Admin/Api/getCollects',
      data: {uid:that.data.userInfo.id,flag:type},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },// 设置请求的 header
      success: function (res) {
        wx.showToast({  
            title: '失败',  
            icon: 'none',  
            duration: 2000  
        })
      },
      fail: function () {
        wx.showToast({  
            title: '失败',  
            icon: 'none',  
            duration: 2000  
        })
      }
    })
  },   

  showInfo:function(event){
    var id=event.target.dataset.id;
    var type=event.target.dataset.type;
    wx.navigateTo({
      url:"../infor/infor?id="+id+"&type="+type
    })
  }
})
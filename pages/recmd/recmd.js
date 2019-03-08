Page({
  data: {
    recmd:[]
  },
  onLoad:function(){
    var that = this  
    wx.request({
      url: 'http://120.24.15.224:8089/index.php/Admin/Api/showpushers',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      },// 设置请求的 header
      success: function (res) {
        console.log(res);
        that.setData({
            recmd:res.data
        })

      },
      fail: function () {
        console.log("index.js wx.request CheckCallUser fail");
      },
      complete: function () {
        // complete
      }
    })

  },
  navtoApply:function(event){
    var com=event.target.dataset.com;
    wx.navigateTo({
      url:"../apply/apply?com="+com
    })
  }
})
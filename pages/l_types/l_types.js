Page({
  data: {
    choose:0,
    op:"",
    typeList:[]
  },
  onLoad:function(){
this.changeC();
  },
  navtoMore: function(event){console.log(event)
    var id=event.target.dataset.id;
    var sum=event.target.dataset.s;
    if(sum==0){
      wx.showToast({  
              title: '没有题目哦~',  
              icon: 'none',  
              duration: 2000  
          })
    }
    else{
      wx.navigateTo({
        url:"../l_que/l_que?id="+id
      })
    }
    
  },
  changeC: function(){
    var that=this;
    wx.request({
      url: 'http://120.24.15.224:8089/index.php/Admin/Api/topiccounts',
      data: {
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        console.log(res.data.success)
        if(res.data.success){
          that.setData({
            typeList:res.data.data
          })
        }
        else{
          wx.showToast({  
              title: '失败',  
              icon: 'none',  
              duration: 2000  
          })
        }
        that.setData({
          
        })

      },
      fail: function () {
        console.log(" wx.request CheckCallUser fail");
      },
      complete: function () {
        // complete
      }
    })
  }
})
Page({
  data: {
    type:["全部","选择题","简答题"],
    choose:1,
    choice:"筛选",
    op:"choice",
    ccolor:"#0188FB",
    scolor:"black",
    typeList:[]
  },
  onLoad:function(){
    var that=this;
    wx.request({
      url: 'http://120.24.15.224:8089/index.php/Admin/Api/subjectcounts',
      data: {
        key:that.data.op,
        ctype:1
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

      }
    })
  },
  navtoMore: function(event){console.log(event)
    var id=event.target.dataset.id;
    var type=event.target.dataset.type;
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
        url:"../infor/infor?id="+id+"&type="+type
      })
    }

  },
  changeC: function(event){
    var that=this;
    var c=event.target.dataset.c;
    
    this.setData({
      choose:1,
      op:event.target.dataset.w
    })
    if(c=="0"){
      this.setData({
        ccolor:"#0188FB",
        scolor:"black",
      })
    }
    else{
      this.setData({
        ccolor:"black",
        scolor:"#0188FB",
      })
    }
    wx.request({
      url: 'http://120.24.15.224:8089/index.php/Admin/Api/subjectcounts',
      data: {
        key:that.data.op,
        ctype:1
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

      }
    })
  }
})
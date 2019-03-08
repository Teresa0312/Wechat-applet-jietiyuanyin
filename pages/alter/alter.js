var app = getApp()
Page({
  data: {
    userInfo: {},
    level:12,
    sdate:"请选择",
    edate:"请选择",
    realname:"",
    email:"",
    phone:"",
    school:"",
    major:""
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (user) {
      //更新数据
      that.setData({
        userInfo: user,
        realname:user.realname,
        school:user.school,
        major:user.major,
        email:user.email,
        phone:user.phone
      })
      if(user.startdate!=null){
        console.log("1")
        that.setData({
          sdate:user.startdate
        })
      }
      if(user.enddate!=null){
        that.setData({
          edate:user.enddate
        })
      }
    })
    
  },
  bindSDateChange: function(e) {
    console.log(e.detail.value)
    this.setData({
      sdate: e.detail.value
    })
  },
  bindEDateChange: function(e) {
    console.log(e.detail.value)
    this.setData({
      edate: e.detail.value
    })
  },
  setName:function(e){
    console.log(e.detail.value)
    this.setData({
      realname: e.detail.value
    })
  },
  setEmail:function(e){
    console.log(e.detail.value)
    this.setData({
      email: e.detail.value
    })
  },
  setPhone:function(e){
    console.log(e.detail.value)
    this.setData({
      phone: e.detail.value
    })
  },
  setSchool:function(e){
    console.log(e.detail.value)
    this.setData({
      school: e.detail.value
    })
  },
  setMajor:function(e){
    console.log(e.detail.value)
    this.setData({
      major: e.detail.value
    })
  },
  bindFormSubmit:function(e){
    var that=this
    wx.showToast({  
      title: '正在提交',  
      icon: 'loading',  
      duration: 2000  
    })

    
    wx.request({
      url: 'http://120.24.15.224:8089/index.php/Admin/Api/changeUserInfo',
      data: {
        uid:that.data.userInfo.id,
        real_name:that.data.realname,
        school:that.data.school,
        major:that.data.major,
        email:that.data.email,
        phone:that.data.phone,
        startdate:that.data.sdate,
        enddate:that.data.edate
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },// 设置请求的 header
      success: function (res) {
        console.log(res);
        if(res.data.success){
          wx.showToast({  
              title: '成功',  
              icon: 'success',  
              duration: 2000  
          })
          app.changeStor()

        }
        else{
          wx.showToast({  
            title: '失败',  
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

})
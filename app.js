App({
  onLaunch: function () {
    wx.request({
      url: 'http://120.24.15.224:8089/index.php/Admin/Api/getSubjects',
      data: {
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(uresult) {
        console.log(uresult)

        },
        fail: function () {
          console.log(" wx.request CheckCallUser fail");
        }
      })
  },
  //type:1 putonng  2  yonghu
  getUserInfo: function (cb) {
    var that = this
    var user
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
      success: function (response){
        wx.getUserInfo({
          success:function(res){
            user = res.userInfo
            if(response.code){
              var encryptedData = res.encryptedData.replace(/\+/g, "%2B");
              wx.request({
                url: 'http://120.24.15.224:8089/index.php/Admin/Api/Wxlogin',
                data: {
                  code: response.code,
                  encryptedData: encryptedData,
                  iv:res.iv
                },
                method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function(result) {
                  console.log(result)
                  user.id=result.data.user_id
                  wx.request({
                    url: 'http://120.24.15.224:8089/index.php/Admin/Api/getUserInfo',
                    data: {
                      uid:user.id
                    },
                    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function(uresult) {
                      console.log(uresult)
                      user.realname=uresult.data.data.real_name
                      user.email=uresult.data.data.email
                      user.enddate=uresult.data.data.enddate
                      user.major=uresult.data.data.major
                      user.phone=uresult.data.data.phone
                      user.school=uresult.data.data.school
                      user.startdate=uresult.data.data.startdate
                      wx.setStorageSync('user', user)
                      that.globalData.userInfo = user
                      typeof cb == "function" && cb(that.globalData.userInfo)
                      
                    },
                    fail: function () {
                      console.log(" wx.request CheckCallUser fail");
                    }
                  })
                },
                fail: function () {
                  console.log(" wx.request CheckCallUser fail");
                }
              })
            }
          }
        })
      }

    })
    }
  },
  changeStor:function(){
    var user=wx.getStorageSync('user')
    var that=this
    console.log(user)
    wx.request({
      url: 'http://120.24.15.224:8089/index.php/Admin/Api/getUserInfo',
      data: {
        uid:user.id
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(uresult) {
        console.log(uresult)
        user.realname=uresult.data.data.real_name
        user.email=uresult.data.data.email
        user.enddate=uresult.data.data.enddate
        user.major=uresult.data.data.major
        user.phone=uresult.data.data.phone
        user.school=uresult.data.data.school
        user.startdate=uresult.data.data.startdate
        wx.setStorageSync('user', user)
        that.globalData.userInfo = user
        },
        fail: function () {
          console.log(" wx.request CheckCallUser fail");
        }
      })
  },
  getOpenid: function (code) {
    var that = this;
    wx.request({
      url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + that.globalData.appid + '&secret=' + that.globalData.secret + '&js_code=' + code + '&grant_type=authorization_code',
      data: {},
      method: 'GET',
      success: function (res) {
        var obj = {};
        console.log(res);
        obj.openid = res.data.openid;
        obj.expires_in = Date.now() + res.data.expires_in;
        obj.session_key = res.data.session_key; 
        wx.setStorageSync('openid', obj.openid);// 存储openid  
        that.globalData.openid=obj.openid;
      }
    });
  },
  globalData: {
    userInfo: null,
    openid: null,
    appid: "wx4774ecc8bd412dd8",
    secret: "a55ad8c7f0d308e89f16d5128e0dd8d9"


  }
})


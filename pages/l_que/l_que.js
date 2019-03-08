var WxParse = require('../../wxParse/wxParse.js')
var app = getApp()
Page({
  data: {
    queInfo:{},
    userInfo: {},
    com:0,
    sid:"",
    type:2,
    like:0,
    btnShow:1,
    pre:"无",
    preIndex:"",
    next:"无",
    nextIndex:"",
    shortAns:"",
    shortHead:"111",
    check:"2",
    num:[1,2,3,4,5,6,7],
    comment:[
      {
        "id":"0",
        "content":'this关键字主要有三个应用：(1)this调用本类中的属性，也就是类中的成员变量；(2)this调用本类中的其他方法；(3)this调用本类中的其他构造方法，调用时要放在构造方法的首行。',
        "user":{
          "id":"0",
          "name":"Teresa",
          "pic":"../../image/user_1.png"

        },
        "time":"2017-12-1 16:34:23"
      },
      {
        "id":"1",
        "content":'this关键字主要有三个应用：(1)this调用本类中的属性，也就是类中的成员变量；(2)this调用本类中的其他方法；(3)this调用本类中的其他构造方法，调用时要放在构造方法的首行。',
        "user":{
          "id":"0",
          "name":"Teresa",
          "pic":"../../image/user_1.png"

        },
        "time":"2017.01.12"
      },
      {
        "id":"2",
        "content":'this关键字主要有三个应用：(1)this调用本类中的属性，也就是类中的成员变量；(2)this调用本类中的其他方法；(3)this调用本类中的其他构造方法，调用时要放在构造方法的首行。',
        "user":{
          "id":"0",
          "name":"Teresa",
          "pic":"../../image/user_1.png"

        },
        "time":"2017.01.12"
      }
    ]
  },
  onLoad: function(options) {   
    var that=this 
    that.setData({
      sid:options.id,
      flag:"0",
      check:"2"
    })
     app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })

    wx.request({
      url: 'http://120.24.15.224:8089/index.php/Admin/Api/showSpshorts',
      data: {subid:options.id,sid:"0"},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },// 设置请求的 header
      success: function (res) {

        if(res.data.data.first === null || res.data.data.first=== undefined || res.data.data.first.length==0){
            that.setData({
              pre:"无",
              preIndex:""
            })

        }
        else{
            that.setData({
              pre:"上一道",
              preIndex:res.data.data.first.id
            })
        }
          if(res.data.data.next === null || res.data.data.next=== undefined || res.data.data.next.length==0){
            that.setData({
              next:"无",
              nextIndex:""
            })
          }
          else{
            that.setData({
              next:"下一道",
              nextIndex:res.data.data.next.id
            })
          }
  
        var temp = WxParse.wxParse('shortAns', 'html', res.data.data.mid.answer, that, 5)
        var tem = WxParse.wxParse('shortHead', 'html', res.data.data.mid.name, that, 5)
        that.setData({
          queInfo:res.data.data.mid,
          shortAns: temp,
          shortHead: temp
          
        })

      }
    })


  }, 
  showQue:function(event){
    var that=this
    var index=event.target.dataset.cid
    that.setData({
      com:0,
      btnShow:1
    })
    if(index&&that.data.type==2){
      wx.request({
        url: 'http://120.24.15.224:8089/index.php/Admin/Api/showSpshorts',
        data: {subid:that.data.sid,sid:index},
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },// 设置请求的 header
        success: function (res) {
          console.log(res.data)
          if(res.data.data.first === null || res.data.data.first=== undefined || res.data.data.first.length==0){
              that.setData({
                pre:"无",
                preIndex:""
              })

          }
          else{
              that.setData({
                pre:"上一道",
                preIndex:res.data.data.first.id
              })
          }
          console.log(res.data.data.next)
            if(res.data.data.next === null || res.data.data.next=== undefined || res.data.data.next.length==0){
              that.setData({
                next:"无",
                nextIndex:""
              })
            }
            else{
              that.setData({
                next:"下一道",
                nextIndex:res.data.data.next.id
              })
            }
            
        var temp = WxParse.wxParse('shortAns', 'html', res.data.data.mid.answer, that, 5)
        var tem = WxParse.wxParse('shortHead', 'html', res.data.data.mid.name, that, 5)
        that.setData({
          queInfo:res.data.data.mid,
          shortAns: temp,
          shortHead: temp
          
        })

        }
      })
    }
  },
  addView:function(qid,typeid){
    wx.request({
        url: 'http://120.24.15.224:8089/index.php/Admin/Api/addView',
        data: {id:qid,type:typeid},
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },// 设置请求的 header
        success: function (res) {
            

        }
      })


  },
  showCom:function(){
    var that=this
    this.setData({
      com: 1,
      btnShow:0
    })
    if(that.data.type==2){
        var qid=that.data.queInfo.id
        that.addView(qid,5)

    }
  },
  collect:function(){
    var that=this
    var t=that.data.like
    var m=3
    var tid=3
    var qid=that.data.queInfo.id
    if(t==1){//未收藏
      that.setData({
        like:0
      })
      wx.request({
        url: 'http://120.24.15.224:8089/index.php/Admin/Api/addCollects',
        data: {module:m,type:tid,qid:qid,uid:that.data.userInfo.id},
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },// 设置请求的 header
        success: function (res) {
          wx.showToast({  
              title: '已收藏',  
              icon: 'none',  
              duration: 2000  
          })
            

        }
      })

    }
    else{
      that.setData({
        like:1
      })
      wx.request({
        url: 'http://120.24.15.224:8089/index.php/Admin/Api/delCollects',
        data: {module:m,type:tid,qid:qid,uid:that.data.userInfo.id},
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },// 设置请求的 header
        success: function (res) {
            wx.showToast({  
              title: '取消收藏',  
              icon: 'none',  
              duration: 2000  
          })

        }
      })

    }
  }

})

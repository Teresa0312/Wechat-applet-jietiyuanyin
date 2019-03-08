var WxParse = require('../../wxParse/wxParse.js')
var qClass=[]
var app = getApp()
Page({
  data: {
    queInfo:{},
    userInfo: {},
    com:0,
    sid:"",
    btnShow:1,
    like:0,
    type:"",
    queClass:[],
    pre:"无",
    preIndex:"",
    next:"无",
    nextIndex:"",
    shortAns:"",
    check:"2",
    flag:"0",
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
  console.log(options)
  var qClass=[]
  app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  that.setData({
    sid:options.id,
    flag:"0",
    check:"2"
  })
  if(options.type=='choice'){
    that.setData({
      type:1
    })
    wx.request({
      url: 'http://120.24.15.224:8089/index.php/Admin/Api/showChoices',
      data: {subid:options.id,cid:"0",ctype:2},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },// 设置请求的 header
      success: function (res) {

        if(res.data.data.first === null || res.data.data.first === undefined || res.data.data.first.length == 0){
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
          if(res.data.data.next === null || res.data.data.next === undefined || res.data.data.next.length == 0){
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
          
        var jsonStr=res.data.data.mid.answer
        jsonStr = jsonStr.replace(" ",""); 
        if(typeof jsonStr!= 'object'){ 
          jsonStr= jsonStr.replace(/\ufeff/g,"");//重点 
          var jj = JSON.parse(jsonStr); 
          res.data.data.mid.answer = jj;
        }

       // var temp = WxParse.wxParse('queName', 'html', res.data.data.mid.name, that, 5)

        that.setData({
          queInfo:res.data.data.mid,
          //queName:temp,
          flag:"0",
          check:"2",

        })

        qClass=res.data.data.mid.answer

        for (var index in qClass){
          qClass[index]=" "
        }

        that.setData({
          queClass:qClass

        })

        console.log(that.data.queClass)


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

  else if(options.type=='short'){
    that.setData({
      type:2
    })
    wx.request({
      url: 'http://120.24.15.224:8089/index.php/Admin/Api/showShorts',
      data: {subid:options.id,sid:"0",ctype:2},
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
  
        that.setData({
          shortAns : res.data.data.mid.answer
        })

        var temp = WxParse.wxParse('shortAns', 'html', that.data.shortAns, that, 5)

        that.setData({
          queInfo:res.data.data.mid,
          shortAns: temp
          
        })

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

  }, 
  showQue:function(event){
    var that=this
    var index=event.target.dataset.cid
    that.setData({
      com:0,
      btnShow:1
    })

    console.log(event.target)
    if(index&&that.data.type==1){
      wx.request({
        url: 'http://120.24.15.224:8089/index.php/Admin/Api/showChoices',
        data: {subid:that.data.sid,cid:index,ctype:2},
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
            if(res.data.data.next === null || res.data.data.next=== undefined || res.data.data.next.length==0 ){
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
            
          var jsonStr=res.data.data.mid.answer
          jsonStr = jsonStr.replace(" ",""); 
          if(typeof jsonStr!= 'object'){ 
            jsonStr= jsonStr.replace(/\ufeff/g,"");//重点 
            var jj = JSON.parse(jsonStr); 
            res.data.data.mid.answer = jj;
          }

         // var temp = WxParse.wxParse('queName', 'html', res.data.data.mid.name, that, 5)
        
        that.setData({
          queInfo:res.data.data.mid,

          //queName:temp,
          flag:"0",
          check:"2",

        })

          qClass=res.data.data.mid.answer

          for (var index in qClass){
            qClass[index]=" "
          }

          that.setData({
            queClass:qClass

          })

          console.log(that.data.queClass)

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
    else if(index&&that.data.type==2){
      wx.request({
        url: 'http://120.24.15.224:8089/index.php/Admin/Api/showShorts',
        data: {subid:that.data.sid,sid:index,ctype:2},
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
            
        that.setData({
          shortAns : res.data.data.mid.answer
        })

        var temp = WxParse.wxParse('shortAns', 'html', that.data.shortAns, that, 5)
        that.setData({
          queInfo:res.data.data.mid,
          shortAns: temp
          
        })

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
  },
  checkAns:function(event){
    var qid=event.target.dataset.qid
    var ans=event.target.dataset.ans
    var that=this
    var name
    
    if(that.data.flag=="0"){

      wx.request({
        url: 'http://120.24.15.224:8089/index.php/Admin/Api/checkChoice',
        data: {cid:qid,answer:ans,ctype:2},
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },// 设置请求的 header
        success: function (res) {
            that.setData({
              check: res.data.data
            })
            that.addView(qid,2);
            if(ans==that.data.queInfo.trueanswer){
              name="right"
              qClass=that.data.queClass
              for (var index in qClass){
                if(index==ans)
                  qClass[index]=name
              }
              that.setData({
                queClass:qClass
              })

            }
            //回答错误
            else if(ans!=that.data.queInfo.trueanswer){
              
              var nameR="right"
              var nameW="wrong"
              qClass=that.data.queClass
              for (var index in qClass){
                if(index==ans)
                  qClass[index]=nameW
                if(index==that.data.queInfo.trueanswer)
                  qClass[index]=nameR
              }
              that.setData({
                queClass:qClass
              })


            }
            console.log(that.data.check)
            that.setData({
              flag:"1"
            })

        },
        fail: function () {
          console.log("index.js wx.request CheckCallUser fail");
          wx.showToast({  
              title: '失败',  
              icon: 'none',  
              duration: 2000  
          })
        }
    })
    }

    if(that.data.flag=="1"){
      wx.showToast({  
              title: '不可重复作答',  
              icon: 'none',  
              duration: 2000  
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
        that.addView(qid,4)

    }
  },
  collect:function(){
    var that=this
    var t=that.data.like
    var m=2
    var tid=that.data.type
    var qid=that.data.queInfo.id
    if(tid==1)
      tid=4
    else
      tid=5
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


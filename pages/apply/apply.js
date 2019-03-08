var app = getApp()
var ansSet ={}
Page({
  data: {
    start:0,
    userInfo:"",
    num:1,
    company:"",
    end_time:"",
    problemSet: {},
    ansSet:{},
    time:1,//0 答题时间结束 1未结束
    countDownDay: 0,  
    countDownHour: 0,  
    countDownMinute: 0,  
    countDownSecond: 0,   
    showModal: true,
    sdate:"请选择",
    edate:"请选择",
    realname:"",
    email:"",
    phone:"",
    school:"",
    major:"",
    intervalid:"",
    sum:0,
  },
  onLoad: function (options) {
    var that = this
    ansSet ={}
    console.log(options)
    that.setData({
        company:options.com,
        ansSet:{}
    })
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (user) {
      //更新数据
      that.setData({
        userInfo: user,
        realname:user.realname,
        school:user.school,
        major:user.major,
        email:user.email,
        phone:user.phone,
        sum:0
      })
      if(user.startdate!=null){
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
    console.log("get")
    wx.request({
      url: 'http://120.24.15.224:8089/index.php/Admin/Api/showTestChoices',
      method: 'POST',
      data:{},   
      header: {
        'content-type':'application/x-www-form-urlencoded',
      },
      success: function (res) {
        var jsonStr
        for(var i=0;i<res.data.data.length;i++){
          jsonStr=res.data.data[i].answer
          jsonStr = jsonStr.replace(" ","");
          if(typeof jsonStr!= 'object'){ 
            jsonStr= jsonStr.replace(/\ufeff/g,"")
            var jj = JSON.parse(jsonStr)
            res.data.data[i].answer = jj
          }
        }
        that.setData({
          problemSet:res.data.data
        })

      }

    })
    
  },
  onUnload:function(){
    clearInterval(this.data.intervalid)
  },
  startTest: function () {
    var that=this
    that.setData({
      start:1
    })
    console.log(that)
    that.count_down();
  },
  count_down: function () {  
    var that=this
    var totalSecond =10*60;   
  
    var interval = setInterval(function () {  
      // 秒数  
      var second = totalSecond;  
  
      // 天数位  
      var day = Math.floor(second / 3600 / 24);  
      var dayStr = day.toString();  
      if (dayStr.length == 1) dayStr = '0' + dayStr;  
  
      // 小时位  
      var hr = Math.floor((second - day * 3600 * 24) / 3600);  
      var hrStr = hr.toString();  
      if (hrStr.length == 1) hrStr = '0' + hrStr;  
  
      // 分钟位  
      var min = Math.floor((second - day * 3600 *24 - hr * 3600) / 60);  
      var minStr = min.toString();  
      if (minStr.length == 1) minStr = '0' + minStr;  
  
      // 秒位  
      var sec = second - day * 3600 * 24 - hr * 3600 - min*60;  
      var secStr = sec.toString();  
      if (secStr.length == 1) secStr = '0' + secStr;  
  
      this.setData({  
        intervalid:interval,
        countDownDay: dayStr,  
        countDownHour: hrStr,  
        countDownMinute: minStr,  
        countDownSecond: secStr,  
      });  
      totalSecond--;  
      if (totalSecond < 0) {  
        clearInterval(interval);  
        wx.showToast({  
          title: '答题时间已结束',  
          icon: 'none',  
          duration: 2000  
        });  
        that.checkRequest();
        this.setData({  
          time:0,
          countDownDay: '00',  
          countDownHour: '00',  
          countDownMinute: '00',  
          countDownSecond: '00',  
        });  
      }  
    }.bind(this), 1000);  
  }, 
  /**
     * 弹出框蒙层截断touchmove事件
     */
    preventTouchMove: function () {
    },
    /**
     * 隐藏模态对话框
     */
    hideModal: function () {
      this.setData({
        showModal: false
      });
    },
    bindSDateChange: function(e) {
      this.setData({
        sdate: e.detail.value
      })
    },
    bindEDateChange: function(e) {
      this.setData({
        edate: e.detail.value
      })
    },
    setName:function(e){
      var temp=e.detail.value.trim()
      this.setData({
        realname: temp
      })
    },
    setEmail:function(e){
      var temp=e.detail.value.trim()
      this.setData({
        email: temp
      })
    },
    setPhone:function(e){
      var temp=e.detail.value.trim()
      this.setData({
        phone: temp
      })
    },
    setSchool:function(e){
      var temp=e.detail.value.trim()
      this.setData({
        school: temp
      })
    },
    setMajor:function(e){
      var temp=e.detail.value.trim()
      this.setData({
        major: temp
      })
    },
    bindFormSubmit:function(e){
      var that=this
      var isnull=0  //0不为空 1为空
      if(!this.data.realname||!this.data.email||!this.data.email ||!this.data.school ||!this.data.major )
        isnull=1
      if(isnull==1){
        wx.showToast({  
          title: '信息不能为空',  
          icon: 'none',  
          duration: 2000  
        })
      }
      else{
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
              that.setData({
                showModal: false
              });
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
    setAns:function(e){
      var that=this
      var id=e.target.dataset.id
      var a=e.target.dataset.ans
      var s=that.data.sum+1
      ansSet[id]=a
      that.setData({
          ansSet:ansSet,
          sum:s
      })

    },
    check:function(){
      var that=this
      if(that.data.sum<10){
         wx.showToast({  
              title: "请答完所有题目",  
              icon: 'none',  
              duration: 2000  
            })
      }
      else{
        that.checkRequest()
      }
    },
    checkRequest:function(){
      var that=this
      var res=that.data.ansSet

        wx.request({
        url: 'http://120.24.15.224:8089/index.php/Admin/Api/totalScore',
        data: {res: res},
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (result) {
          console.log(result);

          if(result.data.success){
            if(result.data.data){
              wx.redirectTo({
                url: '../result/result?res=0'
              })
            }
            else{
              wx.redirectTo({
                url: '../result/result?res=1'
              })
            }
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
          wx.showToast({  
              title: '提交失败',  
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
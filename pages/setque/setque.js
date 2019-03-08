var app = getApp()

Page({
  data: {
    typeList:["选择题","简答题"],
    type:0,
    cres:"#0188FB",
    wres:"",
    opNum:0,
    choice:"请选择题目类型",
    nums:["2","3","4","5","6"],
    option:["A","B","C","D","E","F"],
    ans:"",
    qtypes:"",
    optype:"",
    typeid:"",
    showModal: false,
    star:0,
    title:"",
    infor:"",
    anslist:{},
    userid:"",
    a:" ",
    b:" ",
    c:" ",
    d:" ",
    e:" ",
    f:" ",

  },
  onLoad:function(){
    var that=this
     app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userid: userInfo.id
      })
    })
    wx.request({
      url: 'http://120.24.15.224:8089/index.php/Admin/Api/getSubjects',
      data: {},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if(res.data.success){
            that.setData({
                qtypes:res.data.data
            })
        }
        else{
            wx.showToast({  
              title: '出现错误',  
              icon: 'none',  
              duration: 2000  
          })
        }
        

      }
    })
  },
  preventTouchMove: function () {
    },
    hideModal: function () {
      this.setData({
        showModal: false
      });
    },
    showModal:function(){
this.setData({
        showModal: true
      });
    },
  changeType: function(event){
    var that = this  
    var type=event.target.dataset.id;
    if(type==0){
        that.setData({
            cres:"#0188FB",
            wres:"gray",
            type:0,
            ans:"",
            optype:"",
            typeid:"",
            star:0,
            title:"",
            infor:"",
            anslist:[],
            a:" ",
            b:" ",
            c:" ",
            d:" ",
            e:" ",
            f:" "
        })
    }
    else{
        that.setData({
            cres:"gray",
            wres:"#0188FB",
            type:1,
            ans:"",
            optype:"",
            typeid:"",
            star:0,
            title:"",
            infor:"",
            anslist:[],
            a:" ",
            b:" ",
            c:" ",
            d:" ",
            e:" ",
            f:" "
        })
    }
  },
  changeT:function(e){
    var that=this
    that.setData({
        optype:e.target.dataset.name,
        typeid:e.target.dataset.id,
        showModal: false
    })
   
  },
  changeOp:function(){
    var that = this  
        wx.showActionSheet({  
            itemList: that.data.nums,  

            success: function(res) {  
                if (!res.cancel) {  
                    that.setData({  
                        opNum:that.data.nums[res.tapIndex]  
                    })  

                }  
            }  
        }) 
  },
  changeStar:function(){
    var that = this  
        wx.showActionSheet({  
            itemList: ['1','2','3','4','5'],  

            success: function(res) {  
                if (!res.cancel) {  
                    that.setData({  
                        star:res.tapIndex+1
                    })  

                }  
            }  
        }) 
  },
  changeRight:function(){
    var that = this  
    var items=[];
    for(var i=0;i<that.data.opNum;i++)
        items[i]=that.data.option[i];
        wx.showActionSheet({  
            itemList: items,  
            success: function(res) {  
                if (!res.cancel) {  
                    that.setData({  
                        ans:items[res.tapIndex]  
                    })  

                }  
            }  
        }) 
  },
  changeAns:function(e){
    var t=e.detail.value
    t=t.trim()
     this.setData({
      ans:t
    }) 
  },
  setTitle:function(e){
    var t=e.detail.value
    t=t.trim()
     this.setData({
      title:t
    }) 
  },
  setChoice:function(e){
    var name=e.detail.value
    var that=this
    var id=e.target.dataset.id
    if(id=='a'||id=='A')
      that.setData({
        a:name
    })
    else if(id=='b'||id=='B')
      that.setData({
        b:name
    })
    else if(id=='c'||id=='C')
      that.setData({
        c:name
    })
    else if(id=='d'||id=='D')
      that.setData({
        d:name
    })
    else if(id=='e'||id=='E')
      that.setData({
        e:name
    })
    else if(id=='f'||id=='F')
      that.setData({
        f:name
    })
  },
  setInfor:function(e){
    var t=e.detail.value
    t=t.trim()
     this.setData({
      infor:t
    }) 
  },
  bindSubmit:function(){
    var that=this
    var t=[]
    var a={}
    if(that.data.type==0){
      t[0]=that.data.a
      t[1]=that.data.b
      t[2]=that.data.c
      t[3]=that.data.d
      t[4]=that.data.e
      t[5]=that.data.f
      for(var i=0;i<that.data.opNum;i++)
        a[that.data.option[i]]=t[i]
      that.setData({
        anslist:a
      })
      console.log(a)
      if(!that.data.title|!that.data.anslist|!that.data.ans|!that.data.typeid|!that.data.star|!that.data.infor){
         wx.showToast({  
              title: '请填写完所有内容',  
              icon: 'none',  
              duration: 2000  
            })
      }
      else{
        that.choooseRe()
      }
    }
    else{
      if(!that.data.title|!that.data.ans|!that.data.typeid|!that.data.star){
         wx.showToast({  
              title: '请填写完所有内容',  
              icon: 'none',  
              duration: 2000  
            })
      }
      else{
        that.shortRe()
      }
    }
    
    

    
  },
  choooseRe:function(){ 
    var that=this
    var a=that.data.anslist
    a=JSON.stringify(a)
    console.log(a)
    wx.request({
      url: 'http://120.24.15.224:8089/index.php/Admin/Api/addChoices',
      data: {
        name:that.data.title,
        answer:a,
        trueanswer:that.data.ans,
        userid:that.data.userid,
        subid:that.data.typeid,
        info:that.data.infor,
        star:that.data.star,
        source:'未知'

      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if(res.data.success){
            wx.showToast({  
              title: '成功',  
              icon: 'success',  
              duration: 2000  
          })
        }
        else{
            wx.showToast({  
              title: '出现错误',  
              icon: 'none',  
              duration: 2000  
          })
        }
        

      }
    })


  },
  shortRe:function(){ 
    var that=this
    wx.request({
      url: 'http://120.24.15.224:8089/index.php/Admin/Api/addShorts',
      data: {
        name:that.data.title,
        answer:that.data.ans,
        userid:that.data.userid,
        subid:that.data.typeid,
        star:that.data.star,
        source:'未知'

      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if(res.data.success){
            wx.showToast({  
              title: '成功',  
              icon: 'success',  
              duration: 2000  
          })
        }
        else{
            wx.showToast({  
              title: '出现错误',  
              icon: 'none',  
              duration: 2000  
          })
        }
        

      }
    })
  }
})
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    titleBarHeight:Number,
    scrollH:Number,
    contentList:[],
    currentTab:Number,
    newList:[]
  },
  attached:function(){
    wx.getSystemInfo({
      success: (res) => {       
        this.setData({
          titleBarHeight:res.statusBarHeight
          
        })  
      },
      fail: (res) => {},
      complete: (res) => {}, 
    });    
    var that = this
    wx.cloud.callFunction({
      name:"q-a",
      success(re){
        that.setData({
          contentList:re.result.data
        })
        
      }
    })
  }, 
  

  methods: {
    extend:function(re){
      this.setData({
        currentTab:re.currentTarget.dataset.current
      }) 
    },
  
  getValue:function(res){
    var a = this.data.newList
    var b =this.data.contentList
    if(res.detail.value ===''){
      var that = this
      wx.cloud.callFunction({
      name:"q-a",
      success(re){
        console.log(re)
        that.setData({
          contentList:re.result.data,
          
        })
      }
    })
    console.log(this.data.contentList)
    console.log(this.data.newList)
    }else{
      var that = this
      const input = res.detail.value;
      wx.cloud.callFunction({
        name:"q-a-1",
        data:{input:input},
        success(re){
          console.log(re)
          that.setData({
            contentList:re.result.data
          })
        },
        fail(re){
          console.log(re)
        } 
      })    
    }
  }
},

  ready:function(){
    
  }
})

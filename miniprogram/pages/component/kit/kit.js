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
    titleBarHeight:Number
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
      
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})

let app = getApp()
Page({
  data: {
    //手机工具栏高度
    titleBarHeight:{
      type:Number,
    },
    image:"cloud://tips-coronavirus-h8zry.7469-tips-coronavirus-h8zry-1302855358/images/logo_covid-kit-09.png",
    currentTab:0,
    color:"#898989",
    selectedColor:"#ddc3fe",
    list: [{  
      "text":"疫情数据",
      "iconPath":"/images/data_o.png",
      "selectedIconPath":"/images/data.png"
    },{
      
      "text":"新冠快讯",
      "iconPath":"/images/news_o.png",
      "selectedIconPath":"/images/news.png"
    },{
      
      "text":"防疫知识",
      "iconPath":"/images/file_o.png",
      "selectedIconPath":"/images/file.png"
    },{
      
      "text":"常见问题",
      "iconPath":"/images/question_o.png",
      "selectedIconPath":"/images/question.png"
    }] 
  },

  /**
   * 组件的方法列表
   */
  //tabbar跳转页面
  switchTab:function(e) {
    let that = this;
    
    if (this.data.currentTab === e.currentTarget.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.currentTarget.dataset.current
      });
    } 
  },

  //获取手机工具栏高度
  onLoad:function(){
    wx.getSystemInfo({
      success: (res) => {
        
        this.setData({
          titleBarHeight:res.statusBarHeight
        })
        
      },
      fail: (res) => {},
      complete: (res) => {},
      
    });
    
  },
  onPullDownRefresh:function(){
    
    var that = this
    
    that.onLoad()
  },
  onShow() {
    
  },

}) 

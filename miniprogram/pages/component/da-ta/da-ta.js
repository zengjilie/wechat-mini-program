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

    titleBarHeight:{ 
      type:Number,
    },
    scrollTop:'',
    extraClasses:"",
    currentTab:0,
    list:[
    {text:"本国疫情数据"},
    {text:"国外疫情数据"},
    ],  
  },

  /**
   * 组件的方法列表
   */
  methods: {
    move: function (re) {
      if (this.data.extraClasses == 'box-transition box-moved') {
        this.setData({
          extraClasses: 'box-transition'
        })
      } else {
        this.setData({
          extraClasses: 'box-transition box-moved'
        })
      };
      
      if(re.currentTarget.dataset.current == 0){
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 200,
          success: res => {
            
          },
          fail: res => {
            
          }
        })
      }else{
        wx.pageScrollTo({
          scrollTop: 1700, 
          duration: 500,
          success: res => {
            
          },
          fail: res => {
            
          }
        })

      } 
      
    },

  },
  lifetimes:{
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
    }
  }
    

})

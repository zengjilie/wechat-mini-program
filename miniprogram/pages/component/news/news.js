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
    videoList:[],
    titleBarHeight:{ 
      type:Number,
    },
    i:0,
    tap_image:'block',
    play:Number,
    currentTab:Number
  },

  /**
   * 组件的方法列表
   */
  
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
      });

      const db = wx.cloud.database();
      const dt = db.collection('video')
      dt.limit(10).get().then(re=>{
        let dataList = re.data
        for(var i = 0;i<dataList.length;i++){
          let time = new Date(Number(dataList[i].pubTime))
          let year = time.getFullYear()+'-';
          let month = (time.getMonth()+1?'0'+(time.getMonth()+1+'-'):+(time.getMonth()+1)+'-');
          let day = time.getDate();
          var posttime = year+month+day
          dataList[i].pubTime = posttime
          
        }
        
        this.setData({
          videoList:re.data
        })
      })
    }
  },
  
  methods: {
    loadVideos:function(r){
      console.log(r)
      var x = this.data.i+1;
      this.setData({i:x});
      const db = wx.cloud.database();
      const dt = db.collection('video')
      dt.limit(10).skip(x*10).get().then(re=>{
        let dataList = re.data
        for(var i = 0;i<dataList.length;i++){
          let time = new Date(Number(dataList[i].pubTime))
          let year = time.getFullYear()+'-';
          let month = (time.getMonth()+1?'0'+(time.getMonth()+1+'-'):+(time.getMonth()+1)+'-');
          let day = time.getDate();
          var posttime = year+month+day
          dataList[i].pubTime = posttime  
        }
        for(var i =0;i<dataList.length;i++){
          this.data.videoList.push(dataList[i])
        }
        this.setData({
          videoList:this.data.videoList
        })
        
        
        
      }) 
    },
    play:function(re){
      this.setData({
        currentTab:re.currentTarget.dataset.current
      })
      console.log(re)
    }
    
  },

})
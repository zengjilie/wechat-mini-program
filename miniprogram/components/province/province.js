
Component({
  
  properties: {

  },

  
  data: {
    titleList:[
      {title:'地区'},
      {title:'现存确诊'},
      {title:'累计确诊'},
      {title:'死亡'},
      {title:'治愈'}
    ],
    contentList:[],
    i:0
  },

  
  methods: {
    afterList:function(){
      let a = this.data.i + 1
      let b = a
      
      const db= wx.cloud.database();
      const dt = db.collection('province').skip(20*b)
      dt.get().then(res=>{
        
        this.setData({contentList:res.data,i:a})
      })
    },
    beforeList:function(){
      let a = this.data.i - 1
      let b = a
      const db= wx.cloud.database();
      const dt = db.collection('province').skip(20*b)
      dt.get().then(res=>{
        
        this.setData({contentList:res.data,i:a})
      })
    }
  },
  lifetimes:{
    attached:function(){
      const db= wx.cloud.database();
      const dt = db.collection('province')
      dt.get().then(re=>{
        this.setData({contentList:re.data})
        
        
      })
      // var that = this
      // wx.cloud.callFunction({
      //   name:"provinceList",
      //   success(res){
      //   that.setData({ contentList:res.result.data})
      //   }
      // }) 
    }
  }
  
}) 

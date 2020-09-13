Component({
  
  properties: {

  },

  
  data: {
    country:'国家',
    curConfirm:'现存确诊',
    confirmed:'累计确诊',
    died:'死亡',
    crued:'治愈',
    
    
    contentList:[],
    i:0
  },

  
  methods: {
    afterList:function(){
      let a = this.data.i + 1
      
      let b = a
      
      const db= wx.cloud.database();
      const dt = db.collection('country').skip(20*b)
      dt.get().then(res=>{
        
        this.setData({contentList:res.data,i:a})
      })
    },
    beforeList:function(){
      let a = this.data.i - 1
      
      let b = a
      const db= wx.cloud.database();
      const dt = db.collection('country').skip(20*b)
      dt.get().then(res=>{
        
        this.setData({contentList:res.data,i:a})
      })
    }
  },
  lifetimes:{
    attached:function(){
      const db= wx.cloud.database();
      const dt = db.collection('country')
      dt.get().then(re=>{
        this.setData({contentList:re.data})
        
        
      })
    }
  }
  
}) 
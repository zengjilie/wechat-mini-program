// components/numbers_out/numbers_out.js
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
    arrowUp:'cloud://tips-coronavirus-h8zry.7469-tips-coronavirus-h8zry-1302855358/images/组件 6 – 12@2x.png',
    arrowDown:'cloud://tips-coronavirus-h8zry.7469-tips-coronavirus-h8zry-1302855358/images/组件 5 – 6@2x.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  },
  
  lifetimes:{
    attached:function(){
      const dat = wx.cloud.database()
      const dat_out = dat.collection("summary_out")
      dat_out.get().then(re=>{
        let com = Number(re.data[0].confirmedRelative);
        let die = Number(re.data[0].diedRelative);
        let curcon = Number(re.data[0].curConfirmRelative);
        let cur = Number(re.data[0].curedRelative);
        if (com>0){com = "+"+ com}
        else{com = com};
        re.data[0].confirmedRelative = com;
        if (die>0){die = "+"+ die}
        else{die = die};
        re.data[0].diedRelative = die;
        if (curcon>0){curcon = "+"+ curcon}
        else{curcon = curcon};
        re.data[0].curConfirmRelative = curcon;
        if (cur>0){cur = "+"+ cur}
        else{cur = cur};
        re.data[0].curedRelative = cur;
        
        this.setData({
          number:re.data[0], 
        });
        

        

        
      })
      
    }
  }
})


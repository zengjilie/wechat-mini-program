// components/map_out/map_out.js
import * as echarts from '../../ec-canvas/echarts';
import geoJson from './world.js';

const app = getApp();


function initChart(canvas, width, height, dpr) {

  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  echarts.registerMap('world', geoJson);

  const option = {

    tooltip: {
      formatter:function(e, t, n) {
        return .5 == e.value ? e.name + "：有疑似病例" :  e.name + "：" + e.value
      }
    },

    title: {
      text: '全球疫情累计确诊地图',
      left:17,
      top:17,
      textStyle:{
        color: '#fff',
        fontWeight : 'bold',
        fontSize :'18' 
      },
      
    },

    visualMap: { 
      confine:'true',
      orient: 'horizontal', 
      left:24,
      //itemWidth:20,
      textGap:5,
      bottom:24,
      itemWidth: 10,
      itemHeight: 12,
      pieces: [
          {gt:100000,symbol:'circle',color:'#bb86fc'},
          {min: 10000, max: 99999,symbol:'circle',color:'#d2aefd'},
          {min: 1000, max: 9999,symbol:'circle',color:'#e8d7fe'},
          {min: 0,max:999,symbol:'circle',color:'#fff'},    
      ],
      textStyle:{color:'#fff',fontSize:11},
      symbolSize: 0.5,
    },
    
    series: [{
      nameMap:{},
      type: 'map',
      mapType: 'world',
      geoIndex: 0,
      data:[],
      zoom: 1.2

    }],

  };
  
  //请求动态数据
  const db= wx.cloud.database();
  const map_ch = db.collection("world_map_ch");
  map_ch.get().then(re=>{
    
    const name = re.data[0]
    option.series[0].nameMap = name
    chart.setOption(option)
    
  });

  //请求云函数 
  wx.cloud.callFunction({
    name:"countryList",
    success(res){
      
      const dataList = [];
      const innerData = res.result.data
      option.series[0].data = dataList;
      for (var i = 0;i < innerData.length;i++ ){
        var list = {"name":innerData[i].country,"value":innerData[i].confirmed}
        dataList.push(list)
      }
      option.series[0].data = dataList
      chart.setOption(option)
    },fail(res){
      
    }
  });

  return chart  
   
}
Component({
  properties:{
  },

  data: {
    ec: {
      onInit: initChart
    },
  },

  methods: {  
  },

})

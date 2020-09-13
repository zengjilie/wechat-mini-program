// components/map/map.js
import * as echarts from '../../ec-canvas/echarts';
import geoJson from './china.js';

const app = getApp();

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  echarts.registerMap('china', geoJson);

  const option = {
    tooltip: {
      formatter:function(e, t, n) {
        return .5 == e.value ? e.name + "：有疑似病例" :  e.name + "：" + e.value
      }
    },
    title: {
      text: '国内疫情累计确诊地图',
      left:17,
      top:17,
      textStyle:{
        color: '#fff',
        fontWeight : 'bold',
        fontSize :'18' 
      },
      
    },
    visualMap: { 
      orient: 'horizontal', 
      left:24,
      bottom:24,
      pieces: [
          {gt:10000,symbol:'circle',color:'#bb86fc'},
          {min: 1000, max: 9999,symbol:'circle',color:'#d2aefd'},
          {min: 100, max:999 ,symbol:'circle',color:'#e8d7fe'},
          {min:0,max:99 ,symbol:'circle',color:'#fff'}
      ],
      textStyle:{color:'#fff',fontSize:11},
      symbolSize: 0.5
      
    },
    series: [{
      type: 'map',
      mapType: 'china',
      geoIndex: 0,
      data: []
    }],

  };

  //请求云函数 
  wx.cloud.callFunction({
    name:"provinceList",
    success(res){
      
      const dataList = [];
      const innerData = res.result.data
      option.series[0].data = dataList;
      for (var i = 0;i < innerData.length;i++ ){
        var list = {"name":innerData[i].province,"value":innerData[i].confirmed}
        dataList.push(list)
      }
      option.series[0].data = dataList
      chart.setOption(option)
    },fail(res){
      
    }
  });

  chart.setOption(option);

  return chart;
}
Component({
  properties:{
  },
  data: {
    ec: {
      onInit: initChart
    }
  },
  methods: {  
  },
  
})



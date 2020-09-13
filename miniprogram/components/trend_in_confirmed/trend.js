// components/trend/trend.js
import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  
  
  var option = {
    backgroundColor: '#080b30',
    title: {
        text: '全国新增确诊趋势图',
        textStyle: {  
            color: '#fff',
            fontSize: 18,
            fontWeight : 'bold'
        },
        left:17,
        top:17,
    },
    tooltip: {
        show: true,
        trigger: 'axis',
        triggerOn : 'click',
    },
    grid: {
        top: '20%',
        left: '5%',
        right: '8%',
        bottom: '10%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        axisLine: {
            show: true
        },
        splitArea: {
            // show: true,
            color: '#f00',
            lineStyle: {
                color: '#f00'
            },
        },
        axisLabel: {
            color: '#fff',
            fontSize:10,
            interval: 13,
        },
        splitLine: {
            show: false
        },
        boundaryGap: false,
        data:[]

    }],

    yAxis: [{
        type: 'value',
        min: 0,
        // max: 140,
        splitNumber: 4,
        splitLine: {
            show: true,
            lineStyle: {
                color: 'rgba(255,255,255,0.1)'
            }
        },
        axisLine: {
            show: true,
        },
        axisLabel: {
            show: true,
            margin: 20,
            textStyle: {
                color: '#d1e6eb',

            },
        },
        axisTick: {
            show: false,
        },
    }],
    series: [{
            name: '新增确诊',
            type: 'line',
            // smooth: true, //是否平滑
            showAllSymbol: true,
            symbolSize: 0,
            // symbol: 'image://./static/images/guang-circle.png',
            lineStyle: {
                normal: {
                    color: "#bb86fc",
                    shadowColor: 'rgba(187, 134, 252, 0.3)',
                    shadowBlur: 5,
                    // shadowOffsetY: 5,
                    // shadowOffsetX: 5,
                },
            },
            label: {
                show: false,
                position: 'top',
                textStyle: {
                    color: '#00b3f4',
                }
            },
            itemStyle: {
                color: "#00b3f4",
                borderColor: "#fff",
                borderWidth: 3,
                shadowColor: 'rgba(0, 0, 0, .3)',
                shadowBlur: 0,
                shadowOffsetY: 2,
                shadowOffsetX: 2,
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(187,134,252,0.3)',
                        },
                        {
                            offset: 1,
                            color: 'rgba(0,0,0,0)'
                        }
                    ], false),
                    shadowColor: 'rgba(187,134,252,0.9)',
                    shadowBlur: 5
                }
            },
            data:[]
        }
      ]
  };
  
  //请求云数据
  const db = wx.cloud.database();
  const dat = db.collection('trend_in');
  dat.get().then(re=>{
      //只能用正则
      const list = re.data[0];
      const date = list.date;
      var a = /["\[\]']/g;
      const b = date.replace(a," ");
      const dateList = b.split(',');
      const confirmed = JSON.parse(list.confirmed);
      
    
      option.xAxis[0].data = dateList;
      option.series[0].data = confirmed;
    chart.setOption(option); 
  })
  return chart; 
}


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
    ec: {
      onInit: initChart
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

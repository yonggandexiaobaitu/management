import * as echarts from 'echarts';
export default (ele) => {
  // 基于准备好的dom，初始化echarts实例
  console.log('当前ele',ele);
  let myChart = echarts.init(ele);

  const setOption = function (options) {
    // 绘制图表
    myChart.setOption(options);
  }
  return {
    myChart,
    setOption
  }

}

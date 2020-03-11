<template>
  <div class="section">      
    <Chart :options="chartOptions"></Chart>
  </div>
</template>

<script>
import { Chart } from 'highcharts-vue'
export default {
  props: [
    'data'
  ],
  components: {
    Chart
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: 'column',
          backgroundColor: null
        },
        title: {
          text: 'Results: Listeners per country',
          style: {
            color: '#FE019A'
          }
        },
        xAxis: {
          type: 'category',
          labels: {             
            style: {
              color: '#FAED27',
              fontSize: '1.3em'
            },          
          }
        },
        yAxis: {
          title: {
            text: 'Listeners',
            style: {
              color: '#FAED27',
              fontSize: '1.3em'
            },
          },          
          tickInterval: 5,
          labels: {             
            style: {
              color: '#FFFFFF',
            },          
          }   
        },
        series: [{
          name: 'Listeners per country',
          data: this.data,
          dataLabels: {
            enabled: true,             
            style: {
              color: '#FAED27',
              fontSize: '1.1em'
            },
          }
        }],
        legend: {
          enabled: false
        },
      }
    }
  },
  watch: {
    data(val) {
      this.chartOptions.series[0].data = val
    }
  }
  
}
</script>

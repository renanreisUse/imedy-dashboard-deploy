<template>
  <div>
    <!--Stats cards-->
    <div class="row">
      <div class="col-lg-6 col-sm-6" v-for="stats in statsCards" :key="stats.id">
        <stats-card>
          <div class="numbers" slot="content">
            <p>{{stats.title}}</p>
            {{stats.value}}
          </div>
          <div class="stats" slot="footer">
            {{stats.footerText}}
          </div>
        </stats-card>
      </div>
    </div>
    
    <div class="row">
      <div class="col-lg-12 col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Cadastros</h3>
            <div class="tags">
              <i class="fa fa-circle text-info"></i> Pacientes
              <i class="fa fa-circle text-warning"></i> Profissionais
            </div>
          </div>
          <div class="card-content">
            <div id="chartActivity" class="ct-chart"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12 col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Representação geral</h3>
            <p>Atendimentos realizados</p>
          </div>
          <div class="card-content">
            <div id="chartPreferences" class="ct-chart" style="height: 300px"></div>
          </div>
          <div class="legend">
            <i class="fa fa-circle text-warning"></i> <span>Consulta presencial</span>
            <i class="fa fa-circle text-danger"></i> <span>Atendimento imediato</span>
            <i class="fa fa-circle text-info"></i> <span> Consulta online</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
  import ChartCard from 'src/components/UIComponents/Cards/ChartCard.vue'
  import Chartist from 'chartist'

  export default {
    components: {
      StatsCard,
      ChartCard
    },
    data () {
      return {
        $Chartist: null,
        statsCards: [
          {
            title: 'Associadoss El Kadri',
            value: '0',
            footerText: 'Profissionais',
            id: 1
          },
          {
            title: 'Não Associadoss El Kadri',
            value: '0',
            footerText: 'Profissionais',
            id: 2
          }
        ]
      }
    },
    methods: {
      initActivityChart () {
        const data = {
          labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
          series: [
            [50, 100, 50, 150, 100, 110, 100, 50, 100, 50, 150, 100, 150, 50, 150, 100, 150, 50, 100, 50, 150],
            [100, 50, 100, 50, 150, 50, 150, 50, 50, 150, 100, 100, 50, 100, 150, 50, 50, 50, 150, 50, 100]
          ]
        }

        const options = {
          seriesBarDistance: 10,
          axisX: {
            showGrid: false
          },
          height: '420px'
        }

        const responsiveOptions = [
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc (value) {
                return value[0]
              }
            }
          }]
        ]
        this.$Chartist.Bar('#chartActivity', data, options, responsiveOptions)
      },
      initCharts () {
        this.initActivityChart()
      },
      initPieChart () {
        Chartist.Pie('#chartPreferences', {
          labels: ['62%', '32%', '6%'],
          series: [62, 32, 6],
          options: {
            height: '420px'
          }
        })
      }
    },
    async mounted () {
      const Chartist = await import('chartist')
      this.$Chartist = Chartist
      this.initCharts()
      this.initPieChart()
    }
  }

</script>
<style scoped>
.card-title{
  padding: 20px;
}
.tags{
margin-left: 15px;
}
.legend{
  display: flex;
  align-items: center;
  justify-content: center;
}
.legend span{
  margin-right: 100px;
}
.card-header p{
  margin-left: 22px;
}
</style>

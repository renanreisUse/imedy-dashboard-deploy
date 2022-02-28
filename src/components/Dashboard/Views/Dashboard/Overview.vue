<template>
  <div>
    <div class="row">
      <div class="col-lg-6 col-sm-6">
        <stats-card>
          <div class="numbers" slot="content">
            <p>Associadoss El Kadri</p>
            {{ homeObj.totalElKadriDoctors }}
          </div>
          <div class="stats" slot="footer">
            Profissionais
          </div>
        </stats-card>
      </div>
      <div class="col-lg-6 col-sm-6">
        <stats-card>
          <div class="numbers" slot="content">
            <p>Beneficiarios El Kadri</p>
            {{ homeObj.totalElKadriPatients }}
          </div>
          <div class="stats" slot="footer">
            Pacientes
          </div>
        </stats-card>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12 col-md-12">
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
      <div class="col-lg-12 col-md-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Representação geral</h3>
            <p>Atendimentos realizados</p>
          </div>
          <div class="card-content">
            <div
              id="chartPreferences"
              class="ct-chart"
              style="height: 420px"
            ></div>
          </div>
          <div class="legend">
            <i class="fa fa-circle text-warning"></i>
            <span>Consulta presencial</span>
            <i class="fa fa-circle text-danger"></i>
            <span>Atendimento imediato</span>
            <i class="fa fa-circle text-info"></i> <span> Consulta online</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import StatsCard from "src/components/UIComponents/Cards/StatsCard.vue";
import Chartist from "chartist";
import HomeService from "src/services/home.service.js";

export default {
  components: {
    StatsCard
  },
  data() {
    return {
      homeObj: null
    };
  },
  methods: {
    getHomeInfo() {
      return HomeService.getHomeData().then(({ data }) => {
        this.homeObj = data;
      });
    },
    initActivityChart() {
      const obj = this.homeObj;
      const patientsArray = obj.registeredPatients.map(item => {
          return item.count;
        }),
        doctorArray = obj.registeredDoctors.map(item => {
          return item.count;
        });
      const data = {
        labels: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
        series: [patientsArray, doctorArray]
      };

      const options = {
        seriesBarDistance: 10,
        axisX: {
          showGrid: false,
        },
        axisY:{
          labelInterpolationFnc(value) {
            return Math.floor(value);
          }
        },
        height: "420px"
      };

      const responsiveOptions = [
        [
          "screen and (max-width: 640px)",
          {
            seriesBarDistance: 20,
            axisX: {
              labelInterpolationFnc(value) {
                return value[0];
              }
            }
          }
        ]
      ];
      Chartist.Bar("#chartActivity", data, options, responsiveOptions);
    },
    initPieChart() {
      const obj = this.homeObj;
      const data = {
        labels: [
          `${obj.onlineAttendances}%`,
          `${obj.presentialAttendances}%`,
          `${obj.immediateAttendances}%`
        ],
        series: [1, 1, 1]
      }
      
      Chartist.Pie("#chartPreferences", data);
    },
    initCharts() {
      this.initActivityChart();
      this.initPieChart();
    }
  },
  async mounted() {
    await this.getHomeInfo();
    this.initCharts();
  }
};
</script>
<style scoped>
.card-title {
  padding: 20px;
}
.tags {
  margin-left: 15px;
}
.legend {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
}
.legend span {
  margin-right: 100px;
}
.card-header p {
  margin-left: 22px;
}
</style>

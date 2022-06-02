<template>
  <PaginatedTables
    tableName="Todas as Consultas"
    :table-columns="tableColumns"
    :total-pages="totalPages"
    :table-data="attendancies"
    :props-to-search="propsToSearch"
    :show-visualization="false"
    :show-profile="true"
    :show-eye="true"
    :show-edit="true"
    :delete-btn="true"
    @profile-btn="showDoctor"
    @eye-btn="showPatient"
    @delete-row="deleteAttendance"
    @page-value="changePage"
  >
    <template v-slot:filter>
      <div class="filterContent">
        <label for="year">Ano</label>
        <date-picker
          class="picker-default"
          id="year"
          v-model="filterParams.year"
          type="year"
          size="mini">
        </date-picker>

        <label for="month">Mês</label>
        <date-picker
          class="picker-default"
          id="month"
          v-model="filterParams.month"
          type="month"
          size="mini"
          format="MMMM">
        </date-picker>

        <label for="day">Dia</label>
        <date-picker
          class="picker-default"
          id="day"
          v-model="filterParams.day"
          type="date"
          size="mini"
          format="dd">
        </date-picker>
      </div>
    </template>
  </PaginatedTables>
</template>

<script>
import PaginatedTables from "src/components/Dashboard/Views/Tables/PaginatedTables.vue";
import AttendanceService from "src/services/attendance.service.js";

import { DatePicker } from 'element-ui'
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

const currencyFomater = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export default {
  components: {
    PaginatedTables,
    DatePicker,
  },
  data() {
    return {
      params: {},
      filterParams: {
        day: '',
        month: '',
        year: ''
      },
      totalPages: 0,
      attendancies: [],
      propsToSearch: ["patient", "doctor", "specialty"],
      tableColumns: [
        {
          prop: "patient",
          label: "Paciente",
          minWidth: 200,
        },
        {
          prop: "doctor",
          label: "Médico",
          minWidth: 200,
        },
        {
          prop: "speciality",
          label: "Especialidade",
          minWidth: 120,
        },
        {
          prop: "date",
          label: "Data",
          minWidth: 120,
        },
        {
          prop: "value",
          label: "Valor",
          minWidth: 100,
        },
      ],
    };
  },
  methods: {
    getDefaultParams() {
      const currentDate = new Date().toLocaleDateString().split('/');
      return {
        page: 1,
        limit: 10,
        // day: currentDate[0],
        // month: currentDate[1],
        year: currentDate[2],
      }
    },
    getAllByFilter(params) {
      AttendanceService.getAllByFilter(
        new URLSearchParams(params)
      )
        .then((response) => {
          this.totalPages = response.data.totalPages;
          this.attendancies = response.data.attendances.map((item) => {
            const date = new Date(item.date);
            return {
              id: item.id,
              patientId: (item.patient ? item.patient.id : ''),
              patient: (item.patient ? item.patient.name : ''),
              doctorId: (item.doctor ? item.doctor.id : ''),
              doctor: (item.doctor ? item.doctor.name : ''),
              speciality: item.specialtyName,
              date: `${date.toLocaleDateString()} - ${date.toLocaleTimeString().substring(-2, 5)}`,
              value: currencyFomater.format(item.value),
            };
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    changePage({limit, page}) {
      this.params.limit = limit;
      this.params.page = page;
      this.getAllByFilter(this.params);
    },
    getAttendance(id) {
      return this.attendancies.find((el) => el.id == id);
    },
    showDoctor(id) {
      const doctorId = this.getAttendance(id).doctorId;
      this.$router.push(`/usuarios/profile/${doctorId}`);
    },
    showPatient(id) {
      const patientId = this.getAttendance(id).patientId;
      this.$router.push(`/usuarios/profile2/${patientId}`);
    },
    editAttendance(id) {
      console.log(id);
    },
    deleteAttendance(id) {
      this.showModal({
        title: "Cancelar Consulta",
        html: `<p>Deseja  mesmo <span style="color: #EF0028">Cancelar</span> a consulta? O valor será estornado para o paciente.</p>`,
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "SIM, CANCELAR",
      })
      .then((result) => {
        console.log(result);
      })
      .catch(() => {});
    },
    showModal(
      config = {
        title: "",
        html: "",
        type: "",
        showCancelButton: false,
        confirmButtonText: "",
      }
    ) {
      return Swal({
        title: config.title,
        html: config.html,
        type: config.type,
        showCancelButton: config.showCancelButton,
        confirmButtonColor: "#19B128",
        cancelButtonColor: "#EF0028",
        confirmButtonText: config.confirmButtonText,
        cancelButtonText: "CANCELAR",
      });
    },
  },
  beforeMount() {
    this.getAllByFilter(this.getDefaultParams());
  },
  mounted() {
    this.params = this.getDefaultParams();
    this.year = this.params.year;
  }
};
</script>

<style scoped>
.picker-default {
  width: 90px;
  height: 20px;
  border-radius: 4px;
}
</style>
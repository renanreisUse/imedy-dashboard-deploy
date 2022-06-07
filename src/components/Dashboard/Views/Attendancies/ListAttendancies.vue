<template>
  <div>
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
      @edit-btn="editAttendance"
      @delete-row="cancelModal"
      @page-value="changePage"
      @search-table="searchByField"
    >
      <template v-slot:filter>
        <div class="filter-content">
          <label for="year">Ano</label>
          <select
            id="year"
            class="default-select"
            v-model="filterParams.year">
            <option
              v-for="item in 10"
              :key="item"
              :label="2020 + item"
              :value="2020 + item"
            ></option>
          </select>

          <label for="month">Mês</label>
          <select
            id="month"
            class="default-select"
            v-model="filterParams.month"
            :disabled="filterParams.year == ''"
          >
            <option
              v-for="item in months"
              :key="item.id"
              :label="item.desc"
              :value="item.id"
            ></option>
          </select>

          <label for="day">Dia</label>
          <select
            id="day"
            class="default-select"
            v-model="filterParams.day"
            :disabled="filterParams.month == ''"
          >
            <option
              v-for="item in getMonthDates"
              :key="item"
              :label="item"
              :value="item"
            ></option>
          </select>

          <el-button
            type="text"
            class="filter-btn"
            :disabled="!isFilterValid"
            @click="filterAttendances"
            >Filtar</el-button
          >

          <el-button
            type="text"
            class="filter-btn"
            :disabled="!isClearEnabled"
            @click="clearFilter"
            >Limpar</el-button
          >
        </div>
      </template>
    </PaginatedTables>

    <CustomModal v-if="showModal" title="Alterar data e hora" @close-modal="clearEdit">
      <template #body>
        <RescheduleForm
          :attendance="attendanceToEdit"
          @reschedule-save="rescheduleAttendance"
          @reschedule-close="clearEdit" />
      </template>
    </CustomModal>

  </div>
</template>

<script>
import { Button } from "element-ui";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

import PaginatedTables from "src/components/Dashboard/Views/Tables/PaginatedTables.vue";
import RescheduleForm from "src/components/Dashboard/Views/Attendancies/RescheduleForm.vue";
import CustomModal from "src/components/UIComponents/Modal/CustomModal.vue";

import AttendanceService from "src/services/attendance.service.js";


const currencyFomater = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export default {
  components: {
    "el-button": Button,
    PaginatedTables,
    RescheduleForm,
    CustomModal,
  },
  data() {
    return {
      totalPages: 0,
      showModal: false,
      isClearEnabled: false,
      attendanceToEdit: {},
      filterParams: {
        page: 1,
        limit: 10,
        day: "",
        month: "",
        year: "",
      },
      months: [
        { id: '01', desc: "Janeiro" },
        { id: '02', desc: "Fevereiro" },
        { id: '03', desc: "Março" },
        { id: '04', desc: "Abril" },
        { id: '05', desc: "Maio" },
        { id: '06', desc: "Junho" },
        { id: '07', desc: "Julho" },
        { id: '08', desc: "Agosto" },
        { id: '09', desc: "Setembro" },
        { id: '10', desc: "Outubro" },
        { id: '11', desc: "Novembro" },
        { id: '12', desc: "Dezembro" },
      ],
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
  computed: {
    isFilterValid() {
      return (
        this.filterParams.year != "" &&
        this.filterParams.month != "" &&
        this.filterParams.day != ""
      );
    },
    getMonthDates() {
      const dates = [];
      if (this.filterParams.year != "" && this.filterParams.month != "") {
        const date = new Date(
          this.filterParams.year,
          this.filterParams.month - 1,
          1
        );
        while (date.getMonth() === this.filterParams.month - 1) {
          const day = date.getDate();
          dates.push(day.toString().length >= 2 ? day : '0' + day);
          date.setDate(date.getDate() + 1);
        }
      }
      this.filterParams.day = "01";
      return dates;
    },
  },
  methods: {
    rescheduleAttendance(values) {
      AttendanceService.rescheduleAttendance(this.attendanceToEdit.id, `${values.date}T${values.hour}:00.000Z`)
      .then((response) => {
        this.showSuccessMessage('Data e/ou hora da consulta alterado com sucesso!')
        .then(() => {
          this.clearEdit();
          this.getAllByFilter(this.filterParams)
        });
      })
      .catch((e) => {
        this.showErrorMessage('Não foi possível editar a data/hora  da consulta.');
      });
    },
    getDefaultParams() {
      const currentDate = new Date().toLocaleDateString().split("/");
      return {
        page: 1,
        limit: 10,
        day: currentDate[0],
        month: currentDate[1],
        year: currentDate[2],
      };
    },
    getAllByFilter(params) {
      AttendanceService.getAllByFilter(new URLSearchParams(params))
        .then((response) => {
          this.totalPages = response.data.totalPages;
          this.attendancies = response.data.attendances.map((item) => {
            const date = new Date(item.date);
            return {
              id: item.id,
              patientId: item.patient ? item.patient.id : '',
              patient: item.patient ? item.patient.name : '',
              doctorId: item.doctor ? item.doctor.id : '',
              doctor: item.doctor ? item.doctor.name : '',
              speciality: item.specialtyName,
              date: `${date.toLocaleDateString()} - ${date
                .toLocaleTimeString()
                .substring(-2, 5)}`,
              value: currencyFomater.format(item.value),
            };
          });
        })
        .catch((e) => {
          this.showErrorMessage('Não foi possível buscar os atendimentos. Por favor, tente novamente.');
        });
    },
    searchByField(value) {
      this.isClearEnabled = value.length > 0;
      return this.getAllByFilter({
        page: 1,
        limit: 10,
        search: value,
        ...this.filterParams,
      });
    },
    filterAttendances() {
      this.isClearEnabled = true;
      return this.getAllByFilter(this.filterParams);
    },
    clearFilter() {
      this.isClearEnabled = false;
      this.filterParams = {
        day: "",
        month: "",
        year: "",
      };
      return this.getAllByFilter(this.getDefaultParams());
    },
    changePage({ limit, page }) {
      this.filterParams.limit = limit;
      this.filterParams.page = page;
      this.getAllByFilter(this.filterParams);
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
      this.attendanceToEdit = this.getAttendance(id);
      this.showModal = true;
    },
    clearEdit() {
      this.showModal = false;
      this.attendanceToEdit = {};
    },
    cancelAttendance(id) {
      return AttendanceService.cancelAttendance(id)
      .then(() => {
        this.showSuccessMessage('Consulta cancelada com sucesso.')
        .then(() => {
          this.getAllByFilter(this.filterParams);
        });
      })
      .catch(() => {
        this.showErrorMessage('Não foi possível cancelar a consulta.')
      })
    },
    cancelModal(id) {
      this.showMessage({
        title: "Cancelar Consulta",
        html: `<p>Deseja  mesmo <span style="color: #EF0028">Cancelar</span> a consulta? O valor será estornado para o paciente.</p>`,
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "SIM, CANCELAR",
      })
      .then((result) => {
        return this.cancelAttendance(id)
      })
      .catch(() => {});
    },
    showSuccessMessage(message) {
      return this.showMessage({
        title: "Sucesso!",
        html: `<p>${message}</p>`,
        type: "success",
        showCancelButton: false,
        confirmButtonText: "OK",
      });
    },
    showErrorMessage(message) {
      return this.showMessage({
        title: "Ops, algo deu errado.",
        html: `<p>${message}</p>`,
        type: "warning",
        showCancelButton: false,
        confirmButtonText: "FECHAR",
      });
    },
    showMessage(
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
    this.filterParams = this.getDefaultParams();
  },
};
</script>

<style scoped>
.filter-content select {
  width: 80px;
  margin-right: 25px;
}

.filter-btn {
  width: 50px;
  height: 20px;
  margin-right: 20px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  color: #987bec;
}

.filter-btn:disabled {
  color: #c0c0c0;
}
</style>
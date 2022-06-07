<template>
  <div>
    <SimpleTable
      tableName="Próximas Consultas"
      :tableColumns="tableColumns"
      :tableData="attendancies"
      :canEdit="true"
      :canDelete="true"
      @show-item="showPatient"
      @edit-item="editAttendance"
      @delete-item="cancelModal"
    />

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
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

import SimpleTable from "../../Tables/SimpleTable.vue";
import CustomModal from "src/components/UIComponents/Modal/CustomModal.vue";
import RescheduleForm from "src/components/Dashboard/Views/Attendancies/RescheduleForm.vue";

import AttendanceService from "src/services/attendance.service.js";


const currencyFomater = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export default {
  components: {
    SimpleTable,
    CustomModal,
    RescheduleForm,
  },
  data() {
    return {
      showModal: false,
      professinalId: '',
      attendanceToEdit: {},
			attendancies: [],
      tableColumns: [
				{
          prop: "patientName",
          label: "Paciente",
          minWidth: 250,
        },
        {
          prop: "specialization",
          label: "Especialidade",
          minWidth: 250,
        },
        {
          prop: "date",
          label: "Data",
          minWidth: 150,
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
    rescheduleAttendance(values) {
      AttendanceService.rescheduleAttendance(this.attendanceToEdit.id, `${values.date}T${values.hour}:00.000Z`)
      .then((response) => {
        this.showSuccessMessage('Data e/ou hora da consulta alterado com sucesso!')
        .then(() => {
          this.clearEdit();
          this.getNextByDoctorId(this.professinalId)
        });
      })
      .catch((e) => {
        this.showErrorMessage('Não foi possível editar a data/hora  da consulta.');
      });
    },
    getNextByDoctorId(id) {
      AttendanceService.getNextByDoctorId(id)
      .then((result) => {
        this.attendancies = result.data.map(item => {
          const date = new Date(item.date);
          return {
            id: item.id,
            doctorId: id,
            patientId: item.patient ? item.patient.id : '',
            patientName: item.patient ? item.patient.name : '',
            specialization: item.specialtyName,
            date: `${date.toLocaleDateString()} - ${date
                .toLocaleTimeString()
                .substring(-2, 5)}`,
            value: currencyFomater.format(item.value)
          }
        })
      })
      .catch((e) => {
        this.showErrorMessage('Não foi possível buscar os atendimentos. Por favor, tente novamente.');
      })
    },
    getAttendance(id) {
      return this.attendancies.find((el) => el.id == id);
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
          this.getNextByDoctorId(this.professinalId);
        });
      })
      .catch((e) => {
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
  mounted() {
    this.professinalId = this.$route.params.id;
    this.getNextByDoctorId(this.professinalId);
    // this.attendancies.push({
    //   id: '12345678',
    //   patientId: '6d6ccf69-259c-480e-852d-f447dbbc3f0d',
    //   patientName: 'Fulano Da Silva',
    //   specialization: 'Clínico Geral',
    //   date: '06/06/2022',
    //   value: 'R$ 200,00'
    // })
  },
};
</script>

<style>
</style>
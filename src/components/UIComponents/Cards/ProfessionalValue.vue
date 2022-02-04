<template>
  <div class="card">
    <div class="card-header">
      <h3 class="title">Valor da Consulta</h3>
    </div>
    <div class="card-content">
      <div class="row">
        <div class="inputs col-12">
          <div class="col-lg-4 ttt">
            <fg-input
              type="number"
              label="Valor da consulta"
              class="currency-input"
              v-model.number="appointmentValue"
            />
          </div>
          <div class="col-lg-4 col-12">
            <fg-input
              type="number"
              label="Valor da consulta El Kadri"
              v-model.number="elKadriValue"
            />
          </div>
          <button @click="updateValue" class="imedy-btn text-uppercase">
            Salvar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DoctorService from "src/services/doctor.service.js";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
export default {
  props: {
    appointmentValue: Number,
    elKadriValue: Number
  },
  methods: {
    updateValue() {
      const data = {
        medicalAppointmentValue: this.appointmentValue,
        medicalAppointmentValueElKadri: this.elKadriValue
      };
      console.log(data);
      DoctorService.updateMedicalAppointment(this.$route.params.id, data)
        .then(() => {
          Swal("Sucesso!", "O valor da consulta foi atualizado", "success");
        })
        .catch(() => {
          Swal("Ops!", "Ocorreu um erro ao atualizar o valor", "warning");
        });
    }
  }
};
</script>

<style scoped>
.inputs {
  display: flex;
  align-items: center;
}
</style>

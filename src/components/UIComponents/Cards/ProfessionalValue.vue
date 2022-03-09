<template>
  <div class="card" v-if="this.userRole === 'MANAGER'">
    <div class="card-header">
      <h3 class="title">Valor da Consulta</h3>
    </div>
    <div class="card-content">
      <div class="row">
        <div class="inputs col-12">
          <div class="col-lg-4">
            <label>Valor da consulta</label>
            <money
              class="form-control"
              v-model.number="appointmentValue"
              v-bind="money"
            />
          </div>
          <div class="col-lg-4 col-12">
            <label>Valor da consulta <b>El Kadri</b> </label>
            <money
              class="form-control"
              v-model.number="elKadriValue"
              v-bind="money"
            />
          </div>
          <div class="button-div">
            <button @click="updateValue" class="imedy-btn text-uppercase">
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DoctorService from "src/services/doctor.service.js";
import { Money } from "v-money";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
export default {
  props: {
    appointmentValue: Number,
    elKadriValue: Number,
    userRole: String
  },
  components: {
    Money
  },
  data() {
    return {
      price: 123.45,
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        precision: 2,
        masked: false
      }
    };
  },
  methods: {
    updateValue() {
      const data = {
        medicalAppointmentValue: this.appointmentValue,
        medicalAppointmentValueElKadri: this.elKadriValue
      };
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
  margin-bottom: 30px;
}
.button-div {
  width: 35%;
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
  margin-right: 1rem;
}
@media (max-width: 650px) {
  .inputs {
    flex-direction: column;
    align-items: stretch;
  }
  .button-div {
    width: 100%;
    justify-content: center;
  }
}
</style>

<template>
  <div class="card">
    <div class="card-header">
      <h3 class="title">WhatsApp para suporte ao usuário</h3>
      <p class="subtitle">
        Através deste número os usuários Imedy, poderão entrar em contato com o
        suporte.
      </p>
    </div>
    <div class="card-content">
      <div class="phone-number">
        <fg-input
          type="number"
          class="whatsappNumber"
          label="Número do WhatsApp"
          placeholder="Ex: (XX) 000000000"
          v-model="whatsappNumber"
        />
        <img src="static/img/icons/whatsappIcon.svg" />
        <div class="button-div">
          <button class="imedy-btn text-uppercase"
            @click="updatePhone"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FaqService from "src/services/faq.service.js";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
export default {
  props: {
    whatsappNumber: Number
  },
  watch: {
    $route(to, from) {
      this.checkRouter();
    }
  },
  created() {
    this.checkRouter();
  },
  data() {
    endpoint: null;
  },
  methods: {
    checkRouter() {
      const params = this.$route.fullPath;
      const params1 = params.split("/");
      if (params1[3] === "professional") {
        this.endpoint = "professional";
      } else {
        this.endpoint = "patient";
      }
    },
    updatePhone() {
      const data = {
        ...(this.endpoint === 'professional')  && {professionalPhone: this.whatsappNumber},
        ...(this.endpoint === 'patient') && {patientPhone: this.whatsappNumber}
      }
      FaqService.updatePhoneNumber(data)
      .then(() => {
        Swal("Sucesso!", "Telefone atualizado com sucesso!", "success");
      })
      .catch(() => {
        Swal("Ops!", "Ocorreu um erro ao atualizar o número.", "warning");
      });
    }
  }
};
</script>
<style scoped>
.phone-number {
  display: flex;
  align-items: center;
}
.button-div {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.whatsappNumber {
  width: 40%;
  margin-right: 20px;
}
img {
  margin-top: 10px;
}
@media (max-width: 700px) {
  .phone-number {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .phone-number img {
    display: none;
  }
  .whatsappNumber {
    width: 100%;
  }
}
</style>

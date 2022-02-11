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
      <div class="change-password">
        <fg-input
          type="tel"
          class="whatsappNumber"
          label="Número do WhatsApp "
          placeholder="Ex: (XX) 000000000 "
          v-model="whatsappNumber"
        >
        </fg-input>
        <img src="static/img/icons/whatsappIcon.svg" />
        <div class="button-div">
          <button @click="updatePhone" class="imedy-btn text-uppercase">
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
  methods: {
    updatePhone() {
      FaqService.updatePhoneNumber({ phone: this.whatsappNumber })
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
.change-password {
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
  .change-password {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .change-password img {
    display: none;
  }
  .whatsappNumber {
    width: 100%;
  }
}
</style>

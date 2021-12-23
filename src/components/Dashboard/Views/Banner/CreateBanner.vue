<template>
  <div class="card col-lg-12">
    <div class="card-header">
      <h3 class="title">Criar Notificações</h3>
    </div>

    <div class="card-content">
      <div class="row">
        <div class="content-inputs col-lg-4">
          <label for="notification-title">Título principal</label>
          <textarea
            class="form-control"
            rows="3"
            v-model="bannerTitle"
            maxlength="30"
          />
          <p class="textCounter">
            {{ bannerTitle.length }}/{{ 30 - bannerTitle.length }}
          </p>

          <label for="notification-title">Parágrafo</label>
          <textarea
            class="form-control"
            rows="3"
            v-model="bannerParagraph"
            :maxlength="100"
          />
          <p class="textCounter">
            {{ bannerParagraph.length }}/{{ 100 - bannerParagraph.length }}
          </p>

          <div class="imageDiv">
            <image-input v-model="imageData" />
            <button class="save-btn text-uppercase">
              Alterar
            </button>
          </div>
        </div>

        <div class="notification-destiny col-lg-4">
          <p>Destino da notificação</p>
          <div class="radio" v-for="(item, index) in names" :key="index">
            <input
              type="radio"
              v-model="checkedCategories"
              :value="item.value"
              :id="item.name"
              @change="check($event)"
            />
            <label>{{ item.name }}</label>
          </div>
        </div>

        <div class="col-lg-4">
          <img src="static/img/phone.png" />
        </div>

        <div class=" col-lg-7">
          <complete-register-card
            :registerWarning="true"
            title="Como enviar corretamente a imagem "
            content="Desenvolver imagens para o slide em 100:326
            Atentar-se que o banner não é full-width
            Evite usar texto na imagem. 
            Desenvolva o conteúdo das imagens a partir do grid sugerido
            "
          />
        </div>
        
        <div class="create-banner col-lg-12 col-md-12">
          <button class="save-btn text-uppercase" @click="createBanner">
            Salvar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageInput from "src/components/UIComponents/Inputs/ImageInput.vue";
import CompleteRegisterCard from "../../../UIComponents/Cards/CompleteRegisterCard.vue";
import NotificationService from "src/services/notification.service.js";
export default {
  components: {
    ImageInput,
    CompleteRegisterCard
  },
  data() {
    return {
      names: [
        { name: "Todos", value: "ALL", checked: false },
        {
          name: "Pacientes benefíciarios",
          value: "BENEFICIARY_PATIENT",
          checked: false
        },
        {
          name: "Pacientes não benefíciarios",
          value: "NOT_BENEFICIARY_PATIENT",
          checked: false
        }
      ],
      checkedCategories: [],
      bannerTitle: "",
      bannerParagraph: "",
      imageData: null
    };
  },
  methods: {
    check() {
      const checkedCategories = this.checkedCategories;
      if (checkedCategories === "SELECTED_USERS") {
        this.disabled = false;
      }
    },
    createBanner() {
      const data = {
        title: this.bannerTitle,
        paragraph: this.bannerParagraph,
        image: this.imageData,
        recipients: this.checkedCategories
      };
      console.log(data);
      NotificationService.createNotification(data).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style scoped>
label,
p {
  color: #262626;
}
p.textCounter {
  margin-top: 5px;
  color: #fa8c16;
}
.inputArea {
  display: flex;
  justify-content: space-between;
}
.content-inputs label {
  margin-bottom: 10px;
}
.content-inputs p {
  margin-bottom: 30px;
}
.create-banner {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 50px;
}
.create-banner button {
  font-weight: 700;
  padding: 10px 35px;
  background-color: #718efa;
  color: #fff;
  border-radius: 3px;
  border: none;
  letter-spacing: 0.5px;
}
.imageDiv {
  border-style: dotted;
  border-color: #8c8c8c;
  border-radius: 12px;
  padding: 50px;
  width: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.imageDiv button {
  font-weight: 700;
  padding: 10px 35px;
  color: #718efa;
  border-radius: 5px;
  border-color: #718efa;
  background: transparent;
  letter-spacing: 0.5px;
  margin-top: 30px;
}
</style>

<template>
  <div class="card col-lg-12">
    <div class="card-header">
      <h3 class="title">Criar Notificações</h3>
    </div>

    <div class="card-content">
      <div class="row">
        <div class="content-inputs col-lg-3">
          <label for="notification-title">Título principal</label>
          <textarea
            class="form-control"
            rows="3"
            v-model="bannerTitle"
            maxlength="30"
          />
          <p class="textCounter">0/{{ 30 - bannerTitle.length }}</p>

          <label for="notification-title">Parágrafo</label>
          <textarea
            class="form-control"
            rows="3"
            v-model="bannerParagraph"
            :maxlength="100"
          />
          <p class="textCounter">0/{{ 100 - bannerParagraph.length }}</p>
        </div>

        <div class="notification-destiny col-lg-3">
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
        <div class="col-lg-6">
          <img src="static/img/phone.png" />
        </div>
        <div class="imageDiv col-lg-6">
          <image-input v-model="imageData" />
          <button class="save-btn text-uppercase">
            Alterar
          </button>
        </div>

        <div class="search-user col-lg-12">
          <button class="save-btn text-uppercase" @click="saveBanner">
            Salvar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageInput from "src/components/UIComponents/Inputs/ImageInput.vue";
export default {
  components: {
    ImageInput
  },
  data() {
    ImageInput;
    return {
      names: [
        { name: "Todos", value: "ALL", checked: false },
        { name: "Todos os pacientes", value: "PATIENTS", checked: false },
        { name: "Todos os profissionais", value: "DOCTORS", checked: false }
      ],
      checkedCategories: [],
      bannerTitle: "",
      bannerParagraph: ""
    };
  },
  methods: {
    check() {
      const checkedCategories = this.checkedCategories;
      if (checkedCategories === "SELECTED_USERS") {
        this.disabled = false;
      }
    },
    saveBanner() {
      const data = {
        title: this.bannerTitle,
        paragraph: this.bannerParagraph,
        image: "teste",
        recipients: this.checkedCategories
      };
      console.log(data);
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
.search-user {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 50px;
}
.search-user button {
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.imageDiv button {
  font-weight: 700;
  padding: 10px 35px;
  color: #718efa;
  border-radius: 3px;
  border-color: #718efa;
  background: transparent;
  letter-spacing: 0.5px;
  margin-top: 30px;
}
</style>

<template>
  <div class="card col-lg-12">
    <div class="card-header">
      <h3 class="title">Banner</h3>
    </div>

    <div class="card-content">
      <div class="row">
        <div class="content-inputs col-lg-4">
          <label for="notification-title">Título</label>
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
            <image-input 
              v-model="imageData" 
              @input="linkImg" />
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
            />
            <label>{{ item.name }}</label>
          </div>
        </div>

        <div class="col-lg-4 phoneMockup">
          <h3 class="title-preview">Preview no App</h3>
          <div
            class="image-input"
            id="image-preview"
            :style="{ 'background-image': `url(${imageUrl})` }"
          />
          <div class="text-content">
            <p>{{ bannerTitle }}</p>
            <p id="subtitle">{{ bannerParagraph }}</p>
          </div>
          <img src="static/img/phone.png" />
        </div>

        <div class="col-lg-12">
          <div class="card">
            <div class="card-content">
              <div class="conteudo">
                <div class="title">
                  <img src="static/img/icons/Bulb.svg" />
                </div>
                <div class="card-header">
                  <h3>Como enviar corretamente a imagem</h3>
                  <span>
                    <ul>
                      <li>Desenvolver imagens para o slide em 100:326</li>
                      <li>Atentar-se que o banner não é full-width</li>
                      <li>Evite usar texto na imagem.</li>
                      <li>Desenvolva o conteúdo das imagens a partir do grid sugerido</li>
                    </ul>
                  </span>
                </div>
              </div>
            </div>
          </div>
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
import BannerService from "src/services/banner.service.js";
import FileService from "src/services/file.service.js";
import "sweetalert2/dist/sweetalert2.css";
import Swal from "sweetalert2";
export default {
  components: {
    ImageInput,
    CompleteRegisterCard
  },
  data() {
    return {
      names: [
        {
          name: "Todos",
          value: "ALL",
          checked: false
        },
        {
          name: "Pacientes beneficiários",
          value: "BENEFICIARY_PATIENT",
          checked: false
        },
        {
          name: "Pacientes não beneficiários",
          value: "NOT_BENEFICIARY_PATIENT",
          checked: false
        }
      ],
      checkedCategories: [],
      bannerTitle: "",
      bannerParagraph: "",
      imageUrl: "",
      imageData: null
    };
  },
  methods: {
    linkImg() {
      const data = new FormData();
      data.append("file", this.imageData);
      FileService.getImageUrl(data).then(res => {
        this.imageUrl = res.data.url;
      });
    },
    async createBanner() {
      const data = new FormData();
      data.append("file", this.imageData);
      await FileService.getImageUrl(data)
        .then(res => {
          this.imageUrl = res.data.url;
        })
        .catch(() => {
          Swal({
            type: "warning",
            title: "Ops, algo deu errado",
            text: "Envie uma imagem válida.",
            confirmButtonColor: "#19B128",
            confirmButtonText: "FECHAR"
          });
          this.cleanInputs();
        });
      const dataObj = {
        title: this.bannerTitle,
        paragraph: this.bannerParagraph,
        image: this.imageUrl,
        recipients: this.checkedCategories
      };
      BannerService.createBanner(dataObj)
        .then(() => {
          this.$router.push("/banner/list");
          Swal({
            type: "success",
            title: "Sucesso!",
            text: `Seu Banner foi criado com sucesso.`,
            confirmButtonColor: "#19B128",
            confirmButtonText: "OK"
          });
          this.clearInputs();
        })
        .catch(() => {
          Swal({
            type: "warning",
            title: "Ops, algo deu errado",
            text: "Banner não enviado. Tente novamente.",
            confirmButtonColor: "#19B128",
            confirmButtonText: "FECHAR"
          });
          this.cleanInputs();
        });
    },
    clearInputs() {
      this.bannerTitle = "";
      this.bannerParagraph = "";
      this.imageUrl = "";
      this.checkedCategories = "";
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
  font-size: 12px;
  line-height: 14.63px;
  margin-top: 5px;
  color: #fa8c16;
}
.content-inputs label {
  margin-bottom: 10px;
  font-size: 15.4px;
  line-height: 27px;
}
.notification-destiny p {
  font-size: 15.4px;
  line-height: 27px;
}
.notification-destiny label{
  line-height: 22px;
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
.create-banner .imageDiv button {
  margin-top: 30px;
}
.image-input {
  display: block;
  width: 394px;
  height: 121px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
  border-radius: 12px;
}
.phoneMockup {
  position: relative;
}
#image-preview {
  position: absolute;
  left: 7rem;
  top: 18rem;
  width: 26rem;
  height: 9rem;
}
@media (max-width: 1540px) {
  #image-preview {
    position: absolute;
    width: 24rem;
    height: 8rem;
  }
  @media (max-width: 1190px) {
    #image-preview {
      position: absolute;
      width: 26rem;
      height: 9rem;
    }
  }
  @media (max-width: 460px) {
    #image-preview {
      position: absolute;
      left: 8rem;
      width: 22rem;
      height: 9rem;
    }
  }
}
.text-content {
  position: absolute;
  top: 18rem;
  left: 8rem;
  word-wrap: break-word;
  width: 24rem;
}
.text-content p {
  color: white;
}
.text-content p#subtitle{
  font-size: 14px;
}
.conteudo {
  display: flex;
  margin: 20px 30px;
}
.title{
  font-size: 24px;
  line-height: 30px;
  color: #262626;
}
.title img {
  margin-top: 4px;
}
.card-header h3 {
  margin-top: 0;
  font-size: 22px;
  line-height: 26.82px;
  color: #262626;
}
.card-header li{
  line-height: 22px;
  color: #262626;
}
.title-preview{
  margin-top: 0;
}
</style>

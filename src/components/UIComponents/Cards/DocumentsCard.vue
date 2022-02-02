<template>
  <div class="card" v-show="showComponent">
    <div class="card-content">
      <div class="card-main">
      
        <div class="conteudo" v-show="cardDocs">
          <div class="title">
            <h3>{{ cardName }}</h3>
          </div>
          <div class="card-docs">
            <div class="docs">
              <img src="static/img/icons/Picture.svg" />
              <a :href="documentLink" download target="_blank">
                {{ documentName }}
              </a>
            </div>
            <div class="card-button">
              <a
                :href="documentLink"
                download
                target="_blank"
                class="downloadBtn text-uppercase"
              >
                Baixar
              </a>
            </div>
          </div>
        </div>

        <div class="docs-status" v-show="showStatus">
          <div class="title">
            <h3>Status dos documentos</h3>
          </div>
          <div class="status-label" id="testerr">
            <span :class="changeClass">{{ status_description }}</span>
          </div>
          <p>Sobre a documentação recebida, deseja?</p>
          <button class="status-btn" id="approve-btn" @click="approveDocs">
            <i class="fa fa-check"></i>
            APROVAR
          </button>
          <button class="status-btn" id="reprove-btn" @click="reproveDocs">
            <i class="fa fa-times"></i>
            REPROVAR
          </button>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import DoctorService from "src/services/doctor.service.js";
export default {
  name: "DocumentsCard",
  props: {
    showStatus: {
      type: Boolean,
      default: false
    },
    cardDocs: {
      type: Boolean,
      required: false
    },
    showComponent: {
      type: Boolean,
      default: true
    },
    documentLink: String,
    cardName: String,
    documentName: String,
    profileStage: String
  },
  data() {
    return {
      status_description: "Aguardando Aprovação",
      changeClass: "label-status"
    };
  },
  methods: {
    approveDocs() {
      Swal({
        title: "Análise de documentos",
        text: "Deseja  mesmo APROVAR o documentos analizados?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#19B128",
        cancelButtonColor: "#EF0028",
        confirmButtonText: "SIM, APROVAR",
        cancelButtonText: "CANCELAR"
      }).then(() => {
        DoctorService.approveDocuments({ id: this.$route.params.id })
          .then(() => {
            Swal(
              "Sucesso!",
              "O profissional receberá um e-mail informando o status da documentação analisada",
              "success"
            );
            this.changeClass = "approve-status";
            this.status_description = "Aprovado";
          })
          .catch(() => {
            Swal(
              "Ops!",
              "Ocorreu um erro ao aprovar o profissional!",
              "warning"
            );
          });
      });
    },
    reproveDocs() {
      Swal({
        title: "Análise de documentos",
        text: "Deseja  mesmo REPROVAR o documentos analizados?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#19B128",
        cancelButtonColor: "#EF0028",
        confirmButtonText: "SIM, REPROVAR",
        cancelButtonText: "CANCELAR"
      }).then(() => {
        Swal(
          "Sucesso!",
          "O profissional receberá um e-mail informando o status da documentação analisada",
          "success"
        );
        this.changeClass = "reprove-status";
        this.status_description = "Reprovado";
      });
    },
    checkProfileStage() {
      switch (this.profileStage) {
        case "COMPLETE":
          this.changeClass = "label-status";
          break;
        case "APPROVED":
          this.changeClass = "approve-status";
          this.status_description = "Aprovado";
          break;
        case "DISAPPROVE":
          this.changeClass = "reprove-status";
          this.status_description = "Reprovado";
          break;
      }
    }
  },
  mounted() {
    this.checkProfileStage();
  }
};
</script>

<style scoped>
.status-label {
  margin-bottom: 22px;
}
.card-main .title h3 {
  margin-bottom: 26px;
  color: #222;
}
.card-docs {
  display: flex;
  justify-content: space-between;
}
.docs {
  margin-bottom: 8px;
  display: flex;
}
.card-docs a {
  color: #987bec;
}
.card-docs img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  align-items: center;
}
.card-docs .downloadBtn {
  border-radius: 50px;
  border: none;
  color: white;
  background-color: #718efa;
  font-weight: 700;
  font-size: 12px;
  font-family: Montserrat;
  padding: 4px 12px;
}
.status-btn {
  border: none;
  border-radius: 3px;
  background-color: #8c8c8c;
  color: #fff;
  font-size: 15px;
  padding: 10px 20px;
  margin-right: 15px;
  font-family: Montserrat;
  font-weight: 600;
  margin-bottom: 20px;
}
.docs-status {
  color: #595555;
}
#approve-btn {
  background-color: #19b128;
}

#reprove-btn {
  background-color: #ef0028;
}
</style>

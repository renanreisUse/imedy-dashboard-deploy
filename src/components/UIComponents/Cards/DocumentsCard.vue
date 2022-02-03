<template>
  <div class="card" v-show="showComponent">
    <div class="card-content">
      <div class="card-main">
        <div class="conteudo" v-show="cardDocs">
          <div class="title">
            <h3>{{ cardName }}</h3>
          </div>
          <div
            class="card-docs"
            v-for="(document, index) in documents"
            :key="index"
          >
            <div class="docs">
              <img src="static/img/icons/Picture.svg" />
              <a :href="document.image" target="_blank">
                {{ document.type }}
              </a>
            </div>
            <div class="card-button">
              <a
                :href="document.image"
                download
                target="_blank"
                class="download-btn"
              >
                BAIXAR
              </a>
            </div>
          </div>
        </div>

        <div class="docs-status" v-show="showStatus">
          <div class="title">
            <h3>Status dos documentos</h3>
          </div>
          <div class="status-label">
            <span :class="label_class">{{ label_description }}</span>
          </div>
          <p>Sobre a documentação recebida, deseja?</p>
          <button class="status-btn approve" @click="approveDocs">
            <i class="fa fa-check"></i>
            APROVAR
          </button>
          <button
            class="status-btn reprove"
            id="reprove-btn"
            @click="reproveDocs"
          >
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
    documents: Array,
    cardName: String,
    documentLink: String,
    documentName: String,
    profileStage: String
  },
  data() {
    return {
      label_description: "Aguardando Aprovação",
      label_class: "label-status"
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
            this.label_class = "approve-status";
            this.label_description = "Aprovado";
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
        DoctorService.disapproveDocuments({ id: this.$route.params.id })
          .then(() => {
            Swal(
              "Sucesso!",
              "O profissional receberá um e-mail informando o status da documentação analisada",
              "success"
            );
            this.label_class = "reprove-status";
            this.label_description = "Reprovado";
          })
          .catch(() => {
            Swal(
              "Ops!",
              "Ocorreu um erro ao reprovar o profissional!",
              "warning"
            );
          });
      });
    },
    checkProfileStage() {
      switch (this.profileStage) {
        case "COMPLETE":
          this.label_class = "label-status";
          break;
        case "APPROVED":
          this.label_class = "approve-status";
          this.label_description = "Aprovado";
          break;
        case "DISAPPROVED":
          this.label_class = "reprove-status";
          this.label_description = "Reprovado";
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
  margin-bottom: 12px;
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
.card-docs .download-btn {
  color: white;
}
</style>

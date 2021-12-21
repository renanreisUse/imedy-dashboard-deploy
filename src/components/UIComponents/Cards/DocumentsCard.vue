<template>
  <div class="card">
    <div class="card-content">
      <div class="card-main">
        <div class="conteudo" v-show="cardDocs">
          <div class="title">
            <h3>{{ cardName }}</h3>
          </div>
          <div class="card-docs">
            <div class="docs">
              <img src="static/img/icons/Picture.svg"/>
              <a :href="documentLink" target="_blank">Validação da Carteirinha</a>
            </div>
            <div class="card-button">
              <button>BAIXAR</button>
            </div>
          </div>
        </div>

        <div class="docs-status" v-show="showStatus">
          <div class="title">
            <h3>Status dos documentos</h3>
          </div>
          <div class="status-label" id="testerr">
            <span class="text-uppercase">{{ status_description }}</span>
          </div>
          <p>Sobre a documentação recebida, deseja?</p>
          <button class="status-btn" id="approve-btn" @click="approveBtn">
            <i class="fa fa-check"></i>
            APROVAR
          </button>
          <button class="status-btn" id="reprove-btn" @click="reproveBtn">
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
export default {
  name: "DocumentsCard",
  props: {
    cardName: {
      type: String,
      required: false
    },
    showStatus: {
      type: Boolean,
      default: false
    },
    cardDocs: {
      type: Boolean,
      required: false
    },
    documentLink: String
  },
  data() {
    return {
      status_description: "Aguardando Aprovação",
      myStyle: {
        backgroundColor: "#595555"
      }
    };
  },
  methods: {
    approveBtn() {
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
        Swal(
          "Sucesso!",
          "O profissional receberá um e-mail informando o status da documentação analisada",
          "success"
        );
        this.status_description = "Aprovado";
      });
    },
    reproveBtn() {
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
        this.status_description = "Reprovado";
      });
    }
  }
};
</script>

<style scoped>
.status-label span {
  font-size: 14px;
  background-color: #595555;
  padding: 5px 20px;
  border-radius: 20px;
  font-family: Montserrat, sans-serif;
  color: white;
}
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
.card-docs button {
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

<template>
  <div class="card col-lg-12">
    <div class="card-header">
      <h3 class="title">Criar pergunta</h3>
    </div>

    <div class="card-content">
      <div class="row">
        <div class="content-inputs col-lg-12">
          <label for="notification-title">Pergunta</label>
          <textarea class="form-control" rows="3" v-model="question" />
          <label for="notification-title">Resposta</label>
          <textarea class="form-control" rows="3" v-model="answer" />
        </div>

        <div class="notification-destiny col-lg-12">
          <p>Destino da notificação</p>
          <div class="radio" v-for="(item, index) in recipients" :key="index">
            <input
              type="radio"
              v-model="checkedCategories"
              :value="item.value"
              :id="item.name"
            />
            <label>{{ item.name }}</label>
          </div>
        </div>

        <div class="search-user col-lg-12">
          <div class="inputArea">
            <button
              class="imedy-btn text-uppercase"
              @click="() => {
                if (!receivedQuestion) {
                  this.createNewQuestion();
                } else {
                  this.updateQuestion();
                }
              }">
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import FaqService from "src/services/faq.service.js";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export default {
  data() {
    return {
      recipients: null,
      receivedQuestion: null,
      question: "",
      answer: "",
      checkedCategories: [],
    };
  },
  computed: {
    ...mapState({ stateFaq: state => state.stateFaq })
  },
  methods: {
    createNewQuestion() {
      const data = {
        question: this.question,
        answer: this.answer,
        recipients: this.checkedCategories
      };
      FaqService.createFaq(data)
        .then(() => {
          Swal("Sucesso!", "Pergunta criada com sucesso!", "success");
          this.$router.go(-1);
        })
        .catch(() => {
          Swal("Ops!", "Ocorreu um erro ao criar a pergunta", "warning");
        });
    },
    updateQuestion() {
      const id = this.receivedQuestion.id
      const data = {
        question: this.question,
        answer: this.answer,
        recipients: this.checkedCategories
      };
      FaqService.updateFaq(id, data)
        .then(() => {
          Swal("Sucesso!", "Pergunta atualizada com sucesso!", "success");
          this.$router.go(-1);
        })
        .catch(() => {
          Swal("Ops!", "Ocorreu um erro ao atualizar a pergunta", "warning");
        });
    },
    getQuestionData() {
      this.answer = this.receivedQuestion.answer;
      this.question = this.receivedQuestion.question;
      this.checkedCategories = this.receivedQuestion.recipients
    },
    checkRecipients() {
      const id = this.$route.params.id;
      if (id === "Profissional") {
        this.recipients = [
          { name: "Todos os profissionais", value: "DOCTORS", checked: false },
          {
            name: "Profissionais não associados",
            value: "NOT_ASSOCIATED_DOCTORS",
            checked: false
          },
          {
            name: "Profissionais Associados",
            value: "ASSOCIATED_DOCTORS",
            checked: false
          }
        ];
      } else {
        this.recipients = [
          { name: "Todos os pacientes", value: "PATIENTS", checked: false },
          {
            name: "Pacientes não benefíciarios",
            value: "NOT_BENEFICIARY_PATIENT",
            checked: false
          },
          {
            name: "Pacientes benefíciarios",
            value: "BENEFICIARY_PATIENT",
            checked: false
          }
        ];
      }
    }
  },
  created() {
    this.checkRecipients();
    this.receivedQuestion = this.stateFaq;
    this.getQuestionData();
  }
};
</script>

<style scoped>
label,
p {
  color: #262626;
}
.inputArea {
  display: flex;
  justify-content: flex-end;
  margin-block: 30px;
}
.content-inputs label {
  margin-bottom: 10px;
}
.content-inputs p {
  margin-bottom: 30px;
}
textarea {
  margin-bottom: 4rem;
}
</style>

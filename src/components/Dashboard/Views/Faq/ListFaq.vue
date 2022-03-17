<template>
  <div class="row">
    <div class="add-btn">
      <button
        class="imedy-btn"
        @click="() => this.$router.push(`/faq/create/${actualRouter}`)"
      >
        CRIAR PERGUNTA
      </button>
    </div>
    <div class="col-lg-12">
      <paginated-tables
        tableName="Suporte"
        :tableData="users"
        :propsToSearch="propsToSearch"
        :tableColumns="tableColumns"
        :totalPages="totalPages"
        :deleteBtn="true"
        :showEdit="true"
        :showEye="false"
        @edit-btn="editFaq"
        @delete-row="deleteUser"
        @page-value="changePagination"
      />
    </div>
    <div class="col-lg-12 phoneNumber">
      <phone-number-faq
        v-if="whatsappNumber"
        :whatsappNumber="whatsappNumber"
      />
    </div>
  </div>
</template>
<script>
import PhoneNumberFaq from "src/components/Dashboard/Views/Faq/PhoneNumberFaq.vue";
import PaginatedTables from "src/components/Dashboard/Views/Tables/PaginatedTables.vue";
import FaqService from "src/services/faq.service.js";
import { mapState } from "vuex";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export default {
  components: {
    PaginatedTables,
    PhoneNumberFaq
  },
  data() {
    return {
      users: [],
      totalPages: 0,
      whatsappNumber: 0,
      actualRouter: null,
      faqEndpoint: "",
      propsToSearch: ["question", "recipients"],
      tableColumns: [
        {
          prop: "question",
          label: "PERGUNTA",
          minWidth: 300
        },
        {
          prop: "recipients",
          label: "DESTINO",
          minWidth: 300
        }
      ]
    };
  },
  computed: {
    ...mapState({ stateFaq: state => state.stateFaq })
  },
  watch: {
    $route(to, from) {
      this.actualRouter = to.name;
      this.changeEndpoint();
      this.getFaqNumber()
    }
  },
  methods: {
    getFaqs(endpoint,page, limit) {
      FaqService.getAllFaqs(this.faqEndpoint, page, limit).then(({ data }) => {
        this.users = data.faqs;
        this.totalPages = data.totalPages
        this.translateRecipients()
      });
    },
    translateRecipients() {
      for (let i = 0; i < this.users.length; i++) {
        switch (this.users[i].recipients) {
          case "DOCTORS":
            this.users[i].recipients = "Todos os Profissionais";
            break;
          case "PATIENTS":
            this.users[i].recipients = "Todos os Pacientes";
            break;
          case "NOT_ASSOCIATED_DOCTORS":
            this.users[i].recipients = "Profissionais não Associados";
            break;
          case "ASSOCIATED_DOCTORS":
            this.users[i].recipients = "Profissionais Associados";
            break;
          case "BENEFICIARY_PATIENT":
            this.users[i].recipients = "Pacientes benefíciarios";
            break;
          case "NOT_BENEFICIARY_PATIENT":
            this.users[i].recipients = "Pacientes não benefíciarios";
            break;
        }
      }
    },
    changeEndpoint() {
      const params = this.$route.fullPath;
      const params1 = params.split("/");
      if (params1[3] === "professional") {
        this.faqEndpoint = "DOCTORS";
        this.getFaqs(this.faqEndpoint, 1, 10);
      } else {
        this.faqEndpoint = "PATIENTS";
        this.getFaqs(this.faqEndpoint, 1, 10);
      }
    },
    getFaqNumber() {
      FaqService.getPhoneNumber().then(
        ({ data }) => {
          if (this.faqEndpoint === 'DOCTORS'){  
            this.whatsappNumber = data.professionalPhone
          } else{ 
            this.whatsappNumber = data.patientPhone
          }
        }
      );
    },
    changePagination({ page, limit }) {
      this.getFaqs(this.faqEndpoint, page, limit);
    },
    editFaq(id) {
      FaqService.getFaq(id).then(({ data }) => {
        this.$store.dispatch("storeFaq", data);
        this.$router.push(`/faq/create/${this.actualRouter}`);
      });
    },
    deleteUser(id) {
      FaqService.deleteFaq(id)
      .then(() => {
        Swal("Sucesso!", "Pergunta excluída com sucesso", "success");
        this.getFaqs(this.faqEndpoint, 1, 10);
      })
      .catch(()=>{
        Swal(
          "Ops!", 
          "Ocorreu um erro, tente novamente.", 
          "warning"
        );
      })
    },
  },
  created() {
    this.changeEndpoint();
    this.actualRouter = this.$route.name;
    this.getFaqNumber();
    this.getFaqs(this.faqEndpoint, 1, 10);
  }
};
</script>

<style scoped>
.add-btn {
  margin-bottom: 50px;
  display: flex;
  justify-content: right;
}
.phoneNumber {
  margin-top: 2rem;
}
</style>

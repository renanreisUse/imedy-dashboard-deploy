<template>
  <div>
    <div class="register_button">
      <router-link to="/notifications/create"
        ><button class="text-uppercase myBtn">
          Criar Notificação
        </button></router-link
      >
    </div>

    <div class="row">
      <div class="col-lg-12 col-md-12">
        <paginated-tables
          tableName="Lista de Notificações"
          :tableData="users"
          :showActions="false"
          :propsToSearch="propsToSearch"
          :tableColumns="tableColumns"
          :totalPages="totalPages"
          @page-value="changePage"
          @page-limit="changeLimit"
        />
      </div>
    </div>
  </div>
</template>

<script>
import NotificationService from "src/services/notification.service.js";
import PaginatedTables from "../Tables/PaginatedTables.vue";
export default {
  components: {
    PaginatedTables
  },
  data() {
    return {
      users: [],
      totalPages:0,
      propsToSearch: ["recipients", "body"],
      tableColumns: [
        {
          prop: "recipients",
          label: "DESTINATÁRIO",
          minWidth: 220
        },
        {
          prop: "body",
          label: "MENSAGEM",
          minWidth: 300
        }
      ]
    };
  },
  methods: {
    getPush(page, limit) {
      NotificationService.getNotifications(page, limit)
        .then(res => {
          this.totalPages = res.data.totalPages;
          this.users = res.data.notifications;
          for (let i = 0; i < res.data.notifications.length; i++) {
            switch (res.data.notifications[i].recipients) {
              case "ALL":
                this.users[i].recipients = "Todos";
                break;
              case "DOCTORS":
                this.users[i].recipients = "Todos os Profissionais";
                break;
              case "PATIENTS":
                this.users[i].recipients = "Todos os Pacientes";
                break;
              case "SELECTED_USERS":
                this.users[i].recipients = "Usuários";
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
              default:
                break;
            }
          }
        })
        .catch(err => console.log(err));
    },
    changeLimit({ page, limit }) {
      this.getPush(page, limit);
    },
    changePage({ page, limit }) {
      this.getPush(page, limit);
    }
  },
  async mounted(page, limit) {
    this.getPush((page = 1), (limit = 10));
  }
};
</script>

<style scoped>
.register_button {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.myBtn {
  font-weight: 700;
  padding: 15px 35px;
  background-color: #718efa;
  color: #fff;
  border-radius: 3px;
  border: none;
  letter-spacing: 0.5px;
}
</style>

<template>
  <div>
    <div class="register_button">
      <router-link to="/notifications/create"
        ><button class="text-uppercase imedy-btn">
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
          @page-value="changePagination"
          :badgeColumn="badgeColumn"
          @search-table="updateSearchQuery"
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
      badgeColumn:[{
        prop: "recipients",
        label: "DESTINATÁRIO",
        minWidth: 220
      }],
      searchQuery: '',
      pagination: {
        page: 1,
        limit: 10,
      },
      propsToSearch: ["recipients", "body"],
      tableColumns: [
        {
          prop: "body",
          label: "MENSAGEM",
          minWidth: 300
        }
      ]
    };
  },
  methods: {
    getPush() {
      const queryParams = this.getQueryParamsString({...this.pagination, query: this.searchQuery})
      NotificationService.getNotifications(queryParams)
        .then(res => {
          this.totalPages = res.data.totalPages;
          this.users = res.data.notifications;
          for (let i = 0; i < res.data.notifications.length; i++) {
            switch (res.data.notifications[i].recipients) {
              case "ALL":
                this.users[i].recipients = "TODOS";
                break;
              case "DOCTORS":
                this.users[i].recipients = "TODOS OS PROFISSIONAIS";
                break;
              case "PATIENTS":
                this.users[i].recipients = "TODOS OS PACIENTES";
                break;
              case "SELECTED_USERS":
                this.users[i].recipients = "Usuários";
                break;
              case "NOT_ASSOCIATED_DOCTORS":
                this.users[i].recipients = "PROFISSIONAIS NÃO ASSOCIADOS";
                break;
              case "ASSOCIATED_DOCTORS":
                this.users[i].recipients = "PROFISSIONAIS ASSOCIADOS";
                break;
              case "BENEFICIARY_PATIENT":
                this.users[i].recipients = "PACIENTES BENEFICIÁRIOS";
                break;
              case "NOT_BENEFICIARY_PATIENT":
                this.users[i].recipients = "PACIENTES NÃO BENEFICIÁRIOS";
                break;
              default:
                break;
            }
          }
          this.translateRecipients()
        })
        .catch(err => console.log(err));
    },
    translateRecipients(){
      for (let i = 0; i < this.users.length; i++) {
        switch (this.users[i].recipients) {
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
    },
    changePagination({ page, limit}) {
      this.pagination.page = page
      this.pagination.limit = limit
      this.getPush();
    },
    updateSearchQuery(value){
      this.searchQuery = value
      this.getPush();
    },
    getQueryParamsString(data){
      const dataStep = new Object()
      for(let key in data){
        if(data[key])dataStep[key] = data[key];
      }
      return new URLSearchParams(dataStep);
    },
  },
  mounted() {
    this.getPush();
  }
};
</script>

<style scoped>
.register_button {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
</style>

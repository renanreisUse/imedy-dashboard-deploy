<template>
  <div>
    <div class="register_button">
      <router-link to="/banner/create">
        <button class="text-uppercase imedy-btn">
          ADICIONAR BANNER
        </button>
      </router-link>
    </div>

    <div class="row">
      <div class="col-lg-12 col-md-12">
        <paginated-tables
          tableName="Banner promocional"
          :tableData="users"
          :propsToSearch="propsToSearch"
          :tableColumns="tableColumns"
          :showSwitch="true"
          :switches="switches"
          :totalPages="totalPages"
          @switch-value="switchValue"
          @page-value="changePagination"
          @eye-btn="eyeBtn"
          :badgeColumn="badgeColumn"
        />
      </div>
    </div>
    <modal :modal="modal" v-if="displayModal" @close-modal-event="hideModal" />
  </div>
</template>

<script>
import BannerService from "src/services/banner.service.js";
import PaginatedTables from "../Tables/PaginatedTables.vue";
import Modal from "src/components/UIComponents/Modal/Modal.vue";
export default {
  components: {
    PaginatedTables,
    Modal
  },
  data() {
    return {
      users: [],
      switches: {},
      modal: {},
      badgeColumn:[{
        prop: "recipients",
        label: "DESTINATÁRIO",
        minWidth: 220
      }],
      totalPages: 0,
      displayModal: false,
      propsToSearch: ["recipients", "title"],
      tableColumns: [
        {
          prop: "title",
          label: "TÍTULO",
          minWidth: 250
        }
      ]
    };
  },
  methods: {
    async eyeBtn(id) {
      this.displayModal = true;
      BannerService.getBanner(id).then(({ data }) => {
        this.modal = {
          title: data.title,
          paragraph: data.paragraph,
          image: data.image
        };
      });
    },
    getBanners(page, limit) {
      BannerService.getBanners(page, limit).then(({ data }) => {
        this.totalPages = data.totalPages;
        this.users = data.banners;
        for (let i = 0; i < data.banners.length; i++) {
          switch (data.banners[i].recipients) {
            case "ALL":
              this.users[i].recipients = "TODOS OS PACIENTES";
              break;
            case "BENEFICIARY_PATIENT":
              this.users[i].recipients = "PACIENTES BENEFICIÁRIOS";
              break;
            case "NOT_BENEFICIARY_PATIENT":
              this.users[i].recipients = "PACIENTES NÃO BENEFICIÁRIOS";
              break;
          }
        }
      });
    },
    switchValue(status, id) {
      const data = {
        id: id,
        status: status
      };
      BannerService.updateBannerStatus(data)
        .then()
        .catch(() => {
          this.$notify({
            component: {
              template: `ERRO - <span>Ops, algo deu errado! Não foi possivél atualizar status.</span>`
            },
            icon: "",
            horizontalAlign: "right",
            verticalAlign: "top",
            type: "warning"
          });
        });
    },
    changePagination({ page, limit }) {
      this.getBanners(page, limit);
    },
    hideModal() {
      this.displayModal = false;
    }
  },
  mounted() {
    this.getBanners(1, 10);
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

<template>
  <div>
    <div class="register_button">
      <router-link to="/banner/create">
        <button class="text-uppercase myBtn">
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
          :showImage="true"
          :showActions="true"
          :totalPages="totalPages"
          @page-value="changePage"
          @eye-btn="eyeBtn"
          @page-limit="changeLimit"
        />
      </div>
    </div>
    <modal
      :modal="modal"
      v-if="displayModal"
      @close-modal-event="hideModal"
    />
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
      totalPages: 0,
      displayModal: false,
      propsToSearch: ["recipients", "title"],
      tableColumns: [
        {
          prop: "recipients",
          label: "DESTINATÁRIO",
          minWidth: 220
        },
        {
          prop: "title",
          label: "TÍTULO",
          minWidth: 220
        }
      ]
    };
  },
  methods: {
    async eyeBtn(id) {
      this.displayModal = true;
      console.log(id);
      this.modal = {
        title :'testr',
        paragraph: 'pargrafor',
        image: 'https://imedy-upload-dev.s3.sa-east-1.amazonaws.com/053622f5-10ce-4949-a480-bb004807f0e1-01.png'
      }
    },
    getBanners(page, limit) {
      BannerService.getBanners(page, limit).then(({ data }) => {
        console.log(data);
        this.totalPages = data.totalPages;
        this.users = data.banners;
        this.switches = {
          status: false
        };
        for (let i = 0; i < data.banners.length; i++) {
          switch (data.banners[i].recipients) {
            case "ALL":
              this.users[i].recipients = "Todos";
              break;
            case "BENEFICIARY_PATIENT":
              this.users[i].recipients = "Pacientes benefíciarios";
              break;
            case "NOT_BENEFICIARY_PATIENT":
              this.users[i].recipients = "Pacientes não benefíciarios";
              break;
          }
        }
      });
    },
    changeLimit({ page, limit }) {
      this.getBanners(page, limit);
    },
    changePage({ page, limit }) {
      this.getBanners(page, limit);
    },
    showModal() {
      this.displayModal = true;
    },
    hideModal() {
      this.displayModal = false;
    }
  },
  mounted(page, limit) {
    this.getBanners((page = 1), (limit = 10));
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

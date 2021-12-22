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
        />
      </div>
    </div>
  </div>
</template>

<script>
import BannerService from "src/services/banner.service.js";
import PaginatedTables from "../Tables/PaginatedTables.vue";
export default {
  components: {
    PaginatedTables
  },
  data() {
    return {
      users: [],
      propsToSearch: ["recipients", "image"],
      tableColumns: [
        {
          prop: "recipients",
          label: "DESTINATÁRIO",
          minWidth: 220
        },
        {
          prop: "image",
          label: "IMAGEM",
          minWidth: 300
        }
      ]
    };
  },
  methods: {
    getBanners() {
      BannerService.getBanners().then(({ data }) => {
        this.users = data.banners;
      });
    }
  },
  mounted() {
    this.getBanners();
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

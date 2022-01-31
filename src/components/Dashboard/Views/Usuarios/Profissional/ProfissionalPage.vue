<template>
  <div>
    <div class="add-btn">
      <button
        class="text-uppercase myBtn"
        @click="
          () => {
            this.displayModal = true;
          }
        "
      >
        Pré cadastro de profissionais (.CSV)
      </button>

      <bootstrap-modal-no-jquery
        v-if="displayModal"
        @close-modal-event="
          () => {
            this.displayModal = false;
          }
        "
        @change-input-event="onFileChanged"
      />
    </div>

    <div class="row">
      <div
        class="col-lg-6 col-sm-6"
        v-for="stats in statsCards"
        :key="stats.id"
      >
        <stats-card>
          <div class="numbers" slot="content">
            <p>{{ stats.title }}</p>
            {{ stats.value }}
          </div>
          <div class="stats" slot="footer">
            {{ stats.footerText }}
          </div>
        </stats-card>
      </div>
    </div>

    <paginated-tables
      tableName="Lista de Profissionais"
      @delete-row="deleteUser"
      :deleteBtn="true"
      @eye-btn="eyeBtn"
      @page-value="changePagination"
      :totalPages="totalPages"
      :tableData="users"
      :propsToSearch="propsToSearch"
      :tableColumns="tableColumns"
    >
    </paginated-tables>
  </div>
</template>

<script>
import { mapState } from "vuex";
import DoctorService from "src/services/doctor.service.js";
import StatsCard from "src/components/UIComponents/Cards/StatsCard.vue";
import PaginatedTables from "src/components/Dashboard/Views/Tables/PaginatedTables.vue";
import BootstrapModalNoJquery from "src/components/UIComponents/BootstrapModalNoJquery.vue";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export default {
  components: {
    StatsCard,
    PaginatedTables,
    BootstrapModalNoJquery
  },
  data() {
    return {
      selectedFile: null,
      csvInfo: null,
      displayModal: false,
      users: [],
      totalPages: 0,
      statsCards: [
        {
          title: "Associadoss El Kadri",
          value: "0",
          footerText: "Profissionais",
          id: 1
        },
        {
          title: "Não Associadoss El Kadri",
          value: "0",
          footerText: "Profissionais",
          id: 2
        }
      ],
      propsToSearch: [
        "name",
        "specialty",
        "registration",
        "status",
        "attendance"
      ],
      tableColumns: [
        {
          prop: "name",
          label: "NOME",
          minWidth: 250
        },
        {
          prop: "specialty",
          label: "ESPECIALIDADE",
          minWidth: 250
        },
        {
          prop: "registration",
          label: "MATRÍCULA",
          minWidth: 150
        },
        {
          prop: "status",
          label: "STATUS",
          minWidth: 100
        },
        {
          prop: "attendance",
          label: "ATENDIMENTOS",
          minWidth: 150
        }
      ]
    };
  },
  computed: {
    ...mapState({ stateDoctors: state => state.stateDoctors })
  },
  methods: {
    eyeBtn(id) {
      this.$router.push(`/usuarios/profile/${id}`);
    },
    async getUsers(page, limit) {
      DoctorService.getDoctors(page, limit)
        .then(res => {
          this.totalPages = res.data.totalPages;
          this.users = res.data.doctors
          console.log(this.users);
          for (var i = 0; i < this.users.length; i++) {
            this.users[i].specialty = this.users[i].specialty.name;
            this.users[i].attendance = 0
            if (this.users[i].status === "INACTIVE") {
              this.users[i].status = "INATIVO";
            }
          }
        })
        .catch(err => console.log(err));
    },
    changePagination({ page, limit }) {
      this.getUsers(page, limit);
    },
    async deleteUser(id) {
      DoctorService.deleteDoctor(id).then(() => {
        this.getUsers(1,10);
      });
    },
    onFileChanged(event) {
      this.selectedFile = event.target.files[0];
      const formData = new FormData();
      formData.append("doctors", this.selectedFile);
      DoctorService.batchDoctor(formData)
        .then(res => {
          this.csvInfo = res.data;
          this.$store.dispatch("storeDoctors", this.csvInfo);
          this.$router.push(`/usuarios/batch`);
        })
        .catch(() => {
          this.displayModal = false;
          Swal("Ops!", "Ocorreu um erro ao cadastrar CSV.", "warning")
        });
    }
  },
  created() {
    this.getUsers(1,10);
  }
};
</script>

<style scoped>
.add-btn {
  margin-bottom: 50px;
  display: flex;
  justify-content: right;
}
.myBtn {
  font-weight: 700;
  padding: 11px 35px;
  background-color: #718efa;
  color: #fff;
  border-radius: 3px;
  border: none;
  letter-spacing: 0.5px;
}
</style>

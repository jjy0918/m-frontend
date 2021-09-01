<template>
  <!-- <router-view></router-view> -->
  <div class="row container">
    <div>
      <div class="md-display-1 text-center">{{ nowMenu }}</div>
      <hr />
    </div>
    <div class="col-sm-2" v-if="isAdmin">
      <md-table>
        <md-table-row>
          <md-table-head md-numeric class="text-center"
            >관리자 관리</md-table-head
          >
        </md-table-row>

        <md-table-row>
          <md-table-cell md-numeric class="text-center"
            ><span class="hover" @click="getAllManager()"
              >관리자 등록/관리</span
            ></md-table-cell
          >
        </md-table-row>

        <md-table-row>
          <md-table-cell md-numeric class="text-center"
            ><span class="hover" @click="getAllManagerLog()">관리자 로그</span>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
    <div class="col-sm-10" v-if="isAdmin">
      <md-table v-model="allManager.data" md-card>
        <md-table-toolbar>
          <div class="md-toolbar-section-start"></div>

          <md-field md-clearable class="md-toolbar-section-end">
            <md-input
              placeholder="Search by name..."
              v-model="search"
              @input="searchOnTable"
            />
            <button>123</button>
          </md-field>
        </md-table-toolbar>
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="번호" md-numeric>{{
            item.no
          }}</md-table-cell>
          <md-table-cell md-label="아이디">{{ item.id }}</md-table-cell>
          <md-table-cell md-label="이름">{{ item.name }}</md-table-cell>
          <md-table-cell md-label="소속">{{ item.belong }}</md-table-cell>
          <md-table-cell md-label="등록일">{{
            item.registrationDate
          }}</md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginUserId: null,
      nowMenu: "관리자 등록/관리",
      isAdmin: false,
      allManager: null,
      searchOnTable: null,
      search: null,
      paginatedUsers: [],
    };
  },
  methods: {
    getAllManager() {
      this.nowMenu = "관리자 등록/관리";
      this.$store.dispatch("getAllManager");
    },
    getAllManagerLog() {
      this.nowMenu = "관리자 로그";
    },
    defaultTable() {
      this.allManager = { data: [{ id: "항목이 없습니다." }] };
    },
    updatePagination() {
      console.log("???");
    },
  },
  created() {
    this.loginUserId = this.$store.state.loginUserId;
    if (this.loginUserId === null) {
      alert("로그인이 필요한 서비스입니다.");
      this.$router.push(`/`);
    } else if (this.loginUserId.role != "ADMIN") {
      alert("권한이 없습니다.");
      this.nowMenu = "ADMIN 권한이 필요합니다";
    } else {
      this.isAdmin = true;
      this.getAllManager();
      this.defaultTable();
    }
  },
  computed: {
    // 값 변경이 일어나면
    newAllManager() {
      return this.$store.state.allManager;
    },
  },
  watch: {
    // 갱신
    newAllManager(newValue) {
      this.allManager = newValue;
    },
  },
};
</script>

<style scoped>
.hover {
  cursor: pointer;
}
</style>

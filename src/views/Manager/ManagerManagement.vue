<template>
  <!-- <router-view></router-view> -->
  <div class="row container" v-if="isAdmin">
    <div>
      <div class="md-display-1 text-center">{{ nowMenu }}</div>
      <hr />
    </div>
    <div class="col-sm-2">
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
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginUserId: null,
      nowMenu: "관리자 등록/관리",
      isAdmin: false,
    };
  },
  methods: {
    getAllManager() {
      this.nowMenu = "관리자 등록/관리";
      // this.$router.push(`/manager/mm/ml`);
      this.$store.commit("reloadFalse");

      this.$router.push(`/manager/mm/ml`).catch(() => {
        this.$store.commit("reloadTrue");
      });
    },
    getAllManagerLog() {
      this.nowMenu = "관리자 로그";
      // this.$router.push(`/manager/mm/mlog`);
      this.$store.commit("reloadFalse");

      this.$router.push(`/manager/mm/mlog`).catch(() => {
        this.$store.commit("reloadTrue");
      });
    },
  },
  computed: {
    // 값 변경이 일어나면
    newResultLocation() {
      return this.$store.state.loginUserId;
    },
    newAdmin() {
      return this.$store.state.isAdmin;
    },
  },
  watch: {
    // 갱신
    newResultLocation(newValue) {
      this.loginUserId = newValue;
      if (this.loginUserId == null) {
        alert("로그인이 필요한 서비스입니다.");
        this.$router.push(`/`);
      }
    },
    newAdmin(newValue) {
      this.isAdmin = newValue;
    },
  },
  created() {
    this.loginUserId = this.$store.state.loginUserId;
    this.isAdmin = this.$store.state.isAdmin;
    this.$store.dispatch("checkAdmin");

    if (this.loginUserId === null) {
      alert("로그인이 필요한 서비스입니다.");
      this.$router.push(`/`);
    }
  },
};
</script>

<style scoped>
.hover {
  cursor: pointer;
}
</style>

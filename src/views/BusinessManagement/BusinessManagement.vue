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
          <md-table-head md-numeric class="text-center">사업관리</md-table-head>
        </md-table-row>

        <md-table-row>
          <md-table-cell md-numeric class="text-center"
            ><span class="hover" @click="getProductManagement()"
              >제품 관리</span
            ></md-table-cell
          >
        </md-table-row>

        <md-table-row>
          <md-table-cell md-numeric class="text-center"
            ><span class="hover" @click="getConstruction()">구축사례 관리</span>
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
      nowMenu: "제품 관리",
      isAdmin: false,
    };
  },
  methods: {
    getProductManagement() {
      this.nowMenu = "제품 관리";
      this.$router.push(`/manager/bm/pm`);
    },
    getConstruction() {
      this.nowMenu = "구축사례 관리";
      // this.$router.push(`/manager/bm/mlog`);
    },
  },
  created() {
    this.loginUserId = this.$store.state.loginUserId;
    if (this.loginUserId === null) {
      alert("로그인이 필요한 서비스입니다.");
      this.$router.push(`/`);
    } else if (
      this.loginUserId.role != "ADMIN" &&
      this.loginUserId.role != "MANAGER"
    ) {
      alert("권한이 없습니다.");
      this.nowMenu = "ADMIN or MANAGER 권한이 필요합니다";
    } else {
      this.isAdmin = true;
      this.getProductManagement();
    }
  },
};
</script>

<style scoped>
.hover {
  cursor: pointer;
}
</style>

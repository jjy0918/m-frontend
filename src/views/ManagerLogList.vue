<template>
  <div class="col-sm-10" v-if="isAdmin">
    <md-toolbar class="md-body-1">
      <div class="md-toolbar-row">
        <div class="md-layout-item px-3">
          <md-field>
            <label for="managerType">필터</label>
            <md-select
              v-model="managerType"
              name="managerType"
              id="managerType"
              md-dense
            >
              <md-option value="id">아이디</md-option>
            </md-select>
          </md-field>
        </div>

        <md-field class="px-3">
          <label>검색어를 입력하세요</label>
          <md-input v-model="searchWord"></md-input>
        </md-field>

        <div class="md-toolbar-section-end">
          <md-button class="md-icon-button" @click="searchManager()">
            <md-icon>search</md-icon>
          </md-button>
        </div>
      </div>
    </md-toolbar>
    <md-table v-model="allManagerLog.data" md-card>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="번호" md-numeric>{{ item.no }}</md-table-cell>
        <md-table-cell md-label="로그인 일자">{{
          item.loginDate
        }}</md-table-cell>
        <md-table-cell md-label="계정">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="IP">{{ item.ip }}</md-table-cell>
        <md-table-cell md-label="세션ID">{{ item.sessionId }}</md-table-cell>
        <md-table-cell md-label="로그인 성공">{{
          ChangeSuccessLogin(item.successLogin)
        }}</md-table-cell>
      </md-table-row>
    </md-table>
    <div class="text-center" v-if="allManagerLog.data.length === 0">
      <br />
      <br />
      <md-progress-spinner
        :md-diameter="100"
        :md-stroke="10"
        md-mode="indeterminate"
      ></md-progress-spinner>
      <br />
      <br />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginUserId: null,
      isAdmin: false,
      allManagerLog: { data: [] },
      managerType: null,
      searchWord: null,
    };
  },
  methods: {
    getAllManagerLog() {
      this.$store.dispatch("getAllManagerLog");
      this.searchWord = null;
      this.managerType = null;
    },
    searchManager() {
      if (!this.searchWord) {
        alert("검색어를 입력해주세요");
      } else if (!this.managerType) {
        alert("검색 필터를 선택해주세요");
      } else {
        this.$store.dispatch("searchManager", {
          type: this.managerType,
          word: this.searchWord,
          page: 1,
        });
      }
    },
    ChangeSuccessLogin(successLogin) {
      if (successLogin) {
        return "Y";
      } else {
        return "N";
      }
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
      this.getAllManagerLog();
    }
  },
  computed: {
    newAllManagerLog() {
      return this.$store.state.allManagerLog;
    },
  },
  watch: {
    // 갱신
    newAllManagerLog(newValue) {
      this.allManagerLog = newValue;
    },
  },
};
</script>

<style>
</style>
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
          <md-button class="md-icon-button" @click="clickSearchManagerLog(1)">
            <md-icon>search</md-icon>
          </md-button>
        </div>
      </div>
    </md-toolbar>
    <md-table md-card>
      <md-table-row>
        <md-table-head md-numeric>번호</md-table-head>
        <md-table-head>로그인 일자</md-table-head>
        <md-table-head>계정</md-table-head>
        <md-table-head>IP</md-table-head>
        <md-table-head>세션 ID</md-table-head>
        <md-table-head>로그인 성공</md-table-head>
      </md-table-row>

      <md-table-row v-for="(item, index) in allManagerLog.data" :key="index">
        <md-table-cell md-numeric>{{ item.no }}</md-table-cell>
        <md-table-cell>{{ item.loginDate }}</md-table-cell>

        <md-table-cell>{{ item.id }}</md-table-cell>
        <md-table-cell>{{ item.ip }}</md-table-cell>
        <md-table-cell>{{ item.sessionId }}</md-table-cell>
        <md-table-cell>{{
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

    <div class="text-center">
      <md-button class="md-primary" @click="changeNum(1)"
        ><i class="fas fa-angle-double-left"></i
      ></md-button>
      <md-button class="md-primary" @click="changeNum(selectedNumber - 1)"
        ><i class="fas fa-arrow-left"></i
      ></md-button>
      <md-button
        class="md-primary"
        v-for="(item, index) in btn"
        :key="index"
        v-bind:class="{
          'md-raised': item.selected,
        }"
        @click="changeNum(item.number)"
        >{{ item.number }}</md-button
      >
      <md-button class="md-primary" @click="changeNum(selectedNumber + 1)"
        ><i class="fas fa-arrow-right"></i
      ></md-button>
      <md-button
        class="md-primary"
        @click="changeNum(allManagerLog.pageInfo.totalPages)"
        ><i class="fas fa-angle-double-right"></i
      ></md-button>
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
      btn: [],
      selectedNumber: 1,
      isSearch: false,
      searchWordFix: null,
    };
  },
  methods: {
    getAllManagerLog(getPage) {
      this.$store.dispatch("getAllManagerLog", getPage);
      this.searchWord = null;
      this.managerType = null;
      this.isSearch = false;
      this.selectedNumber = getPage;
    },
    clickSearchManagerLog(getPage) {
      this.searchWordFix = this.searchWord;
      this.searchManager(getPage);
    },
    searchManager(getPage) {
      if (!this.searchWordFix) {
        alert("검색어를 입력해주세요");
      } else if (!this.managerType) {
        alert("검색 필터를 선택해주세요");
      } else {
        this.selectedNumber = getPage;
        this.isSearch = true;
        this.$store.dispatch("searchManagerLog", {
          type: this.managerType,
          word: this.searchWordFix,
          page: getPage,
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
    changeNum(nextNum) {
      if (nextNum < 1 || nextNum > this.allManagerLog.pageInfo.totalPages) {
        return;
      }
      if (nextNum != this.selectedNumber) {
        if (this.isSearch) {
          this.searchManager(nextNum);
        } else {
          this.getAllManagerLog(nextNum);
        }
      }
    },
    pagiNation(pages) {
      if (pages.pageNumber == 1) {
        this.btn = [{ number: 1, selected: true }];
        for (let i = 2; i <= 3 && i <= pages.totalPages; i++) {
          this.btn.push({ number: i, selected: false });
        }
      } else if (pages.pageNumber == pages.totalPages) {
        this.btn = [
          {
            number: pages.totalPages,
            selected: true,
          },
        ];
        for (
          let i = pages.totalPages - 1;
          i >= pages.totalPages - 2 && i >= 1;
          i--
        ) {
          this.btn.push({ number: i, selected: false });
        }
        this.btn.reverse();
      } else {
        this.btn = [];
        this.btn.push({
          number: pages.pageNumber - 1,
          selected: false,
        });
        this.btn.push({
          number: pages.pageNumber,
          selected: true,
        });
        this.btn.push({
          number: pages.pageNumber + 1,
          selected: false,
        });
      }
    },
  },
  created() {
    this.loginUserId = this.$store.state.loginUserId;
    if (this.loginUserId === null) {
      alert("로그인이 필요한 서비스입니다.");
      this.$router.push(`/`);
    }
    this.isAdmin = this.$store.state.isAdmin;

    this.$store.dispatch("checkAdmin");
    this.getAllManagerLog(1);
  },
  computed: {
    newAllManagerLog() {
      return this.$store.state.allManagerLog;
    },
    newReload() {
      return this.$store.state.reload;
    },
    newAdmin() {
      return this.$store.state.isAdmin;
    },
  },
  watch: {
    // 갱신
    newAllManagerLog(newValue) {
      this.allManagerLog = newValue;
      this.pagiNation(this.allManagerLog.pageInfo);
    },
    newReload(newValue) {
      if (newValue) {
        this.getAllManagerLog(1);
        this.$store.commit("reloadFalse");
      }
    },
    newAdmin(newValue) {
      this.isAdmin = newValue;
    },
  },
};
</script>

<style>
</style>
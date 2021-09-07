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
              <md-option value="name">제목</md-option>
            </md-select>
          </md-field>
        </div>

        <md-field class="px-3">
          <label>검색어를 입력하세요</label>
          <md-input v-model="searchWord"></md-input>
        </md-field>

        <div class="md-toolbar-section-end">
          <md-button class="md-icon-button" @click="clickSearchManager(1)">
            <md-icon>search</md-icon>
          </md-button>
        </div>
      </div>
    </md-toolbar>
    <md-table v-model="constructionManager.data" md-card>
      <md-table-row>
        <md-table-head md-numeric>번호</md-table-head>
        <md-table-head>제품 카테고리</md-table-head>
        <md-table-head>구축사례명</md-table-head>
        <md-table-head>등록일</md-table-head>
        <md-table-head>노출여부</md-table-head>
      </md-table-row>

      <md-table-row
        v-for="(item, index) in constructionManager.data"
        :key="index"
      >
        <md-table-cell md-numeric class="hover"
          ><span @click="managerDetail(item.no)">{{
            item.no
          }}</span></md-table-cell
        >
        <md-table-cell>{{ item.category }}</md-table-cell>

        <md-table-cell>{{ item.name }}</md-table-cell>
        <md-table-cell>{{ item.registrationDate }}</md-table-cell>
        <md-table-cell>{{ ChangeSuccessLogin(item.expose) }}</md-table-cell>
      </md-table-row>
    </md-table>

    <div class="text-center" v-if="constructionManager.data.length === 0">
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

    <div class="row container">
      <div class="col-sm-1"></div>
      <div class="text-center col-sm-10">
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
          @click="changeNum(constructionManager.pageInfo.totalPages)"
          ><i class="fas fa-angle-double-right"></i
        ></md-button>
      </div>
      <div class="col-sm-1 container">
        <md-button class="md-primary" @click="createManaer()"
          >신규등록</md-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginUserId: null,
      isAdmin: false,
      constructionManager: { data: [] },
      managerType: null,
      searchWord: null,
      btn: [],
      selectedNumber: 1,
      isSearch: false,
      searchWordFix: null,
    };
  },
  methods: {
    getAllConstruction(getPage) {
      this.$store.dispatch("getAllConstructionManager", getPage);
      this.searchWord = null;
      this.managerType = null;
      this.isSearch = false;
      this.selectedNumber = getPage;
    },
    clickSearchManager(getPage) {
      this.searchWordFix = this.searchWord;
      this.searchManager(getPage);
    },
    searchManager(getPage) {
      if (!this.searchWord) {
        alert("검색어를 입력해주세요");
      } else if (!this.managerType) {
        alert("검색 필터를 선택해주세요");
      } else {
        this.selectedNumber = getPage;
        this.isSearch = true;
        this.$store.dispatch("searchConstructionManager", {
          type: this.managerType,
          word: this.searchWordFix,
          page: getPage,
        });
      }
    },
    changeNum(nextNum) {
      if (
        nextNum < 1 ||
        nextNum > this.constructionManager.pageInfo.totalPages
      ) {
        return;
      }
      if (nextNum != this.selectedNumber) {
        if (this.isSearch) {
          this.searchManager(nextNum);
        } else {
          this.getAllConstruction(nextNum);
        }
      }
    },
    managerDetail(no) {
      this.$router.push(`/manager/bm/cmd/${no}`);
    },
    ChangeSuccessLogin(successLogin) {
      if (successLogin) {
        return "Y";
      } else {
        return "N";
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
    createManaer() {
      this.$router.push(`/manager/bm/cmc`);
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
      this.getAllConstruction(1);
    }
  },
  computed: {
    newAllManager() {
      return this.$store.state.constructionManager;
    },
    newReload() {
      return this.$store.state.reload;
    },
  },
  watch: {
    // 갱신
    newAllManager(newValue) {
      this.constructionManager = newValue;
      this.pagiNation(this.constructionManager.pageInfo);
    },
    newReload(newValue) {
      if (newValue) {
        this.getAllConstruction(1);
        this.$store.commit("reloadFalse");
      }
    },
  },
};
</script>

<style>
.hover {
  cursor: pointer;
}
</style>
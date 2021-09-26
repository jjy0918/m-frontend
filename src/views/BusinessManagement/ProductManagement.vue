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
              <md-option value="name">제품명</md-option>
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
    <md-table v-model="productManager.data" md-card>
      <md-table-row>
        <md-table-head md-numeric>번호</md-table-head>
        <md-table-head>제품 카테고리</md-table-head>
        <md-table-head>제품명</md-table-head>
        <md-table-head>카달로그</md-table-head>
        <md-table-head>등록일</md-table-head>
        <md-table-head>노출여부</md-table-head>
      </md-table-row>

      <md-table-row v-for="(item, index) in productManager.data" :key="index">
        <md-table-cell md-numeric class="hover"
          ><span @click="managerDetail(item.no)">{{
            item.no
          }}</span></md-table-cell
        >
        <md-table-cell>{{ item.category }}</md-table-cell>

        <md-table-cell>{{ item.name }}</md-table-cell>
        <md-table-cell
          ><a :href="item.catalog"><i class="far fa-file-pdf fa-2x"></i></a
        ></md-table-cell>
        <md-table-cell>{{ item.registrationDate }}</md-table-cell>
        <md-table-cell>{{ ChangeSuccessLogin(item.expose) }}</md-table-cell>
      </md-table-row>
    </md-table>

    <div class="text-center" v-if="productManager.data.length === 0">
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
          @click="changeNum(productManager.pageInfo.totalPages)"
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
      productManager: { data: [] },
      managerType: null,
      searchWord: null,
      btn: [],
      selectedNumber: 1,
      isSearch: false,
      searchWordFix: null,
    };
  },
  methods: {
    getAllManager(getPage) {
      this.$store.dispatch("getAllProductManager", getPage);
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
        this.$store.dispatch("searchProductManager", {
          type: this.managerType,
          word: this.searchWordFix,
          page: getPage,
        });
      }
    },
    changeNum(nextNum) {
      if (nextNum < 1 || nextNum > this.productManager.pageInfo.totalPages) {
        return;
      }
      if (nextNum != this.selectedNumber) {
        if (this.isSearch) {
          this.searchManager(nextNum);
        } else {
          this.getAllManager(nextNum);
        }
      }
    },
    managerDetail(no) {
      this.$router.push(`/manager/bm/pmd/${no}`);
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
      this.$router.push(`/manager/bm/pmc`);
    },
  },
  created() {
    this.loginUserId = this.$store.state.loginUserId;
    this.isAdmin = this.$store.state.isManager;

    this.$store.dispatch("checkManager");

    if (this.loginUserId === null) {
      alert("로그인이 필요한 서비스입니다.");
      this.$router.push(`/`);
    }
    this.getAllManager(1);
  },
  computed: {
    newAllManager() {
      return this.$store.state.productManager;
    },
    newReload() {
      return this.$store.state.reload;
    },
    newAdmin() {
      return this.$store.state.isManager;
    },
    newResultLocation() {
      return this.$store.state.loginUserId;
    },
  },
  watch: {
    // 갱신
    newAllManager(newValue) {
      this.productManager = newValue;
      this.pagiNation(this.productManager.pageInfo);
    },
    newReload(newValue) {
      if (newValue) {
        this.getAllManager(1);
        this.$store.commit("reloadFalse");
      }
    },
    newAdmin(newValue) {
      this.isAdmin = newValue;
    },
    newResultLocation(newValue) {
      this.loginUserId = newValue;
      if (this.loginUserId == null) {
        alert("로그인이 필요한 서비스입니다.");
        this.$router.push(`/`);
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

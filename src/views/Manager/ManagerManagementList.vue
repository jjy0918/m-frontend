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
              <md-option value="all">전체</md-option>
              <md-option value="name">이름</md-option>
              <md-option value="belong">소속</md-option>
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
    <md-table v-model="allManager.data" md-card>
      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
        @click="managerDetail(item.no)"
        class="hover"
      >
        <md-table-cell md-label="번호" md-numeric>{{ item.no }}</md-table-cell>
        <md-table-cell md-label="아이디">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="이름">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="소속">{{ item.belong }}</md-table-cell>
        <md-table-cell md-label="등록일">{{
          item.registrationDate
        }}</md-table-cell>
      </md-table-row>
    </md-table>

    <div class="text-center" v-if="allManager.data.length === 0">
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
          @click="changeNum(allManager.pageInfo.totalPages)"
          ><i class="fas fa-angle-double-right"></i
        ></md-button>
      </div>
      <div class="col-sm-1 container">
        <md-button class="md-primary" @click="createManaer()"
          >등록하기</md-button
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
      allManager: { data: [] },
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
      this.$store.dispatch("getAllManager", getPage);
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
        this.$store.dispatch("searchManager", {
          type: this.managerType,
          word: this.searchWordFix,
          page: getPage,
        });
      }
    },
    changeNum(nextNum) {
      if (nextNum < 1 || nextNum > this.allManager.pageInfo.totalPages) {
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
      this.$router.push(`/manager/mm/md/${no}`);
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
      this.$router.push(`/manager/mm/mc`);
    },
  },
  created() {
    this.loginUserId = this.$store.state.loginUserId;

    this.$store.dispatch("checkLogin");

    if (this.loginUserId === null) {
      alert("로그인이 필요한 서비스입니다.");
      this.$router.push(`/`);
    }
    this.isAdmin = this.$store.state.isAdmin;
    this.$store.dispatch("checkAdmin");
    this.getAllManager(1);
  },
  computed: {
    newAllManager() {
      return this.$store.state.allManager;
    },
    newReload() {
      return this.$store.state.reload;
    },
    newAdmin() {
      return this.$store.state.isAdmin;
    },
    newResultLocation() {
      return this.$store.state.loginUserId;
    },
  },
  watch: {
    // 갱신
    newAllManager(newValue) {
      this.allManager = newValue;
      this.pagiNation(this.allManager.pageInfo);
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
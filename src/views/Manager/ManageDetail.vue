<template>
  <div class="col-sm-10 container my-3" v-if="isAdmin">
    <md-card class="md-layout-item container">
      <md-card-header>
        <div class="md-title">관리자 수정</div>
      </md-card-header>
      <md-field>
        <label>아이디</label>
        <md-input v-model="id" required></md-input>
        <span class="md-helper-text">영문/숫자 5자리 이상, 12자리 이하</span>
      </md-field>

      <md-field>
        <label>성명</label>
        <md-input v-model="name" required></md-input>
      </md-field>

      <md-field>
        <label>소속</label>
        <md-input v-model="belong"></md-input>
      </md-field>

      <md-field>
        <label>연락처</label>
        <md-input v-model="phoneNumber"></md-input>
      </md-field>

      <div>
        <md-radio v-model="role" value="ADMIN">마스터관리자</md-radio>
        <md-radio v-model="role" value="MANAGER">일반관리자</md-radio>
        <span>※일반관리자는 상세권한을 아래에서 선택해주세요</span>
      </div>
      <div class="block">
        <hr />
        <div class="title text-center">관리자(사용자) 관리</div>
        <div class="input">
          <md-checkbox v-model="permission" value="ADMIN"
            >관리자 등록/관리</md-checkbox
          >
        </div>
      </div>

      <div class="block">
        <hr />
        <div class="title text-center">제품관리</div>
        <div class="input">
          <md-checkbox v-model="permission" value="PM_UPS_STS"
            >UPS&amp;STS</md-checkbox
          >
          <md-checkbox v-model="permission" value="PM_ESS">ESS</md-checkbox>
          <md-checkbox v-model="permission" value="PM_COOLING"
            >COOLING</md-checkbox
          >
          <md-checkbox v-model="permission" value="PM_LIGHTING"
            >LIGHTING</md-checkbox
          >
          <md-checkbox v-model="permission" value="PM_RAILROAD"
            >RAILROAD</md-checkbox
          >
        </div>
      </div>

      <div class="block">
        <hr />
        <div class="title text-center">구축사례관리</div>
        <div class="input">
          <md-checkbox v-model="permission" value="CM_UPS_STS"
            >UPS&amp;STS</md-checkbox
          >
          <md-checkbox v-model="permission" value="CM_ESS">ESS</md-checkbox>
          <md-checkbox v-model="permission" value="CM_COOLING"
            >COOLING</md-checkbox
          >
          <md-checkbox v-model="permission" value="CM_LIGHTING"
            >LIGHTING</md-checkbox
          >
          <md-checkbox v-model="permission" value="CM_RAILROAD"
            >RAILROAD</md-checkbox
          >
        </div>
      </div>

      <hr />
      <br />
    </md-card>
    <div class="row container my-3">
      <div class="col-sm-1 container">
        <md-button class="md-accent" @click="deleteManaer()"
          >삭제하기</md-button
        >
      </div>
      <div class="text-center col-sm-9"></div>
      <div class="col-sm-1 container">
        <md-button class="md-primary" @click="createManaer()"
          >수정하기</md-button
        >
      </div>
      <div class="col-sm-1 container">
        <md-button class="md-Accent" @click="cancelManaer()"
          >취소하기</md-button
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
      id: null,
      name: null,
      belong: null,
      phoneNumber: null,
      password: null,
      passwordCheck: null,
      role: "MANAGER",
      hasMessages: true,
      permission: [],
      no: 0,
    };
  },
  methods: {
    ConfirmPassword() {
      if (this.passwordCheck != this.password) {
        this.hasMessages = true;
      } else {
        this.hasMessages = false;
      }
    },
    clear() {
      this.id = null;
      this.name = null;
      this.belong = null;
      this.phoneNumber = null;
      this.password = null;
      this.passwordCheck = null;
      this.role = "MANAGER";
      this.hasMessages = true;
      this.permission = [];
    },
    createManaer() {
      if (!this.id || !this.name) {
        alert("필수 항목이 입력되지 않았습니다.");
      } else {
        let p = [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ];
        let newRole = "MANAGER";
        for (let index in this.permission) {
          if (this.permission[index] === "PM_UPS_STS") {
            p[0] = true;
          } else if (this.permission[index] === "PM_ESS") {
            p[1] = true;
          } else if (this.permission[index] === "PM_COOLING") {
            p[2] = true;
          } else if (this.permission[index] === "PM_LIGHTING") {
            p[3] = true;
          } else if (this.permission[index] === "PM_RAILROAD") {
            p[4] = true;
          } else if (this.permission[index] === "CM_UPS_STS") {
            p[5] = true;
          } else if (this.permission[index] === "CM_ESS") {
            p[6] = true;
          } else if (this.permission[index] === "CM_COOLING") {
            p[7] = true;
          } else if (this.permission[index] === "CM_LIGHTING") {
            p[8] = true;
          } else if (this.permission[index] === "CM_RAILROAD") {
            p[9] = true;
          } else if (this.permission[index] === "ADMIN") {
            newRole = "ADMIN";
          }
        }
        // 객체에 넣어주기
        let newManager = {
          id: this.id,
          name: this.name,
          belong: this.belong,
          phoneNumber: this.phoneNumber,
          // password: this.password,
          role: newRole,
          pmUpsSts: p[0],
          pmEss: p[1],
          pmCooling: p[2],
          pmLighting: p[3],
          pmRailroad: p[4],
          cmUpsSts: p[5],
          cmEss: p[6],
          cmCooling: p[7],
          cmLighting: p[8],
          cmRailroad: p[9],
          nowNo: this.no,
        };
        this.$store.dispatch("editManager", newManager);
      }
    },
    cancelManaer() {
      this.$router.push(`/manager/mm/ml`);
    },
    deleteManaer() {
      this.$store.dispatch("deleteManager", this.no);
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

    this.no = this.$route.params.no;
    this.$store.commit("clearManagerDetailInfo");
    this.$store.dispatch("getManagerDetail", this.no);
  },
  computed: {
    messageClass() {
      return {
        "md-invalid": this.hasMessages,
      };
    },
    selectAll() {
      return this.role;
    },
    goManagerList() {
      return this.$store.state.goManagerList;
    },
    newManagerDetail() {
      return this.$store.state.managerDetail;
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
    selectAll(newValue) {
      if (newValue === "ADMIN") {
        this.permission = [];
        this.permission.push("ADMIN");
        this.permission.push("PM_UPS_STS");
        this.permission.push("PM_ESS");
        this.permission.push("PM_COOLING");
        this.permission.push("PM_LIGHTING");
        this.permission.push("PM_RAILROAD");

        this.permission.push("CM_UPS_STS");
        this.permission.push("CM_ESS");
        this.permission.push("CM_COOLING");
        this.permission.push("CM_LIGHTING");
        this.permission.push("CM_RAILROAD");
      } else {
        this.permission = [];
      }
    },
    newAdmin(newValue) {
      this.isAdmin = newValue;
    },
    goManagerList() {
      this.cancelManaer();
    },
    newResultLocation(newValue) {
      this.loginUserId = newValue;
      if (this.loginUserId == null) {
        alert("로그인이 필요한 서비스입니다.");
        this.$router.push(`/`);
      }
    },
    newManagerDetail(newValue) {
      this.clear();
      this.id = newValue.id;
      this.name = newValue.name;
      this.belong = newValue.belong;
      this.phoneNumber = newValue.phoneNumber;
      this.permission = [];
      if (newValue.pmUpsSts) {
        this.permission.push("PM_UPS_STS");
      }

      if (newValue.pmEss) {
        this.permission.push("PM_ESS");
      }

      if (newValue.pmCooling) {
        this.permission.push("PM_COOLING");
      }

      if (newValue.pmLighting) {
        this.permission.push("PM_LIGHTING");
      }

      if (newValue.pmRailroad) {
        this.permission.push("PM_RAILROAD");
      }

      if (newValue.cmUpsSts) {
        this.permission.push("CM_UPS_STS");
      }

      if (newValue.cmEss) {
        this.permission.push("CM_ESS");
      }

      if (newValue.cmCooling) {
        this.permission.push("CM_COOLING");
      }

      if (newValue.cmLighting) {
        this.permission.push("CM_LIGHTING");
      }

      if (newValue.cmRailroad) {
        this.permission.push("CM_RAILROAD");
      }

      if (newValue.role == "ADMIN") {
        this.permission.push("ADMIN");
      }
    },
  },
};
</script>

<style></style>

<template>
  <div class="col-sm-10 container my-3" v-if="isAdmin">
    <md-card class="md-layout-item container">
      <md-card-header>
        <div class="md-title">관리자 등록</div>
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

      <md-field>
        <label>비밀번호</label>
        <md-input v-model="password" required type="password"></md-input>
        <span class="md-helper-text"
          >영문/숫자 조합 8자리 이상, 12자리 이하</span
        >
      </md-field>

      <md-field :class="messageClass">
        <label>비밀번호(확인)</label>
        <md-input
          v-model="passwordCheck"
          required
          type="password"
          @keyup="ConfirmPassword"
        ></md-input>
        <span class="md-error">비밀번호가 일치하지 않습니다.</span>
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
      <div class="text-center col-sm-10"></div>
      <div class="col-sm-1 container">
        <md-button class="md-primary" @click="createManaer()"
          >등록하기</md-button
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
      role: null,
      hasMessages: true,
      permission: [],
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
    createManaer() {
      if (this.password != this.passwordCheck) {
        alert("비밀번호가 일치하지 않습니다.");
      } else if (!this.id || !this.name || !this.password) {
        alert("필수 항목이 입력되지 않았습니다.");
      } else {
        let p = [false, false, false, false, false, false, false, false];
        let newRole = "MANAGER";
        for (let index in this.permission) {
          if (this.permission[index] === "PM_UPS_STS") {
            p[0] = true;
          } else if (this.permission[index] === "PM_COOLING") {
            p[1] = true;
          } else if (this.permission[index] === "PM_LIGHTING") {
            p[2] = true;
          } else if (this.permission[index] === "PM_RAILROAD") {
            p[3] = true;
          } else if (this.permission[index] === "CM_UPS_STS") {
            p[4] = true;
          } else if (this.permission[index] === "CM_COOLING") {
            p[5] = true;
          } else if (this.permission[index] === "CM_LIGHTING") {
            p[6] = true;
          } else if (this.permission[index] === "CM_RAILROAD") {
            p[7] = true;
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
          password: this.password,
          role: newRole,
        };
        console.log(newManager);
        // this.$store.dispatch("cre    ateManager", newManager);
      }
    },
    cancelManaer() {
      this.$router.push(`/manager/managermanagerment/managerlist`);
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
    }
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
  },
  watch: {
    // 갱신
    selectAll(newValue) {
      if (newValue === "ADMIN") {
        this.permission = [];
        this.permission.push("ADMIN");
        this.permission.push("PM_UPS_STS");
        this.permission.push("PM_COOLING");
        this.permission.push("PM_LIGHTING");
        this.permission.push("PM_RAILROAD");

        this.permission.push("CM_UPS_STS");
        this.permission.push("CM_COOLING");
        this.permission.push("CM_LIGHTING");
        this.permission.push("CM_RAILROAD");
      } else {
        this.permission = [];
      }
    },
  },
};
</script>

<style>
</style>
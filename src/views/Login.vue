<template>
  <div class="hello">
    <b-card
      header="EPKOREA 관리자 로그인"
      style="max-width: 40rem; margin: auto; margin-top: 10vh"
      class="mb-2"
      border-variant="info"
      align="center"
    >
      <b-form-group id="to-do-input">
        <b-container fluid>
          <b-row class="my-1" v-if="loginUserId == null">
            <b-col>
              <md-field md-clearable>
                <label>ID</label>
                <md-input v-model="id"></md-input>
              </md-field>
              <md-field>
                <label>Password</label>
                <md-input v-model="password" type="password"></md-input>
              </md-field>
            </b-col>

            <b-col sm="6">
              <md-button class="md-raised md-primary" @click="goUser()"
                >유저 페이지</md-button
              >
            </b-col>
            <b-col sm="6">
              <md-button class="md-raised md-primary" @click="login()"
                >로그인</md-button
              >
            </b-col>
          </b-row>

          <b-row class="my-1" v-else>
            <b-col>
              <md-field>
                <label>ID</label>
                <md-input v-model="loginUserId" readonly></md-input>
              </md-field>
            </b-col>
            <b-col sm="12"> <br /></b-col>

            <b-col sm="4">
              <md-button class="md-raised md-primary" @click="goManager()"
                >관리자 페이지</md-button
              >
            </b-col>
            <b-col sm="4">
              <md-button class="md-raised md-primary" @click="goUser()"
                >유저 페이지</md-button
              >
            </b-col>
            <b-col sm="4">
              <md-button class="md-raised md-accent" @click="logout()"
                >로그아웃</md-button
              >
            </b-col>
          </b-row>
        </b-container>
      </b-form-group>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginType: "MANAGER",
      id: null,
      password: null,
      loginUserId: null,
    };
  },
  methods: {
    login() {
      if (!this.id || !this.password) {
        alert("아이디나 비밀번호가 입력되지 않았습니다.");
        //userLogin
      } else {
        var userDto = {
          id: this.id,
          password: this.password,
          type: this.loginType,
        };
        this.$store.dispatch("userLogin", userDto);
      }
      this.loginAlert = true;
    },
    logout() {
      this.$store.dispatch("logout");
    },
    goManager() {
      this.$router.push(`/manager/mm`);
    },
    goUser() {
      this.$router.push("/user");
    },
  },
  computed: {
    // 값 변경이 일어나면
    newResultLocation() {
      return this.$store.state.loginUserId;
    },
  },
  watch: {
    // 갱신
    newResultLocation(newValue) {
      this.loginUserId = newValue;
      this.id = null;
      this.password = null;
    },
  },
  created() {
    this.$store.dispatch("checkLogin");
    this.loginUserId = this.$store.state.loginUserId;
  },
};
</script>

<style>
</style>
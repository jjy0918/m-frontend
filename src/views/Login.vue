<template>
  <div class="hello">
    <b-card
      header="EPKOREA"
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

            <b-col sm="10">
              <md-radio v-model="loginType" value="MANAGER">Manger</md-radio>
              <md-radio v-model="loginType" value="USER">User</md-radio>
            </b-col>
            <b-col sm="2">
              <md-button class="md-raised md-primary" @click="login()"
                >로그인</md-button
              >
            </b-col>
          </b-row>

          <b-row class="my-1" v-else>
            <b-col>
              <md-field>
                <label>ID</label>
                <md-input v-model="loginUserId.id" readonly></md-input>
              </md-field>

              <md-field>
                <label>NAME</label>
                <md-input v-model="loginUserId.name" readonly></md-input>
              </md-field>

              <md-field>
                <label>ROLE</label>
                <md-input v-model="loginUserId.role" readonly></md-input>
              </md-field>
            </b-col>

            <b-col sm="10">
              <md-radio v-model="loginType" value="MANAGER"
                >Masdasdanger</md-radio
              >
              <md-radio v-model="loginType" value="USER">Usasder</md-radio>
            </b-col>
            <b-col sm="2">
              <md-button class="md-raised md-primary" @click="logout()"
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
      this.$store.commit("logout");
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
      if (this.loginUserId != null) {
        if (
          this.loginUserId.role === "MANAGER" ||
          this.loginUserId.role === "ADMIN"
        ) {
          this.$router.push(`/manager/mm`);
        } else if (this.loginUserId.role === "USER") {
          this.$router.push(`/user`);
        }
      } else {
        this.$router.push(`/`);
      }
    },
  },
  created() {
    this.loginUserId = this.$store.state.loginUserId;
    console.log(this.loginUserId);
  },
};
</script>

<style>
</style>
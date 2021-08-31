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
          <b-row class="my-1">
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
              <md-radio v-model="radio" value="manager">Manger</md-radio>
              <md-radio v-model="radio" value="user">User</md-radio>
            </b-col>
            <b-col sm="2">
              <md-button class="md-raised md-primary" @click="login()"
                >로그인</md-button
              >
            </b-col>
          </b-row>
        </b-container>
      </b-form-group>
    </b-card>
    <md-dialog-alert
      :md-active.sync="loginAlert"
      :md-content="message"
      md-confirm-text="확인"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "manager",
      id: null,
      password: null,
      loginAlert: false,
      message: "",
    };
  },
  methods: {
    login() {
      if (!this.id || !this.password) {
        this.message = "아이디나 비밀번호가 입력되지 않았습니다.";
      } else {
        this.message = "로그인 시도";
      }
      this.loginAlert = true;
    },
  },
};
</script>

<style>
</style>
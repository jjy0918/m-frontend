<template>
  <div class="container">
    <!-- Container (About Section) -->
    <div id="about" class="container-fluid">
      <div class="row">
        <h2 class="text-center hover" @click="goMain()">EPKOREA</h2>
        <br />
        <hr />
        <br />
        <div class="col-sm-8">
          <h2>유저 페이지</h2>
          <br />
          <h4>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </h4>
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat
            non proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </p>
          <br /><button class="btn btn-default btn-lg">Get in Touch</button>
        </div>
        <div class="col-sm-4">
          <span class="glyphicon glyphicon-signal logo"></span>
        </div>
      </div>
    </div>

    <!-- Container (Portfolio Section) -->
    <div id="portfolio" class="container-fluid text-center bg-grey">
      <h2>내용</h2>
      <br />
      <h4>What we have created</h4>

      <br />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goMain() {
      this.$router.push(`/`);
    },
  },
};
</script>

<style>
h2 {
  font-size: 24px;
  text-transform: uppercase;
  color: #303030;
  font-weight: 600;
  margin-bottom: 30px;
}
h4 {
  font-size: 19px;
  line-height: 1.375em;
  color: #303030;
  font-weight: 400;
  margin-bottom: 30px;
}
.container-fluid {
  padding: 60px 50px;
}
.bg-grey {
  background-color: #f6f6f6;
}
.logo {
  color: #f4511e;
  font-size: 200px;
}
.hover {
  cursor: pointer;
}
</style>

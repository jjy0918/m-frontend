<template>
  <div>
    <button @click="move()">라우터 이용 이동</button>
    <button @click="maangerLog()">매니저 로그 가져오기</button>
    <div v-for="(item, index) in test" v-bind:key="index">
      <h2>{{ index }} + {{ number }}</h2>
      <h1>{{ item }}</h1>
      <br />
    </div>
  </div>
</template>

<script>
export default {
  name: "Chat",
  data() {
    return {
      test: [],
      number: 3,
    };
  },
  methods: {
    move() {
      this.$router.push(`/`);
    },
    maangerLog() {
      console.log("???");
      this.$store.dispatch("getAllManager");
      console.log("???");
    },
  },
  computed: {
    // 값 변경이 일어나면
    newResultLocation() {
      return this.$store.state.test;
    },
  },
  watch: {
    // 갱신
    newResultLocation(newValue) {
      this.test = newValue;
    },
  },
};
</script>

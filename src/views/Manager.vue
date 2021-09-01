<template>
  <div class="container">
    <my-header></my-header>
    <br />
    <br />
    <router-view></router-view>
  </div>
</template>

<script>
import MyHeader from "./Header.vue";
export default {
  components: {
    MyHeader,
  },
  name: "Main",
};
</script>

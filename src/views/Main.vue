<template>
  <div>
    1
    <my-header></my-header>
    2
    <router-view></router-view>
    1
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

<template>
  <div class="container">
    <my-header-admin v-if="isAdmin"></my-header-admin>
    <my-header v-else></my-header>
    <br />
    <br />
    <router-view></router-view>
  </div>
</template>

<script>
import MyHeader from "@/views/Header.vue";
import MyHeaderAdmin from "@/views/HeaderAdmin.vue";
// import MyHeader from "../Header.vue";
export default {
  data() {
    return {
      isAdmin: false,
    };
  },
  created() {
    this.isAdmin = this.$store.state.isAdmin;
    this.$store.dispatch("checkAdmin");
  },
  computed: {
    newAdmin() {
      return this.$store.state.isAdmin;
    },
  },
  watch: {
    newAdmin(newValue) {
      this.isAdmin = newValue;
    },
  },
  components: {
    MyHeader,
    MyHeaderAdmin,
  },
  name: "Main",
};
</script>

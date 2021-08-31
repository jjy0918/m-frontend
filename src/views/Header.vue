<template>
  <div>
    <hr />
    <hr />
    <h2>Header</h2>
    <button @click="moveManager()">manager 이동</button>
    <button @click="moveUser()">user 이동</button>
    <hr />
    <hr />
  </div>
</template>

<script>
export default {
  methods: {
    moveManager() {
      this.$router.push(`/manager/content`);
    },
    moveUser() {
      this.$router.push(`/user`);
    },
  },
};
</script>

<style lang="scss" scoped></style>

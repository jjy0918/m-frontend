<template>
  <div>
    <br />
    <br />
    <h2 class="text-center hover" @click="goMain()">EPKOREA</h2>
    <br />
    <md-tabs class="md-transparent" md-alignment="fixed">
      <md-tab
        id="tab-page"
        md-label="관리자 관리"
        @click="moveManagerManagement()"
        v-show="isAdmin"
      ></md-tab>
      <md-tab
        id="tab-home"
        md-label="사업 관리"
        @click="moveProductManagement()"
      ></md-tab>
      <md-tab id="tab-posts" md-label="홍보센터" @click="moveEmpty()"></md-tab>
      <md-tab
        id="tab-favorites"
        md-label="채용 안내"
        @click="moveEmpty()"
      ></md-tab>
    </md-tabs>
  </div>
</template>

<script>
export default {
  methods: {
    moveManagerManagement() {
      this.$router.push(`/manager/mm`);
    },
    moveProductManagement() {
      this.$router.push(`/manager/bm`);
    },
    moveEmpty() {
      this.$router.push(`/manager/empty`);
    },
    goMain() {
      this.$router.push(`/`);
    },
  },
};
</script>

<style>
.hover {
  cursor: pointer;
}
</style>

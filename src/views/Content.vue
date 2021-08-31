<template>
  <!-- <router-view></router-view> -->
  <div>
    <h1 style="color: red">asdasd</h1>
    <button @click="move()">chat 이용 이동</button>
    <h2>Alerts</h2>
    <div class="hello">
      <b-card
        header="오늘 해야 할 일"
        style="max-width: 40rem; margin: auto; margin-top: 10vh"
        class="mb-2"
        border-variant="info"
        align="left"
      >
        <b-form-group id="to-do-input">
          <b-container fluid>
            <b-row class="my-1">
              <b-col sm="10">
                <b-form-input
                  v-model="title"
                  type="text"
                  placeholder="새 할 일을 적으세요."
                />
              </b-col>
              <b-col sm="2">
                <b-button variant="outline-primary">추가</b-button>
              </b-col>
            </b-row>
          </b-container>
        </b-form-group>

        <b-list-group v-if="toDoItems && toDoItems.length">
          <b-list-group-item
            v-for="toDoItem of toDoItems"
            v-bind:data="toDoItem.title"
            v-bind:key="toDoItem.id"
          >
            <b-form-checkbox v-model="toDoItem.done">
              {{ toDoItem.title }}
            </b-form-checkbox>
          </b-list-group-item>
        </b-list-group>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    move() {
      this.$router.push(`/manager/chat`);
    },
  },
};
</script>

<style lang="scss" scoped></style>

import Vue from "vue";
import VueRouter from "vue-router";

// 뷰인스턴스가 vue-router 라이브러리를 사용할것임을 명시한다.
Vue.use(VueRouter);

// 만약 이전 글에서 alias 경로 단축을 설정했다면 다음과 같이 절대경로로 작성가능하다.
import Main from "@/views/Main.vue";
import Chat from "@/views/Chat.vue";
import Content from "@/views/Content.vue";
import Test from "@/views/test.vue";

// 경로 단축을 안했다면 다음과 같이 상대 경로를 사용한다.
//import Main from '../views/Main.vue'
//import Chat from '../views/Chat.vue'

// ES6 Named export 방식
export const router = new VueRouter({
  mode: "history", // default는 hash 모드이다. history 모드를 적용하지 않으면 localhost:8080/#/ 이렇게 표시된다.
  routes: [
    {
      path: "/",
      component: Main,
      name: "Main",
      redirect: "/content",
      children: [
        {
          path: "content",
          component: Content,
          name: "Content", // name을 적어주면 나중에 프로그래밍 방식의 라우터 전환이 편해진다.
        },
        {
          path: "chat",
          component: Chat,
          name: "Chat",
        },
        {
          path: "test",
          component: Test,
          name: "Test",
        },
      ],
    },
  ],
});

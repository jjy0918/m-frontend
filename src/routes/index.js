import Vue from "vue";
import VueRouter from "vue-router";

// 뷰인스턴스가 vue-router 라이브러리를 사용할것임을 명시한다.
Vue.use(VueRouter);

// 만약 이전 글에서 alias 경로 단축을 설정했다면 다음과 같이 절대경로로 작성가능하다.
import Manager from "@/views/Manager.vue";
import ManagerManagement from "@/views/Manager/ManagerManagement.vue";
import ManagerManagementList from "@/views/Manager/ManagerManagementList.vue";
import ManagerLogList from "@/views/Manager/ManagerLogList.vue";
import ManagerCreate from "@/views/Manager/ManagerCreate.vue";
import ManageDetail from "@/views/Manager/ManageDetail.vue";
import User from "@/views/User.vue";
import Login from "@/views/Login.vue";
import Empty from "@/views/Empty.vue";

import BusinessManagement from "@/views/BusinessManagement/BusinessManagement.vue";
import ProductManagement from "@/views/BusinessManagement/ProductManagement.vue";
import ProductManagerCreate from "@/views/BusinessManagement/ProductManagerCreate.vue";
import ProductManagerDetail from "@/views/BusinessManagement/ProductManagerDetail.vue";
import ConstructionManagement from "@/views/BusinessManagement/ConstructionManagement.vue";
import ConstructionManagerCreate from "@/views/BusinessManagement/ConstructionManagerCreate.vue";
import ConstructionManagerDetail from "@/views/BusinessManagement/ConstructionManagerDetail.vue";


// 경로 단축을 안했다면 다음과 같이 상대 경로를 사용한다.
//import Main from '../views/Main.vue'
//import Chat from '../views/Chat.vue'

// ES6 Named export 방식
export const router = new VueRouter({
  mode: "history", // default는 hash 모드이다. history 모드를 적용하지 않으면 localhost:8080/#/ 이렇게 표시된다.
  routes: [
    {
      path: "/manager",
      component: Manager,
      name: "Manager",
      redirect: "/manager/mm",
      children: [
        {
          path: "/manager/mm",
          component: ManagerManagement,
          name: "managermanagement", // name을 적어주면 나중에 프로그래밍 방식의 라우터 전환이 편해진다.
          children: [
            {
              path: "/manager/mm/ml",
              component: ManagerManagementList,
              name: "managerlist"
            },
            {
              path: "/manager/mm/mlog",
              component: ManagerLogList,
              name: "managerlog"
            },
            {
              path: "/manager/mm/md/:no",
              component: ManageDetail,
              name: "managerdtail"
            },
            {
              path: "/manager/mm/mc",
              component: ManagerCreate,
              name: "managercreate"
            }
          ]
        },
        {
          path: "/manager/bm",
          component: BusinessManagement,
          name: "businessManagement",
          children: [
            {
              path: "/manager/bm/pm",
              component: ProductManagement,
              name: "productManagement"
            },
            {
              path: "/manager/bm/pmc",
              component: ProductManagerCreate,
              name: "productManagerCreate"
            },
            {
              path: "/manager/bm/pmd/:no",
              component: ProductManagerDetail,
              name: "productManagerDetail"
            },
            {
              path: "/manager/bm/cm",
              component: ConstructionManagement,
              name: "constructionManagement"
            },
            {
              path: "/manager/bm/cmc",
              component: ConstructionManagerCreate,
              name: "constructionManagerCreate"
            }
            ,
            {
              path: "/manager/bm/cmd/:no",
              component: ConstructionManagerDetail,
              name: "constructionManagerDetail"
            }
          ]
        },
        {
          path: "/manager/empty",
          component: Empty,
          name: "Empty",
        },

      ],
    },
    {
      path: "/user",
      component: User,
      name: "User"
    },
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      component: Login,
      name: "Login"
    }

  ],
});

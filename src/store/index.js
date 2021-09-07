import Vue from "vue";
import Vuex from "vuex";
import http from "@/http-common";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    test: {},
    loginUserId: null,
    allManager: null,
    allManagerLog: null,
    goManagerList: false,
    managerDetail: null,
    productManager: null,
    pImage: null,
    pPdf: null,
    constructionManager: null,
    detailImage: null,
    bannerImage: null
  },
  mutations: {
    saveTest: (state, payload) => {
      state.test = payload.data.managerLogList;
    },
    saveLoginUser: (state, payload) => {
      state.loginUserId = payload;
    },
    logout: (state) => {
      state.loginUserId = null;
    },
    saveAllManager: (state, payload) => {

      if (payload.data.length == 0) {
        state.allManager = { data: [{ no: "검색 결과 없음" }] };
      }
      else {
        state.allManager = payload;

      }
    },
    saveAllManagerLog: (state, payload) => {
      if (payload.data.length == 0) {
        state.allManagerLog = { data: [{ no: "검색 결과 없음" }] };
      }
      else {
        state.allManagerLog = payload;

      }
    },
    saveProductManager: (state, payload) => {
      if (payload.data.length == 0) {
        state.productManager = { data: [{ no: "검색 결과 없음" }] };
      }
      else {
        state.productManager = payload;
        console.log(state.productManager);

      }
    },
    goManagerList: (state) => {
      state.goManagerList ^= true;
      console.log(state.goManagerList);
    },
    clearManagerDetailInfo: (state) => {
      state.managerDetail = null;
    },
    managerDetailInfo: (state, payload) => {
      state.managerDetail = payload.data;
      if (payload.data.banners.length != 0) {
        state.bannerImage = payload.data.banners;

      }
      if (payload.data.detailimage.length != 0) {
        state.detailImage = payload.data.detailimage;

      }

    },
    savePImage: (state, payload) => {
      state.pImage = payload.data;
    },
    clearPImage: (state) => {
      state.pImage = null;
    },
    savePPdf: (state, payload) => {
      state.pPdf = payload.data;
    },
    clearPPdf: (state) => {
      state.pPdf = null;
    },
    addDetailImage: (state) => {
      if (!state.detailImage) {
        state.detailImage = [null];
      } else if (state.detailImage.length > 10) {
        alert("추가할 수 없습니다.");
      } else {
        state.detailImage.push(null);
      }
      console.log(state.detailImage);
    },
    deleteDtailImage: (state) => {
      if (!state.detailImage || state.detailImage.length <= 0) {
        return;
      } else {
        state.detailImage.pop();
      }
    },
    deleteDetailImageByIndex: (state, index) => {
      state.detailImage.splice(index, 1);
    },
    deleteBannerImageByIndex: (state, index) => {
      state.bannerImage.splice(index, 1);
    },
    saveDetailImage: (state, payload) => {
      if (!state.detailImage) {
        state.detailImage = [];
      }
      state.detailImage[payload.index] = payload.data.data;
      console.log(state.detailImage);
    },
    clearDetailImage: (state, index) => {
      state.detailImage[index] = null;
    },
    clearDetailImageAll: (state) => {
      state.detailImage = null;
    },
    saveConstructionManager: (state, payload) => {
      if (payload.data.length == 0) {
        state.constructionManager = { data: [{ no: "검색 결과 없음" }] };
      }
      else {
        state.constructionManager = payload;

      }
    },
    saveBannerImage: (state, payload) => {
      if (!state.bannerImage) {
        state.bannerImage = [];
      }
      state.bannerImage[payload.index] = payload.data.data;
    },
    clearBannerImage: (state, index) => {
      state.bannerImage[index] = null;
    },
    clearBannerImageAll: (state) => {
      state.bannerImage = null;
    },
    addBannerImage: (state) => {
      if (!state.bannerImage) {
        state.bannerImage = [null];
      } else if (state.bannerImage.length > 30) {
        alert("추가할 수 없습니다.");
      } else {
        state.bannerImage.push(null);
      }
    },
    deleteBannerImage: (state) => {
      if (!state.bannerImage || state.bannerImage.length <= 0) {
        return;
      } else {
        state.bannerImage.pop();
      }
    },
    setConstructionDetail: (state, payload) => {
      state.detailImage = [];
      for (let i in payload.detailimage) {
        state.detailImage.push(payload.detailimage[i].image);
      }

      state.bannerImage = [];
      for (let i in payload.banners) {
        state.bannerImage.push(payload.banners[i].image);
      }

      state.pImage = payload.thumbnail;
    }

  },
  actions: {
    userLogin(store, payload) {
      http
        .post(`/login`, payload)
        // 데이터 저장
        .then(function (response) {
          alert(response.data.data.name + "님 환영합니다");
          store.commit("saveLoginUser", response.data.data);
        })
        .catch((exp) => {
          alert("아이디 혹은 비밀번호를 확인해주세요");
          console.log(exp);
        });
    },
    getAllManager(store, payload) {

      http
        .get(`/manager?page=${payload}`)
        // 데이터 저장
        .then((response) => {
          store.commit("saveAllManager", response.data);
        })
        .catch((exp) => console.log(`항목 불러오기 실패 : ${exp}`));

    },
    getAllManagerLog(store, payload) {
      http
        .get(`/managerlog?page=${payload}`)
        // 데이터 저장
        .then((response) => {
          store.commit("saveAllManagerLog", response.data);
        })
        .catch((exp) => console.log(`항목 불러오기 실패 : ${exp}`));

    },
    searchManager(store, payload) {
      http
        .get(`/manager/search/${payload.type}?word=${payload.word}&page=${payload.page}`)
        .then((response) => {
          store.commit("saveAllManager", response.data);
        })
        .catch((exp) => console.log(`매니저 검색 실패 : ${exp}`));
    },
    searchManagerLog(store, payload) {
      http
        .get(`/managerlog/search/${payload.type}?word=${payload.word}&page=${payload.page}`)
        .then((response) => {
          store.commit("saveAllManagerLog", response.data);
        })
        .catch((exp) => console.log(`매니저 검색 실패 : ${exp}`));
    }
    , createManager(store, payload) {
      http
        .post(`/manager`, payload)
        .then(() => {
          alert("정상적으로 등록되었습니다.");
          store.commit("goManagerList");

        })
        .catch((exp) => {
          console.log(exp);
          alert("등록에 실패했습니다.");

        })
    },
    editManager(store, payload) {
      http
        .put(`/manager/${payload.nowNo}`, payload)
        .then(() => {
          alert("수정에 성공하였습니다.");
          store.commit("goManagerList");
        })
        .catch((exp) => {
          console.log(exp);
          alert("수정에 실패했습니다.")
        })
    },
    getManagerDetail(store, no) {
      http
        .get(`/manager/${no}`)
        .then((response) => {
          store.commit("clearManagerDetailInfo");
          store.commit("managerDetailInfo", response.data);
        })
        .catch((e) => {
          console.log(e);
        })
    },
    deleteManager(store, no) {
      http
        .delete(`/manager/${no}`)
        .then(() => {
          alert("삭제에 성공하였습니다.");
          store.commit("goManagerList");
        })
        .catch((exp) => {
          console.log(exp);
          alert("삭제에 실패하였습니다.");
        })
    },
    getAllProductManager(store, payload) {
      http
        .get(`/productmanagement?page=${payload}`)
        // 데이터 저장
        .then((response) => {
          store.commit("saveProductManager", response.data);
        })
        .catch((exp) => console.log(`항목 불러오기 실패 : ${exp}`));

    },
    searchProductManager(store, payload) {
      http
        .get(`/productmanagement/search/${payload.type}?word=${payload.word}&page=${payload.page}`)
        .then((response) => {
          store.commit("saveProductManager", response.data);
        })
        .catch((exp) => console.log(`매니저 검색 실패 : ${exp}`));
    },
    savePImage(store, payload) {
      http
        .post(`/save`, payload, {
          headers: {
            'Content-Type': "multipart/form-data"
          }
        })
        .then((response) => {
          store.commit("savePImage", response.data);
        })
        .catch((exp) => console.log(`이미지 등록 실패 : ${exp}`));
    },
    savePPdf(store, payload) {
      http
        .post(`/save`, payload, {
          headers: {
            'Content-Type': "multipart/form-data"
          }
        })
        .then((response) => {
          store.commit("savePPdf", response.data);
        })
        .catch((exp) => console.log(`이미지 등록 실패 : ${exp}`));
    },
    createProduct(store, payload) {
      http
        .post(`/productmanagement`, payload)
        .then(() => {
          alert("정상적으로 등록되었습니다.");
          store.commit("goManagerList");

        })
        .catch((exp) => {
          console.log(exp);
          alert("등록에 실패했습니다.");

        })
    },
    getProductManagerDetail(store, no) {
      http
        .get(`/productmanagement/${no}`)
        .then((response) => {
          store.commit("clearManagerDetailInfo");
          store.commit("managerDetailInfo", response.data);
        })
        .catch((e) => {
          console.log(e);
        })
    },
    editProduct(store, payload) {
      http
        .put(`/productmanagement/${payload.no}`, payload.data)
        .then(() => {
          alert("정상적으로 수정되었습니다.");
          store.commit("goManagerList");

        })
        .catch((exp) => {
          console.log(exp);
          alert("수정에 실패했습니다.");

        })
    },
    deleteManaer(store, payload) {
      http
        .delete(`/productmanagement/${payload}`)
        .then(() => {
          alert("정상적으로 삭제되었습니다.");
          store.commit("goManagerList");

        })
        .catch((exp) => {
          console.log(exp);
          alert("삭제에 실패했습니다.");

        })
    },
    getAllConstructionManager(store, payload) {
      http
        .get(`/construction?page=${payload}`)
        // 데이터 저장
        .then((response) => {
          store.commit("saveConstructionManager", response.data);
        })
        .catch((exp) => console.log(`항목 불러오기 실패 : ${exp}`));

    },
    searchConstructionManager(store, payload) {
      http
        .get(`/construction/search/name?word=${payload.word}&page=${payload.page}`)
        .then((response) => {
          store.commit("saveConstructionManager", response.data);
        })
        .catch((exp) => console.log(`항목 검색 실패 : ${exp}`));
    },
    saveDetailImage(store, payload) {
      http
        .post(`/save`, payload.data, {
          headers: {
            'Content-Type': "multipart/form-data"
          }
        })
        .then((response) => {
          let rp = {
            data: response.data,
            index: payload.index
          }
          store.commit("saveDetailImage", rp);
        })
        .catch((exp) => console.log(`이미지 등록 실패 : ${exp}`));
    },
    saveBannerImage(store, payload) {
      http
        .post(`/save`, payload.data, {
          headers: {
            'Content-Type': "multipart/form-data"
          }
        })
        .then((response) => {
          let rp = {
            data: response.data,
            index: payload.index
          }
          store.commit("saveBannerImage", rp);
        })
        .catch((exp) => console.log(`이미지 등록 실패 : ${exp}`));
    },
    createConstruction(store, payload) {
      http
        .post(`/construction`, payload)
        .then(() => {
          alert("정상적으로 등록되었습니다.");
          store.commit("goManagerList");

        })
        .catch((exp) => {
          console.log(exp);
          alert("등록에 실패했습니다.");

        })
    },
    getConstructionManagerDetail(store, no) {
      http
        .get(`/construction/${no}`)
        .then((response) => {
          store.commit("clearManagerDetailInfo");
          store.commit("managerDetailInfo", response.data);
        })
        .catch((e) => {
          console.log(e);
        })
    },
    deleteConstruction(store, no) {
      http
        .delete(`/construction/${no}`)
        .then(() => {
          alert("정상적으로 삭제되었습니다.");
          store.commit("goManagerList");

        })
        .catch((exp) => {
          console.log(exp);
          alert("삭제에 실패했습니다.");

        })
    },
    editConstruction(store, payload) {
      http
        .put(`/construction/${payload.no}`, payload.data)
        .then(() => {
          alert("정상적으로 수정되었습니다.");
          store.commit("goManagerList");

        })
        .catch((exp) => {
          console.log(exp);
          alert("등록에 실패했습니다.");

        })
    },
  },
});

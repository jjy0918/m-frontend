<template>
  <div class="col-sm-10 container my-3" v-if="isAdmin">
    <md-card class="md-layout-item container">
      <md-card-header>
        <div class="md-title">구축 사례 관리 등록</div>
      </md-card-header>

      <div class="md-layout md-gutter">
        <div class="md-layout-item">
          <md-field>
            <label>상위 카테고리</label>
            <md-select v-model="parent" name="parent" id="parent">
              <md-option
                :value="item"
                v-for="(item, index) in categoryParent"
                :key="index"
                >{{ item }}</md-option
              >
            </md-select>
          </md-field>
        </div>

        <div class="md-layout-item">
          <md-field>
            <label>하위 카테고리</label>
            <md-select v-model="child" name="child" id="child">
              <md-option
                :value="item"
                v-for="(item, index) in categoryChild"
                :key="index"
                >{{ item }}</md-option
              >
            </md-select>
          </md-field>
        </div>
      </div>

      <md-field>
        <label>구축 사례 명</label>
        <md-input v-model="name" required></md-input>
        <span class="md-helper-text">영문/숫자 5자리 이상, 12자리 이하</span>
      </md-field>

      <md-field>
        <label>썸네일 이미지</label>
        <md-file
          v-model="image"
          accept="image/*"
          @md-change="onImageUpload($event)"
        />
        <md-button class="md-accent" @click="deleteThumbnailImage()"
          >삭제</md-button
        >
      </md-field>

      <div class="title text-center">
        <div class="md-display-1">상세 이미지</div>
        <md-button class="md-primary" @click="addDetailImage()">추가</md-button>
        <md-button class="md-accent" @click="deleteDetailImage()"
          >삭제</md-button
        >
      </div>

      <div class="row" v-for="(item, index) in detailImage" :key="index">
        <md-field>
          <label>상세 이미지</label>
          <md-file
            v-model="detailImage[index]"
            accept="image/*"
            @md-change="onDetailImageUpload($event, index)"
          />
          <md-button class="md-accent" @click="deleteDetailImageByIndex(index)"
            >삭제</md-button
          >
        </md-field>
      </div>
      <hr />

      <div class="md-layout md-gutter">
        <div class="md-layout-item">
          <md-field>
            <label>노출여부</label>
            <md-select v-model="expose" name="expose" id="expose">
              <md-option :value="true">Y</md-option>
              <md-option :value="false">N</md-option>
            </md-select>
          </md-field>
        </div>
      </div>

      <div class="title text-center">
        <div class="md-display-1">테이블 내용</div>
        <md-button class="md-primary" @click="addTable()">추가</md-button>
        <md-button class="md-accent" @click="deleteTable()">삭제</md-button>
      </div>

      <div class="row" v-for="(item, index) in table" :key="index">
        <div class="col-sm-6">
          <md-field>
            <label>제목</label>
            <md-input v-model="item.title"></md-input>
          </md-field>
        </div>

        <div class="col-sm-6">
          <md-field>
            <label>내용</label>
            <md-input v-model="item.text"></md-input>
          </md-field>
        </div>
      </div>
      <hr />
      <div class="title text-center">
        <div class="md-display-1">배너</div>
        <md-button class="md-primary" @click="addBannerImage()">추가</md-button>
        <md-button class="md-accent" @click="deleteBannerImage()"
          >삭제</md-button
        >
      </div>

      <div class="row" v-for="(item, index) in bannerImage" :key="index">
        <div class="col-sm-6">
          <md-field>
            <label>이름</label>
            <md-input v-model="item.name"></md-input>
          </md-field>
        </div>

        <div class="col-sm-6">
          <md-field>
            <label>배너 등록</label>
            <md-file
              v-model="item.image"
              accept="image/*"
              @md-change="onBannerImageUpload($event, index)"
            />
            <md-button
              class="md-accent"
              @click="deleteBannerImageByIndex(index)"
              >삭제</md-button
            >
          </md-field>
        </div>
      </div>
      <hr />

      <br />
    </md-card>
    <div class="row container my-3">
      <div class="text-center col-sm-10"></div>
      <div class="col-sm-1 container">
        <md-button class="md-primary" @click="createManaer()"
          >등록하기</md-button
        >
      </div>
      <div class="col-sm-1 container">
        <md-button class="md-Accent" @click="cancelManaer()"
          >취소하기</md-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginUserId: null,
      isAdmin: false,
      name: null,
      categoryParent: ["UPS&STS", "ESS", "COOLING", "LIGHTING", "RAILROAD"],
      categoryChild: ["UPS", "STS", "BATTERY"],
      parent: "UPS&STS",
      child: "UPS",
      image: null,
      imageLink: null,
      detailImage: null,
      detailImageLink: null,
      expose: true,
      table: null,
      editor: null,
      thumbnailImage: null,
      bannerImage: null,
      bannerImageLink: null,
      categoryToNum: {
        "UPS&STS": {
          UPS: 1,
          STS: 2,
          BATTERY: 3,
        },
        ESS: {
          ESS: 4,
          SOLAR: 5,
        },
        COOLING: {
          CHILLER: 6,
          CRAC: 7,
          InRow: 8,
          Containment: 9,
          기타: 10,
        },
        LIGHTING: {
          "LED Lighting": 11,
          "Lighting Control": 12,
          PLS: 13,
        },
        RAILROAD: {
          RAILROAD: 14,
        },
      },
    };
  },
  methods: {
    createManaer() {
      if (!this.name) {
        alert("제품명을 입력하지 않았습니다.");
      } else {
        let newTableList = [];
        for (let i in this.table) {
          if (!this.table[i].title || !this.table[i].text) {
            alert("테이블 내용이 입력되지 않았습니다.");
            return;
          }
          newTableList.push(this.table[i]);
        }
        let newDetailImageList = [];
        this.detailImageLink = this.$store.state.detailImage;
        console.log(this.detailImageLink);

        for (let i in this.detailImage) {
          if (!this.detailImageLink[i]) {
            alert("상세 이미지 내용이 입력되지 않았습니다.");
            return;
          }
          newDetailImageList.push(this.detailImageLink[i].image);
        }

        let newBannerImageList = [];
        this.bannerImageLink = this.$store.state.bannerImage;

        for (let i in this.bannerImage) {
          if (!this.bannerImage[i].name || !this.bannerImageLink[i]) {
            alert("배너 내용이 입력되지 않았습니다.");
            return;
          }
          newBannerImageList.push({
            name: this.bannerImage[i].name,
            image: this.bannerImageLink[i].image,
          });
        }

        let product = {
          name: this.name,
          thumbnail: this.imageLink,
          catalog: this.pdfLink,
          expose: this.expose,
          tableList: newTableList,
          category: this.categoryToNum[this.parent][this.child],
          detailImage: newDetailImageList,
          banner: newBannerImageList,
        };

        this.$store.dispatch("createConstruction", product);
      }
    },
    cancelManaer() {
      this.$router.push(`/manager/bm/cm`);
    },
    onImageUpload(evt) {
      if (evt[0]) {
        this.$store.commit("clearPImage");
        let frm = new FormData();
        frm.append("file", evt[0]);
        this.$store.dispatch("savePImage", frm);
      }
    },
    onDetailImageUpload(evt, i) {
      if (evt[0]) {
        this.$store.commit("clearDetailImage", i);
        let frm = new FormData();
        frm.append("file", evt[0]);
        let payload = {
          data: frm,
          index: i,
        };
        this.$store.dispatch("saveDetailImage", payload);
      }
    },
    onBannerImageUpload(evt, i) {
      if (evt[0]) {
        this.$store.commit("clearBannerImage", i);
        let frm = new FormData();
        frm.append("file", evt[0]);
        let payload = {
          data: frm,
          index: i,
        };

        this.$store.dispatch("saveBannerImage", payload);
      }
    },
    addTable() {
      if (!this.table) {
        this.table = [{ title: null, text: null }];
      } else if (this.table.length > 10) {
        alert("추가할 수 없습니다.");
      } else {
        this.table.push({ title: null, text: null });
      }
    },
    deleteTable() {
      if (!this.table || this.table.length <= 0) {
        alert("삭제할 수 없습니다.");
      } else {
        this.table.pop();
      }
    },
    addDetailImage() {
      if (!this.detailImage) {
        this.detailImage = [null];
        this.$store.commit("addDetailImage");
      } else if (this.detailImage.length > 10) {
        alert("추가할 수 없습니다.");
      } else {
        this.detailImage.push(null);
        this.$store.commit("addDetailImage");
      }
    },
    deleteDetailImage() {
      if (!this.detailImage || this.detailImage.length <= 0) {
        alert("삭제할 수 없습니다.");
      } else {
        this.detailImage.pop();
        this.$store.commit("deleteDtailImage");
      }
    },
    addBannerImage() {
      if (!this.bannerImage) {
        this.bannerImage = [{ name: null, image: null }];
        this.$store.commit("addBannerImage");
      } else if (this.bannerImage.length > 30) {
        alert("추가할 수 없습니다.");
      } else {
        this.bannerImage.push({ name: null, image: null });
        this.$store.commit("addBannerImage");
      }
    },
    deleteBannerImage() {
      if (!this.bannerImage || this.bannerImage.length <= 0) {
        alert("삭제할 수 없습니다.");
      } else {
        this.bannerImage.pop();
        this.$store.commit("deleteBannerImage");
      }
    },
    deleteDetailImageByIndex(index) {
      this.detailImage.splice(index, 1);
      this.$store.commit("deleteDetailImageByIndex", index);
    },
    deleteBannerImageByIndex(index) {
      this.bannerImage.splice(index, 1);
      this.$store.commit("deleteBannerImageByIndex", index);
    },
    deleteThumbnailImage() {
      this.image = null;
      this.imageLink = null;
    },
  },
  created() {
    this.loginUserId = this.$store.state.loginUserId;
    this.$store.dispatch("checkLogin");

    if (this.loginUserId === null) {
      alert("로그인이 필요한 서비스입니다.");
      this.$router.push(`/`);
    }
    this.isAdmin = this.$store.state.isManager;
    this.$store.dispatch("checkManager");
    this.$store.commit("clearDetailImageAll");
    this.$store.commit("clearBannerImageAll");
  },
  computed: {
    goManagerList() {
      return this.$store.state.goManagerList;
    },
    newParent() {
      return this.parent;
    },
    newImageLink() {
      return this.$store.state.pImage;
    },
    newAdmin() {
      return this.$store.state.isManager;
    },
    newResultLocation() {
      return this.$store.state.loginUserId;
    },
  },
  watch: {
    goManagerList() {
      this.cancelManaer();
    },
    watch: {
      newAdmin(newValue) {
        this.isAdmin = newValue;
      },
    },
    newResultLocation(newValue) {
      this.loginUserId = newValue;
      if (this.loginUserId == null) {
        alert("로그인이 필요한 서비스입니다.");
        this.$router.push(`/`);
      }
    },
    newParent(newValue) {
      if (newValue === "UPS&STS") {
        this.categoryChild = ["UPS", "STS", "BATTERY"];
      } else if (newValue === "ESS") {
        this.categoryChild = ["ESS", "SOLAR"];
      } else if (newValue === "COOLING") {
        this.categoryChild = [
          "CHILLER",
          "CRAC",
          "InRow",
          "Containment",
          "기타",
        ];
      } else if (newValue === "LIGHTING") {
        this.categoryChild = ["LED Lighting", "Lighting Control", "PLS"];
      } else if (newValue === "RAILROAD") {
        this.categoryChild = ["RAILROAD"];
      }

      this.child = this.categoryChild[0];
    },
    newImageLink(newValue) {
      if (newValue) {
        this.imageLink = newValue.image;
      }
    },
  },
};
</script>

<style>
</style>
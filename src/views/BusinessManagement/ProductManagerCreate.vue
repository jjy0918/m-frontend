<template>
  <div class="col-sm-10 container my-3" v-if="isAdmin">
    <md-card class="md-layout-item container">
      <md-card-header>
        <div class="md-title">제품 관리 등록</div>
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
        <label>제품명</label>
        <md-input v-model="name" required></md-input>
        <span class="md-helper-text">영문/숫자 5자리 이상, 12자리 이하</span>
      </md-field>

      <md-field>
        <label>제품 이미지</label>
        <md-file
          v-model="image"
          accept="image/*"
          @md-change="onImageUpload($event)"
        />
      </md-field>

      <md-field>
        <label>제품 카다로그</label>
        <md-file v-model="pdf" accept=".pdf" @md-change="onPdfUpload($event)" />
      </md-field>

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
      <md-field>
        <label>Editor</label>
        <md-textarea v-model="editor"></md-textarea>
      </md-field>

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
      pdf: null,
      pdfLink: null,
      expose: true,
      table: null,
      editor: null,
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
        let product = {
          name: this.name,
          image: this.imageLink,
          catalog: this.pdfLink,
          expose: this.expose,
          tableList: newTableList,
          editor: this.editor,
          category: this.categoryToNum[this.parent][this.child],
        };
        this.$store.dispatch("createProduct", product);
      }
    },
    cancelManaer() {
      this.$router.push(`/manager/bm/pm`);
    },
    onImageUpload(evt) {
      if (evt[0]) {
        this.$store.commit("clearPImage");
        let frm = new FormData();
        frm.append("file", evt[0]);
        this.$store.dispatch("savePImage", frm);
      }
    },
    onPdfUpload(evt) {
      if (evt[0]) {
        this.$store.commit("clearPPdf");
        let frm = new FormData();
        frm.append("file", evt[0]);
        this.$store.dispatch("savePPdf", frm);
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
  },
  created() {
    this.loginUserId = this.$store.state.loginUserId;
    if (this.loginUserId === null) {
      alert("로그인이 필요한 서비스입니다.");
      this.$router.push(`/`);
    } else if (
      this.loginUserId.role != "ADMIN" &&
      this.loginUserId.role != "MANAGER"
    ) {
      alert("권한이 없습니다.");
      this.nowMenu = "ADMIN or MANAGER 권한이 필요합니다";
    } else {
      this.isAdmin = true;
    }
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
    newPdfLink() {
      return this.$store.state.pPdf;
    },
  },
  watch: {
    goManagerList() {
      this.cancelManaer();
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
        console.log(this.imageLink);
      }
    },
    newPdfLink(newValue) {
      if (newValue) {
        this.pdfLink = newValue.image;
        console.log(this.pdfLink);
      }
    },
  },
};
</script>

<style>
</style>
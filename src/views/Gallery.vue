<template>
  <div class="gallery-wrapper">
    <p class="control has-icons-left">
      <input class="input" type="text" placeholder="Search..." v-on:keyup="searchTermChange.next($event.target.value)">
      <span class="icon is-left">
        <i class="fas fa-search"></i>
      </span>
    </p>
    <div class="gallery">
      <div class="image-container" v-for="image of images" :key="image._id">
        <gallery-image
          :image="image"
          @click="showImage"></gallery-image>
      </div>
    </div>
    <div class="load-more" @click="loadMoreImages">
      <span class="icon">
        <i class="fas fa-arrow-down"></i>
      </span>
      Load more...
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import GalleryImage from "@/components/GalleryImage.vue";
import Modal from "@/components/Modal.vue";

export default {
  components: { GalleryImage, Modal },
  data() {
    return {
      searchTermChange: new Subject()
    };
  },
  computed: mapState({
    images: state => state.images
  }),
  methods: {
    ...mapActions(["loadImages"]),
    showImage(image, format) {
      new Modal().open(image, format);
    },
    loadMoreImages() {
      this.$store.dispatch("loadMoreImages");
    }
  },
  mounted() {
    this.loadImages();
    this.searchTermChange
      .asObservable()
      .pipe(debounceTime(150), distinctUntilChanged())
      .subscribe(v => {
        this.loadImages(v);
      });
  }
};
</script>

<style lang="scss" scoped>
.gallery-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.gallery {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

@media screen and (min-width: 480px) {
  .gallery {
    width: 100%;
  }
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
  .gallery {
    width: 90%;
  }
}
@media screen and (min-width: 1024px) {
  .gallery {
    width: 70%;
  }
}

.image-container {
  margin-left: 10px;
  margin-top: 20px;
}

.load-more {
  height: 70px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>

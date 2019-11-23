<template>
  <div class="container" :style="{top: event.y + 'px', left: event.x + 'px'}">
    <img class="love" src="../../static/small-video/video-loved.png" />
  </div>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    console.log(this.event);
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
}
.love {
  width: 64px;
  height: 64px;
  animation: love 1s;
}

@keyframes love {
  0% {
    opacity: 0.5;
    transform: scale(0.8) rotate(45deg);
  }
  50% {
    opacity: 1;
    transform: scale(1.2) rotate(-45deg);
  }
  100% {
    opacity: 0;
    transform: scale(0.8) rotate(45deg);
  }
}
</style>

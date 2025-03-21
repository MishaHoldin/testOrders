<template>
  <div class="animated-background">
    <div class="gradient-sphere gradient-sphere-1"></div>
    <div class="gradient-sphere gradient-sphere-2"></div>
    <div class="gradient-sphere gradient-sphere-3"></div>
  </div>
</template>

<style scoped>
.animated-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
  background: #000000;
}

.gradient-sphere {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  animation: float 20s infinite;
}

.gradient-sphere-1 {
  width: 50vh;
  height: 50vh;
  background: radial-gradient(
    circle,
    rgba(76, 29, 149, 0.7) 0%,
    rgba(76, 29, 149, 0) 70%
  );
  top: 20%;
  left: 20%;
  animation-delay: 0s;
}

.gradient-sphere-2 {
  width: 60vh;
  height: 60vh;
  background: radial-gradient(
    circle,
    rgba(59, 130, 246, 0.7) 0%,
    rgba(59, 130, 246, 0) 70%
  );
  top: 40%;
  right: 20%;
  animation-delay: -5s;
}

.gradient-sphere-3 {
  width: 45vh;
  height: 45vh;
  background: radial-gradient(
    circle,
    rgba(236, 72, 153, 0.7) 0%,
    rgba(236, 72, 153, 0) 70%
  );
  bottom: 10%;
  left: 30%;
  animation-delay: -10s;
}

@keyframes float {
  0% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(3%, 3%) scale(1.1);
  }
  66% {
    transform: translate(-3%, -3%) scale(0.9);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
}
</style>

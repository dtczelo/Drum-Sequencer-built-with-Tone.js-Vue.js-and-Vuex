<template>
    <main id="app">
        <div v-if="toTheMoonMod" class="stars">
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
        </div>
        <nav class="nav">
            <div v-if="isConfigDisplayed">
                <button @click="toggleConfig" class="nav__btn">
                    <i class="far fa-caret-square-up"></i>
                </button>
            </div>
            <div v-else>
                <button @click="toggleConfig" class="nav__btn">
                    <i class="far fa-caret-square-down"></i>
                </button>
            </div>
            <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
        </nav>
        <transition name="translate-config">
            <div class="config-section" v-if="isConfigDisplayed">
                <Config/>
            </div>
        </transition>
        <router-view class="router-view" />
    </main>
</template>

<script>
import Config from "../src/components/Config.vue";

export default {
    components: {
        Config
    },
    data() {
        return {
            isConfigDisplayed: false,
        };
    },
    computed: {
        toTheMoonMod() {
            return this.$store.state.toTheMoonMod;
        }
    },
    methods: {
        toggleConfig() {
            this.isConfigDisplayed = !this.isConfigDisplayed;
        }
    }
};
</script>

<style lang="scss">
:root {
    --primary-color: #ff6f00;
    --secondary-color: #402e32;
    --tertiary-color: #b5876d;
    --bg-color: #fff7f0;
    --text-color: #fff;
}

@mixin sp-layout {
  @media screen and (max-width: 750px) {
    @content;
  }
}

html {
    font-size: 20px;
}

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

:focus {
    outline: none;
}

#app {
    font-family: "Oxanium", Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    background-color: var(--bg-color);
    color: var(--secondary-color);
    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.nav {
    height: 5vh;
    &__btn {
        position: relative;
        width: 50px;
        height: 50px;
        color: var(--secondary-color);
        font-size: 1.5rem;
        z-index: 11;
    }
    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}

.router-view {
    position: relative;
    z-index: 1;
}

button {
    font-family: "Oxanium", Avenir, Helvetica, Arial, sans-serif;
    border: none;
    background-color: transparent;
    cursor: pointer;
}

label {
  margin: 0 5px;
}

hr {
    margin: 20px 0;
}

.config-section {
    position: absolute;
    width: 100%;
    height: 100vh;
    z-index: 10;
    background-color: mintcream;
}

.translate-config-enter-active, .translate-config-leave-active {
  transition: transform .5s;
}
.translate-config-enter, .translate-config-leave-to {
  transform: translateY(-100%);
}

// To the moon mod

@function random_range($min, $max) {
  $rand: random();
  $random_range: $min + floor($rand * (($max - $min) + 1));
  @return $random_range;
}

.stars {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 120%;
  transform: rotate(-45deg);
  z-index: 0;
}

.star {
  $star-count: 50;
  --star-color: var(--primary-color);
  --star-tail-length: 6em;
  --star-tail-height: 2px;
  --star-width: calc(var(--star-tail-length) / 6);
  --fall-duration: 9s;
  --tail-fade-duration: var(--fall-duration);

  position: absolute;
  top: var(--top-offset);
  left: 0;
  width: var(--star-tail-length);
  height: var(--star-tail-height);
  color: var(--star-color);
  background: linear-gradient(45deg, currentColor, transparent);
  border-radius: 50%;
  filter: drop-shadow(0 0 6px currentColor);
  transform: translate3d(104em, 0, 0);
  animation: fall var(--fall-duration) var(--fall-delay) linear infinite, tail-fade var(--tail-fade-duration) var(--fall-delay) ease-out infinite;
  
  @include sp-layout {
    // For mobile performance, tail-fade animation will be removed QAQ
    animation: fall var(--fall-duration) var(--fall-delay) linear infinite;
  }

  @for $i from 1 through $star-count {
    &:nth-child(#{$i}) {
      --star-tail-length: #{random_range(500em, 750em) / 100};
      --top-offset: #{random_range(0vh, 10000vh) / 100};
      --fall-duration: #{random_range(6000, 12000s) / 1000};
      --fall-delay: #{random_range(0, 10000s) / 1000};
    }
  }

  &::before, &::after {
    position: absolute;
    content: '';
    top: 0;
    left: calc(var(--star-width) / -2);
    width: var(--star-width);
    height: 100%;
    background: linear-gradient(45deg, transparent, currentColor, transparent);
    border-radius: inherit;
    animation: blink 2s linear infinite;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
}

@keyframes fall {
  to {
    transform: translate3d(-30em, 0, 0);
  }
}

@keyframes tail-fade {
  0%, 50% {
    width: var(--star-tail-length);
    opacity: 1;
  }

  70%, 80% {
    width: 0;
    opacity: 0.4;
  }

  100% {
    width: 0;
    opacity: 0;
  }
}

@keyframes blink {
  50% {
    opacity: 0.6;
  }
}

// end to the moon mod

</style>

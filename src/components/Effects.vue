<template>
    <div class="effect">
        <hr>
        <div class="effect__selection-container">
            <button class="effect__btn">Pitch</button>
            <button class="effect__btn">Decay</button>
            <button class="effect__btn">Volume</button>
            <button class="effect__btn">Distortion</button>
            <button class="effect__btn">Filter</button>
            <button class="effect__btn">Bitcrush</button>
        </div>
        <div class="effect__locks">
            <Lock v-for="step in numberOfSteps" :key="step.id" />
        </div>
    </div>
</template>

<script>
import Lock from "./Lock.vue";

export default {
    components: {
        Lock,
    },
    data() {
        return {

        };
    },
    computed: {
        numberOfSteps() {
            return this.$store.state.tracksDATA[0][0];
        }
    }
};
</script>

<style lang="scss">
.effect {
    width: 100%;
    height: 100%;
    &__selection-container {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 1rem;
    }
    &__btn {
        padding: 0.2rem 1rem;
        font-size: 1.2rem;
        background-color: var(--secondary-color);
        color: var(--text-color);
        border-radius: 4px;
    }
    &__locks {
        width: 100%;
        height: 23vh;
        display: flex;
        justify-content: space-between;
    }
}

hr {
    margin: 1rem 0;
}

</style>

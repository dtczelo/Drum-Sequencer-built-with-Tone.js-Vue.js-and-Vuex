<template>
    <div class="effect">
        <hr />
        <div class="effect__selection-container">
            <!-- <button
                @click="$emit('change-effect', 'pitch')"
                :class="{ active: currentEffect === 'pitch' }"
                class="effect__btn"
            >
                Pitch
            </button> -->
            <button
                @click="$emit('change-effect', 'distortion')"
                :class="{ active: currentEffect === 'distortion' }"
                class="effect__btn"
            >
                Distortion
            </button>
            <button
                @click="$emit('change-effect', 'bitcrush')"
                :class="{ active: currentEffect === 'bitcrush' }"
                class="effect__btn"
            >
                Bitcrush
            </button>
            <button
                @click="$emit('change-effect', 'filter')"
                :class="{ active: currentEffect === 'filter' }"
                class="effect__btn"
            >
                Filter
            </button>
            <button
                @click="$emit('change-effect', 'delay')"
                :class="{ active: currentEffect === 'delay' }"
                class="effect__btn"
            >
                Delay
            </button>
            <button
                @click="$emit('change-effect', 'reverb')"
                :class="{ active: currentEffect === 'reverb' }"
                class="effect__btn"
            >
                Reverb
            </button>
            <button
                @click="$emit('change-effect', 'volume')"
                :class="{ active: currentEffect === 'volume' }"
                class="effect__btn"
            >
                Volume
            </button>
        </div>
        <div class="effect__locks">
            <Lock
                v-for="(step, index) in stepsToRender"
                :step="step"
                :currentEffect="currentEffect"
                :key="step.id"
                :index="index"
                :selectedMeasure="selectedMeasure"
                :currentTrack="currentTrack"
            />
        </div>
    </div>
</template>

<script>
import Lock from "./Lock.vue";

export default {
    props: {
        stepsToRender: Array,
        currentEffect: String,
        currentTrack: Number,
        selectedMeasure: Number,
    },
    components: {
        Lock,
    },
    data() {
        return {};
    },
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
        display: flex;
        justify-content: space-between;
    }
}

hr {
    margin: 1rem 0;
}

.active {
    color: var(--primary-color);
}
</style>

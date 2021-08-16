<template>
    <button
        @click.stop="onAddStep"
        :class="{
            active: active,
            runningStep: currentStepAndMeasure.step === index && isPlaying,
        }"
        class="step"
    >
        <slot></slot>
    </button>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    props: {
        step: Object,
        index: Number,
        isPlaying: Boolean,
        active: Boolean,
        currentTrack: Number,
        selectedMeasure: Number
    },
    data() {
        return {};
    },
    computed: {
        ...mapGetters(["currentStepAndMeasure"])
    },
    methods: {
        onAddStep() {
            this.$store.commit("onAddStep", { selectedStep: this.index, selectedMeasure: this.selectedMeasure, currentTrack: this.currentTrack });
        },
    },
};
</script>

<style lang="scss">
.step {
    width: 100%;
    height: 100%;
    color: var(--text-color);
    font-size: 1.4rem;
    font-weight: 500;
}

.active {
    color: var(--primary-color);
}

.runningStep {
    border: 2px solid var(--primary-color);
}
</style>

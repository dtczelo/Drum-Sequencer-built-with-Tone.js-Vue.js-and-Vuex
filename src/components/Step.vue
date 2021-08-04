<template>
    <button
        @click.stop="onAddStep"
        :class="{
            active: active,
            activeStep: currentStep === index && isPlaying,
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
        index: Number,
        isPlaying: Boolean,
        active: Boolean,
        currentTrack: Number,
    },
    data() {
        return {};
    },
    watch: {
        currentStep(newValue) {
            if (newValue >= 0) {
                this.index === newValue
                    ? this.isCurrentStep === true
                    : this.isCurrentStep === false;
            }
        },
    },
    computed: mapGetters(["currentStep"]),
    methods: {
        onAddStep() {
            this.$emit("on-add-step", this.index);
            this.isActive = !this.isActive;
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

.activeStep {
    border: 2px solid var(--primary-color);
}
</style>

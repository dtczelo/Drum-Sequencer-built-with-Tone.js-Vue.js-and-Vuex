<template>
    <button
        @click="onAddStep"
        :class="{ active: active, activeStep: currentStep === index }"
        class="step"
    >
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: {
        index: Number,
        currentStep: Number,
        active: Boolean,
        currentTrack: Number
    },
    data() {
        return {
        };
    },
    watch: {
        currentStep(newValue) {
            this.index === newValue
                ? this.isCurrentStep === true
                : this.isCurrentStep === false;
        },
    },
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

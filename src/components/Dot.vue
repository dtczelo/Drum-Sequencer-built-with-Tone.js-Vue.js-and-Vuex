<template>
        <button class="dot" @click.prevent="onChangeMeasure">
            <i
                :class="{
                    active: selectedMeasure === index,
                    runningMeasure: currentStepAndMeasure.measure === index,
                }"
                class="fas fa-circle"
            ></i>
        </button>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    props: {
        index: Number,
        selectedMeasure: Number
    },
    data() {
        return {};
    },
    computed: {
        ...mapGetters(["currentStepAndMeasure"]),
    },
    methods: {
        onChangeMeasure() {
            this.$emit("on-change-measure", this.index);
        }
    }
};
</script>

<style lang="scss">
.dot {
    color: var(--secondary-color);
    font-size: 1.2rem;
    margin-left: 10px;
}

.runningMeasure {
    opacity: 0.5;
}
</style>

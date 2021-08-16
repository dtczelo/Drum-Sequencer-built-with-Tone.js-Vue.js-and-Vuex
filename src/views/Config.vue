<template>
    <div class="config">
        <div class="config__input-item">
            <label for="numbersOfMeasures">Numbers of measures :</label>
            <input
                :placeholder="numberOfMeasures"
                v-model="measures"
                type="number"
            />
        </div>
        <div class="config__input-item">
            <label for="numbersOfSteps">Numbers of steps :</label>
            <input :placeholder="numberOfSteps" v-model="steps" type="number" />
        </div>
        <div class="config__switch-item">
            <label>To the moon Mod</label>
            <Switches v-model="toTheMoonMod" />
        </div>
        <div class="config__switch-item">
            <label>God Mod</label>
            <Switches />
        </div>
        <div class="config__switch-item">
            <label>Dog Mod</label>
            <Switches />
        </div>
        <div>
            <button @click.prevent="onSave" class="config__save-btn">
                SAVE
            </button>
        </div>
    </div>
</template>

<script>
import Switches from "vue-switches";

export default {
    components: {
        Switches,
    },
    data() {
        return {
            toTheMoonMod: false,
            measures: null,
            steps: null,
        };
    },
    computed: {
        numberOfMeasures() {
            return this.$store.state.numberOfMeasures;
        },
        numberOfSteps() {
            return this.$store.state.numberOfSteps;
        },
    },
    watch: {
        toTheMoonMod() {
            this.$store.commit("toggleToTheMoonMod");
        },
    },
    methods: {
        onSave() {
            this.$store.commit("onChangeConfig", {
                numberOfSteps: this.steps,
                numberOfMeasures: this.measures,
            });
            this.$store.commit("initDATA");
        },
    },
};
</script>

<style lang="scss">
.config {
    height: 100%;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-wrap: wrap;
    &__switch-item {
        text-align: left;
    }
    &__input-item {
        text-align: left;
    }
    &__save-btn {
        padding: 0.5rem 1rem;
        font-size: 1.2rem;
        background-color: var(--secondary-color);
        color: var(--text-color);
        border-radius: 4px;
    }
}

label {
    margin-right: 20px;
}
</style>

<template>
    <div class="config">
        <div class="config__switch-item">
            <label>God Mod</label>
            <Switches />
        </div>
        <div class="config__switch-item">
            <label>Dog Mod</label>
            <Switches />
        </div>
        <div class="config__input-item">
            <label for="numbersOfMeasures">Numbers of measures :</label>
            <input :placeholder="numberOfMeasures" type="number" />
        </div>
        <div class="config__input-item">
            <label for="numbersOfSteps">Numbers of steps :</label>
            <input :placeholder="numberOfSteps" type="number" />
        </div>
        <div class="config__switch-item">
            <label>To the moon Mod</label>
            <Switches v-model="toTheMoonMod"/>
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
            toTheMoonMod: false
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
        }
    }
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
}

label {
    margin-right: 20px;
}
</style>

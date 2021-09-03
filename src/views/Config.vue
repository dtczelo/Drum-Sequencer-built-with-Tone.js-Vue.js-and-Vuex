<template>
    <div class="config">
        <div class="config__input-item">
            <label for="numbersOfMeasures">Numbers of measures :</label>
            <input
                :placeholder="numberOfMeasures"
                v-model="measures"
                type="number"
                min="1"
                max="4"
            />
        </div>
        <div class="config__input-item">
            <label for="numbersOfSteps">Numbers of steps :</label>
            <input
                :placeholder="numberOfSteps"
                v-model="steps"
                type="number"
                min="1"
                max="16"
            />
        </div>
        <div class="config__switch-item">
            <label>To the moon Mod</label>
            <Switches v-model="toTheMoonMod" />
        </div>
        <div class="config__switch-item">
            <label>God Mod</label>
            <Switches v-model="godMod" />
            <span class="godMod__label" v-if="godMod"
                >Please be gentle ...</span
            >
        </div>
        <div class="config__switch-item">
            <label>Dog Mod</label>
            <Switches v-model="dogMod" />
        </div>
        <div>
            <button @click.prevent="onSave" class="config__save-btn">
                SAVE & RESET
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
            godMod: false,
            dogMod: false,
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
            this.$store.commit("toggleToTheMoonMod", this.toTheMoonMod);
        },
        dogMod() {
            this.$store.commit("toggleDogMod", this.dogMod);
        },
        godMod() {
            this.$store.commit("toggleGodMod", this.godMod);
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
    mounted() {
        this.toTheMoonMod = this.$store.state.toTheMoonMod;
        this.dogMod = this.$store.state.dogMod;
        this.godMod = this.$store.state.godMod;
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
        display: flex;
        align-items: center;
    }
    &__input-item {
        display: flex;
        align-items: center;
    }
    &__save-btn {
        padding: 0.5rem 1rem;
        font-size: 1.2rem;
        background-color: var(--secondary-color);
        color: var(--text-color);
        border-radius: 4px;
        &:hover {
            animation: shaking 3s;
        }
    }
}

.godMod {
    &__label {
        margin-left: 2rem;
    }
}

label {
    margin-right: 20px;
}

@keyframes shaking {
  0% {
    transform: translate(6, 8);
  }
  50% {
    transform: translate(-7, -5);
  }
  100% {
    transform: translate(0, 2);
  }
}
</style>

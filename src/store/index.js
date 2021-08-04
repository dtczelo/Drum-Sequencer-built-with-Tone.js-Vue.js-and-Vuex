import Vue from "vue";
import Vuex from "vuex";
import * as Tone from 'tone';

Vue.use(Vuex);

import kick from "../assets/samples/Boxed_Ear_R-8_MkII_Single_Hits/808K_A.wav";
import clap from "../assets/samples/Boxed_Ear_R-8_MkII_Single_Hits/808CLAP.wav";
import hh from "../assets/samples/Boxed_Ear_R-8_MkII_Single_Hits/808CHH.wav";
import s from "../assets/samples/Boxed_Ear_R-8_MkII_Single_Hits/808S_A.wav";

export default new Vuex.Store({
    state: {
        mainClock: 0,
        scheduleTick: -1,
        numberOfSteps: 16,
        track1: new Tone.Player(kick).toDestination(),
        track2: new Tone.Player(clap).toDestination(),
        track3: new Tone.Player(hh).toDestination(),
        track4: new Tone.Player(s).toDestination(),
    },
    getters: {
        currentStep: (state) => {
            return state.scheduleTick % state.numberOfSteps;
        },
    },
    mutations: {
        incrementMainClock(state, time) {
            state.mainClock = time;
        },
        incrementScheduleTick(state) {
            state.scheduleTick++;
        },
        resetScheduleTick(state) {
            state.scheduleTick = -1;
        }
    },
    actions: {},
    modules: {},
});

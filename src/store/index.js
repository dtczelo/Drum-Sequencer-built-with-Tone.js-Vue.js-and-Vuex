import Vue from "vue";
import Vuex from "vuex";
import * as Tone from "tone";

Vue.use(Vuex);

import kick from "../assets/samples/Boxed_Ear_R-8_MkII_Single_Hits/808K_A.wav";
import clap from "../assets/samples/Boxed_Ear_R-8_MkII_Single_Hits/808CLAP.wav";
import hh from "../assets/samples/Boxed_Ear_R-8_MkII_Single_Hits/808CHH.wav";
import snare from "../assets/samples/Boxed_Ear_R-8_MkII_Single_Hits/808S_A.wav";

const initialTempo = 120;
const allChannelsVolume = 0;
const masterChannelVolume = 0;
const masterChannelPan = 0; // Must be within -1 & 1

const distortion1 = new Tone.Distortion(0);
const distortion2 = new Tone.Distortion(0);
const distortion3 = new Tone.Distortion(0);
const distortion4 = new Tone.Distortion(0);

const HPF1 = new Tone.Filter(0, "highpass");
const HPF2 = new Tone.Filter(0, "highpass");
const HPF3 = new Tone.Filter(0, "highpass");
const HPF4 = new Tone.Filter(0, "highpass");

const LPF1 = new Tone.Filter(20000, "lowpass");
const LPF2 = new Tone.Filter(20000, "lowpass");
const LPF3 = new Tone.Filter(20000, "lowpass");
const LPF4 = new Tone.Filter(20000, "lowpass");

const feedbackDelay1 = new Tone.FeedbackDelay("8n", 0);
const feedbackDelay2 = new Tone.FeedbackDelay("8n", 0);
const feedbackDelay3 = new Tone.FeedbackDelay("8n", 0);
const feedbackDelay4 = new Tone.FeedbackDelay("8n", 0);

const limiter = new Tone.Limiter(-6).toDestination();

// Sends effects
const chorus = new Tone.Chorus({
    wet: 1,
})
    .connect(limiter)
    .start();
const chorusChannel = new Tone.Channel({ volume: -60 }).connect(chorus);
chorusChannel.receive("chorus");

const cheby = new Tone.Chebyshev(50).connect(limiter);
const chebyChannel = new Tone.Channel({ volume: -60 }).connect(cheby);
chebyChannel.receive("cheby");

const reverb = new Tone.Reverb(3).connect(limiter);
const reverbChannel = new Tone.Channel({ volume: -60 }).connect(reverb);
reverbChannel.receive("reverb");

// Channels & Master section
const channel1 = new Tone.Channel(allChannelsVolume, 0);
const channel2 = new Tone.Channel(allChannelsVolume, 0);
const channel3 = new Tone.Channel(allChannelsVolume, 0);
const channel4 = new Tone.Channel(allChannelsVolume, 0);

const masterChannel = new Tone.Channel(masterChannelVolume, masterChannelPan);
masterChannel.send("chorus");
masterChannel.send("cheby");
masterChannel.send("reverb");
masterChannel.connect(limiter);

export default new Vuex.Store({
    state: {
        mainClock: 0,
        scheduleTick: -1,
        numberOfMeasures: 1,
        numberOfSteps: 16,
        tracksDATA: [],
        tempo: initialTempo,
        track1: new Tone.Player(kick).chain(
            distortion1,
            LPF1,
            HPF1,
            feedbackDelay1,
            channel1,
            masterChannel
        ),
        track2: new Tone.Player(clap).chain(
            distortion2,
            LPF2,
            HPF2,
            feedbackDelay2,
            channel2,
            masterChannel
        ),
        track3: new Tone.Player(hh).chain(
            distortion3,
            LPF3,
            HPF3,
            feedbackDelay3,
            channel3,
            masterChannel
        ),
        track4: new Tone.Player(snare).chain(
            distortion4,
            LPF4,
            HPF4,
            feedbackDelay4,
            channel4,
            masterChannel
        ),
    },
    getters: {
        currentStep: (state) => {
            return state.scheduleTick % (state.numberOfSteps * state.numberOfMeasures);
        },
    },
    mutations: {
        // CLOCK
        incrementMainClock(state, time) {
            state.mainClock = time;
        },
        incrementScheduleTick(state) {
            state.scheduleTick++;
        },
        resetScheduleTick(state) {
            state.scheduleTick = -1;
        },
        initTempo() {
            Tone.Transport.bpm.value = initialTempo;
        },
        incrementTempo(state) {
            state.tempo++;
            Tone.Transport.bpm.value = state.tempo;
        },
        decrementTempo(state) {
            state.tempo--;
            Tone.Transport.bpm.value = state.tempo;
        },
        // TRACKS DATA
        initByTrack(state, filledArray) {
            state.tracksDATA.push(filledArray);
        },
        onAddStep(state, payload) {
            state.tracksDATA[payload.currentTrack][
                payload.selectedStep
            ].active = !state.tracksDATA[payload.currentTrack][
                payload.selectedStep
            ].active;
        },
        // TRACK PARAMETERS
        onChangeTrackPan(state, payload) {
            // Works but maybe channels are in mono so routing to master stereo cancel panning ? 
            switch (payload.currentTrack) {
                case 0:
                    channel1.pan.value = payload.value;
                    break;
                case 1:
                    channel2.pan.value = payload.value;
                    break;
                case 2:
                    channel3.pan.value = payload.value;
                    break;
                case 3:
                    channel4.pan.value = payload.value;
                    break;
            }
        },
    },
    actions: {},
    modules: {},
});

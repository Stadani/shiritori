const STEP_GAMEMODE = 1;
const STEP_SUBMODE = 2;
const STEP_DIFFICULTY = 3;

const app = Vue.createApp({
    data() {
        return {
            gameSetup: {
                gamemodeStep: STEP_GAMEMODE,
                gamemode: '',
                submode: '',
                difficulty: '',
            },
            gameReady: true,
        };
    },
    methods: {
        goBack() {
            if (this.gameSetup.gamemodeStep > STEP_GAMEMODE) {
                this.gameSetup.gamemodeStep--;
            }
        },
        setupGame(mode) {
            switch (this.gameSetup.gamemodeStep) {
                case STEP_GAMEMODE:
                    this.gameSetup.gamemode = mode;
                    this.gameSetup.gamemodeStep++;
                    break;
                case STEP_SUBMODE:
                    this.gameSetup.submode = mode;
                    this.gameSetup.gamemodeStep++;
                    break;
                case STEP_DIFFICULTY:
                    this.gameSetup.difficulty = mode;
                    this.gameReady = true;
                    break;
                default:
                    console.error('Invalid gamemode step');
            }
        },
    },
    mounted() {}
}).mount('#app');
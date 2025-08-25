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
            userInput: '',
            error: '',
            lastWord: '',
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
        convertToKana(romaji) {
            console.log(wanakana.toHiragana(romaji));
            return wanakana.toHiragana(romaji); // or .toKatakana
        },
        submitWord() {
            if (!this.userInput.trim()) {
                this.error = 'Please enter a word';
                return;
            }

            const kanaWord = this.convertToKana(this.userInput.trim());

            if (kanaWord.endsWith('ん')) {
                this.error = 'Game Over! You entered a word ending with ん.';
                this.userInput = '';
                return;
            }

            fetch(`/api/getNextWord/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ word: kanaWord })
                })
                .then(response => response.json())
                .then(data => {
                    this.lastWord = data.nextWord;
                })
                .catch(err => {
                    console.error('Fetch error:', err);
                    this.error = 'An error occurred while fetching the next word.';
            });
            

            this.userInput = ''; // Clear input after submission
        }
    },
    mounted() {}
}).mount('#app');
import { writable } from 'svelte/store';

function createQuestionStore() {
	const { subscribe, set, update } = writable({});

	return {
		subscribe,
        addQuestion: (name) => update(x => {
            return {...x, [name] : {guesses: [], correct: false}}
        }),
        guess: (name, guess, correct) => {
            return update(x => {
                return {...x, [name] : {guesses: [...x[name].guesses, guess], correct: correct}};
            });
        }
	};
}

export const questionStore = createQuestionStore();
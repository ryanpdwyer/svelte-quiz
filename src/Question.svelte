<script>
    import { onMount } from 'svelte';
    import { questionStore } from './stores.js'
    export let name;
    export let answer;
    export let inputLabel = "";
    export let absErr = 1e-3;
    let value = 0;
    $: floatVal = parseFloat(value);
    let feedback = "";
    let disabled = false;

    // This should be elevated to globalState? Number of guesses and then
    // Correct or incorrect.
    let guesses = 0;
    let previousAnswer = NaN;
 

    function checkAnswer(event) {
        let correct = false;
        if (floatVal !== previousAnswer) {
            previousAnswer = floatVal;
            guesses = guesses + 1;
            if (Math.abs(floatVal - answer) < absErr) {
                feedback = "Correct!";
                correct = true;
                disabled = true;
            } else {
                feedback = "Incorrect! You have made " + guesses + " guesses.";
            }
            questionStore.guess(name, floatVal, correct);

        }
    }

    function handleKeyPress(event) {
		if (event.key === 'Enter') {
			checkAnswer(event);
		}
	}

    onMount(async () => {
        questionStore.addQuestion(name);
	});
</script>

<div class="question-group">
	<label for={name}><slot></slot></label>
    <div class="input-group">
    <input type="number" name={name} id={name} bind:value={value}
     disabled={disabled} on:keypress={handleKeyPress}/>
    <span>{inputLabel}</span>
    <button on:click={checkAnswer} disabled={disabled}>Check</button>
    </div>
    <div class="feedback">
        <p>{feedback}</p>
    </div>
</div>

<style>
    .question-group {
        display: block;
        text-align: left;
    }

    .question-group label {
        margin-bottom: 0.5em;
    }

    .question-group input {
        padding: 0.5em;
        border: 1px solid #ccc;
        border-radius: 3px;
    }

    .question-group span {
        margin-left: 0.5em;
    }

    .question-group button {
        margin-left: 0.5em;
    }

</style>


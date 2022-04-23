<script>
import Question from './Question.svelte';
import {questionStore} from './stores.js';
export let name;

let num = Math.floor(Math.random()*10)+1;

questionStore.addQuestion("meaning-of-life-2");
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	
	<Question name="meaning-of-life" answer={42}>
		What is the meaning of life?
	</Question>
	<Question name="math" answer={num}>
		What is the square root of {num*num}?
	</Question>
	{#each Object.keys($questionStore) as name,  i}
	<p key={name}>
	Name: {name}
	&nbsp;
	Guesses: {$questionStore[name].guesses}
	&nbsp;
	Correct: {$questionStore[name].correct}
	</p>
	<p>{i}</p>
	{/each}
</main>

<style>
	main {
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 3em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: 640px;
		}
	}
</style>
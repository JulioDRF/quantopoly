<script lang="ts">
    import {game, nextTurn, GameStates, getPlayersInCell} from "../constants.js";
    function handleNextTurn() {
        for (let i = 0; i < 1000; i++) {
            nextTurn(game);
            if (game.state === GameStates.Ended) {
                break;
            }
        }
        game.cells = game.cells;
    }

</script>

<div class="board">
    <div class="cell ga-center">
        <h1>Quantopoly</h1>
        <button class="cursor-pointer" on:click="{handleNextTurn}" disabled="{game.state === GameStates.Ended}">Next turn</button>
    </div>
    {#each game.cells as cell, index}
        <div class="cell ga-c{index}">
            {#if cell.color }
                <div class="cell-color {cell.color}"></div>
            {/if}
            <span class="p-0.25rem">{cell.name}</span>
            {#if cell.type === "chance" }
                <div class="flex justify-center items-center">
                    <span class="text-6xl text-blue-600" style="-webkit-text-stroke-width: thin; -webkit-text-stroke-color: black">?</span>
                </div>
            {/if}
            {#if cell.type === "go" }
                <div class="flex justify-center items-center">
                    <span class="text-6xl text-red-600" style="-webkit-text-stroke-width: thin; -webkit-text-stroke-color: black">GO!</span>
                </div>
                <span>Collect $200</span>
            {/if}
            <div class="player-space flex justify-evenly items-center">
                {#each getPlayersInCell(cell.id, game) as player}
                    <div class="font-bold border-solid border-2 rounded-2xl border-red-500 p-1">{player.token}</div>
                {/each}
            </div>
        </div>
    {/each}
</div>

<style>
    .board {
        display: grid;
        justify-content: center;
        align-content: center;
        grid-template-areas:
        'c20 c21 c22 c23 c24 c25 c26 c27 c28 c29 c30'
        'c19 C C C C C C C C C c31'
        'c18 C C C C C C C C C c32'
        'c17 C C C C C C C C C c33'
        'c16 C C C C C C C C C c34'
        'c15 C C C C C C C C C c35'
        'c14 C C C C C C C C C c36'
        'c13 C C C C C C C C C c37'
        'c12 C C C C C C C C C c38'
        'c11 C C C C C C C C C c39'
        'c10 c9 c8 c7 c6 c5 c4 c3 c2 c1 c0';
        grid-template-columns: 11vw repeat(9, 8.5vw) 11vw;
        grid-template-rows: 11vh repeat(9, 8.5vh) 11vh;
        border: 2px solid black;
    }
    .cell {
        margin: 0;
        padding: 0;
        text-align: center;
        border: 1px solid black;
        border-collapse: collapse;
        font-weight: bold;
    }
    .cell-color {
        border-bottom: 2px solid black;
        border-collapse: collapse;
        height: clamp(10px, 1.5rem, 100px);
    }
    .ga-center {
        grid-area: C;
    }
    .ga-c0 {
        grid-area: c0;
    }
    .ga-c1 {
        grid-area: c1;
    }
    .ga-c2 {
        grid-area: c2;
    }
    .ga-c3 {
        grid-area: c3;
    }
    .ga-c4 {
        grid-area: c4;
    }
    .ga-c5 {
        grid-area: c5;
    }
    .ga-c6 {
        grid-area: c6;
    }
    .ga-c7 {
        grid-area: c7;
    }
    .ga-c8 {
        grid-area: c8;
    }
    .ga-c9 {
        grid-area: c9;
    }
    .ga-c10 {
        grid-area: c10;
    }
    .ga-c11 {
        grid-area: c11;
    }
    .ga-c12 {
        grid-area: c12;
    }
    .ga-c13 {
        grid-area: c13;
    }
    .ga-c14 {
        grid-area: c14;
    }
    .ga-c15 {
        grid-area: c15;
    }
    .ga-c16 {
        grid-area: c16;
    }
    .ga-c17 {
        grid-area: c17;
    }
    .ga-c18 {
        grid-area: c18;
    }
    .ga-c19 {
        grid-area: c19;
    }
    .ga-c20 {
        grid-area: c20;
    }
    .ga-c21 {
        grid-area: c21;
    }
    .ga-c22 {
        grid-area: c22;
    }
    .ga-c23 {
        grid-area: c23;
    }
    .ga-c24 {
        grid-area: c24;
    }
    .ga-c25 {
        grid-area: c25;
    }
    .ga-c26 {
        grid-area: c26;
    }
    .ga-c27 {
        grid-area: c27;
    }
    .ga-c28 {
        grid-area: c28;
    }
    .ga-c29 {
        grid-area: c29;
    }
    .ga-c30 {
        grid-area: c30;
    }
    .ga-c31 {
        grid-area: c31;
    }
    .ga-c32 {
        grid-area: c32;
    }
    .ga-c33 {
        grid-area: c33;
    }
    .ga-c34 {
        grid-area: c34;
    }
    .ga-c35 {
        grid-area: c35;
    }
    .ga-c36 {
        grid-area: c36;
    }
    .ga-c37 {
        grid-area: c37;
    }
    .ga-c38 {
        grid-area: c38;
    }
    .ga-c39 {
        grid-area: c39;
    }
</style>

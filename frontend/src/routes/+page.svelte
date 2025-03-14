<script lang="ts">
import { cells } from "../constants.js";

    let game = {
        board: {
            cells,
        },
        players: [],
    };
</script>

<div class="board">
    <div class="cell ga-center">GUH</div>
    {#each game.board.cells as cell, index}
        <div class="cell ga-c{index}">
            {#if cell.color }
                <div class="bg-{cell.color}-800" style="width: 100%; height: 10%"></div>
            {/if}
            <span>{cell.name}</span>
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
    }
    .cell {
        margin: 0;
        padding: 0.25rem;
        text-align: center;
        border: 1px solid black;
        border-collapse: separate;
        font-weight: bold;
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

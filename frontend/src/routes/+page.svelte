<script lang="ts">
    const railroadRents = {
        base: 25,
        twoOwned: 50,
        threeOwned: 100,
        fourOwned: 200,
    };

    const getClassFromIndex = (index: number): string => {
        if (index === 0) {
            return "bottom-right";
        }
        if (index > 0 && index < 10) {
            return "bottom";
        }
        if (index === 10) {
            return "bottom-left";
        }
        if (index > 10 && index < 20) {
            return "left";
        }
        if (index === 20) {
            return "top-left";
        }
        if (index > 20 && index < 30) {
            return "top";
        }
        if (index === 30) {
            return "top-right";
        }
        return "right";
    }

    let game = {
        board: {
            cells: [
                {
                    name: "Go",
                    type: "go",
                    value: 200,
                },
                {
                    name: "Mediterranean Avenue",
                    type: "property",
                    color: "purple",
                    group: "purple",
                    value: 60,
                    houseCost: 50,
                    rent: {
                        base: 2,
                        set: 4,
                        oneHouse: 10,
                        twoHouses: 30,
                        threeHouses: 90,
                        fourHouses: 160,
                        hotel: 250,
                    }
                },
                {
                    name: "Community Chest",
                    type: "communityChest",
                },
                {
                    name: "Baltic Avenue",
                    type: "property",
                    color: "purple",
                    group: "purple",
                    value: 60,
                    mortgage: 30,
                    houseCost: 50,
                    rent: {
                        base: 4,
                        set: 8,
                        oneHouse: 20,
                        twoHouses: 60,
                        threeHouses: 180,
                        fourHouses: 320,
                        hotel: 450,
                    }
                },
                {
                    name: "Income Tax",
                    type: "tax",
                    value: 200,
                },
                {
                    name: "Reading Railroad",
                    type: "property",
                    group: "railroads",
                    value: 200,
                    rent: {
                        ...railroadRents,
                    },
                },
                {
                    name: "Oriental Avenue",
                    type: "property",
                    color: "light-blue",
                    group: "light-blue",
                    value: 100,
                    houseCost: 50,
                    rents: {
                        base: 6,
                        set: 12,
                        oneHouse: 30,
                        twoHouses: 90,
                        threeHouses: 270,
                        fourHouses: 400,
                        hotel: 550,
                    }
                },
                {
                    name: "Chance",
                    type: "chance",
                },
                {
                    name: "Vermont Avenue",
                    type: "property",
                    color: "light-blue",
                    group: "light-blue",
                    value: 100,
                    houseCost: 50,
                    rents: {
                        base: 6,
                        set: 12,
                        oneHouse: 30,
                        twoHouses: 90,
                        threeHouses: 270,
                        fourHouses: 400,
                        hotel: 550,
                    }
                },
                {
                    name: "Connecticut Avenue",
                    type: "property",
                    group: "light-blue",
                    value: 120,
                    houseCost: 50,
                    rents: {
                        base: 8,
                        set: 16,
                        oneHouse: 40,
                        twoHouses: 100,
                        threeHouses: 300,
                        fourHouses: 450,
                        hotel: 600,
                    }
                },
                {
                    name: "Jail",
                    type: "jail",
                },
                {
                    name: "St. Charles Place",
                    type: "property",
                    color: "magenta",
                    group: "magenta",
                    value: 140,
                    houseCost: 100,
                    rents: {
                        base: 10,
                        set: 20,
                        oneHouse: 50,
                        twoHouses: 150,
                        threeHouses: 450,
                        fourHouses: 625,
                        hotel: 750,
                    }
                },
                {
                    name: "Electric Company",
                    type: "property",
                    group: "utilities",
                    value: 150,
                    rents: {
                        base: 4,
                        twoOwned: 10,
                    }
                },
                {
                    name: "States Avenue",
                    type: "property",
                    color: "magenta",
                    group: "magenta",
                    value: 140,
                    houseCost: 100,
                    rents: {
                        base: 10,
                        set: 20,
                        oneHouse: 50,
                        twoHouses: 150,
                        threeHouses: 450,
                        fourHouses: 625,
                        hotel: 750,
                    }
                },
                {
                    name: "Virginia Avenue",
                    type: "property",
                    color: "magenta",
                    group: "magenta",
                    value: 140,
                    houseCost: 100,
                    rents: {
                        base: 12,
                        set: 24,
                        oneHouse: 60,
                        twoHouses: 180,
                        threeHouses: 500,
                        fourHouses: 705,
                        hotel: 900,
                    }
                },
                {
                    name: "Pennsylvania Railroad",
                    type: "property",
                    group: "railroads",
                    value: 200,
                    rent: {
                        ...railroadRents,
                    },
                },
                {
                    name: "St. James Place",
                    type: "property",
                    color: "orange",
                    group: "orange",
                    value: 180,
                    houseCost: 100,
                    rents: {
                        base: 14,
                        set: 28,
                        oneHouse: 70,
                        twoHouses: 200,
                        threeHouses: 550,
                        fourHouses: 750,
                        hotel: 950,
                    }
                },
                {
                    name: "Community Chest",
                    type: "communityChest",
                },
                {
                    name: "Tennessee Avenue",
                    type: "property",
                    color: "orange",
                    group: "orange",
                    value: 180,
                    houseCost: 100,
                    rents: {
                        base: 14,
                        set: 28,
                        oneHouse: 70,
                        twoHouses: 200,
                        threeHouses: 550,
                        fourHouses: 750,
                        hotel: 950,
                    }
                },
                {
                    name: "New York Avenue",
                    type: "property",
                    color: "orange",
                    group: "orange",
                    value: 200,
                    houseCost: 100,
                    rents: {
                        base: 16,
                        set: 32,
                        oneHouse: 80,
                        twoHouses: 220,
                        threeHouses: 600,
                        fourHouses: 800,
                        hotel: 1000,
                    }
                },
                {
                    name: "Free Parking",
                    type: "freeParking",
                },
                {
                    name: "Kentucky Avenue",
                    type: "property",
                    color: "red",
                    group: "red",
                    value: 220,
                    houseCost: 150,
                    rents: {
                        base: 18,
                        set: 36,
                        oneHouse: 90,
                        twoHouses: 250,
                        threeHouses: 700,
                        fourHouses: 875,
                        hotel: 1050,
                    }
                },
                {
                    name: "Chance",
                    type: "chance",
                },
                {
                    name: "Indiana Avenue",
                    type: "property",
                    color: "red",
                    group: "red",
                    value: 220,
                    houseCost: 150,
                    rents: {
                        base: 18,
                        set: 36,
                        oneHouse: 90,
                        twoHouses: 250,
                        threeHouses: 700,
                        fourHouses: 875,
                        hotel: 1050,
                    }
                },
                {
                    name: "Illinois Avenue",
                    type: "property",
                    color: "red",
                    group: "red",
                    value: 240,
                    houseCost: 150,
                    rents: {
                        base: 20,
                        set: 40,
                        oneHouse: 100,
                        twoHouses: 300,
                        threeHouses: 750,
                        fourHouses: 925,
                        hotel: 1100,
                    }
                },
                {
                    name: "B. & O. Railroad",
                    type: "property",
                    group: "railroads",
                    value: 200,
                    rent: {
                        ...railroadRents,
                    },
                },
                {
                    name: "Atlantic Avenue",
                    type: "property",
                    color: "yellow",
                    group: "yellow",
                    value: 260,
                    houseCost: 150,
                    rents: {
                        base: 22,
                        set: 44,
                        oneHouse: 110,
                        twoHouses: 330,
                        threeHouses: 800,
                        fourHouses: 975,
                        hotel: 1150,
                    }
                },
                {
                    name: "Ventnor Avenue",
                    type: "property",
                    color: "yellow",
                    group: "yellow",
                    value: 260,
                    houseCost: 150,
                    rents: {
                        base: 22,
                        set: 44,
                        oneHouse: 110,
                        twoHouses: 330,
                        threeHouses: 800,
                        fourHouses: 975,
                        hotel: 1150,
                    }
                },
                {
                    name: "Water Works",
                    type: "property",
                    group: "utilities",
                    value: 150,
                    rents: {
                        base: 4,
                        twoOwned: 10,
                    }
                },
                {
                    name: "Marvin Gardens",
                    type: "property",
                    color: "yellow",
                    group: "yellow",
                    value: 280,
                    houseCost: 150,
                    rents: {
                        base: 24,
                        set: 48,
                        oneHouse: 120,
                        twoHouses: 360,
                        threeHouses: 850,
                        fourHouses: 1025,
                        hotel: 1200,
                    }
                },
                {
                    name: "Go to Jail",
                    type: "goToJail",
                },
                {
                    name: "Pacific Avenue",
                    type: "property",
                    color: "green",
                    group: "green",
                    value: 300,
                    houseCost: 200,
                    rents: {
                        base: 26,
                        set: 52,
                        oneHouse: 130,
                        twoHouses: 390,
                        threeHouses: 900,
                        fourHouses: 1100,
                        hotel: 1275,
                    }
                },
                {
                    name: "North Carolina Avenue",
                    type: "property",
                    color: "green",
                    group: "green",
                    value: 300,
                    houseCost: 200,
                    rents: {
                        base: 26,
                        set: 52,
                        oneHouse: 130,
                        twoHouses: 390,
                        threeHouses: 900,
                        fourHouses: 1100,
                        hotel: 1275,
                    }
                },
                {
                    name: "Community Chest",
                    type: "communityChest",
                },
                {
                    name: "Pennsylvania Avenue",
                    type: "property",
                    color: "green",
                    group: "green",
                    value: 320,
                    houseCost: 200,
                    rents: {
                        base: 28,
                        set: 56,
                        oneHouse: 150,
                        twoHouses: 450,
                        threeHouses: 1000,
                        fourHouses: 1200,
                        hotel: 1400,
                    }
                },
                {
                    name: "Short Line",
                    type: "property",
                    group: "railroads",
                    value: 200,
                    rent: {
                        ...railroadRents,
                    },
                },
                {
                    name: "Chance",
                    type: "chance",
                },
                {
                    name: "Park Place",
                    type: "property",
                    color: "blue",
                    group: "blue",
                    value: 350,
                    houseCost: 200,
                    rents: {
                        base: 35,
                        set: 70,
                        oneHouse: 175,
                        twoHouses: 500,
                        threeHouses: 1100,
                        fourHouses: 1300,
                        hotel: 1500,
                    }
                },
                {
                    name: "Luxury Tax",
                    type: "tax",
                    value: 100,
                },
                {
                    name: "Boardwalk",
                    type: "property",
                    color: "blue",
                    group: "blue",
                    value: 400,
                    houseCost: 200,
                    rents: {
                        base: 50,
                        set: 100,
                        oneHouse: 200,
                        twoHouses: 600,
                        threeHouses: 1400,
                        fourHouses: 1700,
                        hotel: 2000,
                    }
                },
            ],
        },
        players: [],
    };
</script>

<div class="board">
    <div class="cell ga-center">GUH</div>
    {#each game.board.cells as cell, index}
        <div class="cell ga-c{index}">{cell.name}</div>
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
        padding: 0;
        text-align: center;
        border: 1px solid black;
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

interface Game {
    players: Player[];
    cells: Cell[];
    communityChestCards: Card[];
    communityChestDiscardPile: Card[];
    chanceCards: Card[];
    chanceDiscardPile: Card[];
}

interface Card {
    name: string;
    handler: (player: Player, game: Game) => void
}

interface Player {
    id: number;
    token: string;
    position: CellPosition; // default CellPositions.Go
    cash: number; // default 1500
    jailTurns: number; // default 0
}

interface Cell {
    id: CellPosition;
    name: string;
    type: string;
    value?: number;
    color?: string;
    owner?: number|null;
    group?: string;
    forSale?: boolean;
    isMortgaged?: boolean;
    houseCount?: number;
    hotelCount?: number;
    houseCost?: number;
    rents?: HouseRents|RailRoadRents|UtilityRents;
}

interface HouseRents {
    base: number;
    set: number;
    oneHouse: number;
    twoHouses: number;
    threeHouses: number;
    fourHouses: number;
    hotel: number;
}

interface RailRoadRents {
    base: number;
    twoOwned: number;
    threeOwned: number;
    fourOwned: number;
}

interface UtilityRents {
    base: number;
    twoOwned: number;
}

interface Roll {
    first: number;
    second: number;
    total: number;
    isDouble: boolean;
}

export type CellPosition = number;

export function newPlayer(id: number, token: string): Player {
    return {
        id,
        token,
        position: CellPositions.Go,
        cash: 1500,
        jailTurns: 0,
    };
}

export function movePlayer(player: Player, cellPosition: CellPosition, game: Game) {
    if (player.position === CellPositions.Jail && player.jailTurns > 0) {
        // Player is in jail
        return;
    }
    if (player.position > cellPosition) {
        player.cash += 200;
    }
    player.position = cellPosition;
    handlePlayerLandsInCell(player, cellPosition, game);
}

export function handleAdvanceToNearestRailroad(player: Player, game: Game) {
    if (player.position < CellPositions.ReadingRailroad) {
        movePlayer(player, CellPositions.ReadingRailroad, game);
        return;
    } else if (player.position < CellPositions.PennsylvaniaRailroad) {
        movePlayer(player, CellPositions.PennsylvaniaRailroad, game);
        return;
    } else if (player.position < CellPositions.BORailroad) {
        movePlayer(player, CellPositions.BORailroad, game);
        return;
    } else {
        movePlayer(player, CellPositions.ShortLine, game);
    }
}

export function takeTurn(player: Player, game: Game) {
    const doublesLimit = 3;
    for (let doubles = 1; doubles < doublesLimit; doubles++) {
        const roll = rollDice();
        if (player.position === CellPositions.Jail && player.jailTurns > 0 && roll.isDouble) {
            // In jail. Just rolled a double. We get to leave!
            player.jailTurns = 0;
            return;
        }
        const newPosition: CellPosition = player.position + roll.total;
        movePlayer(player, newPosition, game);
        if (!roll.isDouble) {
            return;
        }
    }
    // Rolled doubles three times in a row. Straight to jail!
    playerGoesToJail(player);
}

export function handlePlayerLandsInCell(player: Player, cellPosition: CellPosition, game: Game) {
    const cell = cells[cellPosition];
    switch (cell.type) {
        case CellTypes.Chance:
            drawAndPlayChance(player, game);
            return;
        case CellTypes.CommunityChest:
            drawAndPlayCommunityChest(player, game);
            return;
        case CellTypes.FreeParking:
            // TODO: Lottery house rule would apply here
            return;
        case CellTypes.Go:
            // TODO: $400 house rule would apply here
            return;
        case CellTypes.GoToJail:
            playerGoesToJail(player);
            return;
        case CellTypes.Jail:
            // just visiting
            return;
        case CellTypes.Property:
            handlePlayerLandsInProperty(player, cell, game);
            return;
        case CellTypes.Tax:
            playerMustPay(player, cell.value!);
            return;
        default:
            console.error("What did you just land on???", cellPosition, cell);
    }
}

export function handlePlayerLandsInProperty(player: Player, cell: Cell, game: Game) {
    // Player owns it. Do nothing.
    if (player.id === cell.owner) {
        return;
    }

    // Another player owns it. Pay up.
    if (cell.owner !== null && cell.owner !== undefined) {
        const rent = getPropertyRent(cell.id);
        playerMustPay(player, rent);
    }

    // No one owns it. Player gets to buy or auction it.
    if (cell.value && player.cash >= cell.value) {
        buyProperty(player, cell.id, cell.value);
    } else {
        auctionProperty(cell.id, game, 1);
    }
}

export function playerGoesToJail(player: Player) {
    player.position = CellPositions.Jail;
    player.jailTurns += 3;
}

export function drawAndPlayCommunityChest(player: Player, game: Game) {
    const index = Math.floor(Math.random() * game.communityChestCards.length);
    const card = game.communityChestCards[index];
    card.handler(player, game);
    game.communityChestCards.splice(index, 1);
    game.communityChestDiscardPile.push(card);
    if (game.communityChestCards.length === 0) {
        game.communityChestCards = game.communityChestDiscardPile;
        game.communityChestDiscardPile = [];
    }
}

export function drawAndPlayChance(player: Player, game: Game) {
    const index = Math.floor(Math.random() * game.chanceCards.length);
    const card = game.chanceCards[index];
    card.handler(player, game);
    game.chanceCards.splice(index, 1);
    game.chanceDiscardPile.push(card);
    if (game.chanceCards.length === 0) {
        game.chanceCards = game.chanceDiscardPile;
        game.chanceDiscardPile = [];
    }
}

export function rollDice(): Roll {
    const first = Math.ceil(Math.random() * 6);
    const second = Math.ceil(Math.random() * 6);
    return {
        first,
        second,
        total: first + second,
        isDouble: first === second
    };
}

export function handleDoubles(player: Player, roll: Roll, count = 1, game: Game) {
    if (!roll.isDouble) {
        return;
    }
    if (player.position === CellPositions.Jail && player.jailTurns > 0) {
        // Get out of jail
        player.jailTurns = 0;
        movePlayer(player, player.position + roll.total, game);
    }
    if (count === 3) {
        // 3 consecutive doubles: Go to jail.
        playerGoesToJail(player);
    }
}

export function auctionProperty(cellPosition: CellPosition, game: Game, startingPrice: number = 1) {
    const cell = cells[cellPosition];
    if (!cell.forSale) {
        console.error("Not for sale");
    }
    const shouldBid = (player: Player, cell: Cell, currentBid: number): boolean => {
      const ownedInSameGroup = game.cells.filter((c) => c.owner === player.id && c.group === cell.group);
      let fairValue = cell.value! * (ownedInSameGroup.length + 1);
      return player.cash >= currentBid && currentBid <= fairValue;
    };
    let stillBidding = true;
    let highestBid = startingPrice;
    let currentWinner: Player|undefined = undefined;
    while (stillBidding) {
        stillBidding = false;
        for (const p of game.players) {
            if (currentWinner !== p && shouldBid(p, cell, highestBid + 1)) {
                highestBid += 1;
                stillBidding = true;
                currentWinner = p;
            }
        }
    }
    if (currentWinner) {
        buyProperty(currentWinner, cellPosition, highestBid);
    }
}

export function buyProperty(player: Player, cellPosition: CellPosition, price: number) {
    const cell = cells[cellPosition];
    if (!cell.forSale) {
        console.error("Not for sale");
    }
    playerMustPay(player, price);
    cell.owner = player.id;
}

export function playerMustPay(player: Player, amount: number) {
    if (player.cash >= amount) {
        player.cash -= amount;
        return;
    } else {
        liquidate(player, amount);
    }
}

export function sellProperty(player: Player, cellPosition: CellPosition, price: number) {
    const cell = cells[cellPosition];
    if (!cell.forSale) {
        console.error("Not for sale");
    }
    player.cash += price;
    cell.owner = null;
}

export function getPropertySellPrice(cellPosition: CellPosition): number {
    const cell = cells[cellPosition];
    if (!cell || !cell.forSale) {
        console.error("Can't calculate price for a property that can't be sold:", cellPosition)
    }
    if (cell.isMortgaged) {
        return cell.value! / 2;
    }
    return cell.value!;
}

export function getPropertyValue(cellPosition: CellPosition): number {
    const cell = cells[cellPosition];
    if (!cell || !cell.forSale) {
        console.error("Can't calculate price for a property that can't be sold:", cellPosition)
    }
    if (cell.isMortgaged) {
        return cell.value! / 2;
    }
    if (cell.group === "utilities" || cell.group === "railroads") {
        return cell.value!;
    } else {
        let total = cell.value!;
        if (cell.hotelCount! > 0) {
            total += cell.houseCost! / 2;
        } else if (cell.houseCount! > 0) {
            total += cell.houseCost! / 2 * cell.houseCount!;
        }
        return total;
    }
}

export function getPropertyRent(cellPosition: CellPosition): number {
    const cell = cells[cellPosition];
    if (!cell || !cell.forSale) {
        console.error("Can't calculate rent for a property that can't be sold:", cellPosition);
        return 0;
    }
    const ownerID = cell.owner;
    if (ownerID === null || ownerID === undefined) {
        console.error("Can't calculate rent for a property that isn't owner by a player:", cellPosition);
        return 0;
    }
    if (cell.isMortgaged) {
        // Default rules: mortgaged properties cannot charge rent.
        return 0;
    }
    const cellGroup = cells.filter((c) => c.owner === ownerID && c.group === cell.group);
    if (cell.group === "utilities") {
        const rents = cell.rents as UtilityRents;
        const rentMap = {
            1: rents.base,
            2: rents.twoOwned,
        } as Record<number, number>;
        if (cellGroup.length in rentMap) {
            return rentMap[cellGroup.length];
        } else {
            console.error("This isn't supposed to happen");
            return 0;
        }
    } else if (cell.group === "railroads") {
        const rents = cell.rents as RailRoadRents;
        const rentMap = {
            1: rents.base,
            2: rents.twoOwned,
            3: rents.threeOwned,
            4: rents.fourOwned,
        } as Record<number, number>;
        if (cellGroup.length in rentMap) {
            return rentMap[cellGroup.length];
        } else {
            console.error("This isn't supposed to happen");
            return 0;
        }
    } else {
        const rents = cell.rents as HouseRents;
        const ownsSet = cells.filter((c) => c.group === cell.group).length === cellGroup.length;
        if (!ownsSet) {
            return rents.base;
        }
        if (cell.hotelCount! > 0) {
            return rents.hotel;
        }
        if (cell.houseCount! > 0) {
            const rentMap = {
                1: rents.oneHouse,
                2: rents.twoHouses,
                3: rents.threeHouses,
                4: rents.fourHouses,
            } as Record<number, number>;
            if (cell.houseCount! in rentMap) {
                return rentMap[cellGroup.length];
            } else {
                console.error("This isn't supposed to happen");
                return 0;
            }
        }
        return rents.set;
    }
}

export function isBankrupt(player: Player) {
    let assets = cells
        .filter((c) => c.owner === player.id)
        .reduce((total, c) => total + getPropertyValue(c.id), player.cash);
    return assets < 0;
}

export function canMortgageProperty(player: Player, cellPosition: CellPosition) {
    const cell = cells[cellPosition];
    if (!cell) return false;
    if (cell.owner !== player.id) return false;
    if (cell.isMortgaged) return false;
    const group = cells.filter((c) => c.group === cell.group);
    const hasHouses = group.some((c) => c.houseCount! > 0 || c.hotelCount! > 0);
    return !hasHouses;
}

export function mortgageProperty(player: Player, cellPosition: CellPosition) {
    const cell = cells[cellPosition];
    if (!cell.forSale || cell.isMortgaged || cell.owner !== player.id) {
        console.error("Can't mortgage this property");
        return;
    }
    cell.isMortgaged = true;
    player.cash += cell.value! / 2;
}

export function sellHouses(player: Player, cellPosition: CellPosition) {
    const cell = cells[cellPosition];
    if (!cell.forSale || cell.owner !== player.id) {
        console.error("Can't sell this property's houses");
        return;
    }
    if (cell.houseCount && cell.houseCount > 0) {
        player.cash += cell.houseCount * cell.houseCost! / 2;
    }
    if (cell.hotelCount && cell.hotelCount > 0) {
        player.cash += cell.houseCost! / 2;
    }
}

export function sellGroupHouses(player: Player, cellPosition: CellPosition) {
    const group = cells.filter((c) => c.group === cells[cellPosition].group);
    for (const cell of group) {
        sellHouses(player, cell.id);
    }
}

export function liquidate(player: Player, limit = Infinity) {
    const properties = cells.filter((c) => c.owner === player.id).sort((a, b) => getPropertyRent(a.id) - getPropertyRent(b.id));
    while (player.cash < limit && properties.length > 0) {
        const cell = properties.pop();
        if (!cell) {
            console.error("Where's the cell?");
            break;
        }
        if (cell.houseCount && cell.houseCount > 0) {
            sellHouses(player, cell.id);
            if (player.cash >= limit) break;
        }
        if (!canMortgageProperty(player, cell.id)) {
            sellGroupHouses(player, cell.id);
            if (player.cash >= limit) break;
        }
        if (canMortgageProperty(player, cell.id)) {
            mortgageProperty(player, cell.id);
            if (player.cash >= limit) break;
        }
        sellProperty(player, cell.id, getPropertySellPrice(cell.id));
    }
}

const railroadRents: RailRoadRents = {
    base: 25,
    twoOwned: 50,
    threeOwned: 100,
    fourOwned: 200,
};

const CellPositions: Record<string, CellPosition> = Object.freeze({
    Go: 0,
    MediterraneanAvenue: 1,
    CommunityChest1: 2,
    BalticAvenue: 3,
    IncomeTax: 4,
    ReadingRailroad: 5,
    OrientalAvenue: 6,
    Chance1: 7,
    VermontAvenue: 8,
    ConnecticutAvenue: 9,
    Jail: 10,
    StCharlesPlace: 11,
    ElectricCompany: 12,
    StatesAvenue: 13,
    VirginiaAvenue: 14,
    PennsylvaniaRailroad: 15,
    StJamesPlace: 16,
    CommunityChest2: 17,
    TennesseeAvenue: 18,
    NewYorkAvenue: 19,
    FreeParking: 20,
    KentuckyAvenue: 21,
    Chance2: 22,
    IndianaAvenue: 23,
    IllinoisAvenue: 24,
    BORailroad: 25,
    AtlanticAvenue: 26,
    VentnorAvenue: 27,
    WaterWorks: 28,
    MarvinGardens: 29,
    GotoJail: 30,
    PacificAvenue: 31,
    NorthCarolinaAvenue: 32,
    CommunityChest3: 33,
    PennsylvaniaAvenue: 34,
    ShortLine: 35,
    Chance3: 36,
    ParkPlace: 37,
    LuxuryTax: 38,
    Boardwalk: 39,
});

const CellTypes: Record<string, string> = Object.freeze({
    Chance: "chance",
    CommunityChest: "communityChest",
    FreeParking: "freeParking",
    Go: "go",
    GoToJail: "goToJail",
    Jail: "jail",
    Property: "property",
    Tax: "tax",
});

const cells: Cell[] =[
    {
        id: CellPositions.Go,
        name: "Go",
        type: CellTypes.Go,
        value: 200,
    },
    {
        id: CellPositions.MediterraneanAvenue,
        name: "Mediterranean Avenue",
        type: CellTypes.Property,
        color: "bg-purple-700",
        group: "purple",
        owner: null,
        forSale: true,
        houseCount: 0,
        hotelCount: 0,
        value: 60,
        houseCost: 50,
        rents: {
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
        id: CellPositions.CommunityChest1,
        name: "Community Chest",
        type: CellTypes.CommunityChest,
    },
    {
        id: CellPositions.BalticAvenue,
        name: "Baltic Avenue",
        type: CellTypes.Property,
        color: "bg-purple-700",
        group: "purple",
        owner: null,
        forSale: true,
        houseCount: 0,
        hotelCount: 0,
        value: 60,
        houseCost: 50,
        rents: {
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
        id: CellPositions.IncomeTax,
        name: "Income Tax",
        type: CellTypes.Tax,
        value: 200,
    },
    {
        id: CellPositions.ReadingRailroad,
        name: "Reading Railroad",
        type: CellTypes.Property,
        group: "railroads",
        color: "bg-black",
        owner: null,
        forSale: true,
        houseCount: 0,
        hotelCount: 0,
        value: 200,
        rents: {
            ...railroadRents,
        },
    },
    {
        id: CellPositions.OrientalAvenue,
        name: "Oriental Avenue",
        type: CellTypes.Property,
        color: "bg-blue-300",
        group: "light-blue",
        owner: null,
        forSale: true,
        houseCount: 0,
        hotelCount: 0,
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
        id: CellPositions.Chance1,
        name: "Chance",
        type: CellTypes.Chance,
    },
    {
        id: CellPositions.VermontAvenue,
        name: "Vermont Avenue",
        type: CellTypes.Property,
        color: "bg-blue-300",
        group: "light-blue",
        owner: null,
        forSale: true,
        houseCount: 0,
        hotelCount: 0,
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
        id: CellPositions.ConnecticutAvenue,
        name: "Connecticut Avenue",
        type: CellTypes.Property,
        color: "bg-blue-300",
        group: "light-blue",
        owner: null,
        forSale: true,
        houseCount: 0,
        hotelCount: 0,
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
        id: CellPositions.Jail,
        name: "Jail",
        type: CellTypes.Jail,
    },
    {
        id: CellPositions.StCharlesPlace,
        name: "St. Charles Place",
        type: CellTypes.Property,
        color: "bg-pink-500",
        group: "magenta",
        owner: null,
        forSale: true,
        houseCount: 0,
        hotelCount: 0,
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
        id: CellPositions.ElectricCompany,
        name: "Electric Company",
        type: CellTypes.Property,
        color: "bg-white",
        group: "utilities",
        owner: null,
        forSale: true,
        houseCount: 0,
        hotelCount: 0,
        value: 150,
        rents: {
            base: 4,
            twoOwned: 10,
        }
    },
    {
        id: CellPositions.StatesAvenue,
        name: "States Avenue",
        type: CellTypes.Property,
        color: "bg-pink-500",
        group: "magenta",
        owner: null,
        forSale: true,
        houseCount: 0,
        hotelCount: 0,
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
        id: CellPositions.VirginiaAvenue,
        name: "Virginia Avenue",
        type: CellTypes.Property,
        color: "bg-pink-500",
        group: "magenta",
        owner: null,
        forSale: true,
        houseCount: 0,
        hotelCount: 0,
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
        id: CellPositions.PennsylvaniaRailroad,
        name: "Pennsylvania Railroad",
        type: CellTypes.Property,
        color: "bg-black",
        group: "railroads",
        owner: null,
        forSale: true,
        houseCount: 0,
        hotelCount: 0,
        value: 200,
        rents: {
            ...railroadRents,
        },
    },
    {
        id: CellPositions.StJamesPlace,
        name: "St. James Place",
        type: CellTypes.Property,
        color: "bg-orange-500",
        group: "orange",
        owner: null,
        forSale: true,
        houseCount: 0,
        hotelCount: 0,
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
        id: CellPositions.CommunityChest2,
        name: "Community Chest",
        type: CellTypes.CommunityChest,
    },
    {
        id: CellPositions.TennesseeAvenue,
        name: "Tennessee Avenue",
        type: CellTypes.Property,
        color: "bg-orange-500",
        group: "orange",
        owner: null,
        forSale: true,
        houseCount: 0,
        hotelCount: 0,
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
        id: CellPositions.NewYorkAvenue,
        name: "New York Avenue",
        type: CellTypes.Property,
        color: "bg-orange-500",
        group: "orange",
        owner: null,
        forSale: true,
        houseCount: 0,
        hotelCount: 0,
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
        id: CellPositions.FreeParking,
        name: "Free Parking",
        type: CellTypes.FreeParking,
    },
    {
        id: CellPositions.KentuckyAvenue,
        name: "Kentucky Avenue",
        type: CellTypes.Property,
        color: "bg-red-600",
        group: "red",
        owner: null,
        forSale: true,
        houseCount: 0,
        hotelCount: 0,
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
        id: CellPositions.Chance,
        name: "Chance",
        type: CellTypes.Chance,
    },
    {
        id: CellPositions.IndianaAvenue,
        name: "Indiana Avenue",
        type: CellTypes.Property,
        color: "bg-red-600",
        group: "red",
        owner: null,
        forSale: true,
        houseCount: 0,
        hotelCount: 0,
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
        id: CellPositions.IllinoisAvenue,
        name: "Illinois Avenue",
        type: CellTypes.Property,
        color: "bg-red-600",
        group: "red",
        owner: null,
        forSale: true,
        houseCount: 0,
        hotelCount: 0,
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
        id: CellPositions.BORailroad,
        name: "B. & O. Railroad",
        type: CellTypes.Property,
        color: "bg-black",
        group: "railroads",
        owner: null,
        forSale: true,
        houseCount: 0,
        hotelCount: 0,
        value: 200,
        rents: {
            ...railroadRents,
        },
    },
    {
        id: CellPositions.AtlanticAvenue,
        name: "Atlantic Avenue",
        type: CellTypes.Property,
        color: "bg-yellow-400",
        group: "yellow",
        owner: null,
        forSale: true,
        houseCount: 0,
        hotelCount: 0,
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
        id: CellPositions.VentnorAvenue,
        name: "Ventnor Avenue",
        type: CellTypes.Property,
        color: "bg-yellow-400",
        group: "yellow",
        owner: null,
        forSale: true,
        houseCount: 0,
        hotelCount: 0,
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
        id: CellPositions.WaterWorks,
        name: "Water Works",
        type: CellTypes.Property,
        color: "bg-white",
        group: "utilities",
        owner: null,
        forSale: true,
        houseCount: 0,
        hotelCount: 0,
        value: 150,
        rents: {
            base: 4,
            twoOwned: 10,
        }
    },
    {
        id: CellPositions.MarvinGardens,
        name: "Marvin Gardens",
        type: CellTypes.Property,
        color: "bg-yellow-400",
        group: "yellow",
        owner: null,
        forSale: true,
        houseCount: 0,
        hotelCount: 0,
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
        id: CellPositions.GotoJail,
        name: "Go to Jail",
        type: CellTypes.GoToJail,
    },
    {
        id: CellPositions.PacificAvenue,
        name: "Pacific Avenue",
        type: CellTypes.Property,
        color: "bg-green-600",
        group: "green",
        owner: null,
        forSale: true,
        houseCount: 0,
        hotelCount: 0,
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
        id: CellPositions.NorthCarolinaAvenue,
        name: "North Carolina Avenue",
        type: CellTypes.Property,
        color: "bg-green-600",
        group: "green",
        owner: null,
        forSale: true,
        houseCount: 0,
        hotelCount: 0,
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
        id: CellPositions.CommunityChest3,
        name: "Community Chest",
        type: CellTypes.CommunityChest,
    },
    {
        id: CellPositions.PennsylvaniaAvenue,
        name: "Pennsylvania Avenue",
        type: CellTypes.Property,
        color: "bg-green-600",
        group: "green",
        owner: null,
        forSale: true,
        houseCount: 0,
        hotelCount: 0,
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
        id: CellPositions.ShortLine,
        name: "Short Line",
        type: CellTypes.Property,
        color: "bg-black",
        group: "railroads",
        owner: null,
        forSale: true,
        houseCount: 0,
        hotelCount: 0,
        value: 200,
        rents: {
            ...railroadRents,
        },
    },
    {
        id: CellPositions.Chance3,
        name: "Chance",
        type: CellTypes.Chance,
    },
    {
        id: CellPositions.ParkPlace,
        name: "Park Place",
        type: CellTypes.Property,
        color: "bg-blue-800",
        group: "blue",
        owner: null,
        forSale: true,
        houseCount: 0,
        hotelCount: 0,
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
        id: CellPositions.LuxuryTax,
        name: "Luxury Tax",
        type: CellTypes.Tax,
        value: 100,
    },
    {
        id: CellPositions.Boardwalk,
        name: "Boardwalk",
        type: CellTypes.Property,
        color: "bg-blue-800",
        group: "blue",
        owner: null,
        forSale: true,
        houseCount: 0,
        hotelCount: 0,
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
];

export const tokens = Object.freeze([
    "Battleship",
    "Boot",
    "Cannon",
    "Thimble",
    "Top Hat",
    "Iron",
    "Race Car",
    "Purse",
    "Lantern",
    "Rocking Horse",
])

export const chanceCards: Card[] = [
    {
        name: "Advance to Boardwalk",
        handler: (player: Player, game: Game) => {
            movePlayer(player, CellPositions.Boardwalk, game);
        },
    },
    {
        name: "Advance to Go (Collect $200)",
        handler: (player: Player, game: Game) => {
            movePlayer(player, CellPositions.Go, game);
        }
    },
    {
        name: "Advance to Illinois Avenue. If you pass Go, collect $200",
        handler: (player: Player, game: Game) => {
            movePlayer(player, CellPositions.IllinoisAvenue, game);
        }
    },
    {
        name: "Advance to St. Charles Place. If you pass Go, collect $200",
        handler: (player: Player, game: Game) => {
            movePlayer(player, CellPositions.StCharlesPlace, game);
        }
    },
    {
        name: "Advance to the nearest Railroad. If unowned, you may buy it from the Bank. If owned, pay wonder twice the rental to which they are otherwise entitled",
        handler: handleAdvanceToNearestRailroad,
    },
    {
        name: "Advance to the nearest Railroad. If unowned, you may buy it from the Bank. If owned, pay wonder twice the rental to which they are otherwise entitled",
        handler: handleAdvanceToNearestRailroad,
    },
    {
        name: "Advance token to nearest Utility. If unowned, you may buy it from the Bank. If owned, throw dice and pay owner a total ten times amount thrown.",
        handler: (player: Player, game: Game) => {
            if (player.position < CellPositions.ElectricCompany) {
                movePlayer(player, CellPositions.ElectricCompany, game);
                return;
            } else if (player.position < CellPositions.WaterWorks) {
                movePlayer(player, CellPositions.WaterWorks, game);
                return;
            }
        }
    },
    {
        name: "Bank pays you dividend of $50",
        handler: (player: Player) => {
            player.cash += 50;
        }
    },
    {
        name: "Get Out of Jail Free",
        handler: (player: Player) => {
            player.jailTurns -= 3;
        }
    },
    {
        name: "Go Back 3 Spaces",
        handler: (player: Player) => {
            player.position = (player.position - 3) & cells.length;
        }
    },
    {
        name: "Go to Jail. Go directly to Jail, do not pass Go, do not collect $200",
        handler: (player: Player) => {
            playerGoesToJail(player)
        }
    },
    {
        name: "Make general repairs on all your property. For each house pay $25. For each hotel pay $100",
        handler: (player: Player) => {
            const playerProperties = cells.filter((c) => c.owner === player.id);
            const toPay = playerProperties.reduce((total, cell) => {
                if (cell.hotelCount && cell.hotelCount > 0) {
                    return total + 100;
                }
                if (cell.houseCount && cell.houseCount > 0) {
                    return total + 25 * cell.houseCount;
                }
                return total;
            }, 0);
            playerMustPay(player, toPay);
        }
    },
    {
        name: "Speeding fine $15",
        handler: (player: Player) => {
            playerMustPay(player, 15);
        }
    },
    {
        name: "Take a trip to Reading Railroad. If you pass Go, collect $200",
        handler: (player: Player, game: Game) => {
            movePlayer(player, CellPositions.ReadingRailroad, game);
        }
    },
    {
        name: "You have been elected Chairman of the Board. Pay each player $50",
        handler: (player: Player, game: Game) => {
            playerMustPay(player, 50 * (game.players.length - 1));
            for (const op of game.players) {
                if (op.id === player.id) continue;
                op.cash += 50;
            }
        }
    },
    {
        name: "Your building loan matures. Collect $150",
        handler: (player: Player) => {
            player.cash += 150;
        }
    },
];

export const communityChestCards: Card[] = [
    {
        name: "Advance to Go (Collect $200)",
        handler: (player: Player, game: Game) => {
            movePlayer(player, CellPositions.Go, game);
        },
    },
    {
        name: "Bank error in your favor. Collect $200",
        handler: (player: Player) => {
            player.cash += 200;
        },
    },
    {
        name: "Doctor’s fee. Pay $50",
        handler: (player: Player) => {
            playerMustPay(player, 50);
        },
    },
    {
        name: "From sale of stock you get $50",
        handler: (player: Player) => {
            player.cash += 50;
        },
    },
    {
        name: "Get Out of Jail Free",
        handler: (player: Player) => {
            player.jailTurns -= 3;
        },
    },
    {
        name: "Go to Jail. Go directly to jail, do not pass Go, do not collect $200",
        handler: (player: Player) => {
            playerGoesToJail(player);
        },
    },
    {
        name: "Holiday fund matures. Receive $100",
        handler: (player: Player) => {
            player.cash += 100;
        },
    },
    {
        name: "Income tax refund. Collect $20",
        handler: (player: Player) => {
            player.cash += 20;
        },
    },
    {
        name: "It is your birthday. Collect $10 from every player",
        handler: (player: Player, game: Game) => {
            for (const op of game.players) {
                playerMustPay(op, 10);
                player.cash += 10;
            }
        },
    },
    {
        name: "Life insurance matures. Collect $100",
        handler: (player: Player) => {
            player.cash += 100;
        },
    },
    {
        name: "Pay hospital fees of $100",
        handler: (player: Player) => {
            playerMustPay(player, 100);
        },
    },
    {
        name: "Pay school fees of $50",
        handler: (player: Player) => {
            playerMustPay(player, 50);
        },
    },
    {
        name: "Receive $25 consultancy fee",
        handler: (player: Player) => {
            player.cash += 25;
        },
    },
    {
        name: "You are assessed for street repair. $40 per house. $115 per hotel",
        handler: (player: Player) => {
            const playerProperties = cells.filter((c) => c.owner === player.id);
            const toPay = playerProperties.reduce((total, cell) => {
                if (cell.hotelCount && cell.hotelCount > 0) {
                    return total + 115;
                }
                if (cell.houseCount && cell.houseCount > 0) {
                    return total + 40 * cell.houseCount;
                }
                return total;
            }, 0);
            playerMustPay(player, toPay);
        },
    },
    {
        name: "You have won second prize in a beauty contest. Collect $10",
        handler: (player: Player) => {
            player.cash += 10;
        },
    },
    {
        name: "You inherit $100",
        handler: (player: Player) => {
            player.cash += 100;
        },
    },
];

export const game = {
    cells,
    players: tokens.map((t, i) => newPlayer(i, t)),
    communityChestCards,
    chanceCards,
};

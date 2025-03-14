interface Player {
    id: number;
    piece: string;
    position: number;
    cash: number;
    jailTurns: number;
}

interface Cell {
    name: string;
    type: string;
    value?: number;
    color?: string;
    owner?: number|null;
    group?: string;
    forSale?: boolean;
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

const railroadRents: RailRoadRents = {
    base: 25,
    twoOwned: 50,
    threeOwned: 100,
    fourOwned: 200,
};

export const cells: Cell[] =[
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
        name: "Community Chest",
        type: "communityChest",
    },
    {
        name: "Baltic Avenue",
        type: "property",
        color: "purple",
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
        name: "Income Tax",
        type: "tax",
        value: 200,
    },
    {
        name: "Reading Railroad",
        type: "property",
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
        name: "Oriental Avenue",
        type: "property",
        color: "light-blue",
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
        name: "Chance",
        type: "chance",
    },
    {
        name: "Vermont Avenue",
        type: "property",
        color: "light-blue",
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
        name: "Connecticut Avenue",
        type: "property",
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
        name: "Jail",
        type: "jail",
    },
    {
        name: "St. Charles Place",
        type: "property",
        color: "magenta",
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
        name: "Electric Company",
        type: "property",
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
        name: "States Avenue",
        type: "property",
        color: "magenta",
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
        name: "Virginia Avenue",
        type: "property",
        color: "magenta",
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
        name: "Pennsylvania Railroad",
        type: "property",
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
        name: "St. James Place",
        type: "property",
        color: "orange",
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
        name: "Community Chest",
        type: "communityChest",
    },
    {
        name: "Tennessee Avenue",
        type: "property",
        color: "orange",
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
        name: "New York Avenue",
        type: "property",
        color: "orange",
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
        name: "Free Parking",
        type: "freeParking",
    },
    {
        name: "Kentucky Avenue",
        type: "property",
        color: "red",
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
        name: "Chance",
        type: "chance",
    },
    {
        name: "Indiana Avenue",
        type: "property",
        color: "red",
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
        name: "Illinois Avenue",
        type: "property",
        color: "red",
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
        name: "B. & O. Railroad",
        type: "property",
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
        name: "Atlantic Avenue",
        type: "property",
        color: "yellow",
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
        name: "Ventnor Avenue",
        type: "property",
        color: "yellow",
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
        name: "Water Works",
        type: "property",
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
        name: "Marvin Gardens",
        type: "property",
        color: "yellow",
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
        name: "Go to Jail",
        type: "goToJail",
    },
    {
        name: "Pacific Avenue",
        type: "property",
        color: "green",
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
        name: "North Carolina Avenue",
        type: "property",
        color: "green",
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
        name: "Community Chest",
        type: "communityChest",
    },
    {
        name: "Pennsylvania Avenue",
        type: "property",
        color: "green",
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
        name: "Short Line",
        type: "property",
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
        name: "Chance",
        type: "chance",
    },
    {
        name: "Park Place",
        type: "property",
        color: "blue",
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
        name: "Luxury Tax",
        type: "tax",
        value: 100,
    },
    {
        name: "Boardwalk",
        type: "property",
        color: "blue",
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

export const CellPositions = Object.freeze({
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
})

export const movePlayer = (player: Player, cellPosition: number)=> {
    if (player.position === CellPositions.Jail && player.jailTurns > 0) {
        // Player is in jail
        return;
    }
    if (player.position > cellPosition) {
        player.cash += 200;
    }
    player.position = cellPosition;
}

const handleAdvanceToRailroad = (player: Player) => {
    if (player.position < CellPositions.ReadingRailroad) {
        movePlayer(player, CellPositions.ReadingRailroad);
        return;
    } else if (player.position < CellPositions.PennsylvaniaRailroad) {
        movePlayer(player, CellPositions.PennsylvaniaRailroad);
        return;
    } else if (player.position < CellPositions.BORailroad) {
        movePlayer(player, CellPositions.BORailroad);
        return;
    } else {
        movePlayer(player, CellPositions.ShortLine);
    }
};

export const chanceCards = [
    {
        name: "Advance to Boardwalk",
        handler: (player: Player) => {
            movePlayer(player, CellPositions.Boardwalk);
        },
    },
    {
        name: "Advance to Go (Collect $200)",
        handler: (player: Player) => {
            movePlayer(player, CellPositions.Go);
        }
    },
    {
        name: "Advance to Illinois Avenue. If you pass Go, collect $200",
        handler: (player: Player) => {
            movePlayer(player, CellPositions.IllinoisAvenue);
        }
    },
    {
        name: "Advance to St. Charles Place. If you pass Go, collect $200",
        handler: (player: Player) => {
            movePlayer(player, CellPositions.StCharlesPlace);
        }
    },
    {
        name: "Advance to the nearest Railroad. If unowned, you may buy it from the Bank. If owned, pay wonder twice the rental to which they are otherwise entitled",
        handler: handleAdvanceToRailroad,
    },
    {
        name: "Advance to the nearest Railroad. If unowned, you may buy it from the Bank. If owned, pay wonder twice the rental to which they are otherwise entitled",
        handler: handleAdvanceToRailroad,
    },
    {
        name: "Advance token to nearest Utility. If unowned, you may buy it from the Bank. If owned, throw dice and pay owner a total ten times amount thrown.",
        handler: (player: Player) => {
            if (player.position < CellPositions.ElectricCompany) {
                movePlayer(player, CellPositions.ElectricCompany);
                return;
            } else if (player.position < CellPositions.WaterWorks) {
                movePlayer(player, CellPositions.WaterWorks);
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
            player.position = CellPositions.Jail;
            player.jailTurns += 3;
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
            player.cash -= toPay;
        }
    },
    {
        name: "Speeding fine $15",
        handler: (player: Player) => {
            player.cash -= 15;
        }
    },
    {
        name: "Take a trip to Reading Railroad. If you pass Go, collect $200",
        handler: (player: Player) => {
            movePlayer(player, CellPositions.ReadingRailroad);
        }
    },
    {
        name: "You have been elected Chairman of the Board. Pay each player $50",
        handler: (player: Player, players: Player[]) => {
            for (const op of players) {
                player.cash -= 50;
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
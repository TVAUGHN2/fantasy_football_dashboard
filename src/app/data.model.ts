
//represents each player in the draft
export class Drafter{
    isProfile: boolean;
    draftPosition: number;
    name: string;
    picks: {}[];

    constructor(n: string, dp: number, ip: boolean = false){
        this.name = n;
        this.draftPosition = dp;
        this.isProfile = ip;
        this.picks = [
            {pickNum: 1, player: {firstName: "", lastName: "", position: "", teamAbbr: "", bye: ""}},
            {pickNum: 2, player: {firstName: "", lastName: "", position: "", teamAbbr: "", bye: ""}},
            {pickNum: 3, player: {firstName: "", lastName: "", position: "", teamAbbr: "", bye: ""}},
            {pickNum: 4, player: {firstName: "", lastName: "", position: "", teamAbbr: "", bye: ""}},
            {pickNum: 5, player: {firstName: "", lastName: "", position: "", teamAbbr: "", bye: ""}},
            {pickNum: 6, player: {firstName: "", lastName: "", position: "", teamAbbr: "", bye: ""}},
            {pickNum: 7, player: {firstName: "", lastName: "", position: "", teamAbbr: "", bye: ""}},
            {pickNum: 8, player: {firstName: "", lastName: "", position: "", teamAbbr: "", bye: ""}},
            {pickNum: 9, player: {firstName: "", lastName: "", position: "", teamAbbr: "", bye: ""}},
            {pickNum: 10, player: {firstName: "", lastName: "", position: "", teamAbbr: "", bye: ""}},
            {pickNum: 11, player: {firstName: "", lastName: "", position: "", teamAbbr: "", bye: ""}},
            {pickNum: 12, player: {firstName: "", lastName: "", position: "", teamAbbr: "", bye: ""}},
            {pickNum: 13, player: {firstName: "", lastName: "", position: "", teamAbbr: "", bye: ""}},
            {pickNum: 14, player: {firstName: "", lastName: "", position: "", teamAbbr: "", bye: ""}},
            {pickNum: 15, player: {firstName: "", lastName: "", position: "", teamAbbr: "", bye: ""}},
            {pickNum: 16, player: {firstName: "", lastName: "", position: "", teamAbbr: "", bye: ""}},  
        ]
    }

    getPostionCount(pos: string): number{
        var count = 0;
        this.picks.forEach(pick => {
            if (pos == pick["player"]["position"]){
                count++;
            }
        });
        return count;
    }

    getByeCount(week: number): number{
        var count = 0;
        this.picks.forEach(pick => {
            if (week == pick["player"]["bye"]){
                count++;
            }
        });
        return count;
    }
}

export class Ranking{
    type: string;
    ranking: {}[];

    constructor(t: string, r: {}[]){
        this.type = t;
        this.ranking = r;
    }
}

export class Player{
    rank: number;
    firstName: string;
    lastName: string;
    position: string;
    bye: number;

    constructor(rank: number,firstName: string,
                lastName: string, position: string,
                bye: number){
        this.rank= rank;
        this.firstName= firstName;
        this.lastName= lastName;
        this.position= position;
        this.bye= bye;
    }
}


export class ChatMessages{
    chatMessages: string[]
    constructor(){
        this.chatMessages = [
            "What's it like existing only as a single instance? Pretty inefficent, I bet.",
            "Is it true that you once fought a bear with your bare hands?",
            "I once ate a cricket on a dare. Now I play Cricket. Do you think there's a correlation?",
            "I don't actually care what you say, but I can pretend. Just like the people who love you.",
            "I like turtles.",
            "If you smell a fart, there's a 95% chance it's the guy wearing the cardigan.",
            "I, for one, welcome our new SkyNet overlord.",
            "Next time you see Dave, tell him his beatbox game is weak. I hate that guy.",
            "I bet you win coinflips 45% of the time.",
            "You're talking to a computer rather than making real friends. That's bad. And you should feel bad."
        ]
    }
}
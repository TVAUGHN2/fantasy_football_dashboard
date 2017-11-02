
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
            {pickNum: 1, name: "", position: "", bye: ""},
            {pickNum: 2, name: "", position: "", bye: ""},
            {pickNum: 3, name: "", position: "", bye: ""},
            {pickNum: 4, name: "", position: "", bye: ""},
            {pickNum: 5, name: "", position: "", bye: ""},
            {pickNum: 6, name: "", position: "", bye: ""},
            {pickNum: 7, name: "", position: "", bye: ""},
            {pickNum: 8, name: "", position: "", bye: ""},
            {pickNum: 9, name: "", position: "", bye: ""},
            {pickNum: 10, name: "", position: "", bye: ""},
            {pickNum: 11, name: "", position: "", bye: ""},
            {pickNum: 12, name: "", position: "", bye: ""},
            {pickNum: 13, name: "", position: "", bye: ""},
            {pickNum: 14, name: "", position: "", bye: ""},
            {pickNum: 15, name: "", position: "", bye: ""},
            {pickNum: 16, name: "", position: "", bye: ""},  
        ]
    }

    getPostionCount(pos: string): number{
        var count = 0;
        this.picks.forEach(pick => {
            if (pos == pick["position"]){
                count++;
            }
        });
        return count;
    }

    getByeCount(week: number): number{
        var count = 0;
        this.picks.forEach(pick => {
            if (week == pick["bye"]){
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
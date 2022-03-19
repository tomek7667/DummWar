class Player {
    constructor() {
        // console.log("Player constructor")
        this.id = null;
        this.score = 0;
        this.color = "#aaabbb";
        this.soldiers = 0;
        this.name = "Unnamed player";
    }

    setId(id) {
        this.id = id;
    }

    setScore(score) {
        this.score = score;
    }

    setColor(color) {
        this.color = color;
    }

    setSoldiers(soldiers) {
        this.soldiers = soldiers;
    }

    setName(name) {
        this.name = name;
    }
}

export { Player };
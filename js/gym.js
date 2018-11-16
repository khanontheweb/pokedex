class Gym {
    constructor(name) {
        this.name = name;
        this.members =[];
    }

    renderGym() {
        for(var i = 0; this.members.length; i++) {
            this.members[i].renderTrainer();
        }
    }
}
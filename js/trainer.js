class Trainer {
    constructor(name) {
        this.name = name;
        this.team = [];
    }
  
    all() {
        return this.team;
    }
  
    get(pokemonName) {
        for(var i = 0; i < this.team.length; i++) {
            if(this.team[i].name === pokemonName)
                return this.team[i];
        }
    }
  
    addPokemon(pokemon) {
        this.team.push(pokemon);
    }
}
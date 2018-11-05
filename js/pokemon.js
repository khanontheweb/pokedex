class Pokemon {
    constructor(id, name, abilities, sprite, stats, team) {
    this.id = id;
    this.name = name;
    this.abilities = abilities;
    this.sprite = sprite;
    this.stats = stats;
    if(this != undefined)
        team.push(this);

    }

    abilitiesToArray(arr) {
        for(var i = 0; i < this.abilities.length; i++) {
            let xhr = new XMLHttpRequest;
            let string = this.abilities[i].url;
            xhr.open('GET', string, true);
            var abilityName = this.abilities[i].ability.name;
            xhr.onload = function() {
                if(this.status == 200 && this.readyState ==4) {
                    var abilityJSON = JSON.parse(this.responseText);
                    var abilityDescription = abilityJSON.effect_entries.effect;
                    var ability = {
                        name: abilityName,
                        description:abilityDescription
                    };
                    arr.push(ability);
                }
            }
        }
    }
}

function makePokemon(id, team) {

    let xhr = new XMLHttpRequest;
    var string = 'http://fizal.me/pokeapi/api/v2/id/' + id + '.json'
    xhr.open('GET', string , true);
    xhr.onload = function() {
    if(this.status == 200 && this.readyState == 4) {
        var pokemonJSON = JSON.parse(this.responseText);
        var id = pokemonJSON.id;
        var name = pokemonJSON.name.charAt(0).toUpperCase() + pokemonJSON.name.slice(1);
        var abilities = pokemonJSON.abilities;
        var sprite = pokemonJSON.sprites.front_default;
        var stats = {
            defense: pokemonJSON.stats[3].base_stat,
            attack: pokemonJSON.stats[4].base_stat,
            hp: pokemonJSON.stats[5].base_stat
            };
        new Pokemon(id, name, abilities, sprite, stats, team);
        }
        
    };
    xhr.send();
}







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

function makeAJAXCallPokemon(id, team) {

    let xhr = new XMLHttpRequest();
    var string = 'http://fizal.me/pokeapi/api/v2/id/' + id + '.json'
   
    xhr.onreadystatechange = function() {
    if(this.status == 200 && this.readyState == 4) {
        var pokemonJSON = JSON.parse(this.responseText);
        makePokemon(pokemonJSON, team);
        }
        
    };
    xhr.open('GET', string , true);
    xhr.send();
}

function makePokemon(pokemonJSON, team) {
        var id = pokemonJSON.id;
        var name = pokemonJSON.name.charAt(0).toUpperCase() + pokemonJSON.name.slice(1);
        var abilities = []; 
        for(var i = 0; i< pokemonJSON.abilities.length; i++) {
            var ability = pokemonJSON.abilities[i].ability.name.charAt(0).toUpperCase()+pokemonJSON.abilities[i].ability.name.slice(1);
            abilities.push(ability);    
        }
        
        var sprite = pokemonJSON.sprites.front_default;
        var stats = {
            defense: pokemonJSON.stats[3].base_stat,
            attack: pokemonJSON.stats[4].base_stat,
            hp: pokemonJSON.stats[5].base_stat
            };
        let pokemon = new Pokemon(id, name, abilities, sprite, stats, team);
        writeToTeam(pokemon);
}

function writeToTeam(pokemon) {
    drawSprite(pokemon);
    makeCollapsibleCard(pokemon);
    
}

function drawSprite(pokemon) {
    let teamCol = document.createElement('div')
    teamCol.classList.add('col-sm-2');
    let cardButton = makeCardButton(pokemon)
    let pokemon = document.createElement('img');
    this.pokemon.src = sprite;
    this.pokemon.style.transform = 'scale(2.5)';
    this.pokemon.classList.add('img-fluid');
    cardButton.appendChild(this.pokemon);
    teamCol.appendChild(cardButton);;
    
    document.getElementById('team').appendChild(teamCol);
}

function makeCollapsibleCard(pokemon) {
    //makes the collapsible card
}


function makeCardButton(pokemon) {
    let cardButton = document.createElement('a');
    cardButton.classList.add('btn');
    cardButton.setAttribute('data-toggle', 'collapse');
    cardButton.setAttribute('href', pokemon.name);
    cardButton.setAttribute('role', 'button');
    cardButton.setAttribute('aria-expanded', 'false');
    cardButton.setAttribute('aria-controls', pokemon.name);
    return cardButton;
}







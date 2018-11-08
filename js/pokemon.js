class Pokemon {
    constructor(id, name, abilities, sprite, stats, team) {
    this.id = id;
    this.name =  name;
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
    let pokemonImage = document.createElement('img');
    pokemonImage.src = pokemon.sprite;
    pokemonImage.style.transform = 'scale(2.5)';
    pokemonImage.classList.add('img-fluid');
    cardButton.appendChild(pokemonImage);
    teamCol.appendChild(cardButton);;
    
    document.getElementById('team').appendChild(teamCol);
}

function makeCollapsibleCard(pokemon) {
    //make the collapse with the id of the pokemon
    let cardContainer = document.createElement('div');
    //cardContainer.classList.add('collapse');
    cardContainer.classList.add('col-sm-12')
    cardContainer.setAttribute('id', (pokemon.name).toLowerCase());

    //make the card container
    let card = document.createElement('div');
    card.classList.add('card');
    //append the card to the collapse
    

    //make the card image
   /* let cardImage = document.createElement('img');
    cardImage.classList.add('card-image-top');
    cardImage.src = pokemon.sprite;
    //append the image to the card
    card.appendChild(cardImage);*/


    //make div child with card body with pokemon name header
    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    let cardHeader = document.createElement('h5');
    cardHeader.classList.add('card-title')
    let headerText = document.createTextNode(pokemon.name);
    cardHeader.appendChild(headerText);
    

    //make a list group with with stats of pokemon
    let listGroup = document.createElement('ul');
    listGroup.classList.add('list-group');
    listGroup.classList.add('list-group-flush');
    let hpLI = document.createElement('li');
    hpLI.innerHTML = pokemon.stats['hp'];
    let defLI = document.createElement('li');
    defLI.innerHTML = pokemon.stats['defense'];
    let atkLI = document.createElement('li');
    atkLI.innerHTML = pokemon.stats['attack'];
    let listItems = [hpLI, defLI, atkLI];

    for(var i = 0; i < listItems.length; i++) {
        listItems[i].classList.add('list-group-item');
        listGroup.appendChild(listItems[i]);
    }

    cardContainer.appendChild(card);
    card.appendChild(cardBody);
    cardBody.appendChild(cardHeader);
    cardBody.appendChild(listGroup);

    document.getElementById('cards').appendChild(cardContainer);

    
}


function makeCardButton(pokemon) {
    let cardButton = document.createElement('a');
    cardButton.classList.add('btn');
    cardButton.classList.add('btn-primary');
    cardButton.setAttribute('data-toggle', 'collapse');
    cardButton.setAttribute('href', '#' + (pokemon.name).toLowerCase());
    cardButton.setAttribute('role', 'button');
    cardButton.setAttribute('aria-expanded', 'false');
    cardButton.setAttribute('aria-controls', pokemon.name);
    return cardButton;
}







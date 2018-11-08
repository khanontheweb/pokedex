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

    //make the card container
    let card = document.createElement('div');
    card.classList.add('card');

    //add the card header to the card 
    card.appendChild(makeCardButton(pokemon));
    

    //make the card image
   /* let cardImage = document.createElement('img');
    cardImage.classList.add('card-image-top');
    cardImage.src = pokemon.sprite;
    //append the image to the card
    card.appendChild(cardImage);*/

    let collapsiblePokemon = document.createElement('div');
    collapsiblePokemon.setAttribute('id', (pokemon.name).toLowerCase());
    collapsiblePokemon.classList.add('collapse');
    collapsiblePokemon.setAttribute('aria-labelledby', 'pokemon'+pokemon.id);
    collapsiblePokemon.setAttribute('data-parent', '#pokemon-accordion');
    //make div child with card body 
    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    
    cardBody.innerHTML = 'hello world pt2 electric boogaloo';
    collapsiblePokemon.appendChild(cardBody);
    card.appendChild(collapsiblePokemon);

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

    document.getElementById('pokemon-accordion').appendChild(card);
}


function makeCardButton(pokemon) {

    //make div with class card header and id of pokemon + id
    let cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');
    cardHeader.setAttribute('id', 'pokemon'+pokemon.id);
    //header 
    let header = document.createElement('h5');
    header.classList.add('mb-0');

    //button.btn.btn-link type = button data-toggle =collapse data-target=#pokemonname aria expanded = false ariacontrols=pokemonname
    let cardButton = document.createElement('button');
    cardButton.classList.add('btn');
    cardButton.classList.add('btn-link');
    cardButton.setAttribute('type', 'button');
    cardButton.setAttribute('data-toggle', 'collapse');
    cardButton.setAttribute('data-target', '#' + (pokemon.name).toLowerCase());
    cardButton.setAttribute('role', 'button');
    cardButton.setAttribute('aria-expanded', 'false');
    cardButton.setAttribute('aria-controls', (pokemon.name).toLowerCase());
    //append button to header
    cardButton.innerHTML = 'HELLO WORLD';
    header.appendChild(cardButton);
    //append header to header div
    cardHeader.appendChild(header);
    //append div to card HAPPENS OUTSIDE OF FUNCTION
    return cardHeader;
}







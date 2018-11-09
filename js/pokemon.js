class Pokemon {
    constructor(id, name, abilities, sprite, stats, team) {
    this.id = id;
    this.name =  name;
    this.abilities = abilities;
    this.sprite = sprite;
    this.stats = stats;
    //this.type = type;
    if(this != undefined)
        team.push(this);

    }

}

function makeAJAXCallPokemon(id, team) {
    let idNum = parseInt(id);
    let xhr = new XMLHttpRequest();
    var string = 'http://fizal.me/pokeapi/api/v2/id/' + idNum + '.json'
   
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
        console.log(pokemonJSON);
        var id = pokemonJSON.id;
        var name = pokemonJSON.name.charAt(0).toUpperCase() + pokemonJSON.name.slice(1);
        var abilities = []; 
        var types = [];
        for(var i = 0; i< pokemonJSON.abilities.length; i++) {
            abilities.push(pokemonJSON.abilities[i].ability.name);    
        }

        
        
        var sprite = 'http://pokestadium.com/sprites/xy/' + name.toLowerCase() + '.gif';
        var stats = {
            defense: pokemonJSON.stats[3].base_stat,
            attack: pokemonJSON.stats[4].base_stat,
            hp: pokemonJSON.stats[5].base_stat
            };
        let pokemon = new Pokemon(id, name, abilities, sprite, stats, team);
        writeToTeam(pokemon);
}

function writeToTeam(pokemon) {
    
    makeTab(pokemon);
    makeTabContent(pokemon);
    
}


function makeNavCard(pokemon) {

    //make the card container
    let card = document.createElement('div');
    card.classList.add('card');

    let cardImg = document.createElement('img');
    let pokemonIDString = pokemon.id;
    if (pokemonIDString < 100)
        pokemonIDString = '0' + pokemonIDString;
    else if(pokemonIDString < 10)
        pokemonIDString = '00' + pokemonIDString;
    cardImg.src = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + pokemonIDString + '.png';
    cardImg.classList.add('card-img-bottom');
    cardImg.style.transform = 'scale(.25)';
    cardImg.style.margin ='-39%';
    cardImg.style.pointerEvents = 'none';


    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    
    let cardHeader = document.createElement('h1');
    cardHeader.classList.add('card-titlle');
    cardHeader.innerHTML = pokemon.name;
    cardBody.appendChild(cardHeader);
    cardBody.appendChild(cardImg);

    //make a list group with with stats of pokemon
    let listGroup = document.createElement('ul');
    listGroup.classList.add('list-group');
    listGroup.classList.add('list-group-flush');
    let hpLI = document.createElement('li');
    hpLI.innerHTML = 'hp: ' + pokemon.stats['hp'];
    let defLI = document.createElement('li');
    defLI.innerHTML = 'def: ' + pokemon.stats['defense'];
    let atkLI = document.createElement('li');
    atkLI.innerHTML = 'atk: ' + pokemon.stats['attack'];
    let abilitiesLI = document.createElement('li');
    abilitiesLI.innerHTML = 'abilities: ';
    for(var i = 0; i < pokemon.abilities.length; i++) {
        abilitiesLI.innerHTML+= pokemon.abilities[i];
        if(i < pokemon.abilities.length-1)
            abilitiesLI.innerHTML += ', ';
    }
    let listItems = [hpLI, defLI, atkLI, abilitiesLI];

    for(var i = 0; i < listItems.length; i++) {
        listItems[i].classList.add('list-group-item');
        listGroup.appendChild(listItems[i]);
    }

    cardBody.appendChild(listGroup);
    card.appendChild(cardBody);
    return card;

}




function makeTab(pokemon) {
    let navItem = document.createElement('a');
    navItem.classList.add('list-group-item', 'list-group-item-action');

    navItem.setAttribute('id', (pokemon.name).toLowerCase()+'-list');
    navItem.setAttribute('data-toggle', 'list');
    navItem.setAttribute('href', '#'+(pokemon.name).toLowerCase());
    navItem.setAttribute('role', 'tab');
    navItem.setAttribute('aria-controls', (pokemon.name).toLowerCase());

    let tabImage = document.createElement('img');
    tabImage.src = pokemon.sprite;
    

    navItem.appendChild(tabImage);
    document.getElementById('pokemon-tabs').appendChild(navItem);
}

function makeTabContent(pokemon) {
    let tabPane = document.createElement('div');
    tabPane.classList.add('tab-pane', 'fade');
    tabPane.setAttribute('id', (pokemon.name).toLowerCase());
    tabPane.setAttribute('role', 'tabpanel');
    tabPane.setAttribute('aria-labelledby', (pokemon.name).toLowerCase()+'-list');

    tabPane.appendChild(makeNavCard(pokemon));
    document.getElementById('pokemon-tab-content').appendChild(tabPane);


}









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
    var string = 'https://fizal.me/pokeapi/api/v2/id/' + idNum + '.json'
   
    xhr.onreadystatechange = function() {
    if(this.status == 200 && this.readyState == 4) {
        var pokemonJSON = JSON.parse(this.responseText);
        makePokemon(pokemonJSON, team);
        }
        
    };
    xhr.open('GET', string , true);
    xhr.send();
}

function makeAJAXCallMoves(pokemonJSON) {
    

    //make 4 ajax calls one for each move and make a move object
    var string = 'http://fizal.me/pokeapi/api/v2/id/' + idNum + '.json'
    xhr.onreadystatechange = function() {
        if(this.status == 200 && this.readyState == 4) {  
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

        let moves = pokemonJSON.moves;
        var moveArr = [];
        var i = 0;
        while(i < 3) {
            let randMove = moves[Math.floor(Math.random() * moves.length)];
            if(!moveArr.includes(randMove)) {
                moveArr.push(randMove);
                i++;
                }
            }
       // makeAJAXCallMoves(moveArr);
        //makeAJAXCallFlavorText(id);    
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
    cardImg.src = 'http://www.pokestadium.com/assets/img/sprites/official-art/' + pokemon.name.toLowerCase() + '.png';
    cardImg.classList.add('card-img-bottom');


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
    abilitiesLI.classList.add('border-bottom-0')
    
    for(var i = 0; i < pokemon.abilities.length; i++) {
        abilitiesLI.innerHTML+= pokemon.abilities[i];
        if(i < pokemon.abilities.length-1)
            abilitiesLI.innerHTML += ', ';
    }

    let listItems = [hpLI, atkLI, defLI, abilitiesLI];

    for(var i = 0; i < listItems.length; i++) {
        listItems[i].classList.add('list-group-item');
        listGroup.appendChild(listItems[i]);
    }

    let hpBar = makeBars(pokemon.stats['hp']);
    hpBar.childNodes[0].classList.add('bg-danger');
    let defBar = makeBars(pokemon.stats['defense']);
    defBar.childNodes[0].classList.add('bg-success');
    let atkBar = makeBars(pokemon.stats['attack']);
    atkBar.childNodes[0].classList.add('bg-warning');
    
    
    

    cardBody.appendChild(listGroup);
    cardBody.appendChild(hpBar);
    cardBody.appendChild(atkBar);
    cardBody.appendChild(defBar);
    card.appendChild(cardBody);
    return card;

}




function makeTab(pokemon) {
    let navItem = document.createElement('a');
    let pokemonCry = document.createElement('audio');
    //pokemonCry.src = 
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

function makeBars(stat) {
    let progressWrapper = document.createElement('div');
    progressWrapper.classList.add('progress');
    progressWrapper.style.height = '25px';

    let progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar')
    progressBar.classList.add('text-light');
    progressBar.setAttribute('role', 'progressbar');
    progressBar.setAttribute('aria-valuenow', stat.toString());
    progressBar.setAttribute('aria-valuemin', '0');
    progressBar.setAttribute('aria-valuemax', '255');

    let width = (stat/255)*100;
    progressBar.style.width = width.toString() + '%';
    progressBar.innerHTML = stat.toString();
    

    progressWrapper.appendChild(progressBar);
    return progressWrapper;

}









class Trainer {
    constructor(name, sprite) {
        this.name = name;
        this.team = [];
        this.sprite = sprite;
    }
  
    all() {
        return this.team;
    }

    get(pokemonName) {
        for(var i = 0; i < this.team.length; i++) {
            if((this.team[i].name).toLowerCase() === pokemonName)
                return this.team[i];
        }
    }

    makeTrainerTab() {
        let navItem = document.createElement('a');
        navItem.classList.add('list-group-item', 'list-group-item-action');

        navItem.setAttribute('id', this.name+'-list');
        navItem.setAttribute('data-toggle', 'list');
        navItem.setAttribute('href', '#'+this.name);
        navItem.setAttribute('role', 'tab');
        navItem.setAttribute('aria-controls', this.name);

        let tabImage = document.createElement('img');
        tabImage.src = this.sprite;
        //tabImage.style.width = '10%';

        navItem.appendChild(tabImage);
        document.getElementById('trainer-tabs').appendChild(navItem);
    }

    makeTrainerTabContent() {
            let tabPane = document.createElement('div');
            tabPane.classList.add('tab-pane', 'fade');
            tabPane.setAttribute('id', this.name);
            tabPane.setAttribute('role', 'tabpanel');
            tabPane.setAttribute('aria-labelledby', this.name+'-list');
            document.getElementById('trainer-tab-content').appendChild(tabPane);
            let innerRow = document.createElement('div');
            innerRow.classList.add('row');
            let listGroup = document.createElement('div');
            listGroup.classList.add('list-group','col-sm-2');
            listGroup.setAttribute('id', this.name +'-pokemon-tabs');
            let listGroupContent = document.createElement('div');
            listGroupContent.classList.add('tab-content','col-sm-8');
            listGroupContent.setAttribute('id', this.name+'-pokemon-tab-content');
            innerRow.appendChild(listGroup);
            innerRow.appendChild(listGroupContent);
            tabPane.appendChild(innerRow);
    }

    renderTrainer() {
        this.makeTrainerTab()
        this.makeTrainerTabContent();
    }

}   
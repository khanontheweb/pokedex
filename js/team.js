let momo = new Trainer("momo", "img/pokemon_sprites_01.png");
momo.renderTrainer();

let bree = new Trainer("bree", "img/pokemon_sprites_02.png");
bree.renderTrainer();

makeAJAXCallPokemon(289, momo);
makeAJAXCallPokemon('wooper',momo);
makeAJAXCallPokemon('shedinja', momo);  

makeAJAXCallPokemon('gastly', bree);
makeAJAXCallPokemon('clefairy', bree);
makeAJAXCallPokemon('aggron', bree);  
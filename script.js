let pokeAPI = 'https://pokeapi.co/api/v2/pokemon';
let pokeDex = 'https://pokeapi.co/api/v2/pokedex/1';

let pokeUl = document.querySelector('.pokeUl');
pokeUl.setAttribute(
  'class',
  'row justify-content-around align-content-between px-3 px-sm-0'
);
//console.log('pokeUl: ', pokeUl);

//The fetchPokeDex function declaration START below
let fetchPokeDex = async api => {
  const response = await fetch(api);
  const pokeJson = await response.json();

  //start empty array that we will will later return to use in the second fetch function (fetchPokeDex(pokeDex))
  let names = [];

  console.log(pokeJson);
  for (let i = 0; i <= 150; i++) {
    let li = pokeUl.appendChild(document.createElement('li'));
    li.setAttribute('class', 'col-sm-3 mx-1 my-3');

    //li.appendChild(firstDiv + div)

    let firstDiv = li.appendChild(document.createElement('div'));

    let div = li.appendChild(document.createElement('div'));
    //running this api to get sprites for img src tag
    innerFetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}/`).then(pokemon => {
      //console.log(pokemon);
      let pokeTypeStatement = `${
        pokemon.types[1] ? pokemon.types[1].type.name : ''
      }`;
      // created li's for each pokemon and then added a p tag with img and a tag and assigned some classes
      firstDiv.innerHTML = `<p>

      <img src="${
        pokemon.sprites.front_default ? pokemon.sprites.front_default : '#'
      }" alt="${pokeJson.pokemon_entries[i].pokemon_species.name}">
    
        <a href="#collapse${
          i + 1
        }" data-toggle="collapse" data-target="#collapse${
        i + 1
      }" role="button" aria-expanded="false" aria-controls="#collapse${
        i + 1
      }">${pokeJson.pokemon_entries[i].pokemon_species.name}</a>
      
      </p>`;

      div.setAttribute('class', 'collapse card-body');
      div.setAttribute('id', `collapse${i + 1}`);

      //console.log('pokemon.id.length: ', pokemon.id.toString().length);

      //top of div
      // div.innerHTML = `<div class="card-body">`;
      if (pokemon.id.toString().length == 2) {
        div.innerHTML = `<h2 class="card-title">Specs: </h2><p class="pokemonName">No: #0${pokemon.id}</p>`;
      } else if (pokemon.id.toString().length == 1) {
        div.innerHTML = `<h2 class="card-title">Specs: </h2><p class="pokemonName">No: #00${pokemon.id}</p>`;
      } else {
        div.innerHTML = `<h2 class="card-title">Specs: </h2><p class="pokemonName">No: #${pokemon.id}</p>`;
      }

      div.innerHTML += `
      <p class="pokemonName">Name: ${pokemon.name}</p>
      
      <p class="pokemonName">Weight: ${pokemon.weight}lbs</p>`;

      for (let i = 0; i < pokemon.types.length; i++) {
        div.innerHTML += `
      <p class="pokemonName">${
        pokemon.types[i] ? pokemon.types[i].type.name : ''
      }</p>`;
      }

      //I also want to note if they are mythical and legendary and evolves_from_species.name and order
      //I can run another innerfetch using https://pokeapi.co/api/v2/pokemon-species/${id or order}/
      //is_legendary

      innerFetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`)
        .then(pokeSpecs => {
          console.log(pokeSpecs);
          //console.log('pokeSpecs: ', pokeSpecs.is_legendary);
          //console.log('pokeSpecs: ', pokeSpecs.is_mythical);
          if (pokeSpecs.is_legendary) {
            div.innerHTML += `<p>${pokemon.name} is a Legendary Pokemon</p>`;
          }
          if (pokeSpecs.is_mythical) {
            div.innerHTML += `<p>${pokemon.name} is a Mythical Pokemon</p>`;
          }

          if (pokeSpecs.evolves_from_species) {
            div.innerHTML += `<p>Evolves from: ${pokeSpecs.evolves_from_species.name}</p>`;
          }

          div.innerHTML += `<p>Capture Rate: ${pokeSpecs.capture_rate}</p>`;
          div.innerHTML += `<p>Base Happiness: ${pokeSpecs.base_happiness}</p>`;
          div.innerHTML += `<p>Habitat: ${pokeSpecs.habitat.name}</p>`;
          //last div

          // div.innerHTML += `<p>Evolves from: ${
          //   pokeSpecs.evolves_from_species
          //     ? pokeSpecs.evolves_from_species.name
          //     : ''
          // }</p>`;
        })
        .catch(err => console.log('pokemon_species error: ', err));
    });
    names.push(pokeJson.pokemon_entries[i].pokemon_species);
  }

  //console.log(lis[1]);
  //console.log('names: ', names[0]);
  //we are returning an array of objects.
  //names will return {name: 'pokemonname', url: 'https://apiforthatpokemon'}
  return names;
};
//The fetchPokeDex function declaration END below

fetchPokeDex(pokeDex)
  .then(data => {
    console.log(data.name);
  })
  .catch(err => console.log(err));

async function innerFetch(api) {
  const res = await fetch(api);
  const json = await res.json();
  return json;
}

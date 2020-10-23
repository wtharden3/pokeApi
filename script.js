let pokeAPI = 'https://pokeapi.co/api/v2/pokemon';
let pokeDex = 'https://pokeapi.co/api/v2/pokedex/1';

let pokeUl = document.querySelector('.pokeUl');
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

    let div = pokeUl.appendChild(document.createElement('div'));
    //running this api to get sprites for img src tag
    innerFetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}/`).then(pokemon => {
      console.log(pokemon);
      let pokeTypeStatement = `${
        pokemon.types[1] ? pokemon.types[1].type.name : ''
      }`;
      // created li's for each pokemon and then added a p tag with img and a tag and assigned some classes
      li.innerHTML = `<p>

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

      div.setAttribute('class', 'collapse');
      div.setAttribute('id', `collapse${i + 1}`);

      div.innerHTML = `
      <p class="pokemonName">Name: ${pokemon.name}</p>
      <p class="pokemonName">Order: #${pokemon.order}</p>
      <p class="pokemonName">Weight: ${pokemon.weight}lbs</p>`;

      for (let i = 0; i < pokemon.types.length; i++) {
        div.innerHTML += `
      <p class="pokemonName">${
        pokemon.types[i] ? pokemon.types[i].type.name : ''
      }</p>`;
      }
    });

    //CAN WE MAKE A FUNCTION THAT LOOPS TO CHECK HOW MANY INSTANCES OF AN ARRAY THERE IS USING LENGTH
    // let div = pokeUl.appendChild(document.createElement('div'));

    // div.setAttribute('class', 'collapse');
    // div.setAttribute('id', `collaspe1`);
    // div.innerHTML = `
    //   <p>some stuff</p>
    // `;

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
    //console.log('data[1].name: ', data[1].name, 'data[1].url', data[1].url);
    //details about specific pokemon below
    //nedd to loop conditionally
    //match two variables
    //loop through data[i].name and data[i].url
    //let divs = document.querySelectorAll('li');
    // loop through all the nodes and assign a class attribute
    //console.log('lis: ', lis);
    // console.log(data);
    // console.log('data.length: ', data.length);
    // console.log(data[150].url);
    //console.log(data[151].url);
    //let collapsibleDivs = document.querySelectorAll('div.collapse');
    // for (let j = 0; j < data.length; j++) {
    //   innerFetch(data[j].url)
    //     .then(newApi => {
    //       // console.log(newApi);
    //       // console.log('name: ', newApi.name);
    //       // console.log('id: ', newApi.id);
    //       // console.log('order: ', newApi.order);
    //       if (newApi.evoles_from_species) {
    //         console.log(
    //           'evoles_from_species.name: ',
    //           newApi.evoles_from_species.name
    //         );
    //       }
    //       console.log('color.name: ', newApi.color.name);
    //       //console.log('egg_groups: ', newApi.egg_groups.length);
    //       for (let i = 0; i < newApi.egg_groups.length; i++) {
    //         console.log(newApi.egg_groups[i].name);
    //       }
    //       if (newApi.is_legendary) {
    //         console.log('Legendary Pokemon');
    //       }
    //       if (newApi.is_mythical) {
    //         console.log('Mythical Pokemon');
    //       }
    //       console.log('isLegendary: ', newApi.is_legendary);
    //       console.log('is_mythical: ', newApi.is_mythical);
    //       // for (group in newApi.egg_groups) {
    //       //   console.log(egg_groups[group].name);
    //       // }
    //       console.log('color.name: ', newApi.habitat.name);
    //       console.log('__________________________________');
    //       console.log('__________________________________');
    //       //need to target specific info about pokemon and put in p tags
    //       //need a loop to target each one and add data
    //       //do later
    //       //console.log(collapsibleDivs);
    //       //console.log(collapsibleDivs[0]);
    //     })
    //     .catch(err => console.log(err));
    // }
    // innerFetch(data[i].url)
    //   .then(newApi => {
    //     console.log(newApi);
    //     console.log('color.name: ', newApi.color.name);
    //     //console.log('egg_groups: ', newApi.egg_groups.length);
    //     for (let i = 0; i < newApi.egg_groups.length; i++) {
    //       console.log(newApi.egg_groups[i].name);
    //     }
    //     if (newApi.is_legendary) {
    //       console.log('Legendary Pokemon');
    //     }
    //     if (newApi.is_mythical) {
    //       console.log('Mythical Pokemon');
    //     }
    //     console.log('isLegendary: ', newApi.is_legendary);
    //     console.log('is_mythical: ', newApi.is_mythical);
    //     // for (group in newApi.egg_groups) {
    //     //   console.log(egg_groups[group].name);
    //     // }
    //     console.log('color.name: ', newApi.habitat.name);
    //     //need to target specific info about pokemon and put in p tags
    //     //need a loop to target each one and add data
    //     //do later
    //     //console.log(collapsibleDivs);
    //     //console.log(collapsibleDivs[0]);
    //   })
    //   .catch(err => console.log(err));
  })
  .catch(err => console.log(err));

async function innerFetch(api) {
  const res = await fetch(api);
  const json = await res.json();
  return json;
}

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

  /**
   * below we will target the O.G. pokemon (1-150)
   *
   * we created a loop to do 4 things
   * 1. create a li for each pokemon
   * 2. assign the innerText of each li to a corresponding Pokemon
   * 3. create a div class with the class of 'collapse' so we can later create a collapse that will reveal info about each pokemon listed
   * 4. push each pokemon_species object from the api to the array names so we can run an api on the ..pokemon_species_[i].url later
   *  in the fetchPokeDex(pokeDex) function later
   */
  console.log(pokeJson);
  for (let i = 0; i <= 150; i++) {
    let li = pokeUl.appendChild(document.createElement('li'));

    /**
     * 
     * 
     * <img src="#" alt="${pokeJson.pokemon_entries[i].pokemon_species.name}">
    
    <a href="#collapse${
      i + 1
    }" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapse${
      i + 1
    }">${pokeJson.pokemon_entries[i].pokemon_species.name}</a>
     */

    // pokeUl.appendChild(document.createElement('li')).innerHTML = `<p>

    //li.innerHTML = `<p></p>`;

    //let liPara = document.querySelector('li p');

    //to get sprites
    innerFetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}/`).then(pokemon => {
      //console.log(pokemon.sprites);
      li.innerHTML = `<p>

      <img src="${
        pokemon.sprites.front_default ? pokemon.sprites.front_default : '#'
      }" alt="${pokeJson.pokemon_entries[i].pokemon_species.name}">
    
        <a href="#collapse${
          i + 1
        }" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapse${
        i + 1
      }">${pokeJson.pokemon_entries[i].pokemon_species.name}</a>
      
      </p>`;
    });

    pokeUl
      .appendChild(document.createElement('div'))
      .setAttribute('class', 'collapse');
    names.push(pokeJson.pokemon_entries[i].pokemon_species);
  }
  let allLis = document.querySelectorAll('.pokeUl > li');
  // console.log('allLis[0]: ', allLis[0]);

  /**
   * We want to add more attributes to all the list items (li) for bootstrap collapse component to work
   *
   * we first assign the collection of li's to the variable lis
   *
   * we will also assign all the divs within the ul to collapsibleDivs
   */
  //let lis = document.querySelectorAll('li');
  //let collapsibleDivs = document.querySelectorAll('div.collapse');
  //console.log('collapsebleDivs: ', collapsibleDivs);
  //let divs = document.querySelectorAll('')
  // loop through all the nodes and assign a class attribute

  //testing something commenting this out for now to see if I can chain setAttribute above will still need this
  // for (li in lis) {
  //   let classValue = `list-`;
  //   let idValue = `collaspe${li}`;
  //   let hrefValue = `#${idValue}`;
  //   //this is targeting all li's to assign their data-toggle and href attributes
  //   //lis[li].setAttribute('data-toggle', 'collapse');
  //   //lis[li].innerHTML = `<a href=${hrefValue}></>setAttribute('href', hrefValue);
  //   //console.log(lis[li]);
  // }

  //repetitive, refactor later and use conditional to do certain things for divs and others for li === see function assignAttributes(array)
  // for (div in collapsibleDivs) {
  //   console.log('div of collapsible div: ', div);
  //   let idValue = `collaspe${div}`;
  //   console.log(idValue);
  //   collapsibleDivs[div].setAttribute('id', idValue);
  //   console.log(collapsibleDivs[div]);
  // }

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

    let collapsibleDivs = document.querySelectorAll('div.collapse');

    for (let j = 0; j < data.length; j++) {
      innerFetch(data[j].url)
        .then(newApi => {
          // console.log(newApi);
          // console.log('name: ', newApi.name);
          // console.log('id: ', newApi.id);
          // console.log('order: ', newApi.order);

          if (newApi.evoles_from_species) {
            console.log(
              'evoles_from_species.name: ',
              newApi.evoles_from_species.name
            );
          }

          console.log('color.name: ', newApi.color.name);
          //console.log('egg_groups: ', newApi.egg_groups.length);
          for (let i = 0; i < newApi.egg_groups.length; i++) {
            console.log(newApi.egg_groups[i].name);
          }
          if (newApi.is_legendary) {
            console.log('Legendary Pokemon');
          }
          if (newApi.is_mythical) {
            console.log('Mythical Pokemon');
          }
          console.log('isLegendary: ', newApi.is_legendary);
          console.log('is_mythical: ', newApi.is_mythical);
          // for (group in newApi.egg_groups) {
          //   console.log(egg_groups[group].name);
          // }
          console.log('color.name: ', newApi.habitat.name);
          console.log('__________________________________');
          console.log('__________________________________');
          //need to target specific info about pokemon and put in p tags
          //need a loop to target each one and add data

          //do later
          //console.log(collapsibleDivs);
          //console.log(collapsibleDivs[0]);
        })
        .catch(err => console.log(err));
    }

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

//may need to delete
function assignAttrbutes(array1, array2) {
  for (index in array1) {
    let classValue = `list-`;
    let idValue = `collaspe${index}`;
    let hrefValue = `#${idValue}`;
    //this is targeting all li's to assign their data-toggle and href attributes
    lis[li].setAttribute('data-toggle', 'collapse');
    lis[li].setAttribute('href', hrefValue);
    console.log(lis[li]);
  }
  for (index in array2) {
    //this is targetting all collapsibleDivs and

    console.log('div of collapsible div: ', div);
    let idValue = `collaspe${div}`;
    console.log(idValue);
    collapsibleDivs[div].setAttribute('id', idValue);
    console.log(collapsibleDivs[div]);
  }
}

let pokeAPI = 'https://pokeapi.co/api/v2/pokemon';
let pokeDex = 'https://pokeapi.co/api/v2/pokedex/1';
let pokeUl = document.querySelector('.pokeUl');
console.log('pokeUl: ', pokeUl);

//The fetchPokeDex function declaration START below
let fetchPokeDex = async api => {
  const response = await fetch(api);
  const pokeJson = await response.json();

  let names = [];

  for (let i = 0; i <= 150; i++) {
    pokeUl.appendChild(document.createElement('li')).innerText =
      pokeJson.pokemon_entries[i].pokemon_species.name;
    pokeUl
      .appendChild(document.createElement('div'))
      .setAttribute('class', 'collapse');
    names.push(pokeJson.pokemon_entries[i].pokemon_species);
  }
  let lis = document.querySelectorAll('li');
  //let divs = document.querySelectorAll('')
  // loop through all the nodes and assign a class attribute

  //testing something commenting this out for now to see if I can chain setAttribute above will still need this
  for (li of lis) {
    let classValue = `list-`;
    li.setAttribute('data-toggle', 'collapse');
    console.log(li);
  }

  console.log(lis[1]);
  console.log('names: ', names[0]);
  //we are returning an array of objects.
  //names will return {name: 'pokemonname', url: 'https://apiforthatpokemon'}
  return names;
};
//The fetchPokeDex function declaration END below

fetchPokeDex(pokeDex)
  .then(data => {
    console.log('data[1].name: ', data[1].name, 'data[1].url', data[1].url);
    //details about specific pokemon below
    //nedd to loop conditionally
    //match two variables
    //loop through data[i].name and data[i].url
    let lis = document.querySelectorAll('li');
    // loop through all the nodes and assign a class attribute
    //console.log('lis: ', lis);
    innerFetch(data[0].url)
      .then(console.log)
      .catch(err => console.log(err));
  })
  .catch(err => console.log(err));

async function innerFetch(api) {
  const res = await fetch(api);
  const json = await res.json();
  return json;
}

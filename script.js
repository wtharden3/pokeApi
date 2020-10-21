let pokeAPI = 'https://pokeapi.co/api/v2/pokemon';
let nextPoke20;
let prevPoke20;
let pokeUl = document.querySelector('.pokeUl');
console.log('pokeUl: ', pokeUl);

// let fetchApi = async () => {
//   fetch(pokeAPI)
//     .then(response => {
//       response.json();
//     })
//     .then(json => console.log(json))
//     .catch(err => console.log(err));
//   console.log("What's up");
// };

let fetchApi = async api => {
  const response = await fetch(api);
  const pokeJson = await response.json();
  let count = pokeJson.count;
  nextPoke20 = pokeJson.next;
  prevPoke20 = pokeJson.previous;
  console.log('count: ', count);
  console.log('pokeJson: ', pokeJson);
  console.log('next: ', nextPoke20);
  console.log('previous: ', prevPoke20);
  //console.log('length', pokeJson.results.length);
  let results = pokeLoop(pokeJson.results);
  return results;
};

fetchApi(pokeAPI)
  .then(console.log)
  .catch(err => console.log(err));

//let practiceArr = ['Will', 'you', 'work', '?', 100];
//console.log(pokeLoop(practiceArr));

function pokeLoop(arr) {
  for (let i = 0; i < arr.length; i++) {
    pokeUl.appendChild(document.createElement('li')).innerText = arr[i].name;
    let li = document.querySelectorAll('li');
    console.log(arr[i]);
  }
}

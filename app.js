const pegarUrlPokemon = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const gerarPromisesPokemon = () => Array(150).fill().map((_, index) =>
  fetch(pegarUrlPokemon(index + 1)).then(resposta => resposta.json()))

const geraHTML = pokemons => pokemons.reduce((accumulator, {
  name,
  id,
  types
}) => {
  const elementTypes = types.map(typeInfo => typeInfo.type.name)

  accumulator += `
          <li class="card ${elementTypes[0]}">
           <img class="card-image" alt="${name}"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png"
            <h2 class="card-title">${id}. ${name}</h2>
            <p class="card-subtitle">${elementTypes.join(' | ')}</p>
          </li>
        `
  return accumulator

}, '')

const inserirPokemonsNaPagina = pokemons => {
  const ul = document.querySelector('[data-js="pokedex"]')
  ul.innerHTML = pokemons
}

const pokemonPromises = gerarPromisesPokemon()

Promise.all(pokemonPromises)
  .then(geraHTML)
  .then(inserirPokemonsNaPagina)
const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('.form')
const input = document.querySelector('.input__search')
const ButtonPrev  = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-prev')

let searchPokemon = 31

// aqui asnyc vaio esperara pegar ops dapdos dos pokemom ate que etsja tudo concluido 
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  /* o 200 aqu q eu se refere e o 200 do console no redes, que tem
  como obejtivo dizere que o dados foram achados com sucessoe quando
  nao aparace o 404*/
    if (APIResponse.status === 200) {
      const data = await APIResponse.json();

      console.log(data)
      return data;
    }
  }


const renderPokemon  = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = ''
    const data = await fetchPokemon(pokemon)
    
    if(data){
        
        
        //aqui o name pegaria o nome dentro do html do api
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        // aqui mostar uma novo fporma de procura uma buscar no api
        pokemonImage.src =  data ['sprites'] ['versions'] ['generation-v']  ['black-white']
        ['animated']['front_default']
        input.value = ''
        searchPokemon = data.id
        
    }else{
    pokemonImage.style.display = 'none'
    pokemonName.innerHTML = 'Not found :C'
    pokemonNumber.innerHTML = ''
}
}


/* Essa funçao tem como prioridade nao der reeoload na pagina eque e renciair ao emnviar o formulario*/
form.addEventListener('submit', (event) => {
    event.preventDefault()
// aqui ele vai pegar o valor da do inpput e ereproduzir na funçao da pagina 14  que vai
//procurar op nome id e animaçao
    renderPokemon(input.value)
})
ButtonPrev.addEventListener('click', () => {
   if ( searchPokemon> 1)  {
searchPokemon -= 1
   }
    renderPokemon(searchPokemon)
// aqui ele vai pegar o valor da do inpput e ereproduzir na funçao da pagina 14  que vai
//procurar op nome id e animaçao
    
})
buttonNext.addEventListener('click', () => {
    searchPokemon += 1
    renderPokemon(searchPokemon)
// aqui ele vai pegar o valor da do inpput e ereproduzir na funçao da pagina 14  que vai
//procurar op nome id e animaçao
    
})

renderPokemon(searchPokemon)


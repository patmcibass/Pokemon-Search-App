const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const pokemonWeight = document.getElementById('weight');
const pokemonHeight = document.getElementById('height');
const pokemonTypes = document.getElementById('types');
const pokeScreen = document.getElementById('poke-screen');
const imgContainer = document.getElementById('img-container');

const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');

const pokeIndex = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon';


// fetch the API
const fetchData = async () => {
    try {
        const res = await fetch(pokeIndex);
        const data = await res.json();
        showInfo(data);
        }

    catch (err) {
        console.log(err);
    }
};



const showInfo = (data) => {
    resetFields();
    let inputStringToLower = searchInput.value.toLowerCase();
    const {results} = data;
    let count = 0;
    
    for (let i = 0; i < results.length; i++) {
        
        if (results[i].id == searchInput.value || results[i].name == inputStringToLower) {
            count++;
            
            pokemonName.textContent = results[i].name.toUpperCase();
            pokemonId.textContent = `#${results[i].id}`;
            console.log(results[i].url);
            fetch(pokeIndex.concat(`/${results[i].id}`)).then((res2) => res2.json()).then((data2) => {
            const pokemonData = data2;
            pokemonWeight.textContent = `Weight: ${pokemonData.weight}`;
            pokemonHeight.textContent = `Height: ${pokemonData.height}`;
            pokemonData.types.forEach((arr) => {
                pokemonTypes.innerHTML += `
                <div class='${arr.type.name} type-divs'>
                    <p>${arr.type.name.toUpperCase()}</p>
                </div>
                `;
            })
            imgContainer.innerHTML = `<img src="${pokemonData.sprites.front_default}" alt="${results[i].name}" id="sprite">`;
            // get stats into their divs
            pokemonData.stats.forEach((arr) => {
                switch (arr.stat.name) {
                    case 'hp':
                        hp.innerHTML = `
                        <p>${arr.base_stat}</p>
                        `;
                        break;
                    case 'attack':
                        attack.innerHTML = `
                        <p>${arr.base_stat}</p>
                        `;
                        break;
                    case 'defense':
                        defense.innerHTML = `
                        <p>${arr.base_stat}</p>
                        `;
                        break;
                    case 'special-attack':
                        specialAttack.innerHTML = `
                        <p>${arr.base_stat}</p>
                        `;
                        break;
                    case 'special-defense':
                        specialDefense.innerHTML = `
                        <p>${arr.base_stat}</p>
                        `;
                        break;
                    case 'speed':
                        speed.innerHTML = `
                        <p>${arr.base_stat}</p>
                        `;
                        break;
                    default:
                        return;
                }
                
            })
            }).catch((err2) => {
                console.log(err2);
            });
        };
    };

    if (count === 0) {
        alert('Pokemon not found');
    }

};

const resetFields = () => {
    pokemonTypes.innerHTML = '';
    pokemonName.textContent = '';
    pokemonId.textContent = '';
    pokemonHeight.textContent = '';
    pokemonWeight.textContent = '';
    hp.innerHTML = '';
    attack.innerHTML = '';
    defense.innerHTML = '';
    specialAttack.innerHTML = '';
    specialDefense.innerHTML = '';
    speed.innerHTML = '';
    imgContainer.innerHTML = '';

}

// button clicks
searchBtn.addEventListener('click', fetchData);
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter'){
        fetchData();
    }
});
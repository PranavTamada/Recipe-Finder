const API_KEY = '76eb0d4236884058b084675d4fe93d49';  
const API_URL = 'https://api.spoonacular.com/recipes/findByIngredients?apiKey=' + API_KEY;

function getRecipes() {
    const ingredients = document.getElementById('ingredients').value.trim();

    if (!ingredients) {
        alert('Please enter some ingredients.');
        return;
    }

    const url = `${API_URL}&ingredients=${ingredients.replace(/\s+/g, ',')}&number=10`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayRecipes(data))
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Something went wrong. Please try again later.');
        });
}

function displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipes');
    recipesContainer.innerHTML = ''; 

    if (recipes.length === 0) {
        recipesContainer.innerHTML = '<p>No recipes found. Try different ingredients!</p>';
        return;
    }

    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        
        const recipeImage = recipe.image ? `<img src="${recipe.image}" alt="${recipe.title}">` : '';
        const recipeLink = `<a href="https://spoonacular.com/recipes/${recipe.title.replace(/\s+/g, '-')}-${recipe.id}" target="_blank">
                                <button class="search-button">See Full Recipe</button>
                            </a>`;

        recipeCard.innerHTML = `
            ${recipeImage}
            <h3>${recipe.title}</h3>
            <p>Ingredients used: ${recipe.usedIngredients.map(ingredient => ingredient.name).join(', ')}</p>
            ${recipeLink}
        `;

        recipesContainer.appendChild(recipeCard);
    });
}

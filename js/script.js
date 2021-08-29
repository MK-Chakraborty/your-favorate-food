const fetchMealCatagories = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(response => response.json())
        .then(data => displayMealCatagories(data.categories));

    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail')
        .then(response => response.json())
        .then(data => displayCocktailCatagories(data.drinks));

    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink')
        .then(response => response.json())
        .then(data => displayDrinksCatagories(data.drinks));
};

fetchMealCatagories();

const displayMealCatagories = catagories => {
    const mealCatagoriesContainer = document.getElementById('mealCatagories');
    catagories.forEach(catagory => {
        mealCatagoriesContainer.innerHTML += `
        <div class="card bg-danger text-white my-5" style="width: 24rem;">
            <img src="${catagory.strCategoryThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h4 class="card-title fs-4 fw-bold lh-lg text-center">${catagory.strCategory}</h4>
                <p class="card-text fs-5">${catagory.strCategoryDescription.slice(0, 250)} ... </p>
            </div>
        </div>
    `;
    });
};
const displayCocktailCatagories = catagories => {
    const cocktailCatagoriesContainer = document.getElementById('cocktailCatagories');
    catagories.forEach(catagory => {
        cocktailCatagoriesContainer.innerHTML += `
        <div class="card bg-danger text-white my-5" style = "width: 24rem;">
            <img src="${catagory.strDrinkThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h4 class="card-title fs-4 fw-bold lh-lg text-center">${catagory.strDrink}</h4>
            </div>
        </div>
`;
    });
};
const displayDrinksCatagories = catagories => {
    const drinkCatagoriesContainer = document.getElementById('drinkCatagories');
    catagories.forEach(catagory => {
        drinkCatagoriesContainer.innerHTML += `
        <div class="card bg-danger text-white my-5" style = "width: 24rem;">
            <img src="${catagory.strDrinkThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h4 class="card-title fs-4 fw-bold lh-lg text-center">${catagory.strDrink}</h4>
            </div>
        </div>
`;
    });
};


document.getElementById('search-box-meal-btn').addEventListener('click', () => {
    let searchedItem = document.getElementById('search-box-meal').value;
    if (searchedItem != '') {
        let urlMeal = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedItem}`;
        fetch(urlMeal).then(r => r.json()).then(data => displayMeal(data.meals));
    }
});

document.getElementById('search-box-drink-btn').addEventListener('click', () => {
    let searchedItem = document.getElementById('search-box-drink').value;
    if (searchedItem != '') {
        let urlCocktail = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchedItem}`;
        fetch(urlCocktail).then(r => r.json()).then(data => displayCocktail(data.drinks));
    }
});

const displayMeal = meals => {
    document.getElementById('search-box-meal').value = '';
    const mealContainer = document.getElementById('mealContainer');
    mealContainer.textContent = '';
    meals.forEach(meal => {
        mealContainer.innerHTML += `
        <div class="card bg-danger text-white my-5" style="width: 24rem;">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h4 class="card-title fs-4 fw-bold lh-lg text-center">${meal.strMeal}</h4>
                <p class="card-text fs-5">${meal.strInstructions.slice(0, 250)} ... </p>
            </div>
            <div class="card-footer">
                <button onclick="fetchMealDetails('${meal.idMeal}')" class="btn-lg btn-secondary">More Details</button>
            </div>
        </div>
    `;
    });
};

const displayCocktail = drinks => {
    document.getElementById('search-box-drink').value = '';
    const drinkContainer = document.getElementById('drinkContainer');
    drinkContainer.textContent = '';
    drinks.forEach(drink => {
        drinkContainer.innerHTML += `
        <div class="card bg-danger text-white my-5" style="width: 24rem;">
            <img src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h4 class="card-title fs-4 fw-bold lh-lg text-center">${drink.strDrink}</h4>
                <p class="card-text fs-5">${drink.strInstructions.slice(0, 250)} ... </p>
            </div>
            <div class="card-footer">
                <button onclick="fetchDrinkDetails('${drink.idDrink}')" class="btn-lg btn-secondary">More Details</button>
            </div>
        </div>
    `;
    });
};

const fetchMealDetails = mealID => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
    fetch(url)
        .then(response => response.json())
        .then(data => displayMealDetails(data.meals[0]));
};

const displayMealDetails = meal => {
    const mealDetails = document.getElementById('mealDetails');
    mealDetails.innerHTML = `
    <div class="card bg-danger text-white my-5">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h4 class="card-title fs-4 fw-bold lh-lg text-center">${meal.strMeal}</h4>
            <p class="card-text">${meal.strTags}</p>
            <p class="card-text fs-5">Catagory => ${meal.strCategory}</p>
            <p class="card-text fs-5">From => ${meal.strArea}</p>
            <p class="card-text fs-5">${meal.strInstructions}</p>
            <p class="card-text fs-5"><a href="${meal.strYoutube}" class="btn btn-warning">Watch Video</a></p>
        </div>
    </div>
    `;
}

const fetchDrinkDetails = drinkID => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkID}`
    fetch(url)
        .then(response => response.json())
        .then(data => displayDrinkDetails(data.drinks[0]));
};

const displayDrinkDetails = drink => {
    const drinkDetails = document.getElementById('drinkDetails');
    drinkDetails.innerHTML = `
    <div class="card bg-danger text-white my-5">
        <img src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h4 class="card-title fs-4 fw-bold lh-lg text-center">${drink.strDrink}</h4>
            <p class="card-text">${drink.strTags}</p>
            <p class="card-text fs-5">Catagory => ${drink.strCategory}</p>
            <p class="card-text fs-5">Alcoholic => ${drink.strAlcoholic}</p>
            <p class="card-text fs-5">Glass => ${drink.strGlass}</p>
            <p class="card-text fs-5">${drink.strInstructions}</p>
        </div>
    </div>
    `;
}
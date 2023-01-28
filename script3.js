const meals = document.getElementById('meals');

getRandomMeal();
fetchFavMeals();

async function getRandomMeal(){
    const resp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const respData = await resp.json();
    const randomMeal = respData.meals[0];

    addMeal(randomMeal, true);


}

async function getMealById(id) {
        const resp = await fetch(
            'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772' + id
        );

            const respData = await resp.json();
            const meal = respData.meals[0];

            return meal;

}

async function getMealBySearch(term){
    const meals = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s= ' + term);

}

function addMeal(mealData, random = false){
    

    const meal =  document.createElement("div");
    meal.classList.add("meal");

    meal.innerHTML = `
        <div class="meal-header">
            ${
                random ? `
            <span class="random">Random Recipe</span>`
                : ""
            }
            <img 
                src="${mealData.strMealThumb}" 
                alt="${mealData.strMeal}"
            />
        </div>
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn">
                <i class="fas fa-heart"></i>
             </button>
         </div>
    `;

    const btn = meal.querySelector('.meal-body .fav-btn'); // this way cleaner as you can select btn rather than preifery on web page 
    
    btn.addEventListener('click', (e) => {
        if(btn.classList.contains('active')){
            removeMealLS(mealData.idMeal);
            btn.classList.remove('active');
        } else {
            addMealLS(mealData.idMeal);
            btn.classList.add('active');

        }
        
    });

    meals.appendChild(meal);

}   

function addMealLS(mealId){
    const mealIds = getMealsLS();  
     localStorage.setItem('mealIds',JSON.stringify([...mealIds, mealId]));

}

function removeMealLS(mealId){
    const mealIds = getMealsLS();

    localStorage.setItem('mealIds',JSON.stringify(mealIds.filter(id => id !== mealId)));

}

function getMealsLS(){
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));
   return mealIds === null ? [] : mealIds;


}
async function fetchFavMeals(){
    const mealIds = getMealsLS();

    const meals = []

    for(let i=0; i<mealIds.length; i++){
        const mealId = mealIds[i];
        meal = await getMealById(mealId); 

        addMealToFav(meal)
    }



}

/// 2 hours 22 mins to carry on 




// fetch items taken from https://www.themealdb.com/api.php
//async allows other tasks to run while current function is running 
//await The await operator is used to wait for a Promise and get its fulfillment value. 
        //It can only be used inside an async function or at the top level of a module.
//json used to incoporate standard text into Javascript 
//must have 'https://' in URL, otherwise it will not fetch data 
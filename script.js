

const menuBtn = document.querySelector(".menu-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const lists = document.querySelector(".lists");

const showMenu = ()=> {
  lists.style.right = "-5px"
}
const hideMenu = ()=> {
  lists.style.right = "-200px"
}

const recipeBox = document.getElementById('recipeBox');
const input_box = document.getElementById('input-box');
const searchBtn = document.getElementById('searchBtn');
const ingredientsList = document.getElementById('ingredients-list');
const closeBtn = document.getElementById('close-btn');



const fetchRecipes = async (value)=> {
  recipeBox.innerHTML = " ";
  recipeBox.innerHTML = "<span class=loader></span>";
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`);
    const data = await response.json();
    recipeBox.style.display = 'none';
    recipeBox.innerHTML = " ";
if(data.meals) {
  data.meals.forEach((meal)=> {
    let mealInfo = document.createElement('div');
    mealInfo.innerHTML = `
    <div class="item">
  
<div class="img-box">
  <img src=${meal.strMealThumb}>
</div>

<div class="item-details-box">
  <div class="details">
    <div class="item-info">
      <h4>${meal.strMeal}</h4>
      <p>${meal.strArea} Food</p>
      <div class="guidence">
        <button class="ingredients-btn">Ingredients</button>
        <button class="instructions-btn">Instructions</button>
      </div>
    </div>
    <div class="save-btn">
      <button class="saveBtn"><img  class="save-img" src="images/heart.png" alt="save"></button>
    </div>
    
  </div>
  <a href=${meal.strYoutube} target="_blank"><button class="cookit-btn button">Cook it!</button></a>
</div>
</div>
    `;

    const ingredientsBtn = mealInfo.querySelector(".ingredients-btn");

    ingredientsBtn.addEventListener('click',()=> {
      recipePopUp(meal);
    })

    const instructionsBtn = mealInfo.querySelector(".instructions-btn");

  instructionsBtn.addEventListener('click',()=> {
      instructionsPopUp(meal);
    })

 const saveBtn = mealInfo.querySelector('.saveBtn');
    saveBtn.addEventListener('click',()=> {
      save(mealInfo);
    })   

    recipeBox.style.display = 'grid'
    recipeBox.appendChild(mealInfo);

})

}
else {
  recipeBox.style.display = 'grid'
  recipeBox.innerHTML = "<h1 style=color:#FF704D>Recipe not found <img style=width:52px src=images/cutlery.png></h1>";
}


;}


searchBtn.addEventListener('click',(e) => {
    e.preventDefault();
    const inputValue = input_box.value.trim();
    if(input_box.value === "") {
      recipeBox.innerHTML = " "
      recipeBox.innerHTML = " <h1 style=color:#FF704D>Search something <img style=width:52px src=images/dish.png></h1>"
    }
    else {
      fetchRecipes(inputValue);
    }
    
});

input_box.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
      const inputValue = input_box.value.trim();
      if(input_box.value === "") {
        recipeBox.innerHTML = " "
        recipeBox.innerHTML = " <h1 style=color:#FF704D>Search something <img style=width:40px src=images/emotion.png ></h1>"
      }
      else {
        fetchRecipes(inputValue);
      }
  }
});


const hidePopUp = ()=> {
  ingredientsList.parentElement.style.display = "none";
}


const fetchIngredients =(meal)=> {
  let allIngredients = "";
  for(let i=1;i<=20;i++) {
    const ingredient = meal[`strIngredient${i}`];
    if(ingredient) {
      const measure = meal[`strMeasure${i}`];
      allIngredients += `<li>${measure} ${ingredient}</li>`;
    }
    else {
      break;
    }
  }
  return allIngredients;
}

const recipePopUp = (meal)=> {
  ingredientsList.innerHTML = `
      <h1>${meal.strMeal}</h1>
      <h3>Ingredients : </h3>
      <ul>${fetchIngredients(meal)}</ul>
      <a href=${meal.strSource} target="_blank"><button class="knowMore-btn">Want to know more</button></a>
  `
  ingredientsList.parentElement.style.display = "block";
 };


 const instructionsPopUp = (meal)=> {
  ingredientsList.innerHTML = `
      <h1>${meal.strMeal}</h1>
      <h3>Instructions : </h3>
      <p>${meal.strInstructions}</P>
  `
  ingredientsList.parentElement.style.display = "block";
 };




const save = (mealInfo) => {
    const saveImg = mealInfo.querySelector('.save-img');
    if (saveImg.src.includes("heart.png")) {
        saveImg.src = "images/heart (1).png";
    } else {
        saveImg.src = "images/heart.png";
    }
};



/*const saveBtn = document.getElementById('saveBtn');

saveBtn.addEventListener('click',()=> {
    let saveImg = document.getElementById('save-img'); // Ensure the image has an ID or proper selector
    if (saveImg.src.includes("heart.png")) {
        saveImg.src = "images/heart (1).png";
    } else {
        saveImg.src = "images/heart.png";
    }
});*/




const selectFood = async (category)=> {
  recipeBox.innerHTML = " ";
  recipeBox.innerHTML = "<span class=loader></span>";
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    const data = await response.json();
    recipeBox.style.display = 'none';
    recipeBox.innerHTML = " ";
if(data.meals) {
  data.meals.forEach((meal)=> {
    if(meal.strCategory == category) {
    let mealInfo = document.createElement('div');
    mealInfo.innerHTML = `
    <div class="item">
  
<div class="img-box">
  <img src=${meal.strMealThumb}>
</div>

<div class="item-details-box">
  <div class="details">
    <div class="item-info">
      <h4>${meal.strMeal}</h4>
      <p>${meal.strArea} Food</p>
      <div class="guidence">
        <button class="ingredients-btn">Ingredients</button>
        <button class="instructions-btn">Instructions</button>
      </div>
    </div>
    <div class="save-btn">
      <button class="saveBtn"><img  class="save-img" src="images/heart.png" alt="save"></button>
    </div>
    
  </div>
  <a href=${meal.strYoutube} target="_blank"><button class="cookit-btn button">Cook it!</button></a>
</div>
</div>
    `;

    const ingredientsBtn = mealInfo.querySelector(".ingredients-btn");

    ingredientsBtn.addEventListener('click',()=> {
      recipePopUp(meal);
    })

    const instructionsBtn = mealInfo.querySelector(".instructions-btn");

  instructionsBtn.addEventListener('click',()=> {
      instructionsPopUp(meal);
    })

    const saveBtn = mealInfo.querySelector('.saveBtn');
    saveBtn.addEventListener('click',()=> {
      save(mealInfo);
    })

    recipeBox.style.display = 'grid'
    recipeBox.appendChild(mealInfo);
  }

})
}
else {
  recipeBox.style.display = 'grid'
  recipeBox.innerHTML = "<h1 style=color:#FF704D>Recipe not found</h1>";
}

;}


//random meal function
const randomBtn = document.getElementById('randomBtn');
const randomMeal = async ()=> {
  recipeBox.innerHTML = " ";
  recipeBox.innerHTML = "<span class=loader></span>";
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const data = await response.json();
    recipeBox.style.display = 'none';
    recipeBox.innerHTML = " ";

    const randomIndex = Math.floor(Math.random() * data.meals.length);
    const meal = data.meals[randomIndex];

        let mealInfo = document.createElement('div');
        mealInfo.innerHTML = `
        <div class="item">
      
    <div class="img-box">
      <img src=${meal.strMealThumb}>
    </div>

    <div class="item-details-box">
      <div class="details">
        <div class="item-info">
          <h4>${meal.strMeal}</h4>
          <p>${meal.strArea} Food</p>
          <div class="guidence">
            <button class="ingredients-btn">Ingredients</button>
            <button class="instructions-btn">Instructions</button>
          </div>
        </div>
        <div class="save-btn">
          <button class="saveBtn"><img  class="save-img" src="images/heart.png" alt="save"></button>
        </div>
        
      </div>
      <a href=${meal.strYoutube} target="_blank"><button class="cookit-btn button">Cook it!</button></a>
    </div>
  </div>
        `;

        const ingredientsBtn = mealInfo.querySelector(".ingredients-btn");

        ingredientsBtn.addEventListener('click',()=> {
          recipePopUp(meal);
        })

        const instructionsBtn = mealInfo.querySelector(".instructions-btn");

      instructionsBtn.addEventListener('click',()=> {
          instructionsPopUp(meal);
        })

        const saveBtn = mealInfo.querySelector('.saveBtn');
        saveBtn.addEventListener('click',()=> {
          save(mealInfo);
        })


        recipeBox.style.display = 'grid'
        recipeBox.appendChild(mealInfo);
    

;}


const ingredent1 = ()=> {
  ingredientsList.innerHTML = `
      <h1>Nutty Chicken</h1>
      <h3>Ingredients : </h3>
      <ul>
      <li>1 large Red Chilli</li>
      <li>1 0.5 Ginger</li>
      <li>1 large Garlic</li>
      <li>Bunch Coriander</li>
      <li>1 tbsp Sunflower Oil</li>
      <li>4 Chicken Breasts</li>
      <li>5 tblsp Peanut Butter</li>
      <li>150ml Chicken Stock</li>
      <li>200g Greek Yogurt</li>
      </ul>
      <a href="https://www.bbcgoodfood.com/recipes/nutty-chicken-curry" target="_blank"><button class="knowMore-btn">Want to know more</button></a>
  `
  ingredientsList.parentElement.style.display = "block";
 };


 const instructions1 = ()=> {
  ingredientsList.innerHTML = `
      <h1>Nutty chicken</h1>
      <h3>Instructions : </h3>
      <p>Finely slice a quarter of the chilli, then put the rest in a food processor with the ginger, garlic, coriander stalks and one-third of the leaves. Whizz to a rough paste with a splash of water if needed. Heat the oil in a frying pan, then quickly brown the chicken chunks for 1 min. Stir in the paste for another min, then add the peanut butter, stock and yogurt. When the sauce is gently bubbling, cook for 10 mins until the chicken is just cooked through and sauce thickened. Stir in most of the remaining coriander, then scatter the rest on top with the chilli, if using. Eat with rice or mashed sweet potato.</P>
  `
  ingredientsList.parentElement.style.display = "block";
 };


 const ingredent2 = ()=> {
  ingredientsList.innerHTML = `
      <h1>Pasta</h1>
      <h3>Ingredients : </h3>
      <ul>
      <li>200 g mozzarella balls</li>
      <li>250 g baby plum tomatoes</li>
      <li>1 bunch fresh basil</li>
      <li>350 g farfalle</li>
      <li>3 tablespoons extra virgin olive oil</li>
      <li>40 g Green Olives</li>
      <li>200 g tuna</li>
      <li>to taste salt</li>
      <li>to taste pepper</li>
      </ul>
      <a href="https://thelemonsqueezy.com/recipe/mediterranean-pasta-salad/" target="_blank"><button class="knowMore-btn">Want to know more</button></a>
  `
  ingredientsList.parentElement.style.display = "block";
 };


 const instructions2 = ()=> {
  ingredientsList.innerHTML = `
      <h1>Pasta</h1>
      <h3>Instructions : </h3>
      <p>Bring a large saucepan of salted water to the boil Add the pasta, stir once and cook for about 10 minutes or as directed on the packet. Meanwhile, wash the tomatoes and cut into quarters. Slice the olives. Wash the basil. Put the tomatoes into a salad bowl and tear the basil leaves over them. Add a tablespoon of olive oil and mix. When the pasta is ready, drain into a colander and run cold water over it to cool it quickly. Toss the pasta into the salad bowl with the tomatoes and basil. Add the sliced olives, drained mozzarella balls, and chunks of tuna. Mix well and let the salad rest for at least half an hour to allow the flavours to mingle. Sprinkle the pasta with a generous grind of black pepper and drizzle with the remaining olive oil just before serving.</P>
  `
  ingredientsList.parentElement.style.display = "block";
 };

 const ingredent3 = ()=> {
  ingredientsList.innerHTML = `
      <h1>Fish</h1>
      <h3>Ingredients : </h3>
      <ul>
      <li>2 Pounds Red Snapper</li>
      <li>1/2 cup Vegetable Oil</li>
      <li>1 clove peeled crushed Garlic</li>
      <li>1/2 tsp Ginger</li>
      <li>2 sprigs Thyme</li>
      <li>1 Bay Leaf</li>
      <li>0.5 Red Pepper</li>
      <li>0.5 Yellow Pepper</li>
      <li>1 sliced Onion</li>
      <li>1 chopped Carrots</li>
      <li>1 tbs Sugar</li>
      <li>1/2 tsp Allspice</li>
      <li>1 tsp Worcestershire Sauce</li>
      <li>1 Scotch Bonnet</li>
      <li>1 Lime</li>
      <li>3/4 cup Malt Vinegar</li>
      <li>pinch Pepper</li>
      </ul>
      <a href="https://www.africanbites.com/jamaican-escovitched-fish/" target="_blank"><button class="knowMore-btn">Want to know more</button></a>
  `
  ingredientsList.parentElement.style.display = "block";
 };


 const instructions3 = ()=> {
  ingredientsList.innerHTML = `
      <h1>Fish</h1>
      <h3>Instructions : </h3>
      <p>Rinse fish; rub with lemon or lime, seasoned with salt and pepper or use your favorite seasoning. I used creole seasoning. Set aside or place in the oven to keep it warm until sauce is ready. In large skillet heat oil over medium heat, until hot, add the fish, cook each side- for about 5-7 minutes until cooked through and crispy on both sides. Remove fish and set aside. Drain oil and leave about 2-3 tablespoons of oil Add, bay leave, garlic and ginger, stir-fry for about a minute making sure the garlic does not burn Then add onion, bell peppers, thyme, scotch bonnet, sugar, all spice-continue stirring for about 2-3 minutes. Add vinegar, mix an adjust salt and pepper according to preference. Let it simmer for about 2 more minutes. Discard bay leave, thyme spring and serve over fish with a side of this bammy. You may make the sauce about 2 days in advance.</P>
  `
  ingredientsList.parentElement.style.display = "block";
 };

 const ingredent4 = ()=> {
  ingredientsList.innerHTML = `
      <h1>Pancake</h1>
      <h3>Ingredients : </h3>
      <ul>
      <li>100g Flour</li>
      <li>2 large Eggs</li>
      <li>300ml Milk</li>
      <li>1 tbls Sunflower Oil</li>
      <li>to serve Sugar</li>
      <li>to serve Raspberries</li>
      <li>to serve Blueberries</li>
      </ul>
      <a href="https://www.bbcgoodfood.com/recipes/easy-pancakes" target="_blank"><button class="knowMore-btn">Want to know more</button></a>
  `
  ingredientsList.parentElement.style.display = "block";
 };


 const instructions4 = ()=> {
  ingredientsList.innerHTML = `
      <h1>Pasta</h1>
      <h3>Instructions : </h3>
      <p>Put the flour, eggs, milk, 1 tbsp oil and a pinch of salt into a bowl or large jug, then whisk to a smooth batter. Set aside for 30 mins to rest if you have time, or start cooking straight away. Set a medium frying pan or crêpe pan over a medium heat and carefully wipe it with some oiled kitchen paper. When hot, cook your pancakes for 1 min on each side until golden, keeping them warm in a low oven as you go. Serve with lemon wedges and sugar, or your favourite filling. Once cold, you can layer the pancakes between baking parchment, then wrap in cling film and freeze for up to 2 months.</P>
  `
  ingredientsList.parentElement.style.display = "block";
 };




const saveBtns = document.querySelectorAll(".save2");


/*saveBtns.forEach((saveBtn) => {
  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const saveImg = saveBtn.querySelector(".save-img"); 
    toggleSave(saveImg);
  });
});


const toggleSave = (saveImg) => {
  if (saveImg.src.includes("heart.png")) {
    saveImg.src = "images/heart (1).png";
  } else {
    saveImg.src = "images/heart.png";
  }
};*/




 const savebtn = document.querySelectorAll(".save2");

 savebtn.forEach((savebtn) => {
  savebtn.addEventListener('click',(e)=> {
    e.preventDefault();
    const saveImg = savebtn.querySelector(".save-img");
    toggleSave(saveImg);
  })
 })
 
 const toggleSave = (saveImg) => {
   if (saveImg.src.includes("heart.png")) {
       saveImg.src = "images/heart (1).png";
   } else {
       saveImg.src = "images/heart.png";
   }
 };


 /*save Recipes*/

 const container = document.getElementById("container");


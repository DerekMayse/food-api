

fetch("http://localhost:8088/food")
  .then((response) => response.json())
  .then((myParsedFoods) => {
    myParsedFoods.forEach((food) => {
      //   console.log(food); // Should have a `barcode` property

      // Now fetch the food from the Food API
      fetch(
        `https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`
      )
        .then((response) => response.json())
        .then((productInfo) => {
          if (productInfo.product.ingredients_text) {
            food.ingredients = productInfo.product.ingredients_text;
          } else {
            food.ingredients = "no ingredients listed";
          }
          if (productInfo.product.countries) {
            food.countries = productInfo.product.countries;
          }
          if (productInfo.product.nutriscore_data.energy) {
            food.calories = productInfo.product.nutriscore_data.energy;
          }
          if (productInfo.product.nutriments.fat) {
            food.fat = productInfo.product.nutriments.fat;
          }
          if (productInfo.product.nutriments.sugars) {
            food.sugars = productInfo.product.nutriments.sugars;
          }

          document.querySelector(".foodsList").innerHTML += `
                    <div id="foodContainer">
                     <h1>${food.name}</h1>
                     <br>
                      <h2>${food.ethnicity}</h2>
                       <h3>${food.category}</h3>
                       <p>${food.ingredients}</p>
                       <p>Country of Origin:${food.countries}</p>
                       <p>Calories:${food.calories}</p>
                       <p>Fat:${food.fat}</p>
                       <p>Sugar:${food.sugars}</p>
                       </div>
                     `;

          console.log(productInfo.product);
        });
    });
  });

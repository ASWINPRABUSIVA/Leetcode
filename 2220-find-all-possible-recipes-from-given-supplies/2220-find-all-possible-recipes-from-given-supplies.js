/**
 * @param {string[]} recipes
 * @param {string[][]} ingredients
 * @param {string[]} supplies
 * @return {string[]}
 */
var findAllRecipes = function (recipes, ingredients, supplies) {
    let graph = new Map();
    let inDegree = new Map();
    let available = new Set(supplies);
    let queue = [];

    // Step 1: Build Graph & In-Degree Map
    for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i];
        let ingredientList = ingredients[i];

        inDegree.set(recipe, ingredientList.length); // Set initial in-degree

        for (let ingredient of ingredientList) {
            if (!graph.has(ingredient)) {
                graph.set(ingredient, []);
            }
            graph.get(ingredient).push(recipe);
        }
    }

    // Step 2: Add Available Supplies to Queue
    for (let item of supplies) {
        queue.push(item);
    }

    let result = [];

    // Step 3: Process Recipes in BFS Order
    while (queue.length > 0) {
        let ingredient = queue.shift(); // Get available ingredient

        if (inDegree.has(ingredient) && inDegree.get(ingredient) === 0) {
            result.push(ingredient); // Valid recipe found
        }

        if (graph.has(ingredient)) {
            for (let recipe of graph.get(ingredient)) {
                inDegree.set(recipe, inDegree.get(recipe) - 1);
                if (inDegree.get(recipe) === 0) {
                    queue.push(recipe); // Recipe is now creatable
                }
            }
        }
    }

    return result.filter((r) => recipes.includes(r)); // Only return valid recipes  
};
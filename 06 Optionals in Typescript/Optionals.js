function printIngredient(quantity, ingredient, extra) {
    console.log("".concat(quantity, " ").concat(ingredient, " ").concat(extra ? "".concat(extra) : ''));
}
printIngredient('1C', 'Flour');
printIngredient('1C', 'Sugar', 'something more');

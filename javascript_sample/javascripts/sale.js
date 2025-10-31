const priceElement = document.getElementById("product");
const numberElement = document.getElementById("number");
let purchases = [];

const products = {
  1: { name: "Original Blend 200g", price: 500, quantity: 0 },
  2: { name: "Original Blend 500g", price: 900, quantity: 0 },
  3: { name: "Special Blend 200g", price: 700, quantity: 0 },
  4: { name: "Special Blend 500g", price: 1200, quantity: 0 }
};

function add() {
  const selectedId = parseInt(priceElement.value);
  const number = parseInt(numberElement.value);

  if (!selectedId || isNaN(number) || number <= 0) {
    window.alert("Please select a valid product and quantity.");
    return;
  }

  const product = products[selectedId];
  product.quantity += number;

  const existing = purchases.find(p => p.id === selectedId);

  if (existing) {
    existing.number += number;
  } else {
    purchases.push({
      id: selectedId,
      name: product.name,
      price: product.price,
      number: number
    });
  }

  const totalForItem = product.price * product.quantity;

  window.alert(
    `Item: ${product.name}\n` +
    `Price per item: ${product.price} yen\n` +
    `Quantity selected: ${product.quantity}\n` +
    `Total for this item: ${totalForItem} yen`
  );

  window.alert(`${display()}\nSubtotal: ${subtotal()} yen`);
}

function display() {
  if (purchases.length === 0) return "No items added yet.";
  return purchases
    .map(p => `${p.name} — ${p.price} yen × ${p.number} = ${p.price * p.number} yen`)
    .join("\n");
}

function subtotal() {
  return purchases.reduce((prev, p) => prev + p.price * p.number, 0);
}

function calc() {
  if (purchases.length === 0) {
    window.alert("Your cart is empty!");
    return;
  }

  const sum = subtotal();
  const postage = calcPostageFromPurchase(sum);
  const total = sum + postage;

  const summary =
    `Order Summary:\n` +
    `${display()}\n\n` +
    `Subtotal: ${sum} yen\n` +
    `Shipping: ${postage} yen\n` +
    `Total: ${total} yen`;

  window.alert(summary);

  purchases = [];
  Object.values(products).forEach(p => (p.quantity = 0));
  priceElement.value = "";
  numberElement.value = "";
}

function calcPostageFromPurchase(sum) {
  if (sum === 0 || sum >= 3000) return 0;
  else if (sum < 2000) return 500;
  else return 250;
}

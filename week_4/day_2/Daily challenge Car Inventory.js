// Daily challenge: Car Inventory
console.log("=== Daily challenge: Car Inventory ===");

const inventory = [
  { id: 1, car_make: "Lincoln", car_model: "Navigator", car_year: 2009 },
  { id: 2, car_make: "Mazda", car_model: "Miata MX-5", car_year: 2001 },
  { id: 3, car_make: "Honda", car_model: "Accord", car_year: 1983 },
  { id: 4, car_make: "Land Rover", car_model: "Defender Ice Edition", car_year: 2010 },
  { id: 5, car_make: "Honda", car_model: "Accord", car_year: 1995 },
];

// Part I: Find Honda car
function getCarHonda(carInventory) {
  const hondaCar = carInventory.find(car => car.car_make === "Honda");
  
  if (hondaCar) {
    return `This is a ${hondaCar.car_make} ${hondaCar.car_model} from ${hondaCar.car_year}`;
  } else {
    return "No Honda car found in inventory";
  }
}

console.log("Part I: Find Honda Car");
console.log(getCarHonda(inventory));

// Part II: Sort cars by year (ascending)
function sortCarInventoryByYear(carInventory) {
  return carInventory.sort((a, b) => a.car_year - b.car_year);
}

console.log("\nPart II: Sort Cars by Year (Ascending)");
const sortedInventory = sortCarInventoryByYear(inventory);
console.log(sortedInventory);

// Bonus: Display formatted output
console.log("\n--- Formatted Sorted Inventory ---");
sortedInventory.forEach(car => {
  console.log(`${car.car_year}: ${car.car_make} ${car.car_model} (ID: ${car.id})`);
});

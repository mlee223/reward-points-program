var faker = require("faker");
var _ = require("lodash");
var fs = require("fs");

console.log("Generating mock data...");

/**
 *  Reference for DB scheme
 */
/**
{
  customers: [
    {
      id: "customer_",
      name: "",
      paymentInfo: "cc_",
      email: "",
      phone: "",
      address: { street: "", city: "", state: "", country: "", zip: "" },
    },
  ],
  transactions: [
    {
      id: "transaction_",
      createdAt: "",
      purchaseAmount: 100,
      customerId: "customer_",
      purchase: [
        {
          product: "",
          productDescription: "",
          price: 100,
          productDepartment: "",
        },
      ],
    },
  ],
}
*/

var data = { customers: [], transactions: [], rewards: [] };

// Generate 5 customers
console.log("Generating mock customers...");
_.times(5, () => {
  data.customers.push({
    id: `customer_${faker.datatype.uuid()}`,
    name: faker.name.findName(),
    paymentInfo: `cc_${faker.finance.bitcoinAddress()}`,
    email: faker.internet.exampleEmail(),
    phone: faker.phone.phoneNumber(),
    address: {
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      country: faker.address.country(),
      zip: faker.address.zipCode(),
    },
  });
});

// A date range between now and 3 months ago
var startDate = new Date(Date.now());
startDate.setMonth(startDate.getMonth() - 3);
var stopDate = new Date(Date.now());

// Generate 50 transactions
console.log("Generating mock transactions...");
_.times(50, () => {
  let items = [];
  let total = 0;
  // Generate a random number of items per transaction between 1 and 5
  _.times(faker.datatype.number({ max: 5, min: 1 }), () => {
    // Generate an item
    let item = {
      product: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
      productDepartment: faker.commerce.department(),
      productDescription: faker.commerce.productDescription(),
    };
    // Update the total and add item to transaction
    total += item.price;
    items.push(item);
  });

  // Generate a random time within the 3 month range
  var fromMilli = Date.parse(startDate);
  var dateOffset = faker.datatype.number(Date.parse(stopDate) - fromMilli);
  var newDate = new Date(fromMilli + dateOffset);

  data.transactions.push({
    id: `transaction_${faker.datatype.uuid()}`,
    purchaseAmount: total,
    customerId: faker.random.arrayElement(data.customers).id, // Assign the transaction to a random customer
    createdAt: newDate,
    purchase: items,
  });
});

try {
  fs.writeFileSync("./db.json", JSON.stringify(data));
  console.log("Mock data generated.");
} catch (err) {
  console.error("Error while generating mock data: ", err);
}

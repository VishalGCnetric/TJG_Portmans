export const color = [
  "white",
  "Black",
  "Red",
  "marun",
  "Being",
  "Pink",
  "Green",
  "Yellow",
];

export const filters = [
  {
    id: "color",
    name: "Keyboard",
    options: [
      { value: "Piano", label: "Piano" },
      { value: "Keys", label: "Keys" },
      { value: "Organ", label: "Organ" },
      // { value: "brown", label: "Brown" },
      // { value: "green", label: "Green" },
      // { value: "purple", label: "Purple" },
      // {value:"yellow",label:"Yellow"}
    ],
  },

  // {
  //   id: "size",
  //   name: "Size",
  //   options: [
  //     { value: "S", label: "S" },
  //     { value: "M", label: "M" },
  //     { value: "L", label: "L" },
  //   ],
  // },
];

export const singleFilter = [
  {
    id: "colour",
    name: "Colour",
    options: [
      { value: "White", label: "White" },
      { value: "Black", label: "Black" },
      { value: "Blue", label: "Blue" },
      // { value: "1999-2999", label: "₹1999 To ₹2999" },
      // { value: "3999-4999", label: "₹3999 To ₹4999" },
    ],
  },
  {
    id: "tops",
    name: "Tops",
    options: [
      { value: "Coats", label: "Coats" },
      { value: "Jackets", label: "Jackets" },
      { value: "Shirts", label: "Shirts" },
      { value: "Blazer", label: "Blazer" },
      
    ],
  },
  {
    id: "bottoms",
    name: "Bottoms",
    options: [
      {
        value: "Pants",
        label: "Pants",
      },
      
    ],
  }, {
    id: "price",
    name: "Price",
    options: [
      { value: "159-399", label: "₹159 To ₹399" },
      { value: "399-999", label: "₹399 To ₹999" },
      { value: "999-1999", label: "₹999 To ₹1999" },
      { value: "1999-2999", label: "₹1999 To ₹2999" },
      { value: "3999-4999", label: "₹3999 To ₹4999" },
    ],
  },
 
];

export const sortOptions = [
  { name: "Price: Low to High", query: "price_low", current: false },
  { name: "Price: High to Low", query: "price_high", current: false },
];

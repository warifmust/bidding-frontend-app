const headers = {
  "Content-Type": "application/json",
};

export const login = async (email: string, password: string) => {
  // const data = await fetch("https://setel-backend.herokuapp.com/graphql", {
  //   method: "POST",
  //   headers: headers,
  //   body: JSON.stringify({
  //     query: `
	// 			query Login {
	// 				loginUser(email: "${email}", password: "${password}") {
	// 					token
	// 					tokenExpiration
  //           user {
  //             _id
  //             name
  //             email
  //             phoneNumber
  //           }
	// 				}
	// 			}
	// 		`,
  //     variables: {},
  //   }),
  // });
  // const response = await data.json();
  // return response;
};

interface User {
  name?: string;
  email: string;
  password: string;
  phoneNumber?: string;
}

export const signUp = async (data: User) => {
  // const user = await fetch("https://setel-backend.herokuapp.com/graphql", {
  //   method: "POST",
  //   headers: headers,
  //   body: JSON.stringify({
  //     query: `
	// 			mutation SignUp {
	// 				signUpUser(userInput: {name: "${data.name}", email: "${data.email}", password: "${data.password}", phoneNumber: "${data.phoneNumber}"}) {
	// 					name
	// 					email
	// 					phoneNumber
	// 				}
	// 			}
	// 		`,
  //     variables: {},
  //   }),
  // });
  // const response = await user.json();
  // return response;
};

export const getProducts = async () => {
  // const products = await fetch("https://setel-backend.herokuapp.com/graphql", {
  //   method: "POST",
  //   headers: headers,
  //   body: JSON.stringify({
  //     query: `
  //       query GetProducts {
  //         getProducts {
  //           _id
  //           img
  //           price
  //           name
  //           nutrient
  //         }
  //       }
	// 		`,
  //     variables: {},
  //   }),
  // });
  // const response = await products.json();
  // return response;
};

interface Product {
  id: number;
  img: string;
  price: string;
  name: string;
  nutrient: string;
  belongsTo: string;
  status: string;
}

export const addToCart = async (data: Product) => {
  // const product = await fetch("https://setel-backend.herokuapp.com/graphql", {
  //   method: "POST",
  //   headers: headers,
  //   body: JSON.stringify({
  //     query: `
  //       mutation AddToCart {
  //         addToCart(cartInput: {img: "${data.img}", price: "${data.price}", name: "${data.name}", nutrient: "${data.nutrient}", belongsTo: "${data.belongsTo}", status: "${data.status}"}) {
  //           name
  //           _id
  //           price
  //           nutrient
  //           belongsTo
  //           status
  //         }
  //       }
        
	// 		`,
  //     variables: {},
  //   }),
  // });
  // const response = await product.json();
  // return response;
};

export const getProductsInCart = async (userId: string) => {
  // const product = await fetch("https://setel-backend.herokuapp.com/graphql", {
  //   method: "POST",
  //   headers: headers,
  //   body: JSON.stringify({
  //     query: `
  //       query GetProductsInCart {
  //         getProductsInCart(belongsTo: "${userId}") {
  //           img
  //           _id
  //           name
  //           price
  //           nutrient
  //           status
  //         }
  //       }
	// 		`,
  //     variables: {},
  //   }),
  // });
  // const response = await product.json();
  // return response;
};

export const removeProductInCart = async (id: string) => {
  // const product = await fetch("https://setel-backend.herokuapp.com/graphql", {
  //   method: "POST",
  //   headers: headers,
  //   body: JSON.stringify({
  //     query: `
  //       mutation RemoveProduct {
  //         removeProductInCart(id: "${id}") 
  //       }
	// 		`,
  //     variables: {},
  //   }),
  // });
  // const response = await product.json();
  // return response;
};

interface Order {
  belongsTo: string;
  totalPrice: string;
  orders: Array<{
    img: string;
    price: string;
    name: string;
    nutrient: string;
  }>;
}

export const createOrder = async (data: Order) => {
  const temp = JSON.stringify(data.orders);
  const orders = temp.replace(/"(\w+)"\s*:/g, "$1:");

  // const order = await fetch("https://setel-backend.herokuapp.com/graphql", {
  //   method: "POST",
  //   headers: headers,
  //   body: JSON.stringify({
  //     query: `
  //       mutation CreateOrder {
  //         createOrder(orderInput: {belongsTo: "${data.belongsTo}", totalPrice: "${data.totalPrice}", orders: ${orders}}) {
  //           _id
  //           belongsTo
  //           totalPrice
  //           status
  //           orders {
  //             img
  //             price
  //             name
  //             nutrient
  //           }
  //         }
  //       }
	// 		`,
  //     variables: {},
  //   }),
  // });
  // const response = await order.json();
  // return response;
};

export const getOrder = async (userId: string) => {
  // const order = await fetch("https://setel-backend.herokuapp.com/graphql", {
  //   method: "POST",
  //   headers: headers,
  //   body: JSON.stringify({
  //     query: `
  //       query GetOrder {
  //         getOrder(belongsTo: "${userId}") {
  //           _id
  //           belongsTo
  //           totalPrice
  //           status
  //           orders {
  //             img
  //             price
  //             name
  //             nutrient
  //           }
  //         }
  //       }
	// 		`,
  //     variables: {},
  //   }),
  // });
  // const response = await order.json();
  // return response;
};

export const cancelOrder = async (id: string) => {
  // const order = await fetch("https://setel-backend.herokuapp.com/graphql", {
  //   method: "POST",
  //   headers: headers,
  //   body: JSON.stringify({
  //     query: `
  //       mutation CancelOrder {
  //         cancelOrder(id: "${id}")
  //       }
	// 		`,
  //     variables: {},
  //   }),
  // });
  // const response = await order.json();
  // return response;
};

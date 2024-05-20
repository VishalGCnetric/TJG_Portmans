// import { get } from "../api/APIController";

import toast from "react-hot-toast";
import { getOrdersSuccess } from "../../Redux/Admin/Orders/ActionCreator";
import store from "../../Redux/Store";
import { deleteCall, get, post, putCall } from "../../api/config/APIController";

export const getCartItems = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      get("cart")
        .then((response) => {
          if (response.status === 200) {
            console.log("this is new cart response", response.data);
            dispatch({
              type: "GET_CART_ITEMS",
              cartItems: response?.data,
            });
            resolve(response.data);
          }
        })
        .catch((error) => {
          dispatch({
            type: "GET_CART_ITEMS",
            cartItems: {},
          });
          reject(error);
        })
        .finally();
    });
  };
};

// public addToCart = (data: any) => {
//   return new Promise((resolve: any, reject: any) => {
//     this.instance
//       .post(API.ADD_TO_CART + "/" + Cart.getCartId(), data)
//       .then((response) => {
//         if (response.status == 200) {
//           let message = response.data.msg ?? "";
//           let cartItems: any = LocalStorageService.getCartItems();

//           if (cartItems) {
//             cartItems.push(data.data.id);
//           } else {
//             cartItems = [data.data.id];
//           }

//           LocalStorageService.setCartItems(cartItems);
//           useCartStore.setState({
//             count: cartItems.length,
//             cartItems: cartItems,
//           });
//           resolve(response);
//         } else {
//           let message = response.data.msg ?? "";
//           Toast.showError(message);
//           reject(response);
//         }
//       })
//       .catch((error) => {
//         console.log("Error", error);
//         Toast.showError(
//           JSON.parse(error.response.request.response).msg.detail
//         );
//         reject(error);
//       });
//   });
// };

export const getCutomerOrdersNew = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      get("orders")
        .then((response) => {
          if (response.status === 200) {
            console.log("this getCutomerOrdersNew", response.data);
            dispatch({
              type: "GET_ORDER_HISTORY_NEW",
              order: response?.data,
            });
            resolve(response.data);
          }
        })
        .catch((error) => {
          reject(error);
        })
        .finally();
    });
  };
};

export const AddItemToCartNew = ({partNumber,quantity}) => {
  let data = {
    partNumber: partNumber,
    quantity: `${quantity}`,
  };
  // return (dispatch) => {
    return new Promise((resolve, reject) => {
      post("cart", data)
        .then((response) => {
          if (response.status === 201) {
            // toast.success("Item added to cart");
            store.dispatch({
              type: "GET_ORDER_HISTORY_NEW",
              order: response?.data,
            });
            resolve(response.data);
          }
        })
        .catch((error) => {
          reject(error);
        })
        .finally();
    });
  // };
};

// export const RemoveCartItemNew = (data) => {
//   let url = `cart`;
//   console.log(data,"remove cart item");
//   // let data = {
//   //   productVariantId: id,
//   //   quantity: 1,
//   // };
//   // return (dispatch) => {
//     return new Promise((resolve, reject) => {
//       deleteCall(url,data)
//         .then((response) => {
//           if (response.status === 200) {
//             // console.log("this getCutomerOrdersNew", response.data);
//             // dispatch({
//             //   type: "GET_ORDER_HISTORY_NEW",
//             //   order: response?.data,
//             // });
//             alert("Item has been removed from cart");
//             resolve(response.data);
//           }
//         })
//         .catch((error) => {
//           reject(error);
//         })
//         .finally();
//     });
//   };
// };

export const RemoveCartItemNew = (reqdata) => {
  let url = `cart`;
  const {orderId,orderItemId}=reqdata;
  const data = { orderId, orderItemId };

  return (dispatch) => { // Return a function that accepts dispatch
    return deleteCall(url, data)
      .then((response) => {
        if (response.status === 200) {
          // Dispatch an action to update the cart after item removal
          dispatch(getCartItems());
          toast.success("Item has been removed from cart");
        } else {
          // Handle other status codes if needed
          toast.error("Failed to remove item from cart");
          console.error("Failed to remove item from cart:", response.data);
        }
      })
      .catch((error) => {
        // Log or handle the error
        toast.error("Failed to remove item from cart");
        console.error("Error removing item from cart:", error);
      });
  };
};

export const updateCartQtyNEW = (reqdata,toast) => {
  const { orderId, orderItemId, productId, quantity } = reqdata;
  const payload = {
    orderId: orderId,
    orderItemId: orderItemId,
    productId: productId,
    quantity: quantity,
  };
  return new Promise((resolve, reject) => {
    putCall(`cart`, payload)
      .then((response) => {
        if (response.status==200) {
          resolve(response.data);
        } else {
          reject(new Error('Failed to update cart quantity'));
        }
      })
      .catch((error) => {
        console.error('Error updating cart quantity:', error);
        toast.error("Failed to update cart quantity");
        reject(error);
      });
  });
};

// export const updateCartQtyNEW = async (reqdata) => {
//   const { orderId, orderItemId, productId, quantity } = reqdata;
//   const payload = {
//     orderId,
//     orderItemId,
//     productId,
//     quantity,
//   };

//   try {
//     const response = await putCall(`cart`, payload);
//     if (response.ok) {
//       if (response.status === 200) {
//         // Dispatch an action to update the cart after item removal
//         dispatch(getCartItems());
//         alert("Item has been removed from cart");
//       } else {
//         // Handle other status codes if needed
//         console.error("Failed to remove item from cart:", response.data);
//       }
//     }
//   } catch (error) {
//     console.error('Error updating cart quantity:', error);
//     throw error;
//   }
// };

export const ShipingInfoOrder = async (reqData) => {
  //   let setship={
  //     shipModeId: cartItems?.cartItems?.shipModeId,
  //     orderItemId: cartItems?.cartItems?.orderItemId,
  //     addressId: data?.shippingAddress?.addressId
  // }
  const { orderItemId,addressId } = reqData;
  const data = {
    shipModeId: "715852384",
    orderItemId: orderItemId,
    addressId: addressId,
  };
  console.log(data,"setshipingData");
    return new Promise((resolve, reject) => {
      return putCall("setShipping", data)
        .then((res) => {
          getCartItems()
          resolve(res);
          // getCustomerLoginCart();
        })
        .catch((error) => {
          reject(false);
          console.log(error);
        })
        .finally();
    });
  };

export const placeOrder = async (grandTotal) => {
//   let setship={
//     shipModeId: cartItems?.cartItems?.shipModeId,
//     orderItemId: cartItems?.cartItems?.orderItemId,
//     addressId: data?.shippingAddress?.addressId
// }
// const { shipModeId,orderItemId,addressId } = reqData;
const data = {
  "piAmount": grandTotal,
  "billing_address_id": "3074457365572057425",
  "payMethodId": "MasterCard",
  "account": "5425233430109903",
  "expire_month": "04",
  "expire_year": "2026",
  "cc_cvc": "123",
  "cc_brand": "MasterCard"
}
  return new Promise((resolve, reject) => {
    return post("payment", data)
      .then((res) => {
        toast.success("payment sucessful")
        
           resolve(res);
       
        // getCustomerLoginCart();
      })
      .catch((error) => {
        reject(false);
        console.log(error);
      })
      .finally();
  });
};

export const preCheckout=()=>{
  return new Promise((resolve, reject) => {
    return putCall("preCheckout", )
    .then((res) => {
      resolve(res);
    })
    .catch((error) => {
      reject(false);
      console.log(error);
    })
    .finally();

  })
   
}

export const CheckoutReq=()=>{
  return new Promise((resolve, reject) => {
    return post("checkout")
    .then((res) => {
      resolve(res);
    })
    .catch((error) => {
      reject(false);
      console.log(error);
    })
    .finally();

  })
   
}
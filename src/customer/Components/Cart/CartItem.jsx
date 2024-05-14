import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCartItem,
  updateCartItem,
} from "../../../Redux/Customers/Cart/Action";
import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  RemoveCartItemNew,
  getCartItems,
  handleRemoveItemFromCart,
} from "../../../action/cart";
import { grey } from "@mui/material/colors";
import { API_BASE_URL } from "../../../config/api";

const CartItem = ({
  item,
  showButton,
  handleRemoveItemFromCart,
  handleUpdateCartMinus,
  handleUpdateCartPlus,
}) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [data, setData] = useState({});
  const {orderId}=useSelector((store) => store.cartItems);
  const { orderItemId, productId } = item;
  console.log(item)
  // const { cartItems } = useSelector((store) => store);
useEffect(()=>{
  console.log(item.partNumber)
fetch(`${API_BASE_URL}product?partNumber=${item.partNumber}`).then((res)=>{
  return res.json()
}).then((res)=>{
  console.log(res,"data")
  const data =res.catalogEntryView[0]

  setData(data)
}).catch((err)=>{
  console.log(err)
})
},[])
  // const handleRemoveItemFromCart = () => {

  //   RemoveCartItemNew(item.id).then((res)=>{
  //     dispatch(getCartItems());

  //   })
  // };
//   {
//     "orderId" : 1062626683,
//     "orderItemId" : 15019,
//     "productId": "14263",
//     "quantity": "9"
// }
console.log(orderId,orderItemId,productId)
  const handleUpdateCartItem = (num) => {
    const datas = {
      data: { quantity: item.quantity + num },
      cartItemId: item?._id,
      jwt,
    };
    // console.log("update data ", data);
    dispatch(updateCartItem(datas));
  };
// console.log(data,"data item",data.price[0].value)

  return (<>
   <div className="p-5 shadow-lg border rounded-md">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem] ">
          <img
            className="w-full h-full object-cover object-top"
            src={data.fullImage}
            alt="img"
          />
        </div>
        <div className="ml-5 space-y-1">
          <p className="font-semibold">{data.name}</p>
          {/* <p className="opacity-70">Size: {item?.size},White</p>
          <p className="opacity-70 mt-2">Seller: {item?.product?.brand}</p> */}
          <div className="flex space-x-2 items-center pt-3">
            {/* <p className="opacity-50 line-through">
              ${data.price[0]?.value }
            </p> */}
            <p className="font-semibold text-lg">
              {/* {data && `$ ${data?.price[0]?.value }`} */}
            </p>
            <p className="text-green-600 font-semibold">10% off</p>
          </div>
        </div>
      </div>
      {showButton && (
        <div className="lg:flex items-center lg:space-x-10 pt-4">
          <div className="flex items-center space-x-2 ">
            <IconButton
              onClick={(e) => handleUpdateCartMinus(e, item.id, item.quantity)}
              disabled={item?.quantity <= 1}
              color="primary"
              aria-label="add an alarm"
            >
              <RemoveCircleOutlineIcon />
            </IconButton>

            <span className="py-1 px-7 border rounded-sm">
              {item?.quantity}
            </span>
            <IconButton
              onClick={(e) => handleUpdateCartPlus(e, item.id, item.quantity)}
              color="primary"
              aria-label="add an alarm"
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </div>
          <div className="flex text-sm lg:text-base mt-5 lg:mt-0">
            <Button
              onClick={(e) => handleRemoveItemFromCart(e, item.id)}
              variant="contained"
              sx={{ bgcolor: grey[900] }}
            >
              Remove{" "}
            </Button>
          </div>
        </div>
      )}
    </div>
  </>
   
  );
};

export default CartItem;

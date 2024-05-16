import React, { useCallback, useEffect, useState } from "react";

import { Button, Skeleton } from "@mui/material";
// =======
// import { Button, LinearProgress } from "@mui/material";
// >>>>>>> main
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
  updateCartQtyNEW,
} from "../../../action/cart";
import { grey } from "@mui/material/colors";
import { API_BASE_URL } from "../../../config/api";

const CartItem = ({
  item,
  showButton,
  
}) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [data, setData] = useState({});
  const {} = useSelector((store) => store);
  const cart = useSelector((store) => store.cartItems.cartItems);
  const { orderItemId, productId } = item;
  const { orderId } = cart;
  const [qty, setQty] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleRemoveItemFromCart = (data) => {
    dispatch(RemoveCartItemNew(data))
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}product?partNumber=${item.partNumber}`)
      .then((res) => res.json())
      .then((res) => {
        const data = res.catalogEntryView[0];
        setData(data);
        setQty(+item.quantity);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Set loading to false if there's an error
      });
  }, [item.partNumber]);

  const debouncedUpdateCartItem = useCallback((num)=>{
      const data = { quantity: num, orderId, orderItemId, productId };
      updateCartQtyNEW(data);
      dispatch(getCartItems());

  },[dispatch, orderId, orderItemId, productId]
  );
  // useEffect(() => {
  //   debouncedUpdateCartItem(qty);
  // }, [debouncedUpdateCartItem, qty]);
if(!data){
  return <LinearProgress/>
}

  return (<>
   
      {loading ? ( // Render loading skeleton if data is still loading
        <Skeleton variant="rectangular" width="100%" height={120} />
      ) : (
        <div className="p-5 shadow-lg border rounded-md">
        <div className="flex items-center">
          <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem] ">
            <img
              className="w-full h-full object-cover object-top"
              src={data?.fullImage}
              alt="img"
            />
          </div>
          <div className="ml-5 space-y-1">
            <p className="font-semibold">{data.name}</p>
            {/* <p className="opacity-70">Size: {item?.size}</p> */}
            {/* <p className="opacity-70 mt-2">Quantity: {item?.quantity}</p> */}
            <div className="flex space-x-2 items-center pt-3">
              <p className="opacity-50 line-through">
                {/* ${data.price[0]?.value } */}
              </p>
              <p className="font-semibold text-lg">
  
                {data && `$ ${data?.price?.[0]?.value }`}
  
                {/* {data && `$ ${data?.price?.[0]?.value }`} */}
  
              </p>
              {/* <p className="text-green-600 font-semibold">10% off</p> */}
            </div>
          </div>
        </div>
        {showButton && (
          <div className="lg:flex items-center lg:space-x-10 pt-4">
            <div className="flex items-center space-x-2 ">
              <IconButton
                 onClick={()=>{
                  setQty(prev => {
                    const updatedQty = prev - 1;
                    console.log(updatedQty, "increased");
                    debouncedUpdateCartItem(updatedQty.toString());
                    return updatedQty;
                });}}
                disabled={qty <= 1}
                color="primary"
                aria-label="add an alarm"
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
  
              <span className="py-1 px-7 border rounded-sm">
                {qty}
              </span>
              <IconButton
                onClick={()=>{
                  setQty(prev => {
                    const updatedQty = prev + 1;
                    console.log(updatedQty, "increased");
                    debouncedUpdateCartItem(updatedQty.toString());
                    return updatedQty;
                });}}
                color="primary"
                aria-label="add an alarm"
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </div>
            <div className="flex text-sm lg:text-base mt-5 lg:mt-0">
              <Button
                onClick={(e) => handleRemoveItemFromCart({orderId,orderItemId})}
                variant="contained"
                sx={{ bgcolor: grey[900] }}
              >
                Remove{" "}
              </Button>
            </div>
          </div>
        )}
      </div>
      )}
   
  </>
   
  );
};

export default CartItem;
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
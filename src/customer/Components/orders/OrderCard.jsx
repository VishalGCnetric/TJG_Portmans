import { Box, Grid, Typography, Card, CardContent } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AdjustIcon from "@mui/icons-material/Adjust";
import React from "react";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ order }) => {
  const { grandTotal, orderId, placedDate, orderStatus } = order;
  const navigate = useNavigate();
  const total = +grandTotal;

  return (
    <Card
      className="shadow-lg hover:shadow-2xl cursor-pointer"
      onClick={() => navigate(`/account/order/${orderId}`)}
    >
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" fontWeight="bold">
              Order ID: #{orderId}
            </Typography>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="h6" color="primary">
              ${total.toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="body1" color="textSecondary">
              Placed on: {new Date(placedDate).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={12} md={2}>

            <Typography variant="body1">
              Status : 
              {orderStatus === "M" ? (
                <AdjustIcon color="error" />
              ) : (
                <FiberManualRecordIcon color="success" />
              )}
               {orderStatus === "M" ? "Pending" : "Delivered"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={2}>
            <Box display="flex" alignItems="center">
              {/* {orderStatus === "M" ? (
                <AdjustIcon color="error" />
              ) : (
                <FiberManualRecordIcon color="success" />
              )} */}
              <Typography variant="body2" marginLeft={1}>
                {/* {orderStatus === "M" ? "Pending" : "Delivered"} */}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default OrderCard;

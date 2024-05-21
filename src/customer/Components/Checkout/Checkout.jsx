import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddDeliveryAddressForm from "./AddAddress";
import OrderSummary from "./OrderSummary";
import Payment from "./Payment";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentPage from "./PaymentPage";

const steps = ["Login", "Delivery Address", "Order Summary", "Payment"];

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const stepParam = queryParams.get("step");

  const initialStep = stepParam ? +stepParam : 1; // Default to step 1 if no stepParam
  const [activeStep, setActiveStep] = React.useState(initialStep);
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    setActiveStep(initialStep);
  }, [initialStep]);

  const handleNext = () => {
    const nextStep = activeStep < steps.length ? activeStep + 1 : steps.length;
    setActiveStep(nextStep);
    navigate(`/checkout?step=${nextStep}`);
  };

  const handleBack = (datas) => {
    setData(datas);
    const prevStep = activeStep > 1 ? activeStep - 1 : 1;
    setActiveStep(prevStep);
    navigate(`/checkout?step=${prevStep}`);
  };

  const handleReset = () => {
    setActiveStep(1);
    navigate(`/checkout?step=1`);
  };

  const handlePayment = () => {
    console.log("handle payment");
  };

  return (
    <Box className="mt-10 px-5 lg:px-32" sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you're finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 1}
              onClick={() => handleBack(data)}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
          </Box>
          <div className="my-5">
            {activeStep === 1 && (
              <AddDeliveryAddressForm handleNext={handleNext} handleBack={handleBack} />
            )}
            {activeStep === 2 && (
              <OrderSummary data={data} handlePayment={handlePayment} handleNext={handleNext} />
            )}
            {activeStep === 3 && <PaymentPage handleNext={handleNext} />}
          </div>
        </React.Fragment>
      )}
    </Box>
  );
}

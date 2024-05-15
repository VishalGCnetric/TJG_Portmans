import React from "react";

const AddressCard = ({ address }) => {
  return (
    <div>
      <h1 className="text-lg font-semibold py-4">Delivery Address</h1>
      <div className="space-y-3">
        <p className="font-semibold">{`${address?.firstName} ${address?.lastName}`}</p>

        <div className="space-y-1">
          <p className="font-semibold">Address</p>
          {address?.addressLine?.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
          <p>{`${address?.city}, ${address?.state} ${address?.zipCode}`}</p>
        </div>

        <div className="space-y-1">
          <p className="font-semibold">Phone Number</p>
          <p>{address?.phone1}</p>
        </div>

        <div className="space-y-1">
          <p className="font-semibold">Email</p>
          <p>{address?.email1}</p>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;

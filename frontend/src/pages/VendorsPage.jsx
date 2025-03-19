import React, { useEffect, useState } from "react";
import { getVendors } from "../services/vendorService";

const VendorsPage = () => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    getVendors().then(setVendors);
  }, []);

  return (
    <div>
      <h1>Registered Vendors</h1>
      <ul>
        {vendors.map(vendor => (
          <li key={vendor.id}>{vendor.name} - {vendor.serviceType}</li>
        ))}
      </ul>
    </div>
  );
};

export default VendorsPage;

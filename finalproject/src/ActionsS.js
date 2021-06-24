import { useState } from 'react';

const ActionsS = () => {
  const [sales, setSales] = useState([]);
  const [salesLength, setSalesLength] = useState(null);

  const SalesSelect = (date) => {
    fetch('http://localhost/material-kit-react/server/DoSelectSalesReport.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(date),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSales(data.sales);
          setSalesLength(true);
        } else {
          alert(data.msg);
          setSalesLength(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    sales,
    salesLength,
    SalesSelect
  };
};

export default ActionsS;

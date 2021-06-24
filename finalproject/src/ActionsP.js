import { useEffect, useState } from 'react';

const ActionsP = () => {
  const [products, setProducts] = useState([]);
  const [sproduct, setSproduct] = useState([]);
  const [productLength, setProductLength] = useState(null);
  const [sproductLength, setSproductLength] = useState(null);

  useEffect(() => {
    fetch('http://localhost/material-kit-react/server/DoSelectProduct.php')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.product);
          setProductLength(true);
        } else {
          setProductLength(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const searchProduct = (prod) => {
    fetch('http://localhost/material-kit-react/server/DoSearchProduct.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(prod),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSproduct(data.product);
          setSproductLength(true);
        } else {
          setSproductLength(0);
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const insertProduct = (insertP) => {
    fetch('http://localhost/material-kit-react/server/DoInsertProduct.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(insertP),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts([
            {
              ...insertP,
            },
            ...products,
          ]);
          setProductLength(true);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editMode = (prodid) => {
    const product1 = products.map((product) => {
      if (product.ProdID === prodid) {
        const a = product;
        a.isEditing = true;
        return a;
      }
      const a = product;
      a.isEditing = false;
      return a;
    });
    setProducts(product1);
  };

  const cancelEdit = (id) => {
    const product1 = products.map((product) => {
      if (product.ProdID === id) {
        const a = product;
        a.isEditing = false;
        return a;
      }
      return product;
    });
    setProducts(product1);
  };

  const updateProduct = (update) => {
    fetch('http://localhost/material-kit-react/server/DoUpdateProduct.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(update),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const product1 = products.map((product) => {
            if (product.ProdID === update.id) {
              const a = product;
              a.isEditing = false;
              a.ProdName = update.ProdName;
              a.ProdID = update.ProdID;
              a.UnitPrice = update.UnitPrice;
              a.Cost = update.Cost;
              return a;
            }
            return product;
          });
          setProducts(product1);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteProduct = (ProdID) => {
    const productDeleted = products.filter((product) => (product.ProdID !== ProdID));
    fetch('http://localhost/material-kit-react/server/DoDeleteProduct.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ProdID }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(productDeleted);
          if (products.length === 1) {
            setProductLength(0);
          }
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    products,
    sproduct,
    searchProduct,
    editMode,
    cancelEdit,
    updateProduct,
    insertProduct,
    deleteProduct,
    productLength,
    sproductLength
  };
};

export default ActionsP;

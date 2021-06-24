import { useEffect, useState } from 'react';

const ActionsO = () => {
  const [orders, setOrders] = useState([]);
  const [sorder, setSOrder] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [product, setProduct] = useState([]);
  const [orderdetail, setOrderdetail] = useState([]);
  const [orderLength, setOrderLength] = useState(null);
  const [orderdetailLength, setOrderdetailLength] = useState(null);
  const [press, setPress] = useState(false);

  useEffect(() => {
    fetch('http://localhost/material-kit-react/server/DoSelectOrder.php')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrders(data.order);
          setEmployee(data.employee);
          setCustomer(data.customer);
          setProduct(data.product);
          setOrderLength(true);
        } else {
          setOrderLength(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const orderSelect = (OrderId) => {
    fetch('http://localhost/material-kit-react/server/DoSelectOrderdetail.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(OrderId),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrderdetail(data.orderdetail);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const pressSet = (set) => {
    setPress(set);
  };

  const searchOrder = (OrderId) => {
    fetch('http://localhost/material-kit-react/server/DoSelectOrderdetail.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(OrderId),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSOrder(data.order);
          setOrderdetail(data.orderdetail);
          setPress(true);
          setOrderdetailLength(true);
        } else {
          setOrderdetailLength(0);
          setPress(false);
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const insertOrder = (insertO) => {
    fetch('http://localhost/material-kit-react/server/DoInsertOrder.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(insertO),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
          setOrders([
            {
              seq: data.seq,
              OrderId: data.OrderId,
              ...insertO,
            },
            ...orders,
          ]);
          setOrderLength(true);
          setOrderdetail([
            {
              seq: data.seqo,
              ...insertO,
            },
            ...orderdetail,
          ]);
          setOrderdetailLength(true);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const insertOrderdetail = (insertO) => {
    fetch('http://localhost/material-kit-react/server/DoInsertOrder.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(insertO),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrderdetail([
            {
              seq: data.seq,
              ...insertO,
            },
            ...orderdetail,
          ]);
          setOrderdetailLength(true);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editMode = (OrderId) => {
    const order1 = orders.map((order) => {
      if (order.OrderId === OrderId) {
        const a = order;
        a.isEditing = true;
        return a;
      }
      const a = order;
      a.isEditing = false;
      return a;
    });
    setOrders(order1);
  };

  const cancelEdit = (OrderId) => {
    const order1 = orders.map((order) => {
      if (order.OrderId === OrderId) {
        const a = order;
        a.isEditing = false;
        return a;
      }
      return order;
    });
    setOrders(order1);
  };

  const editMode1 = (seq) => {
    const order1 = orderdetail.map((orderdetails) => {
      if (orderdetails.seq === seq) {
        const a = orderdetails;
        a.isEditings = true;
        return a;
      }
      const a = orderdetails;
      a.isEditings = false;
      return a;
    });
    setOrderdetail(order1);
  };

  const cancelEdit1 = (seq) => {
    const order1 = orderdetail.map((orderdetails) => {
      if (orderdetails.seq === seq) {
        const a = orderdetails;
        a.isEditings = false;
        return a;
      }
      return orderdetails;
    });
    setOrderdetail(order1);
  };

  const updateOrder = (update) => {
    fetch('http://localhost/material-kit-react/server/DoUpdateOrder.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(update),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const order1 = orders.map((order) => {
            if (order.OrderId === update.OrderId) {
              const a = order;
              a.isEditing = false;
              a.EmpId = update.EmpId;
              a.CustId = update.CustId;
              a.OrderDate = update.OrderDate;
              a.Descript = update.Descript;
              return a;
            }
            return order;
          });
          setOrders(order1);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateOrderdetail = (update) => {
    fetch('http://localhost/material-kit-react/server/DoUpdateOrder.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(update),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const order1 = orderdetail.map((orderdetails) => {
            if (orderdetails.seq === update.seq) {
              const a = orderdetails;
              a.isEditings = false;
              a.ProdId = update.ProdId;
              a.Qty = update.Qty;
              a.Discount = update.Discount;
              return a;
            }
            return orderdetails;
          });
          setOrderdetail(order1);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteOrder = (OrderId) => {
    const orderDeleted = orders.filter((order) => (order.OrderId !== OrderId));
    fetch('http://localhost/material-kit-react/server/DoDeleteOrder.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ OrderId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrders(orderDeleted);
          if (orders.length === 1) {
            setOrderLength(0);
          }
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteOrderdetail = (seq) => {
    const orderDeleted = orderdetail.filter((orderdetails) => (orderdetails.seq !== seq));
    fetch('http://localhost/material-kit-react/server/DoDeleteOrder.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ seq }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrderdetail(orderDeleted);
          if (orders.length === 1) {
            setOrderdetailLength(0);
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
    orders,
    orderdetail,
    employee,
    customer,
    product,
    sorder,
    press,
    pressSet,
    insertOrder,
    insertOrderdetail,
    searchOrder,
    editMode,
    editMode1,
    cancelEdit,
    cancelEdit1,
    updateOrder,
    updateOrderdetail,
    deleteOrder,
    deleteOrderdetail,
    orderLength,
    orderdetailLength,
    orderSelect
  };
};

export default ActionsO;

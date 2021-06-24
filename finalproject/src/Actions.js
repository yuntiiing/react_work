import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Actions = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [suser, setSUser] = useState([]);
  const [userLength, setUserLength] = useState(null);

  useEffect(() => {
    fetch('http://localhost/material-kit-react/server/all-users.php')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUsers(data.users);
          setUserLength(true);
        } else {
          setUserLength(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const login = (loginUser) => {
    fetch('http://localhost/material-kit-react/server/one-user.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSUser(data.user);
          navigate('/app/customers', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // Inserting a new user into the database.
  const insertUser = (newUser) => {
    fetch('http://localhost/material-kit-react/server/add-user.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          setUsers([
            {
              Empid: data.id,
              ...newUser,
            },
            ...users,
          ]);
          setUserLength(true);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Enabling the edit mode for a listed user.
  const editMode = (Empid) => {
    const users1 = users.map((user) => {
      if (user.Empid === Empid) {
        const a = user;
        a.isEditing = true;
        return a;
      }
      const a = user;
      a.isEditing = false;
      return a;
    });
    setUsers(users1);
  };

  // Cance the edit mode.
  const cancelEdit = (Empid) => {
    const users1 = users.map((user) => {
      if (user.Empid === Empid) {
        const a = user;
        a.isEditing = false;
        return a;
      }
      return user;
    });
    setUsers(users1);
  };

  // Updating a user.
  const updateUser = (userData) => {
    fetch('http://localhost/material-kit-react/server/update-user.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const users1 = users.map((user) => {
            if (user.Empid === userData.Empid) {
              const a = user;
              a.isEditing = false;
              a.EmpName = userData.EmpName;
              a.DeptId = userData.DeptId;
              a.JobTitle = userData.JobTitle;
              a.City = userData.City;
              a.Address = userData.Address;
              a.Phone = userData.Phone;
              return a;
            }
            return user;
          });
          setUsers(users1);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Deleting a user.
  const deleteUser = (Empid) => {
    const userDeleted = users.filter((user) => (user.Empid !== Empid));
    fetch('http://localhost/material-kit-react/server/delete-user.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Empid }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUsers(userDeleted);
          console.log(userDeleted);
          if (users.length === 1) {
            setUserLength(0);
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
    suser,
    users,
    login,
    editMode,
    cancelEdit,
    updateUser,
    insertUser,
    deleteUser,
    userLength,
  };
};

export default Actions;

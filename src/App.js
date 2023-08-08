import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./index.css";
import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

import { UserTable } from "./components/UserTable";
import { CContainer } from "@coreui/react";
import { UserInput } from "./components/UserInput";

function App() {
  const [users, setUsers] = useState([]);

  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const addUser = async (data) => {
    try {
      const newUser = {
        name: data.name,
        dob: data.dob.$d,
        country: data.country,
        city: data.city,
      };
      await addDoc(usersCollectionRef, newUser);
      getUsers();
    } catch (e) {
      console.log(e);
    }
  };

  const updateUser = (userData) => {
    const document = doc(db, "users", userData.id);
    const updatedUser = {};
    console.log(userData);
  };

  return (
    <div className="App">
      <h4 className="text-3xl flex justify-center mt-10">Users</h4>

      <CContainer className="mt-10">
        <UserInput addUser={addUser} />
        <UserTable users={users} updateUser={updateUser} />
      </CContainer>
    </div>
  );
}

export default App;

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
  deleteDoc,
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

  const updateUser = async (id, userData) => {
    try {
      console.log(userData);
      const userDoc = doc(db, "users", id);
      const updatedUser = {
        name: userData.name,
        dob: userData.dob.$d,
        country: userData.country,
        city: userData.city,
      };

      await updateDoc(userDoc, updatedUser);
      getUsers();
    } catch (e) {
      console.log(e);
    }
  };

  const deleteUser = async (id) => {
    try {
      const userDoc = doc(db, "users", id);
      await deleteDoc(userDoc);
      getUsers();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="App bg-neutral-800 ">
      <h4 className="text-4xl flex justify-center py-5 text-white">Users</h4>

      <CContainer className="pb-4 ">
        <CContainer>
          <h3 className="text-white text-lg">Add a user...</h3>
        </CContainer>
        <UserInput addUser={addUser} />
        <UserTable
          className="!my-4"
          users={users}
          updateUser={updateUser}
          deleteUser={deleteUser}
        />
      </CContainer>
    </div>
  );
}

export default App;

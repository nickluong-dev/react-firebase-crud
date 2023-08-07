import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./index.css";

import { UserTable } from "./components/table";
import { useState, useEffect } from "react";
import { CContainer, CHeader } from "@coreui/react";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";

const users = [
  { name: "nick", country: "Canada", city: "Vancouver", dob: "1997-02-01" },
  { name: "nick", country: "Canada", city: "Vancouver", dob: null },
];

function App() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);

      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  // console.log(users[0]["date of birth"].toDate());
  return (
    <div className="App">
      <h4 className="text-3xl flex justify-center mt-10">Users</h4>
      <CContainer className="flex justify-center mt-10">
        <UserTable users={users} />
      </CContainer>
    </div>
  );
}

export default App;

import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./index.css";
import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import { addDoc, collection, getDocs } from "firebase/firestore";

import { useForm, Controller } from "react-hook-form";
import { CForm, CFormInput, CFormSelect, CButton } from "@coreui/react";
import { UserTable } from "./components/table";
import { CContainer } from "@coreui/react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  const [users, setUsers] = useState([]);
  const [country, setCountry] = useState("Canada");

  const usersCollectionRef = collection(db, "users");
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

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

  const UserInput = () => {
    const renderCitySelect = () => {
      if (country === "Canada") {
        return (
          <CFormSelect
            {...register("city", {
              validate: (value) =>
                ["Toronto", "Ottawa"].includes(value) || "City is required.",
            })}
            options={[
              { label: "City", disabled: true },
              { label: "Toronto", value: "Toronto" },
              { label: "Ottawa", value: "Ottawa" },
            ]}
            defaultValue={"City"}
          />
        );
      }
      if (country === "USA") {
        return (
          <CFormSelect
            {...register("city", {
              validate: (value) =>
                ["Chicago", "Las Vegas"].includes(value) || "City is required.",
            })}
            options={[
              { label: "City", disabled: true },
              { label: "Chicago", value: "Chicago" },
              { label: "Las Vegas", value: "Las Vegas" },
            ]}
            defaultValue={"City"}
          />
        );
      } else {
        return <CFormSelect options={["City"]} disabled />;
      }
    };

    return (
      <CContainer>
        <CForm
          className="grid grid-cols-5 my-4 gap-3"
          onSubmit={handleSubmit((data) => {
            addUser(data);
          })}
        >
          <CFormInput
            {...register("name", { required: "Name is required." })}
            type="text"
            placeholder="Enter Name"
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="dob"
              control={control}
              defaultValue=""
              rules={{ required: "Date of birth is required." }}
              render={({ field }) => (
                <DatePicker
                  className="w-full"
                  label="Basic date picker"
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                />
              )}
            />
          </LocalizationProvider>

          <CFormSelect
            {...register("country")}
            {...register("country", {
              validate: (value) =>
                ["Canada", "USA"].includes(value) || "Country is required.",
            })}
            options={[
              { label: "Country", value: "Country", disabled: true },
              { label: "Canada", value: "Canada" },
              { label: "USA", value: "USA" },
            ]}
            onChange={(e) => {
              setCountry(e.target.value);
              setValue("country", e.target.value);
            }}
            value={country}
          />

          {renderCitySelect()}
          <CButton className="bg-blue-500 border-0 " size="sm" type="submit">
            Add
          </CButton>
        </CForm>
        <div className="grid grid-cols-5 mb-5">
          <p className="text-red-500">{errors.name?.message}</p>
          <p className="text-red-500">{errors.dob?.message}</p>
          <p className="text-red-500">{errors.country?.message}</p>
          <p className="text-red-500">{errors.city?.message}</p>
        </div>
      </CContainer>
    );
  };

  return (
    <div className="App">
      <h4 className="text-3xl flex justify-center mt-10">Users</h4>

      <CContainer className="mt-10">
        <UserInput />
        <UserTable users={users} />
      </CContainer>
    </div>
  );
}

export default App;

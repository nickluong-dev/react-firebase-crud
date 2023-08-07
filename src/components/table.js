import { CForm, CFormInput, CFormSelect, CButton } from "@coreui/react";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const UserTable = (props) => {
  return (
    <div className="w-full">
      <AddUser />
      <table className="w-full">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Country</th>
            <th>City</th>
          </tr>

          {props.users &&
            props.users.map((user) => (
              <tr>
                <td>{user.name}</td>
                <td>{user.dob.toDate().toISOString().slice(0, 10)}</td>
                <td>{user.country}</td>
                <td>{user.city}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

const AddUser = () => {
  const [country, setCountry] = useState("");

  const renderCitySelect = () => {
    if (country === "Canada") {
      return (
        <CFormSelect
          options={[
            "City",
            { label: "Toronto", value: "Toronto" },
            { label: "Ottowa", value: "Ottowa" },
          ]}
        />
      );
    }
    if (country === "USA") {
      return (
        <CFormSelect
          options={[
            "City",
            { label: "Chicago", value: "Chicago" },
            { label: "Las Vegas", value: "Las Vegas" },
          ]}
        />
      );
    } else {
      return <CFormSelect options={["City"]} disabled />;
    }
  };

  return (
    <CForm className="flex my-4">
      <CFormInput type="text" name="Name" placeholder="Enter  Name" />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker className="w-full" label="Basic date picker" />
      </LocalizationProvider>
      <CFormSelect
        options={[
          "Country",
          { label: "Canada", value: "Canada" },
          { label: "USA", value: "USA" },
        ]}
        onChange={(e) => setCountry(e.target.value)}
      />
      {renderCitySelect()}

      <CButton className="bg-blue-500 border-0" size="sm" type="submit">
        Add
      </CButton>
    </CForm>
  );
};

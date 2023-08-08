import { useForm, Controller } from "react-hook-form";
import { CForm, CFormInput, CFormSelect, CButton } from "@coreui/react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CContainer } from "@coreui/react";
import { useState } from "react";

export const UserInput = (props) => {
  const [country, setCountry] = useState("Canada");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

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
          props.addUser(data);
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

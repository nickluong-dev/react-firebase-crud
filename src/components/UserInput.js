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
          className="bg-stone-100 "
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
                className="w-full bg-stone-100 rounded-sm"
                label="Birth Date"
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                }}
              />
            )}
          />
        </LocalizationProvider>

        <CFormSelect
          {...register("country", {
            validate: (value) =>
              ["Canada", "USA"].includes(value) || "Country is required.",
          })}
          className="bg-stone-100 "
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

        {SelectCity(country, register)}
        <CButton className="bg-purple-500 border-0 " size="sm" type="submit">
          Add
        </CButton>
      </CForm>
      <div className="grid grid-cols-5 mb-5">
        <p className="text-red-400">{errors.name?.message}</p>
        <p className="text-red-400">{errors.dob?.message}</p>
        <p className="text-red-400">{errors.country?.message}</p>
        <p className="text-red-400">{errors.city?.message}</p>
      </div>
    </CContainer>
  );
};

export const SelectCity = (country, register) => {
  if (country === "Canada") {
    return (
      <CFormSelect
        {...register("city", {
          validate: (value) =>
            ["Toronto", "Ottawa"].includes(value) || "City is required.",
        })}
        className="bg-stone-100 h-14 rounded-sm"
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
        className="bg-stone-100 h-14 rounded-sm"
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

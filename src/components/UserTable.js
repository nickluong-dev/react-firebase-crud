import { useState } from "react";
import { SelectCity } from "./UserInput";
import { useForm, Controller } from "react-hook-form";
import { CForm, CFormInput, CFormSelect, CButton } from "@coreui/react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const UserTable = (props) => {
  const [editState, setEditState] = useState(-1);
  const [country, setCountry] = useState("Canada");
  const [birth, setBirth] = useState("");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  return (
    <CForm onSubmit={(e) => e.preventDefault()}>
      <div className="w-full overflow-c-auto py-5 flex flex-col items-center bg-neutral-900 shadow-md rounded-sm">
        <table className="border-separate border-spacing-0 table-fixed px-5 text-stone-300 pb-3">
          <tbody>
            <tr className="text-xl">
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Country</th>
              <th>City</th>
            </tr>

            {props.users &&
              props.users.map((user, idx) =>
                user.id === editState ? (
                  <tr>
                    <td>
                      <CFormInput
                        {...register("name", { required: "Name is required." })}
                        className="bg-stone-100 h-14 rounded-sm"
                        type="text"
                        placeholder="Enter Name"
                      />
                      <p className="text-red-400">{errors.name?.message}</p>
                    </td>

                    <td>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Controller
                          name="dob"
                          control={control}
                          rules={{ required: "Date of birth is required." }}
                          value={birth}
                          render={({ field }) => (
                            <DatePicker
                              className="bg-stone-100 rounded-md"
                              onChange={(value) => {
                                field.onChange(value);
                                setBirth(value);
                              }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                      <p className="text-red-400">{errors.dob?.message}</p>
                    </td>
                    <td>
                      <CFormSelect
                        {...register("country", {
                          validate: (value) =>
                            ["Canada", "USA"].includes(value) ||
                            "Country is required.",
                        })}
                        className="bg-stone-100 h-14 rounded-sm"
                        options={[
                          {
                            label: "Country",
                            value: "Country",
                            disabled: true,
                          },
                          { label: "Canada", value: "Canada" },
                          { label: "USA", value: "USA" },
                        ]}
                        onChange={(e) => {
                          setCountry(e.target.value);
                          setValue("country", e.target.value);
                        }}
                        value={country}
                      />
                    </td>
                    <td className="h-14 rounded-sm">
                      {SelectCity(country, register)}
                    </td>
                    <td className="text-center">
                      <CButton
                        className="bg-purple-500 border-0 w-18 text-center rounded-sm"
                        type="submit"
                        onClick={handleSubmit((data) => {
                          props.updateUser(user.id, data);
                          setEditState(-1);
                        })}
                      >
                        Update
                      </CButton>
                    </td>
                  </tr>
                ) : (
                  <tr className="group/item">
                    <td className="group-hover/item:bg-neutral-800 break-all w-1/4 p-2">
                      {user.name}
                    </td>
                    <td className="group-hover/item:bg-neutral-800 break-all w-1/5 p-2">
                      {user.dob.toDate().toISOString().slice(0, 10)}
                    </td>
                    <td className="group-hover/item:bg-neutral-800  break-all w-1/5 p-2">
                      {user.country}
                    </td>
                    <td className="group-hover/item:bg-neutral-800  break-all w-1/5 p-2">
                      {user.city}
                    </td>
                    <td className="text-center">
                      <CButton
                        type="button"
                        onClick={() => {
                          setEditState(user.id);
                          setValue("name", user.name);
                        }}
                        className="bg-purple-500 border-0 w-20 rounded-sm"
                      >
                        Edit
                      </CButton>
                    </td>
                    <td>
                      <CButton
                        className="bg-red-500 border-0 w-20 rounded-sm ml-3 hover:bg-color-red-300"
                        onClick={() => {
                          props.deleteUser(user.id);
                        }}
                      >
                        Delete
                      </CButton>
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      </div>
    </CForm>
  );
};

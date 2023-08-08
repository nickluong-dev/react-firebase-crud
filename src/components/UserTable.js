import { CButton } from "@coreui/react";
import { useState } from "react";
import { UserInput } from "./UserInput";

export const UserTable = (props) => {
  const [editState, setEditState] = useState(-1);
  return (
    <div className="w-full">
      <table className="w-full border-separate border-spacing-2">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Country</th>
            <th>City</th>
          </tr>

          {props.users &&
            props.users.map((user, idx) =>
              user.id === editState ? (
                <UserInput />
              ) : (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.dob.toDate().toISOString().slice(0, 10)}</td>
                  <td>{user.country}</td>
                  <td>{user.city}</td>
                  <CButton
                    onClick={() => setEditState(user.id)}
                    className="bg-purple-500 border-0"
                  >
                    Edit
                  </CButton>
                </tr>
              )
            )}
        </tbody>
      </table>
    </div>
  );
};

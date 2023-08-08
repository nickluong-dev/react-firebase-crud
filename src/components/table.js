export const UserTable = (props) => {
  return (
    <div className="w-full">
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

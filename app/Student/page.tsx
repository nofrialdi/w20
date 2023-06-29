import DeleteUser from "./deleteUser";
import UpdateUser from "./updateStudent";
import "../globals.css";
import AddStudent from "./addStudent";

export const metadata = {
  title: "List Students",
  icons: {
    icon: "./favicon.ico",
  },
};

type Students = {
  id: number;
  name: string;
  email: string;
  github: string;
};

async function getStudents() {
  const res = await fetch("https://649c24cc04807571923788e7.mockapi.io/students", {
    cache: "no-store",
  });
  return res.json();
}

export default async function Student() {
  const users: Students[] = await getStudents();
  return (
    <div className="py-10 px-10">
      <div className="py-2">
        <AddStudent />
      </div>
      <table className="table w-full">
        <thead className="bg-neutral-content text-black">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Github</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </td>
              <td>
                <a href={user.github}>{user.github}</a>
              </td>
              <td className="flex">
                <div className="mr-1">
                  <UpdateUser {...user} />
                </div>

                <DeleteUser {...user} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

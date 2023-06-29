"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Student = {
  id: number;
  name: string;
  email: string;
  github: string;
};

export default function UpdateStudent(student: Student) {
  const [name, setName] = useState(student.name);
  const [email, setEmail] = useState(student.email);
  const [github, setGithub] = useState(student.github);
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    await fetch(`https://649c24cc04807571923788e7.mockapi.io/students/${student.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        github: github,
      }),
    });

    setIsMutating(false);

    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn btn-info btn-sm" onClick={handleChange}>
        Edit
      </button>

      <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit {student.name}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label font-bold">Name</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="input w-full input-bordered" placeholder="Name" />
            </div>
            <div className="form-control">
              <label className="label font-bold">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input w-full input-bordered" placeholder="Email" />
            </div>
            <div className="form-control">
              <label className="label font-bold">Github</label>
              <input type="text" value={github} onChange={(e) => setGithub(e.target.value)} className="input w-full input-bordered" placeholder="Github" />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Updating...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

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
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512">
          <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H322.8c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7l40.3-40.3c-32.1-31-75.7-50.1-123.9-50.1H178.3zm435.5-68.3c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM375.9 417c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5 .2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4L576.1 358.7l-71-71L375.9 417z" />
        </svg>
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

"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddStudent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [github, setGithub] = useState("");
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    await fetch("https://649c24cc04807571923788e7.mockapi.io/students", {
      method: "POST",
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

    setName("");
    setEmail("");
    setGithub("");
    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn btn-accent" onClick={handleChange}>
        Add New Student
      </button>

      <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Student</h3>
          <form onSubmit={handleSubmit}>
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
              <input type="text" value={github} onChange={(e) => setGithub(e.target.value)} className="input w-full input-bordered" placeholder="Link Github" />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Saving...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

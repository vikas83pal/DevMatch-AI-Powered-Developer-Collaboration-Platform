import React, { useState } from "react";

const initialForm = {
  title: "",
  description: "",
  skills: "",
  members: 1,
  status: "active",
  details: "",
};

const AddProject = ({ onAdd }) => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description) return;
    const newProject = {
      ...form,
      skills: form.skills.split(",").map(s => s.trim()),
      members: Number(form.members),
    };
    onAdd(newProject);
    setForm(initialForm);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/10 p-6 rounded-xl mb-6">
      <h2 className="text-xl font-bold text-white mb-4">Add New Project</h2>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Project Title"
        className="w-full mb-2 px-3 py-2 rounded bg-gray-800 text-white"
        required
      />
      <input
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Short Description"
        className="w-full mb-2 px-3 py-2 rounded bg-gray-800 text-white"
        required
      />
      <input
        name="skills"
        value={form.skills}
        onChange={handleChange}
        placeholder="Skills (comma separated)"
        className="w-full mb-2 px-3 py-2 rounded bg-gray-800 text-white"
      />
      <input
        name="members"
        type="number"
        min="1"
        value={form.members}
        onChange={handleChange}
        placeholder="Members"
        className="w-full mb-2 px-3 py-2 rounded bg-gray-800 text-white"
      />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full mb-2 px-3 py-2 rounded bg-gray-800 text-white"
      >
        <option value="active">Active</option>
        <option value="recruiting">Recruiting</option>
      </select>
      <textarea
        name="details"
        value={form.details}
        onChange={handleChange}
        placeholder="Project Details"
        className="w-full mb-2 px-3 py-2 rounded bg-gray-800 text-white"
      />
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded font-bold"
      >
        Add Project
      </button>
    </form>
  );
};

export default AddProject;
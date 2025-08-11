import React from 'react';

const AssignmentsPage = () => {
  const assignments = [
    { id: 1, title: "Math Homework 1", dueDate: "2025-08-15", status: "Pending" },
    { id: 2, title: "Physics Lab Report", dueDate: "2025-08-20", status: "Submitted" },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Assignments</h1>
        <button className="bg-secondary text-white px-4 py-2 rounded">Create Assignment</button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select className="border p-2 rounded">
          <option>All Status</option>
          <option>Pending</option>
          <option>Submitted</option>
          <option>Graded</option>
        </select>
        <input type="text" placeholder="Search assignments..." className="border p-2 rounded flex-1" />
      </div>

      {/* Assignment List */}
      <div className="bg-white shadow rounded">
        {assignments.map(a => (
          <div key={a.id} className="flex justify-between items-center p-4 border-b">
            <div>
              <h2 className="font-semibold">{a.title}</h2>
              <p className="text-sm text-gray-500">Due: {a.dueDate}</p>
            </div>
            <span className={`px-3 py-1 rounded text-sm ${
              a.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
              a.status === "Submitted" ? "bg-green-100 text-green-800" :
              "bg-gray-100 text-gray-800"
            }`}>
              {a.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignmentsPage;

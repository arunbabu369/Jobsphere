
import React, { useState } from 'react';

const AddEducationForm = ({ onAdd }) => {
  const [degree, setDegree] = useState('');
  const [institution, setInstitution] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!degree || !institution || !startYear || !endYear) {
      setError("Degree, Institution, Start Year, and End Year are required for Education.");
      return;
    }
    setError('');
    onAdd({ degree, institution, startYear, endYear });
    setDegree('');
    setMajor('');
    setInstitution('');
    setStartYear('');
    setEndYear('');
  };

  return (
    <form onSubmit={handleSubmit} className="border border-green-200 p-4 rounded-md mt-4 bg-green-50">
      <h4 className="text-lg font-semibold mb-3">Add New Education</h4>
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      <div className="mb-3">
        <label className="block text-gray-700 text-sm font-bold mb-1">Degree:</label>
        <input type="text" value={degree} onChange={(e) => setDegree(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-3">
        <label className="block text-gray-700 text-sm font-bold mb-1">Institution:</label>
        <input type="text" value={institution} onChange={(e) => setInstitution(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-3 flex space-x-4">
        <div className="flex-1">
          <label className="block text-gray-700 text-sm font-bold mb-1">Start Year:</label>
          <input type="text" value={startYear} onChange={(e) => setStartYear(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="e.g., 2019" />
        </div>
        <div className="flex-1">
          <label className="block text-gray-700 text-sm font-bold mb-1">End Year:</label>
          <input type="text" value={endYear} onChange={(e) => setEndYear(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="e.g., 2023" />
        </div>
      </div>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
        Add Education
      </button>
    </form>
  );
};

export default AddEducationForm;
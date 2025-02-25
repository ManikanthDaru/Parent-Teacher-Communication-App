const ChildProgress = () => {
  const progressData = [
    { subject: 'Math', grade: 'A' },
    { subject: 'Science', grade: 'B+' },
    { subject: 'English', grade: 'A-' },
    { subject: 'History', grade: 'B' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Child Progress Report</h2>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Subject</th>
            <th className="px-4 py-2">Grade</th>
          </tr>
        </thead>
        <tbody>
          {progressData.map((entry, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2">{entry.subject}</td>
              <td className="px-4 py-2">{entry.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChildProgress;

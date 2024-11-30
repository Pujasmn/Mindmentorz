

const AttendanceList = () => {
  const attendees = [
    { id: 1, name: 'Harry Wells', initial: 'H', color: 'bg-orange-500', timestamp: '08th Oct, 2024 | 10:45 am' },
    { id: 2, name: 'John Doe', initial: 'J', color: 'bg-purple-500', timestamp: '08th Oct, 2024 | 10:45 am' },
    { id: 3, name: 'Victor Wanggai', initial: 'V', color: 'bg-pink-500', timestamp: '08th Oct, 2024 | 10:45 am' },
    { id: 4, name: 'Baron Phoenix', initial: 'B', color: 'bg-green-500', timestamp: '08th Oct, 2024 | 10:45 am' },
    { id: 5, name: 'Baron Phoenix', initial: 'B', color: 'bg-green-500', timestamp: '08th Oct, 2024 | 10:45 am' },
  ];

  return (
    <div className="max-w-md p-4 bg-white rounded-lg">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-4 h-4 text-purple-600"
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-purple-600">Attendance</h2>
      </div>

      <div className="space-y-4">
        {attendees.map((attendee) => (
          <div key={attendee.id} className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${attendee.color} flex items-center justify-center text-white font-medium`}>
              {attendee.initial}
            </div>
            <div>
              <div className="font-medium text-gray-800">{attendee.name}</div>
              <div className="text-sm text-gray-500">{attendee.timestamp}</div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 text-center text-purple-600 font-medium">
        SEE ALL
      </button>
    </div>
  );
};

export default AttendanceList;
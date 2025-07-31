// src/components/EventItem.jsx
export default function EventItem({ event }) {
    const date = new Date(event.date);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });

    return (
        <div className="w-full bg-white shadow-sm rounded-lg p-4 flex items-center justify-between hover:shadow-md transition">
            {/* Date & Time */}
            <div className="flex flex-col items-start w-40 text-sm text-gray-600">
                <div className="flex items-baseline space-x-1">
                    <div className="text-blue-600 font-bold text-2xl leading-none">{day}</div>
                    <div className="text-gray-500 uppercase tracking-wide text-sm">{month}</div>
                </div>
                <div className="mt-1 text-gray-500 text-xs">
                    {event.from} - {event.to}
                </div>
            </div>

            {/* Event Name */}
            <div className="flex-1 text-left ml-6">
                <h4 className="text-base font-semibold text-gray-800">{event.name}</h4>
            </div>
        </div>
    );
}

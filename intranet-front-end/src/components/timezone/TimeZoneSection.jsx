// src/components/TimeZoneSection.jsx
import ClockCard from './ClockCard.jsx';

const zones = [
  { city: 'Amsterdam', offset: 2 },
  { city: 'Pune', offset: 5.5 },
  { city: 'New York', offset: -4 },
  { city: 'Calgary', offset: -6 },
  { city: 'Florence', offset: 2 },
  { city: 'Dalian (China)', offset: 8 },
  { city: 'Toronto', offset: -4 },
  { city: 'Sydney', offset: 10 },
];

export default function TimeZoneSection() {
  return (
    <div className="bg-[#152855] py-10 px-6">
      <h2 className="text-white text-2xl font-bold mb-8">Our time zones</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 justify-items-center">
        {zones.map((zone) => (
          <ClockCard key={zone.city} city={zone.city} offset={zone.offset} />
        ))}
      </div>
    </div>
  );
}

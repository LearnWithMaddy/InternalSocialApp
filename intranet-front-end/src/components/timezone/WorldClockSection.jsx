// src/components/WorldClockSection.jsx
import ClockCard from "./ClockCard.jsx";

const timezones = [
    {city: "Amsterdam", offset: 2},
    {city: "Pune", offset: 5.5},
    {city: "New York", offset: -4},
    {city: "Calgary", offset: -6},
    {city: "Florence", offset: 2},
    {city: "Dalian", offset: 8},
    {city: "Toronto", offset: -4},
    {city: "Sydney", offset: 10},
];

export default function WorldClockSection() {
    return (
        <section className="mt-12">
            <h2 className="text-xl font-bold text-gray-800 mb-4">🕒 Global Timezones</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {timezones.map((tz) => (
                    <ClockCard key={tz.city} city={tz.city} offset={tz.offset}/>
                ))}
            </div>
        </section>
    );
}

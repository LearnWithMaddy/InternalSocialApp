import useWorldTime from '../../utils/UseWorldTime.js';

export default function ClockCard({ city, offset }) {
  const time = useWorldTime(offset);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const hourDeg = (hours % 12) * 30 + minutes * 0.5;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const secondDeg = seconds * 6;

  const digital = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const [clockTime, period] = digital.split(' ');

  return (
    <div className="flex flex-col items-center text-white space-y-2 w-40">
      {/* Clock Face */}
      <div className="relative w-32 h-32 rounded-full border-2 border-white bg-transparent flex items-center justify-center">
        {/* Hour Hand */}
        <div
          className="absolute bg-white origin-[50%_90%] rounded"
          style={{
            height: '28%',
            width: '4px',
            transform: `rotate(${hourDeg}deg)`,
            bottom: '50%',
          }}
        />
        {/* Minute Hand */}
        <div
          className="absolute bg-white origin-[50%_90%] rounded"
          style={{
            height: '38%',
            width: '3px',
            transform: `rotate(${minuteDeg}deg)`,
            bottom: '50%',
          }}
        />
        {/* Second Hand */}
        <div
          className="absolute bg-red-500 origin-[50%_90%] rounded"
          style={{
            height: '45%',
            width: '2px',
            transform: `rotate(${secondDeg}deg)`,
            bottom: '50%',
          }}
        />
        {/* Center Dot */}
        <div className="absolute w-3 h-3 bg-white rounded-full z-10" />
      </div>

      {/* Digital Time */}
      <div className="text-lg font-mono tracking-wide flex items-baseline gap-1">
        <span>{clockTime}</span>
        <span className="text-sm">{period}</span>
      </div>

      {/* City */}
      <div className="text-base">{city}</div>
    </div>
  );
}

// src/components/BirthdayCard.jsx
export default function BirthdayCard({user}) {
    const birthday = new Date(user.birthday).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    });

    return (
        <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4 w-64">
            <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover border border-blue-400"
            />
            <div>
                <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.department}</p>
                <p className="text-sm text-blue-600 font-medium">🎂 {birthday}</p>
            </div>
        </div>
    );
}

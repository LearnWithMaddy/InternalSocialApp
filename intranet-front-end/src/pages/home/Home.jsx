import BirthdayCard from "../../components/BirthdayCard.jsx";
import {weeklyBirthdays} from "../../data/Birthdays.js";
import PostCard from "../../components/PostCard.jsx";
import {latestPosts} from "../../data/Posts.js";
import EventItem from "../../components/EventItem.jsx";
import {upcomingEvents} from "../../data/Events.js";
import TimeZoneSection from "../../components/TimeZoneSection.jsx";

export default function Home() {
    return (
        <div className="space-y-8">

            {/* 🎂 Birthday section */}
            <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">🎉 This Week's Birthdays</h2>
                <div className="flex flex-wrap gap-6">
                    {weeklyBirthdays.map((user) => (
                        <BirthdayCard key={user.id} user={user}/>
                    ))}
                </div>
            </section>

            {/* 📰 Last 3 Posts */}
            <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">📰 Latest Posts</h2>
                <div className="flex flex-wrap gap-6">
                    {latestPosts.slice(0, 6).map((post) => (
                        <PostCard key={post.id} post={post}/>
                    ))}
                </div>
            </section>


            {/* 📅 Upcoming Events */}
            <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">📅 Upcoming Events</h2>
                <div className="space-y-6">
                    {upcomingEvents.slice(0, 5).map((event) => (
                        <EventItem key={event.id} event={event}/>
                    ))}
                </div>
                <div className="mt-4">
                    <a href="/calendar" className="text-sm text-blue-600 hover:underline">
                        View Full Calendar →
                    </a>
                </div>
            </section>

            {/* After Upcoming Events */}
            <TimeZoneSection/>

        </div>
    );
}
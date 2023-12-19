import MemberItem from "./member-item";

export default function MembersList({ members }) {
    return (
        <>
            {members && Array.isArray(members) && members.length > 0
                ?
                <ul className="divide-y divide-gray-200">
                    {members.map((member) => (
                        <li key={member.id} className="py-3 sm:py-4">
                            <MemberItem member={member} />
                        </li>
                    ))}
                </ul>
                :
                <div className="text-center w-full py-10">
                    <span className="text-2xl text-gray-400">Пока что никого нет в команде.</span>
                </div>
            }
        </>
    );
};
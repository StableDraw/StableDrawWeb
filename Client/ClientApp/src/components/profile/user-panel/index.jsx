import React from "react";

export default function UserPanel({username, position, photo}) {
    return (
        <div className="rounded flex px-2">
            <div className="w-12 h-12 rounded-full overflow-hidden">
                <img src={photo} alt={username} className="object-cover w-full h-full" />
            </div>
            <div className="ml-4">
                <p className="text-lg font-semibold">{username}</p>
                <p className="text-sm font-light">{position}</p>
            </div>
        </div>
    )
}
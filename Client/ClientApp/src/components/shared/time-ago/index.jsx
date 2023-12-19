import {formatDistanceToNow} from "date-fns";
import {ru} from "date-fns/locale";

export default function TimeAgo({ from }) {
    const timeAgo = formatDistanceToNow(from, { addSuffix: true, locale: ru });

    return (
        <>
            {timeAgo}
        </>
    )
}
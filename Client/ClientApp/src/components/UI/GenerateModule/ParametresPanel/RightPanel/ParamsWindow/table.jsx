// import React, {useSelector} from 'react';
//
// const Table = () => {
//     const starships = useSelector(({ starships }) => starships.starships);
//     return (
//         starships
//             ? <div className="table">
//                 <TableHeader />
//                 {starships.map((starship, idx) => <TableRow key={idx} starship={starship} />)}
//             </div>
//             : <div>loading...</div>
//     );
// };
//
// export default Table;
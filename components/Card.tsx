// "use client"

// import Link from 'next/link';
// import { FaCheck, FaPencil } from 'react-icons/fa6';
// import { TfiClose } from 'react-icons/tfi';

// type Item = {
//   id: number;
//   name?: string;
//   content?: string;
// };

// type CardProps = {
//   item: Item;
//   onDelete: (id: number) => void;
//   onUpdate: (id: number, value: string) => void;
//   isModified: number | null;
//   setIsModified: (id: number | null) => void;
//   updateValue: string;
//   setUpdateValue: (value: string) => void;
// };

// function Card({ item, onDelete, onUpdate, isModified, setIsModified, updateValue, setUpdateValue }: CardProps) {
//     const toLink = (item: Item) => {
//         if (item.name) {
//             return `/todo/${item.id}`;
//         } else {
//             return "#"
//         }
//     };

//     const message = (item: Item) => {
//         if (item.name) {
//             const name = item.name;
//             return name;
//         } else {
//             return item.content;
//         }
//     }

//     return (
//         <Link href={toLink(item)} className={`pl-4 pr-4 p-2 bg-[#8e05c2] text-[#dbd8e3] rounded-3xl w-[80vw] md:w-[60vw] lg:w-[30vw] font-extrabold border-2 border-slate-900 flex gap-12 justify-between transition-transform duration-300 ease-in-out items-center shadow-md shadow-black sm:hover:translate-x-2 will-change-transform`}>
//         {isModified === item.id ? (
//             <div className="flex gap-2 justify-between w-full">
//                 <input
//                 className="text-[#dbd8e3] bg-[#000000] rounded-3xl pl-2"
//                 type="text"
//                 value={updateValue}
//                 onChange={(e) => setUpdateValue(e.target.value)}
//                 onClick={(e) => {
//                     e.stopPropagation();
//                     e.preventDefault();
//                 }}
//                 />
//                 <div className="flex gap-2">
//                 <button 
//                 className="z-10 pl-1 pr-1 bg-[#3e065f] rounded-2xl sm:hover:scale-[1.1] sm:hover:text-[green] transition-[5]"
//                 onClick={(e) => {
//                     e.stopPropagation();
//                     e.preventDefault();
//                     onUpdate(item.id, updateValue);
//                     setIsModified(null);
//                     }}><FaCheck className="text-[1.9rem] font-bold p-2" />
//                 </button>
//                 <button 
//                     className="z-10 pl-1 pr-1 bg-[#3e065f] rounded-2xl sm:hover:scale-[1.1] sm:hover:text-[red] transition-[5]"
//                     onClick={(e) => {
//                     e.stopPropagation();
//                     e.preventDefault();
//                     setIsModified(null);
//                     }}
//                     >
//                     <TfiClose className="text-[1.9rem] font-bold p-2" />
//                 </button>
//                 </div>
//             </div>
//         ) : (
//             <p>{message(item)}</p>
//         )}
//         {
//             isModified !== item.id && 
//             <div className="flex gap-2">
//             <button
//             className="z-10 pl-1 pr-1 bg-[#3e065f] rounded-2xl sm:hover:scale-[1.1] sm:hover:text-[yellow] transition-[5]"
//             onClick={(e) => {
//                 e.stopPropagation();
//                 e.preventDefault();
//                 setUpdateValue(item.name || item.content);
//                 setIsModified(isModified === item.id ? null : item.id);
//             }}
//             >
//             <FaPencil className="text-[1.9rem] font-bold p-2" />
//             </button>
//             <button
//             className="z-10 pl-1 pr-1 bg-[#3e065f] rounded-2xl sm:hover:scale-[1.1] sm:hover:text-[red] transition-[5]"
//             onClick={(e) => {
//                 e.stopPropagation();
//                 e.preventDefault();
//                 onDelete(item.id);
//             }}
//             >
//             <TfiClose className="text-[1.9rem] font-bold p-2" />
//             </button>
//         </div>
//         }
//         </Link>
//     );
// }

// export default Card;
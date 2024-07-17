import { forwardRef, useImperativeHandle, useRef } from 'react';


export default function Option({ opt, onSelect, answerSelected }) {
        const btnRef = useRef();
        const [key, val] = Object.entries(opt)[0]
        // console.log(key, val);

        function handleSelect() {
                btnRef.current.className='selected';
                onSelect();
        }
        // console.log(answerSelected);
        // const btnClassName = answerSelected ? '' : 'selected';

        return (
                <li key={key} className='answer'>
                        <button ref={btnRef} onClick={handleSelect} className='' disabled={answerSelected}>
                                {val}
                        </button>
                </li>
        )
}

// const Option = forwardRef(function Option({ opt, handleSelect }, ref) {
//         const btnRef = useRef();
//         console.log(opt)
//         const [key, val] = Object.entries(opt)[0]
//         console.log(key, val);
//         return (
//                 <li key={key} className='answer'>
//                         <button ref={btnRef} onClick={handleSelect} className=''>
//                                 {val}
//                         </button>
//                 </li>
//         )
// });

// export default Option;
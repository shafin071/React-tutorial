import { useRef } from 'react';
import ModalButton from './ModalButton';
import Input from './Input';
import Modal from './Modal';


export default function ProjectForm({ handleProjectSave, handleProjectCancel }) {
        const modal = useRef();

        const title = useRef();
        const description = useRef();
        const dueDate = useRef();

        function handleSave() {
                let projectData = {
                        id: Date.now(),
                        title: title.current.value,
                        description: description.current.value,
                        dueDate: dueDate.current.value,
                        tasks: []
                }

                if (
                        projectData.title.trim() === '' ||
                        projectData.description.trim() === '' ||
                        projectData.dueDate.trim() === ''
                ) {
                        modal.current.open();
                        return;
                }

                // console.log("projectData: ", projectData);
                handleProjectSave(projectData);
        }

        return (
                <>
                        <Modal ref={modal}>
                                <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
                                <p className="text-stone-600 mb-4">
                                        Oops ... looks like you forgot to enter a value.
                                </p>
                                <p className="text-stone-600 mb-4">
                                        Please make sure you provide a valid value for every input field.
                                </p>
                                <div className="flex items-center justify-end">
                                        <form method="dialog" className="mt-4 text-right">
                                                <ModalButton>Okay</ModalButton>
                                        </form>
                                </div>
                        </Modal>

                        <div className="w-[35rem] mt-16">
                                <menu className="flex items-center justify-end gap-4 my-4">
                                        <li>
                                                <button className="text-stone-800 hover:text-stone-950" onClick={handleProjectCancel}>
                                                        Cancel
                                                </button>
                                        </li>
                                        <li>
                                                <button
                                                        className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
                                                        onClick={handleSave}
                                                >
                                                        Save
                                                </button>
                                        </li>
                                </menu>
                                <div>
                                        <Input ref={title} type="text" label="Title" />
                                        <Input ref={description} label="Description" textarea />
                                        <Input ref={dueDate} type="date" label="Due Date" />
                                </div>
                        </div>
                </>

        );
}


// const ProjectForm = forwardRef(function ProjectForm({ props }, ref) {
//         const formRef = useRef();

//         useImperativeHandle(ref, () => {
//                 return {
//                         showForm() {
//                                 console.log("formRef.current: ", formRef.current);
//                                 formRef.current.style.display = 'block';
//                         }
//                 };
//         });

//         return (
//                 <div ref={formRef} className='hidden'>
//                         <form className="mt-4 text-right">
//                                 <label>Something</label><input type="text" />
//                         </form>
//                 </div>

//         )
// });

// export default ProjectForm;
import { useRef } from 'react';

import Modal from './Modal';
import ModalButton from './ModalButton';
import Tasks from "./Tasks";


export default function ProjectPage({ project, deleteProject, addTask, deleteTask }) {
        const modal = useRef();

        console.log("project in ProjectPage: ", project);

        const formattedDate = new Date(project.dueDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
        });

        function confirmDelete() {
                modal.current.open();
        }

        return (
                <>
                        <Modal ref={modal}>
                                <p className="text-stone-600 mb-4">Are you sure you want to delete this project ?</p>
                                {/* form method="dialog" is native html. This causes the modal to automatically close when button is clicked.
                            Check MDN docs */}
                                <div className="flex items-center justify-end">
                                        <form>
                                                <ModalButton onClick={deleteProject}>Yes </ModalButton>
                                                <ModalButton value="cancel" formMethod="dialog">No </ModalButton>
                                        </form>
                                </div>

                        </Modal>
                        <div className="w-[35rem] mt-16">
                                <header className="pb-4 mb-4 border-b-2 border-stone-300">
                                        <div className="flex items-center justify-between">
                                                <h1 className="text-3xl font-bold text-stone-600 mb-2">
                                                        {project.title}
                                                </h1>
                                                <button className="text-stone-600 hover:text-stone-950" onClick={confirmDelete}>
                                                        Delete
                                                </button>
                                        </div>
                                        <p className="mb-4 text-stone-400">{formattedDate}</p>
                                        <p className="text-stone-600 whitespace-pre-wrap">
                                                {project.description}
                                        </p>
                                </header>

                                <Tasks addTask={addTask} tasks={project.tasks} deleteTask={deleteTask} />

                        </div>
                </>

        );
}
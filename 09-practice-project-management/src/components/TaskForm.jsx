import { useRef } from 'react';

import Modal from './Modal';
import ModalButton from './ModalButton';


export default function TaskForm({ addTask }) {
        const modal = useRef();
        const taskName = useRef();

        function handleAddTask() {
                if (taskName.current.value.trim() === '') {
                        modal.current.open();
                        return
                } else {
                        let task = {
                                id: Date.now(),
                                name: taskName.current.value
                        }
                        addTask(task);
                        taskName.current.value = '';
                }
        }

        return (
                <>
                        <Modal ref={modal}>
                                <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
                                <p className="text-stone-600 mb-4">
                                        Oops ... looks like you forgot to enter a task name.
                                </p>
                                <div className="flex items-center justify-end">
                                        <form method="dialog" className="mt-4 text-right">
                                                <ModalButton>Okay</ModalButton>
                                        </form>
                                </div>
                        </Modal>
                        <div className="flex items-center gap-4">
                                <input ref={taskName} type="text" className="w-64 px-2 py-1 rounded-sm bg-stone-200" />
                                <button className="text-stone-700 hover:text-stone-950" onClick={handleAddTask}>
                                        Add Task
                                </button>
                        </div>
                </>

        );
}
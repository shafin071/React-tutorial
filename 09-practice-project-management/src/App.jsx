import { forwardRef, useState, useRef } from 'react';
import NoProjectSelected from './components/NoProjectSelected';
import ProjectSidebar from "./components/ProjectSidebar";
import ProjectForm from "./components/ProjectForm";
import ProjectPage from './components/ProjectPage';


function App() {
        const [addProjectClicked, setAddProjectClicked] = useState(false);
        const [myProjects, setMyProjects] = useState([]);
        const [selectedProject, setSelectedProject] = useState({});

        const noProjSelected = Object.keys(selectedProject).length === 0;
        let selectedProjectID = (!noProjSelected) ? selectedProject.id : 0;

        function handleAddProject() {
                setAddProjectClicked(true);
        }

        function handleProjectSave(projectData) {
                setMyProjects((prevProjects) => {
                        return [
                                projectData,
                                ...prevProjects,
                        ]
                });
                setAddProjectClicked(false);
        }

        function handleProjectCancel() {
                setAddProjectClicked(false);
        }

        function showSelectedProject(project) {
                setSelectedProject(project);
        }

        function handleProjectDelete() {
                // For deletion, a deep copy is typically not needed because you're removing an item from the array, 
                // not modifying its properties.
                // When you delete an item from an array, you're removing a reference to that item. 
                // The item itself is not being modified, only its reference is being removed from the array. 
                // Therefore, a shallow copy of the array, where the references to the original items are copied, 
                // is sufficient to ensure that the original array remains unchanged.
                setMyProjects((prevProjects) => {
                        return prevProjects.filter((project) => project.id !== selectedProject.id)
                });
                setSelectedProject({});   // so that the deleted project page is not displayed anymore
        }

        function handleAddTask(task,) {
                setMyProjects((prevProjects) => {
                        let projectID = selectedProject.id;
                        let projects = [...prevProjects]
                        let project = projects.filter((project) => project.id === projectID);
                        if (project.length > 0) {
                                project[0].tasks.push(task);
                        }

                        return projects;
                });
        }

        function handleDeleteTask(taskID) {
                setMyProjects((prevProjects) => {
                        let projectID = selectedProject.id;
                        let projects = [...prevProjects];
                        let project = projects.filter((project) => project.id === projectID);
                        if (project.length > 0) {
                                let projectTasks = project[0].tasks;
                                if (projectTasks.length > 0) {
                                        projectTasks = projectTasks.filter((task) => task.id !== taskID);
                                        project[0].tasks = projectTasks;
                                }
                        }
                        return projects;
                });
        }

        return (
                <>
                        <h1 className="my-8 text-center text-5xl font-bold">Hello World</h1>
                        <main className="h-screen my-8 flex gap-8">
                                <ProjectSidebar
                                        addProject={handleAddProject}
                                        showSelectedProject={showSelectedProject}
                                        selectedProjectID={selectedProjectID}
                                        existingProjects={myProjects}
                                />

                                {noProjSelected && !addProjectClicked && <NoProjectSelected addProject={handleAddProject} />}

                                {!addProjectClicked && !noProjSelected &&
                                        <ProjectPage project={selectedProject}
                                                deleteProject={handleProjectDelete}
                                                addTask={handleAddTask}
                                                deleteTask={handleDeleteTask}
                                        />
                                }

                                {addProjectClicked &&
                                        <ProjectForm
                                                handleProjectSave={handleProjectSave}
                                                handleProjectCancel={handleProjectCancel}
                                        />}
                        </main>

                </>
        );
}

export default App;

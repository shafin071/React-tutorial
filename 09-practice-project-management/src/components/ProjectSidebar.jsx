import AddProjectButton from "./AddProjectButton";


export default function ProjectSidebar({ addProject, showSelectedProject, selectedProjectID, existingProjects }) {

        function handleSelect(projectID) {
                const filteredProject = existingProjects.filter((proj) => proj.id === projectID);
                const project = (filteredProject.length > 0) ? filteredProject[0] : {}
                showSelectedProject(project)
        }

        return (
                <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
                        <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">Your Projects</h2>

                        <AddProjectButton
                                className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100"
                                onClick={addProject}>
                                + Add Project
                        </AddProjectButton>

                        <ul className="mt-8">
                                {existingProjects.length > 0 && existingProjects.map(
                                        (project, i) => {
                                                let cssClasses = "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800";
                                                
                                                if (project.id === selectedProjectID) {
                                                        cssClasses += ' bg-stone-800 text-stone-200'
                                                      } else {
                                                        cssClasses += ' text-stone-400'
                                                      }

                                                return (
                                                        <li key={project.id} className={cssClasses}
                                                                onClick={() => handleSelect(project.id)}> {project.title}
                                                        </li>
                                                )

                                        }
                                )
                                }
                        </ul>


                </aside >
        )
}
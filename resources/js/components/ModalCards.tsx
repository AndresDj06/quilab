import React, { useState } from 'react';
import type { ProjectCard as ProjectCardType } from '@/types';
import { ProjectCard } from '@/components/ProjectCard';
import { ModalCard } from '@/components/ModalCard';

export interface ModalCardsProps {
    projects: ProjectCardType[];
    dark?: boolean;
}

export function ModalCards({ projects, dark = false }: ModalCardsProps) {
    const [selectedProject, setSelectedProject] = useState<ProjectCardType | null>(null);

    return (
        <div>
            {projects.map((project, index) => (
                <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    dark={dark}
                    onOpenModal={() => setSelectedProject(project)}
                />
            ))}

            {selectedProject ? (
                <ModalCard
                    project={selectedProject}
                    isOpen={Boolean(selectedProject)}
                    onClose={() => setSelectedProject(null)}
                />
            ) : null}
        </div>
    );
}

export { ModalCard };
export default ModalCards;

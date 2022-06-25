import React, { FC } from 'react';
import './ProjectEditor.css';

type ProjectEditorProps = {
  id: string
};

const ProjectEditor: FC<ProjectEditorProps> = ({ id }: ProjectEditorProps) => (
  <div className="project-editor">
    {`Project Editor, id: ${id}`}
  </div>
);

export default ProjectEditor;

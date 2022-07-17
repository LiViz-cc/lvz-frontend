import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import ProjectEditor from '../common/ProjectEditor';

import './ProjectEdit.scss';

const ProjectEdit: FC = () => {
  const { id } = useParams(); // id could not be empty string

  return (
    <div className="project-edit">
      {id && <ProjectEditor id={id} />}
    </div>
  );
};

export default ProjectEdit;

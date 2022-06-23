import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import ProjectEditor from '../common/ProjectEditor';

const ProjectEdit: FC = () => {
  const { id } = useParams(); // id could not be empty string

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {
        id && <ProjectEditor id={id} />
      }
    </div>
  );
};

export default ProjectEdit;

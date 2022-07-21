import React from 'react';
import type { FC } from 'react';
import { Row, Col } from 'antd';
import type { ObjectId, Project } from '../../models';
import ProjectCard from './ProjectCard';

type ProjectsGridProps = {
  projects: Project[],
  loading?: boolean,
};

const ProjectsGrid: FC<ProjectsGridProps> = (props: ProjectsGridProps) => {
  const { projects, loading } = props;

  const onProjectCardClick = (id: ObjectId) => {
    // TODO: direct to project editor
    console.log(id);
  };

  return (
    <Row gutter={[16, 16]}>
      {
        projects.map((project) => (
          <Col key={project.id} xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
            <ProjectCard
              project={project}
              loading={loading}
              onClick={() => onProjectCardClick(project.id)}
            />
          </Col>
        ))
      }
    </Row>
  );
};

ProjectsGrid.defaultProps = {
  loading: false,
};

export default ProjectsGrid;

import React from 'react';
import type { FC, MouseEventHandler } from 'react';
import { Card } from 'antd';
import type { Project } from '../../models';

type ProjectCardProps = {
  project: Project,
  loading?: boolean,
  onClick?: MouseEventHandler<HTMLDivElement>,
};

const ProjectCard: FC<ProjectCardProps> = (props: ProjectCardProps) => {
  const { project, loading, onClick } = props;
  return (
    <Card
      bordered={false}
      hoverable
      loading={loading}
      onClick={onClick}
    >
      <Card.Meta
        title={project.name}
        description={project.name}
      />
    </Card>
  );
};

ProjectCard.defaultProps = {
  loading: false,
  onClick: undefined,
};

export default ProjectCard;

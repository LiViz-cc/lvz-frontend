import React from 'react';
import type { FC, MouseEventHandler } from 'react';
import { Card } from 'antd';
import { InfoCircleOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
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
      actions={[
        <InfoCircleOutlined key="info" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Card.Meta
        title={project.name}
        description={(
          <div>
            <div>{`Created: ${project.created}`}</div>
            <div>{`Modified: ${project.modified}`}</div>
            <div>{`Created By: ${project.created_by}`}</div>
          </div>
        )}
      />
    </Card>
  );
};

ProjectCard.defaultProps = {
  loading: false,
  onClick: undefined,
};

export default ProjectCard;

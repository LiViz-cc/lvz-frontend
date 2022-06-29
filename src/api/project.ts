import request from './request';

export const getProjects = () => request({
  method: 'get',
  url: 'projects',
});

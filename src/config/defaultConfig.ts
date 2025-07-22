import { AppConfig } from './types';

const defaultConfig: AppConfig = {
  resources: [
    {
      name: 'users',
      label: 'Users',
      idField: 'id',
      endpoints: {
        list: '/users',
        create: '/users',
        update: '/users/:id',
        delete: '/users/:id',
      },
      fields: [
        { name: 'id', label: 'ID', type: 'number', inputType: 'hidden', required: false },
        { name: 'name', label: 'Name', type: 'string', inputType: 'text', required: true },
        { name: 'email', label: 'Email', type: 'string', inputType: 'email', required: true },
        { name: 'role', label: 'Role', type: 'enum', inputType: 'select', enumValues: ['admin', 'user'], required: true },
      ],
    },
    {
      name: 'posts',
      label: 'Posts',
      idField: 'id',
      endpoints: {
        list: '/posts',
        create: '/posts',
        update: '/posts/:id',
        delete: '/posts/:id',
      },
      fields: [
        { name: 'id', label: 'ID', type: 'number', inputType: 'hidden', required: false },
        { name: 'title', label: 'Title', type: 'string', inputType: 'text', required: true },
        { name: 'content', label: 'Content', type: 'string', inputType: 'textarea', required: true },
        { name: 'authorId', label: 'Author', type: 'number', inputType: 'number', required: true },
      ],
    },
  ],
  settings: {
    apiBaseUrl: 'https://api.example.com',
    headers: {},
  },
};

export default defaultConfig;

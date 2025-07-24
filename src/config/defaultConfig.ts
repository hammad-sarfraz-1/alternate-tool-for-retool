import { AppConfig } from './types';

const defaultConfig: AppConfig = {
  resources: [
    {
      name: 'levels',
      label: 'Levels',
      idField: 'id',
      endpoints: {
        list: '/levels',
        create: '/levels',
        update: '/levels/:id',
        delete: '/levels/:id',
      },
      fields: [
        { name: 'id', label: 'ID', type: 'number', inputType: 'hidden', required: false },
        { name: 'name', label: 'Level Name', type: 'string', inputType: 'text', required: true },
        { name: 'description', label: 'Description', type: 'string', inputType: 'textarea', required: false },
      ],
    },
    {
      name: 'courses',
      label: 'Courses',
      idField: 'id',
      endpoints: {
        list: '/courses',
        create: '/courses',
        update: '/courses/:id',
        delete: '/courses/:id',
      },
      fields: [
        { name: 'id', label: 'ID', type: 'number', inputType: 'hidden', required: false },
        { name: 'levelId', label: 'Level', type: 'number', inputType: 'number', required: true },
        { name: 'name', label: 'Course Name', type: 'string', inputType: 'text', required: true },
        { name: 'description', label: 'Description', type: 'string', inputType: 'textarea', required: false },
      ],
    },
    {
      name: 'trainings',
      label: 'Trainings',
      idField: 'id',
      endpoints: {
        list: '/trainings',
        create: '/trainings',
        update: '/trainings/:id',
        delete: '/trainings/:id',
      },
      fields: [
        { name: 'id', label: 'ID', type: 'number', inputType: 'hidden', required: false },
        { name: 'courseId', label: 'Course', type: 'number', inputType: 'number', required: true },
        { name: 'title', label: 'Training Title', type: 'string', inputType: 'text', required: true },
        { name: 'content', label: 'Content', type: 'string', inputType: 'textarea', required: false },
      ],
    },
    {
      name: 'questions',
      label: 'Questions',
      idField: 'id',
      endpoints: {
        list: '/questions',
        create: '/questions',
        update: '/questions/:id',
        delete: '/questions/:id',
      },
      fields: [
        { name: 'id', label: 'ID', type: 'number', inputType: 'hidden', required: false },
        { name: 'trainingId', label: 'Training', type: 'number', inputType: 'number', required: true },
        { name: 'question', label: 'Question', type: 'string', inputType: 'textarea', required: true },
        { name: 'answer', label: 'Answer', type: 'string', inputType: 'text', required: true },
      ],
    },
    {
      name: 'grandQuiz',
      label: 'Grand Quiz',
      idField: 'id',
      endpoints: {
        list: '/grandQuiz',
        create: '/grandQuiz',
        update: '/grandQuiz/:id',
        delete: '/grandQuiz/:id',
      },
      fields: [
        { name: 'id', label: 'ID', type: 'number', inputType: 'hidden', required: false },
        { name: 'levelId', label: 'Level', type: 'number', inputType: 'number', required: true },
        { name: 'title', label: 'Quiz Title', type: 'string', inputType: 'text', required: true },
        { name: 'questions', label: 'Questions', type: 'custom', inputType: 'text', required: false },
      ],
    },
  ],
  settings: {
    apiBaseUrl: 'https://api.example.com',
    headers: {},
  },
};

export default defaultConfig;

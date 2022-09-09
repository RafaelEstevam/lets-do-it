/* eslint-disable */
import { rest } from 'msw';
import { v4 as uuidv4 } from 'uuid';

import { loginReq } from '@/interfaces/login.interface';
import { task } from '@/interfaces/task.interface';
import status from '@/enum/status.enun';
import priority from '@/enum/priority.enun';

let tasksList: task[] = [
  { id: uuidv4(), description: 'Descrição da tarefa', endDate: '2019-06-21', name: 'Tarefa 1', priority: priority[0], startDate: '2019-06-01', status: status[0] },
  { id: uuidv4(), description: 'Descrição da tarefa', endDate: '2022-06-20', name: 'Tarefa 2', priority: priority[2], startDate: '2019-06-02', status: status[1] },
  { id: uuidv4(), description: 'Descrição da tarefa', endDate: '2022-06-27', name: 'Tarefa 3', priority: priority[2], startDate: '2019-06-03', status: status[3] },
  { id: uuidv4(), description: 'Descrição da tarefa', endDate: '2021-06-28', name: 'Tarefa 4', priority: priority[1], startDate: '2019-06-07', status: status[1] },
  { id: uuidv4(), description: 'Descrição da tarefa', endDate: '2020-06-03', name: 'Tarefa 5', priority: priority[1], startDate: '2019-06-12', status: status[1] },
  { id: uuidv4(), description: 'Descrição da tarefa', endDate: '2022-06-05', name: 'Tarefa 6', priority: priority[0], startDate: '2019-06-13', status: status[2] },
  { id: uuidv4(), description: 'Descrição da tarefa', endDate: '2019-06-21', name: 'Tarefa 1', priority: priority[0], startDate: '2019-06-01', status: status[0] },
  { id: uuidv4(), description: 'Descrição da tarefa', endDate: '2022-06-20', name: 'Tarefa 2', priority: priority[2], startDate: '2019-06-02', status: status[1] },
  { id: uuidv4(), description: 'Descrição da tarefa', endDate: '2022-06-27', name: 'Tarefa 3', priority: priority[2], startDate: '2019-06-03', status: status[3] },
  { id: uuidv4(), description: 'Descrição da tarefa', endDate: '2021-06-28', name: 'Tarefa 4', priority: priority[1], startDate: '2019-06-07', status: status[3] },
  { id: uuidv4(), description: 'Descrição da tarefa', endDate: '2020-06-03', name: 'Tarefa 5', priority: priority[1], startDate: '2019-06-12', status: status[2] },
  { id: uuidv4(), description: 'Descrição da tarefa', endDate: '2022-06-05', name: 'Tarefa 6', priority: priority[0], startDate: '2019-06-13', status: status[0] },
  { id: uuidv4(), description: 'Descrição da tarefa', endDate: '2019-06-21', name: 'Tarefa 1', priority: priority[0], startDate: '2019-06-01', status: status[0] },
  { id: uuidv4(), description: 'Descrição da tarefa', endDate: '2022-06-20', name: 'Tarefa 2', priority: priority[2], startDate: '2019-06-02', status: status[2] },
  { id: uuidv4(), description: 'Descrição da tarefa', endDate: '2022-06-27', name: 'Tarefa 3', priority: priority[2], startDate: '2019-06-03', status: status[3] },
  { id: uuidv4(), description: 'Descrição da tarefa', endDate: '2021-06-28', name: 'Tarefa 4', priority: priority[1], startDate: '2019-06-07', status: status[1] },
  { id: uuidv4(), description: 'Descrição da tarefa', endDate: '2020-06-03', name: 'Tarefa 5', priority: priority[1], startDate: '2019-06-12', status: status[0] },
  { id: uuidv4(), description: 'Descrição da tarefa', endDate: '2022-06-05', name: 'Tarefa 6', priority: priority[0], startDate: '2019-06-13', status: status[0] },
];

export const handlers = [
  rest.post('/login', async (req, res, ctx) => {
    const { email, password }: loginReq = await req.json();

    if (email && password) {
      return res(
        ctx.json({ email })
      )
    } else {
      return res(ctx.status(401, 'Not authorized'));
    }
  }),

  rest.get('/tasksList', (req, res, ctx) => {
    return res(ctx.json(tasksList));
  }),

  rest.get('/tasksList/:id', async (req, res, ctx) => {
    const { id } = await req.params;
    const task = tasksList.find((item) => { return item.id === id });
    if (task) {
      return res(ctx.json(task));
    } else {
      return res(ctx.status(404, 'Not found'));
    }
  }),

  rest.post('/taskItem/edit/:id', async (req, res, ctx) => {
    const task: task = await req.json();
    const { id } = await req.params;
    if (id === 'new') {
      task.id = uuidv4();
      tasksList.push(task);
    } else {
      tasksList = tasksList.filter((item) => { return item.id !== id });
      tasksList.push(task);
      return res(ctx.json(tasksList));
    };
    return res(ctx.json({ message: 'teste' }));
  }),

  rest.delete('/taskItem/edit/:id', async (req, res, ctx) => {
    const { id } = await req.params;
    tasksList = tasksList.filter((item) => { return item.id !== id });
    return res(ctx.json(tasksList));
    // if(id === 'new'){
    //   task.id = uuidv4();
    //   tasksList.push(task);
    // } else {
    //   tasksList = tasksList.filter((item) => { return item.id !== id});
    //   return res(ctx.json(tasksList));
    // };
    // return res(ctx.json({message: 'teste'}));
  }),

  rest.get('/message', (req, res, ctx) => {
    return res(
      ctx.json({
        message: 'it works :)'
      })
    )
  })
];

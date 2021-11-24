import { render, screen } from '@testing-library/react';
/* import App from './App'; */
import Tasks from './pages/tasksPage/Tasks';
import LoginProvider from './context/LoginProvider';

describe('Página de tarefas', () => {

  const firstTask = {
    _id: 1,
    task: "Cortar o cabelo",
    status: "Pending",
    createdAt: 1,
    userId: 1,
  };

  const secondTask = {
    _id: 2,
    task: "Enviar currículo",
    status: "Concluded",
    createdAt: 2,
    userId: 1,
  };

  const thirdTask = {
    _id: 3,
    task: "Assistir o jogo do galo",
    status: "In Progress",
    createdAt: 3,
    userId: 1,
  };

  const allTasksFromAPI = [firstTask, secondTask, thirdTask];
  
  afterEach(() => jest.clearAllMocks());

  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(allTasksFromAPI),
    });
    
    render(
    <LoginProvider>
      <Tasks />
    </LoginProvider>); 
  });

  it('testa se a página apresenta um botão para logout', () => {
    const logoutButton = screen.getByText("Logout");
    expect(logoutButton).toBeInTheDocument();
  });

  it('testa se a página apresenta um input do tipo texto, para adicionar uma nova tarefa', () => {
    const addNewTaskInput = screen.getByPlaceholderText("add a new task");
    expect(addNewTaskInput).toBeInTheDocument();
  });

  it('testa se as tarefas vindas da API são renderizadas pela página', async () => {
    /* expect(fetch).toBeCalledTimes(1); */
    const pendingTask = await screen.findByText(firstTask.task);
    expect(pendingTask).toBeInTheDocument();
  });
});


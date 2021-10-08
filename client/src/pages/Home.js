import axios from 'axios';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import {
  ListBox,
  DateHeader,
  DateToday,
  TasksList,
  Task,
  TaskButton,
  TaskButtonOuter,
  TaskButtonInner,
  TaskContent,
  TaskActions,
  TaskTitle,
  TaskDescription,
} from '../components/styles/Home.styled';

const Home = () => {
  const user_id = localStorage.getItem('user_id');

  const [data, setData] = useState(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [project, setProject] = useState('');
  const [priority, setPriority] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}`);

        if (data) {
          console.log(data);
          setData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <>
      <Header />
      <ListBox>
        <DateHeader>
          Today <DateToday>{new Date().toDateString()}</DateToday>
        </DateHeader>
        <TasksList>
          {data
            ? data.map((task) => {
                return (
                  <Task key={task._id}>
                    <TaskButton>
                      <TaskButtonOuter
                        onClick={() => {
                          console.log('clik');
                        }}
                        completed={task.completed}
                      >
                        <TaskButtonInner />
                      </TaskButtonOuter>
                    </TaskButton>
                    <TaskContent>
                      <TaskTitle>{task.title}</TaskTitle>
                      <TaskDescription>{task.description}</TaskDescription>
                    </TaskContent>
                    <TaskActions>Akcje</TaskActions>
                  </Task>
                );
              })
            : "You're all done for the week! #TodoistZero "}
        </TasksList>
      </ListBox>
    </>
  );
};

export default Home;

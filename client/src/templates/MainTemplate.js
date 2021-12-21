import { useState, useEffect, createContext } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectTasks } from '../features/Tasks/tasksSlice';
import TaskCreate from '../features/Tasks/TaskCreate';
import Header from '../components/Header';
import ProjectsList from '../features/Projects/ProjectsList';
import Today from '../components/Today';
import GlobalStyles from '../components/styles/Global';
import { BsChevronDown } from 'react-icons/bs';
import {
  Wrapper,
  Message,
  StyledAside,
  Overlay,
  AsideTitle,
  Navigation,
  ListItem,
  Project,
} from '../components/styles/Home.styled';

export const Context = createContext();

const MainTemplate = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAsideVisible, setIsAsideVisible] = useState(false);
  const [createMessage, setCreateMessage] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [project, setProject] = useState('Today');
  const [size, setSize] = useState(window.innerWidth);

  const dispatch = useDispatch();

  const user = localStorage.getItem('user');

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/users/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    const handleSize = () => {
      setSize(window.innerWidth);
      size <= 768 ? setIsAsideVisible(false) : setIsAsideVisible(true);
    };

    window.addEventListener('resize', handleSize);
    size > 768 && setIsAsideVisible(true);
  }, [size]);

  const filterHandler = (query) => {
    if (query) {
      dispatch(selectTasks(query));
      setProject(query);
      if (size < 767) {
        toggleAside();
      }
    } else {
      dispatch(selectTasks());
      setProject('All tasks');
    }
    navigate('/task');
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleAside = () => {
    setIsAsideVisible(!isAsideVisible);
  };

  return (
    <>
      <GlobalStyles />
      <Header
        showModal={toggleModal}
        isAsideVisible={isAsideVisible}
        toggleAside={toggleAside}
        filterHandler={filterHandler}
      />
      <Wrapper>
        <StyledAside isAsideVisible={isAsideVisible}>
          <Navigation>
            <ListItem>
              <Today />
              <Project>Today</Project>
            </ListItem>
            <li>
              <ListItem as='div'>
                <span>
                  <BsChevronDown />
                </span>
                <AsideTitle>Projects</AsideTitle>
              </ListItem>
              <ProjectsList filterHandler={filterHandler} />
            </li>
          </Navigation>
        </StyledAside>
        <Overlay isAsideVisible={isAsideVisible} onClick={toggleAside} />
        <Context.Provider
          value={{ project, createMessage, setCreateMessage, setDeleteMessage }}
        >
          <Outlet />
        </Context.Provider>
      </Wrapper>
      {isModalVisible ? (
        <TaskCreate
          hideModal={toggleModal}
          setCreateMessage={setCreateMessage}
        />
      ) : null}
      {createMessage ? (
        <Message>
          Task successfully created for {new Date().toLocaleDateString()}{' '}
        </Message>
      ) : null}
      {deleteMessage ? <Message>Task successfully deleted</Message> : null}
    </>
  );
};

export default MainTemplate;

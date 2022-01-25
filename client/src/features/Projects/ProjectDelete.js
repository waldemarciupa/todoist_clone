import { useDispatch } from 'react-redux';
import { deleteProject } from './projectsSlice';
import ProjectModal from './ProjectModal';

const ProjectDelete = ({ id, name, hideModal, filterHandler }) => {
  const dispatch = useDispatch();
  const user = localStorage.getItem('user');
  const user_id = localStorage.getItem('user_id');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteProject({ id, user, user_id }));
    hideModal();
    filterHandler();
  };

  return (
    <ProjectModal
      onClick={hideModal}
      title={'Delete'}
      handleSubmit={handleSubmit}
      hideProjectModal={hideModal}
    >
      <div>
        Are you sure you want to delete <b>{name}</b>?
      </div>
    </ProjectModal>
  );
};

export default ProjectDelete;
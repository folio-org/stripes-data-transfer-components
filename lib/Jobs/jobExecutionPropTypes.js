import PropTypes from 'prop-types';

const jobExecutionPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  hrId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  jobProfileInfo: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    dataType: PropTypes.string,
  }),
  parentJobId: PropTypes.string,
  subordinationType: PropTypes.string,
  sourcePath: PropTypes.string,
  fileName: PropTypes.string,
  runBy: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
  progress: PropTypes.object.isRequired,
  startedDate: PropTypes.string,
  completedDate: PropTypes.string,
  status: PropTypes.string.isRequired,
  uiStatus: PropTypes.string,
  userId: PropTypes.string,
});

export default jobExecutionPropTypes;

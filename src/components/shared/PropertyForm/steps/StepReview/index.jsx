import PropTypes from 'prop-types';

const StepReview = ({ form }) => {
    return <pre>{JSON.stringify(form, null, 4)}</pre>;
};

StepReview.propTypes = {
    form: PropTypes.shape({}),
};

export { StepReview };

import { Stack } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const Container = ({ children, onDragEnd }) => {
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="gallery" direction="horizontal">
                {(droppable) => (
                    <Stack
                        spacing={4}
                        pb={4}
                        direction="row"
                        overflowY="hidden"
                        overflowX="auto"
                        ref={droppable.innerRef}
                        {...droppable.droppableProps}
                    >
                        {children}
                        {droppable.placeholder}
                    </Stack>
                )}
            </Droppable>
        </DragDropContext>
    );
};

Container.propTypes = {
    children: PropTypes.node.isRequired,
    onDragEnd: PropTypes.func.isRequired,
};

Container.defaultProps = {};

export { Container };

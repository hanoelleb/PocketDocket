export {todoFactory};

const todoFactory = (task, isDone, details='') => {
   
    const editDetails = ( newDetails ) => {
        details = newDetails;
    }

    const setIsDone = ( done )  => {
        isDone = done;
    }

    const getIsDone = () => {
        return isDone;
    }

    return { task, getIsDone, details, setIsDone };
};

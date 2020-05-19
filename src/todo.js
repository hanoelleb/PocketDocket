export {todoFactory};

const todoFactory = (task, isDone, details='') => {
   
    const editDetails = ( newDetails ) => {
        details = newDetails;
    }

    const setIsDone = ( done )  => {
	console.log('before: ' + isDone);
        isDone = done;
	console.log('after: ' + isDone);
    }

    const getIsDone = () => {
        return isDone;
    }

    return { task, getIsDone, details, setIsDone };
};

export { projectFactory, projectRoster };

const projectFactory = (title, date, priority, category, completed, description='', notes='') => {
    return {title, date, priority, category, completed};
}

//module that contains all projects
const projectRoster = (() => {

    var roster = [];

    const getRoster = () => { return roster };

    const addToRoster = ( project ) => { roster.push(project) };

    return { getRoster, addToRoster };
})();

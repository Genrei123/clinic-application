import User from "./User/User"

const syncDB = () => {
    User.sync();
}

export default syncDB;
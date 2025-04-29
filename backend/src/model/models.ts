import User from "./User/User"

const syncDB = () => {
    User.sync({ alter: true });
}

export default syncDB;
import User from "./User/User"
import Patient from "./Patient/Patient"

const syncDB = () => {
    User.sync();
    Patient.sync();
}

export default syncDB;
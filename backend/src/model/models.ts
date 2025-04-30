import User from "./User/User"
import Patient from "./Patient/Patient"
import Checkup from "./Checkup/Checkup"

const syncDB = () => {
    User.sync();
    Patient.sync();
    Checkup.sync();
}

export default syncDB;
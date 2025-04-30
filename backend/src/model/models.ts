import User from "./User/User"
import Patient from "./Patient/Patient"
import Checkup from "./Checkup/Checkup"
import PhilMember from "./PhilMember/PhilMember"

const syncDB = () => {
    User.sync();
    Patient.sync();
    Checkup.sync();
    PhilMember.sync();
}

export default syncDB;
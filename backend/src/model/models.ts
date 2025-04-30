import User from "./User/User"
import Patient from "./Patient/Patient"
import Checkup from "./Checkup/Checkup"
import PhilMember from "./PhilMember/PhilMember"
import Employee from "./Employee/Employee"

const syncDB = () => {
    User.sync();
    Patient.sync();
    Checkup.sync();
    PhilMember.sync();
    Employee.sync();
}

export default syncDB;
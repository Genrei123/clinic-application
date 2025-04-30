import User from "./User/User"
import Patient from "./Patient/Patient"
import Checkup from "./Checkup/Checkup"
import PhilMember from "./PhilMember/PhilMember"
import Branch from "./Branch/Branch"
import Employee from "./Employee/Employee"
import Medicine from "./Medicine/Medicine"
import Service from "./Service/Service"
import Inventory from "./Inventory/Inventory"

const syncDB = () => {
    User.sync();
    Patient.sync();
    Checkup.sync();
    PhilMember.sync();
    Employee.sync();
    Branch.sync();
    Medicine.sync();
    Service.sync();
    Inventory.sync();
}

export default syncDB;
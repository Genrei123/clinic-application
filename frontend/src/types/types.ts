export interface Login {
    username: string,
    password: string,
}

export interface Register {
    username: string,
    password: string,
    //email: string,
}

export interface User {
    id: number,
    username: string,
    //password: string,
    //email: string,
    // isVerified: boolean,
    // verificationToken: string,
    // verificationExpires: string,
}

export interface Baby {
    BabyID: number,
    ClientNumber: number,
    MemberID: number,
    EmployeeID: number,
    BranchID: number,
    AccountID: number,
    DeliveryType: string,
    BabyWeight: string,
    BabyHeight: string,
}

export interface Inventory {
    InventoryID: number,
    BranchID: number,
    MedicineID: number,
    EmployeeID: number,
    InventoryStatus: boolean,
    InventoryRequest: string,
}

export interface Checkup {
    CheckupID: number,
    ClientNumber: number,
    EmployeeID: number,
    
}






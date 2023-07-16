

//classes 

class Person {
    constructor(firstName, lastName, age, address, phoneNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age; 
        this.address = address;
        this.phoneNumber = phoneNumber;
    }
};


getFullName() {
    return `Full Name: ${this.firstName} ${this.lastName}`;
}

const cam = new Person( 
    'Cameron',
    'Kirkpatrick',
    29,
    '123 Meery Lane',
    '0863577644'
    );































  
    //Static functions are not available on an instance
    //something that aplies to all instances
    //Membership cost 500 dollars 
    static getMemberShipCost() {
        let cost = 500;
        return `Membership cost: $$(cost)`;
    }


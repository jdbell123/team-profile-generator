const Employee = require('../lib/employee');

describe("Employee", () => {
    it("Should be an object", () => { 
        const employee = new Employee();
    expect(typeof (employee)).toBe("object");
    });

    it("Should be able to set name", () => { 
        const name = "John";
        const employee = new Employee(name);
    expect(employee.name).toBe(name);
    });

    it("Should be able to set id", () => { 
        const id = 99;
        const employee = new Employee("John", id);
    expect(employee.id).toBe(id);
    });

    it("Should be able to set email", () => { 
        const email = "hello@world.com";
        const employee = new Employee("John", 99, email);
    expect(employee.email).toBe(email);
    });

    it("Should be able to get name using method", () => { 
        const name = "John";
        const employee = new Employee(name);
    expect(employee.getName()).toBe(name);
    });

    it("Should be able to get id using method", () => { 
        const id = 99;
        const employee = new Employee("John", id);
    expect(employee.getId()).toBe(id);
    });

    it("Should be able to get email using method", () => { 
        const email = "hello@world.com";
        const employee = new Employee("John", 99, email);
    expect(employee.getEmail()).toBe(email);
    });

    it("Should be able to get role using method", () => { 
        const role = "Employee";
        const employee = new Employee("John", 99, "hello@world.com");
    expect(employee.getRole()).toBe(role);
    });
})

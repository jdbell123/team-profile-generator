const Manager = require('../lib/manager');

describe("Manager", () => {
    it("Should be able to set office number", () => { 
        const officeNumber = "A1331";
        const manager = new Manager("John", 99, "hello@world.com", officeNumber);
    expect(manager.officeNumber).toBe(officeNumber);
    });

    it("Should be able to get office number using method", () => { 
        const officeNumber = "A1331";
        const manager = new Manager("John", 99, "hello@world.com", officeNumber);
    expect(manager.getOfficeNumber()).toBe(officeNumber);
    });

    it("Should be able to get role using method", () => { 
        const role = "Manager";
        const manager = new Manager("John", 99, "hello@world.com", "A1331");
    expect(manager.getRole()).toBe(role);
    });
})

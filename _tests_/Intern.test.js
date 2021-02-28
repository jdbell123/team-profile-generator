const Intern = require('../lib/intern');

describe("Intern", () => {
    it("Should be able to set school", () => { 
        const school = "The Royal High School";
        const intern = new Intern("John", 99, "hello@world.com", school);
    expect(intern.school).toBe(school);
    });

    it("Should be able to get school using method", () => { 
        const school = "The Royal High School";
        const intern = new Intern("John", 99, "hello@world.com", school);
    expect(intern.getSchool()).toBe(school);
    });

    it("Should be able to get role using method", () => { 
        const role = "Intern";
        const intern = new Intern("John", 99, "hello@world.com", "The Royal High School");
    expect(intern.getRole()).toBe(role);
    });
})
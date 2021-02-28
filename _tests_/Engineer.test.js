const Engineer = require('../lib/engineer');

describe("Engineer", () => {
    it("Should be able to set github user name", () => { 
        const github = "username";
        const engineer = new Engineer("John", 99, "hello@world.com", github);
    expect(engineer.github).toBe(github);
    });

    it("Should be able to get github user name using method", () => { 
        const github = "username";
        const engineer = new Engineer("John", 99, "hello@world.com", github);
    expect(engineer.getGithub()).toBe(github);
    });

    it("Should be able to get role using method", () => { 
        const role = "Engineer";
        const engineer = new Engineer("John", 99, "hello@world.com", "username");
    expect(engineer.getRole()).toBe(role);
    });
})
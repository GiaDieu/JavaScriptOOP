class Employee {
  constructor(firstName, lastName, gender, age, marriageStatus) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.marriageStatus = marriageStatus;

    this.identity = function () {
      let genderIdentity = "";
      if (
        this.gender === "F" ||
        this.gender === "Female" ||
        this.gender === "female"
      ) {
        genderIdentity += "Ms.";
        return genderIdentity;
      } else {
        genderIdentity += "Mr.";
        return genderIdentity;
      }
    };
  }
}

Employee.prototype.marriage = function () {
  const genderIdentity = this.identity();
  if (!this.marriageStatus) {
    console.log(`${genderIdentity}${this.firstName} is available `);
  } else {
    console.log(`${genderIdentity}${this.firstName} is married`);
  }
};

Object.assign(Employee.prototype, {
  sayHello() {
    console.log(`Hello, I am ${this.firstName}`);
  },
  workActive() {
    const genderIdentity = this.identity();
    console.log(
      `${genderIdentity}${this.firstName} is working as consultant of Chubby Insurance Company`
    );
  },

  workInActive() {
    const genderIdentity = this.identity();
    console.log(
      `${genderIdentity}${this.firstName} is no longer working at Chubby Insurance Company`
    );
  },
});
const employee = new Employee("Luong", "Nguyen", "F", 34, false);
// console.log(employee.marriage());
// console.log(employee.workActive());

//Inheritance
class ConsultantInsurance extends Employee {
  constructor(firstName, lastName, gender, age, marriageStatus) {
    super(firstName, lastName, gender, age, marriageStatus);
  }

  isAtProject(project) {
    const genderIdentity = this.identity();
    console.log(
      `${genderIdentity}${this.firstName}` +
        " " +
        `${this.lastName} is working with ${project} project`
    );
  }

  isAvailable() {
    const genderIdentity = this.identity();
    console.log(
      `${genderIdentity}${this.firstName}` +
        " " +
        `${this.lastName} is available`
    );
  }
}

const consultantInsurance = new ConsultantInsurance(
  "Luong",
  "Nguyen",
  "F",
  34,
  false
);

// console.log(consultantInsurance.isAtProject("Combo $100,000"));

class Developer extends Employee {
  constructor(
    firstName,
    lastName,
    gender,
    age,
    marriageStatus,
    occupation,
    position
  ) {
    super(firstName, lastName, gender, age, marriageStatus);
    this.occupation = occupation;
    this.position = position;
  }
  sayHello() {
    super.sayHello();
    console.log(`I am a ${this.position}` + " " + `${this.occupation}`);
  }
}

const developer = new Developer(
  "Khanh",
  "Tran",
  "M",
  27,
  false,
  "FullStack",
  "Engineer"
);
// developer.sayHello();

//compostion

const skills = {
  code(genderCallback) {
    let gender = genderCallback();
    console.log(`${gender}${this.firstName} is coding Front-End`);
  },

  gender(gender) {
    if (gender === "Female" || gender === "F" || gender === "female") {
      return "Ms.";
    } else {
      return "Mr.";
    }
  },

  design(genderCallback) {
    let gender = genderCallback();
    console.log(`${gender}${this.firstName} is a UI designer`);
  },
};

class SeniorDeveloper {
  constructor(firstName, lastName, gender, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;

    Object.assign(this, {
      code: skills.code,
      design: skills.design,
      gender: skills.gender,
    });
  }
}

const seniorDeveloper = new SeniorDeveloper("Quan", "Tran", "M", 25);

// seniorDeveloper.code(seniorDeveloper.gender);
// seniorDeveloper.design(seniorDeveloper.gender);

//both Inheritance and Composition

const designPosition = {
  genderIndentify(gender) {
    if (
      gender === "Female" ||
      gender === "F" ||
      gender === "female" ||
      gender === "f"
    ) {
      return "Ms.";
    } else {
      return "Mr.";
    }
  },

  onlyDesign(genderCallback, firstName) {
    const gender = genderCallback();
    console.log(this.firstName);
    console.log(`${gender}${firstName} could design only`);
  },
};

class DesigneDeveloper extends Employee {}

Object.assign(DesigneDeveloper.prototype, {
  gender: designPosition.genderIndentify,
  onlyDesign: designPosition.onlyDesign,
});

const designerDeveloper = new DesigneDeveloper(
  "Khanh",
  "Tran",
  "Female",
  27,
  false
);
// console.log(designerDeveloper);
//Note: be careful what you combined 2 two solutions inheritance and composition, you create prototype methods, "this" will be undefined

designPosition.onlyDesign(
  designPosition.genderIndentify,
  designerDeveloper.firstName
);

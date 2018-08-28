// ES6 Classes - Fundementals

class Person {
    // Provide a default argument...
    constructor(name='Anonymous', age=0) {
        // "this" refers to the class instance
        this.name = name;
        this.age = age;

    } // No comma here..

    getGreeting() {
        // Template strings - back ticks and ${} to inject data.
        return `Hi.  I am ${this.name}.`;
    }

    getDescription() {
        return `${this.name} is ${this.age} year(s) old.`
    }
}

// Subclassing
class Student extends Person {
    constructor(name, age, major) {
        super(name, age);
        this.major = major;
    }

    // Overriding function, calling the parent's function as well.
    // Note that the output differs from the tutorial since that example
    // is poorly written.
    getDescription() {
        let description = super.getDescription();

        if (this.hasMajor() ) {
            description += ` This student's major is ${this.major}.`
        }
        return description;
    }

    // Strings have "truthy" properties, so if there is a major defined,
    // this returns true.
    hasMajor() {
        return !!this.major;
    }

}

class Traveler extends Person {
    constructor(name, age, homeLocation) {
        super(name, age);
        this.homeLocation = homeLocation;
    }

    hasHomeLocation() {
        return !!this.homeLocation;
    }

    getGreeting() {
        let greeting = super.getGreeting();
        if ( this.hasHomeLocation() ) {
            greeting +=  ` I'm visiting from ${this.homeLocation}.`;
        }
        return greeting;
    }
}

// Allocate a new instance of the class using the "new" keyword.
const me = new Traveler('Harry Smith', 25, 'Palo Alto');
console.log(me.getGreeting());
// console.log(me.getDescription());
// console.log(me.hasMajor());


// Shows that the default argument value will be used.
const other = new Traveler();
console.log(other.getGreeting());
// console.log(other.getDescription());
// console.log(other.hasMajor());

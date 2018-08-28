# React Components

1. Indecision App components:
    IndecisionApp
        Header
        Action
        Options
            Option
        AddOption

2. Setup a Git repository at this point - should have done it earlier.  No matter.

## ES6 Classes - Part 1 - Fundamentals

1. Create a playground file, es6-classes-1.js and switch the babel terminal to use that file.

2. Naming convention is to use classes with the first letter capitalized (e.g. Person).

2. To access data when using the "new" method of instantiation, e.g.
```
const me = new Person('Harry');
```
you need to use a constructor, and that constructor method must adhere to ES6 method syntax.  See the seccond lecture on arrow functions around the 10:38 mark.  E.g.
```
class Person {
    constructor(newName)  {
        name: newName
    }
}
```
3. ES6 allows for argument defaults to functions - they can be used in any order, unlike C/C++.

4. When adding additional methods to the class, you don't end the method with a ',' -
```
class A {
    constructor() {

    } // No comma
    method1() {

    } // No comma
    method2() {

    }
}
```

5. Template strings: new for ES6.  Uses the back-tick, within that you can inject data using ${}:

```
return `Hi.  My name is ${this.name}`;
```

6. Challenge is to add another parameter to the constructor, age, that defaults to 0.  Also add a method, getDescription, that prints out the name and age, e.g. Harry Smith is 25 year(s) old.

## ES6 Classes - Part 2 - Advanced Features

1. Subclasses - uses the "extend" keyword.

2. Overriding the constructor uses "super"  to call the parent constructor.

3. Strings have truthy properties, meaning that !!this.name will return true if the name has contents, false otherwise.

4. Challenge is to repeat the steps for Student to create a Traveler subclass.

## Creating a React Component

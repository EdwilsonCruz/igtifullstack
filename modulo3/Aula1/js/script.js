console.log("script");

class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} falando...`);
  }
}

const animal = new Animal("Mia");
console.log(animal);
animal.speak();

class Dog extends Animal {
  constructor(name, type) {
    super(name);

    this.type = type;
  }
  speak() {
    console.log(`${this.name} (${this.type}) latindo...`);
  }
}
class Gato extends Animal {
  constructor(name, type) {
    super(name);

    this.type = type;
  }
  speak() {
    console.log(`${this.name} (${this.type}) Mia Miando...`);
  }
}
const animal2 = new Dog("Thor", "Chatonildo");
console.log(animal2);
animal2.speak();

const mia = new Gato('mia','gata linda')
mia.speak()
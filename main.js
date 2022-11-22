//Null Object pattern
// mainly used to handle the null object return scenario

//Normal screnario
class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  hasAccess() {
    return this.name === "Bob";
  }
}

const users = [new User(1, "Bob"), new User(2, "John")];

function getUserWithoutNullCheck(id) {
  return users.find((user) => user.id === id);
}

function printUserWithoutNullCheck(id) {
  const user = getUserWithoutNullCheck(id);

  // we need to explictly tell the console.log to print 'Guest' if
  // the user does not have a name. This is difficult as we always
  // have to remember the variable.
  // it's also bad because if we want to print the 'unknown user' instead of
  // 'Guest' ,we would need to change all over the application, which is again a
  // cumbersome process.

  let name = "Guest";
  if (user != null && user.name != null) name = user.name;
  console.log(`Hello ` + name);

  // this will throw an error if we don't first check that the user
  // object has this function available and isn't null.

  // This is a lot of extra code to add in every time we want to
  // check user access, and could cause bugs that are easy to miss
  // if we forget to do the null checks.

  if (user != null && user.hasAccess != null && user.hasAccess()) {
    console.log("You have access");
  } else {
    console.log("You are not allowed here");
  }
}

//with null object class pattern
class NullUser {
  constructor() {
    this.id = -1;
    this.name = "Guest";
  }

  hasAccess() {
    return false;
  }
}

function getUserWithNullCheck(id) {
  const user = users.find((user) => user.id === id);
  if (user == null) {
    return new NullUser();
  } else {
    return user;
  }
}

function printUserWithNullCheck(id) {
  const user = getUserWithNullCheck(id);
  console.log(`Hello ` + user.name);

  if (user.hasAccess()) {
    console.log("You have access");
  } else {
    console.log("You are not allowed here");
  }
}

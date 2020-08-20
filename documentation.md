methods                          
| method   | input Arguments | Return value | Description                                                   |
| -------- | --------------- | ------------ | ------------------------------------------------------------- |
| getAll   | -               | [user]       | Get a list of all users                                       |
| getOne   | id              | user         | Finds the user with the given id                              |
| getOneBy | filters         | user         | Finds one user with the given filters                         |
| create   | attributes      | null         | creates a user with given attrib                              |
| update   | id, attributes  | null         | Updates the user with the given id using the given attributes |
| delete   | id              | null         | Delete the user with the given id                             |
| redomid  | -               | id           | Generates a random Id                                         |
| writeAll | [user]          | null         | Writes all users to users.json file                                                              |
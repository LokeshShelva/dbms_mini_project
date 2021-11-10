const bcrypt = require('bcrypt');
const { tableNames, dropOrder } = require('../../src/constants/tableNames');

exports.seed = async (knex) => {
  await Promise.all(dropOrder.map(async (table) => knex(table).del()))
  await knex(tableNames.grade).insert([{ grade: "S" }, { grade: "A" }, { grade: "B" }, { grade: "C" }, { grade: "D" }, { grade: "E" }, { grade: "F" }]);

  const hashed = await bcrypt.hash('mypassword', 10);

  await knex(tableNames.user).insert({
    email: "lokesh@some.com",
    password: hashed,
    role: 'admin'
  });

  await knex(tableNames.section).insert([
    { section: "A" },
    { section: "B" }
  ]);

  await knex(tableNames.role).insert([
    { role: "teaching" },
    { role: "principal" },
    { role: "non-teaching" }
  ]);

  await knex(tableNames.subject).insert([
    { subject: "maths" },
    { subject: "physics" },
    { subject: "evs" },
    { subject: "english" },
    { subject: "biology" },
    { subject: "chemistry" },
    { subject: "social" },
    { subject: "drawing" },
    { subject: "pe" },
  ]);

  await knex(tableNames.address).insert([
    {
      house_no: "10",
      street_name: "vettaikaran street",
      city: "karaikal",
      state: "puducherry",
    },
    {
      house_no: "12",
      street_name: "Rgvs street",
      city: "karaikal",
      state: "puducherry",
    },
    {
      house_no: "11/3",
      street_name: "Pk street",
      city: "karaikal",
      state: "puducherry",
    },
  ]);

  await knex(tableNames.parent).insert([
    {
      name: "Raman G",
      dob: "1982-07-12",
      phone: "7824689514",
      email: "email@gmail.com",
      occupation: "goverment servent"
    },
    {
      name: "Mathew",
      dob: "1985-12-03",
      phone: "9845627814",
      email: "myemail@gmail.com",
      occupation: "doctor"
    },
    {
      name: "Sajana R",
      dob: "1984-05-10",
      phone: "8721984678",
      email: "sanjana@gmail.com",
      occupation: "housewife"
    },
    {
      name: "Rejina",
      dob: "1986-02-15",
      phone: "9846325814",
      email: "rejina@gmail.com",
      occupation: "doctor"
    },
  ]);

  await knex(tableNames.faculty).insert([
    {
      name: "Priyanka",
      dob: "1992-07-19",
      role_id: 1,
      blood_group: "A+",
      address_id: 3,
      salary: 25000,
      joining_date: "2005-02-10"
    },
    {
      name: "Praveen",
      dob: "1990-02-11",
      role_id: 1,
      blood_group: "AB+",
      address_id: 3,
      salary: 25500,
      joining_date: "2005-02-10"
    },
    {
      name: "Sundari",
      dob: "1972-03-15",
      role_id: 2,
      blood_group: "O+",
      address_id: 2,
      salary: 45000,
      joining_date: "2001-02-10"
    },
    {
      name: "Lakshmi",
      dob: "1990-12-05",
      role_id: 1,
      blood_group: "B+",
      address_id: 3,
      salary: 25500,
      joining_date: "2005-02-10"
    },
  ]);

  await knex(tableNames.salaryPaidDetail).insert([
    {
      faculty_id: 1,
      year: 2005,
      month: 3
    },
    {
      faculty_id: 1,
      year: 2005,
      month: 4
    },
    {
      faculty_id: 1,
      year: 2005,
      month: 5
    },
    {
      faculty_id: 1,
      year: 2005,
      month: 6
    },
    {
      faculty_id: 2,
      year: 2005,
      month: 3
    },
    {
      faculty_id: 2,
      year: 2005,
      month: 4
    },
    {
      faculty_id: 2,
      year: 2005,
      month: 5
    },
    {
      faculty_id: 2,
      year: 2005,
      month: 6
    },
    {
      faculty_id: 3,
      year: 2001,
      month: 3
    },
    {
      faculty_id: 3,
      year: 2001,
      month: 4
    },
    {
      faculty_id: 3,
      year: 2001,
      month: 5
    },
    {
      faculty_id: 3,
      year: 2001,
      month: 6
    },
    {
      faculty_id: 4,
      year: 2005,
      month: 3
    },
    {
      faculty_id: 4,
      year: 2005,
      month: 4
    },
    {
      faculty_id: 4,
      year: 2005,
      month: 5
    },
    {
      faculty_id: 4,
      year: 2005,
      month: 6
    },
  ]);
};

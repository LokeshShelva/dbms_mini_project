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
    {
      house_no: "22",
      street_name: "Gopi street",
      city: "pondicherry",
      state: "puducherry",
    },
    {
      house_no: "45",
      street_name: "shah jahan street",
      city: "villianur",
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
    {
      name: "Shah Jahan",
      dob: "1980-06-10",
      phone: "9420685855",
      email: "shahjahan@gmail.com",
      occupation: "buisness"
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
    {
      name: "Vijay",
      dob: "1992-09-10",
      role_id: 3,
      blood_group: "O-",
      address_id: 4,
      salary: 12000,
      joining_date: "2008-02-10"
    },
    {
      name: "Krishna",
      dob: "1980-02-15",
      role_id: 1,
      blood_group: "B+",
      address_id: 5,
      salary: 50500,
      joining_date: "2001-12-20"
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
    {
      faculty_id: 5,
      year: 2005,
      month: 3
    },
    {
      faculty_id: 5,
      year: 2005,
      month: 4
    },
    {
      faculty_id: 5,
      year: 2005,
      month: 5
    },
    {
      faculty_id: 5,
      year: 2005,
      month: 6
    },
  ]);

  await knex(tableNames.class).insert([
    
    {
      section_id: 1,
      class_teacher_id: 1,
      class: "11",
    },
    {
      section_id: 2,
      class_teacher_id: 2,
      class: "11",
    },
    {
      section_id: 1,
      class_teacher_id: 4,
      class: "12",
    },
    {
      section_id: 2,
      class_teacher_id: 6,
      class: "12",
    },
  ]);

  await knex(tableNames.teachingClassSubject).insert([
    {
      faculty_id: 1,
      class_id: "vettaikaran street",
      subject_id: "karaikal",
    },
    {
      faculty_id: "10",
      class_id: "vettaikaran street",
      subject_id: "karaikal",
    },
    {
      faculty_id: "10",
      class_id: "vettaikaran street",
      subject_id: "karaikal",
    },
    {
      faculty_id: "10",
      class_id: "vettaikaran street",
      subject_id: "karaikal",
    },
    {
      faculty_id: "10",
      class_id: "vettaikaran street",
      subject_id: "karaikal",
    },
  ]);

  await knex(tableNames.student).insert([
    {
      name: "Aditi Musunur",
      dob: "2001-12-24",
      blood_group: "A+",
      father_id: "Father",
      mother_id: "Mother",
      class_id: 1,
      fee: 24000,
      scholarship: 0,
      address_id: 1,
      admission_date: "2004-05-11",
    },
    {
      name: "Advitiya",
      dob: "2000-10-24",
      blood_group: "B+",
      father_id: "Father",
      mother_id: "Mother",
      class_id: 1,
      fee: 24000,
      scholarship: 1000,
      address_id: 2,
      admission_date: "2004-05-11",
    },
    {
      name: "Jitendra",
      dob: "2001-05-11",
      blood_group: "O+",
      father_id: "Father",
      mother_id: "Mother",
      class_id: 2,
      fee: 24000,
      scholarship: 0,
      address_id: 3,
      admission_date: "2004-05-11",
    },
    {
      name: "Naveen",
      dob: "2001-06-12",
      blood_group: "O-",
      father_id: "Father",
      mother_id: "Mother",
      class_id: 2,
      fee: 24000,
      scholarship: 2000,
      address_id: 4,
      admission_date: "2004-05-11",
    },
    {
      name: "Kageyama",
      dob: "vettaikaran street",
      blood_group: "karaikal",
      father_id: "Father",
      mother_id: "Mother",
      class_id: 3,
      fee: 30000,
      scholarship: 0,
      address_id: 5,
      admission_date: "2004-05-11",
    },
    {
      name: "Hinata",
      dob: "vettaikaran street",
      blood_group: "karaikal",
      father_id: "Father",
      mother_id: "Mother",
      class_id: 3,
      fee: 30000,
      scholarship: 2000,
      address_id: 1,
      admission_date: "2004-05-11",
    },
    {
      name: "Izuku",
      dob: "vettaikaran street",
      blood_group: "karaikal",
      father_id: "Father",
      mother_id: "Mother",
      class_id: 4,
      fee: 30000,
      scholarship: 0,
      address_id: 2,
      admission_date: "2004-05-11",
    },
    {
      name: "Tongari",
      dob: "vettaikaran street",
      blood_group: "karaikal",
      father_id: "Father",
      mother_id: "Mother",
      class_id: 4,
      fee: 30000,
      scholarship: 2000,
      address_id: 3,
      admission_date: "2004-05-11",
    },
    

  ]);

  await knex(tableNames.feePaidDetail).insert([
    {
      student_id: 1,
      academic_year: 2020,
      term: 1,
    },
    {
      student_id: 2,
      academic_year: 2020,
      term: 2,
    },
    {
      student_id: 3,
      academic_year: 2020,
      term: 1,
    },
    {
      student_id: 4,
      academic_year: 2020,
      term: 1,
    },
    {
      student_id: 5,
      academic_year: 2020,
      term: 3,
    },
    {
      student_id: 6,
      academic_year: 2020,
      term: 2,
    },
    {
      student_id: 7,
      academic_year: 2020,
      term: 1,
    },
    {
      student_id: 8,
      academic_year: 2020,
      term: 2,
    },
  
  ]);

  await knex(tableNames.attendance).insert([
    {
      student_id: 1,
      class_id: 1,
      date: "2021-01-15",
    },
    {
      student_id: 2,
      class_id: 1,
      date: "2021-01-15",
    },
    {
      student_id: 3,
      class_id: 2,
      date: "2021-01-15",
    },
    {
      student_id: 4,
      class_id: 2,
      date: "2021-01-15",
    },
    {
      student_id: 5,
      class_id: 3,
      date: "2021-01-15",
    },
    {
      student_id: 6,
      class_id: 3,
      date: "2021-01-15",
    },
    {
      student_id: 7,
      class_id: 4,
      date: "2021-01-15",
    },
    {
      student_id: 8,
      class_id: 4,
      date: "2021-01-15",
    },
  ]);

  await knex(tableNames.exam).insert([
    {
      exam: "First-Quartarly",
    },
    {
      exam: "Mid-term",
    },
    {
      exam: "Second-Quartarly",
    },
    {
      exam: "End-Term",
    },
  ]);

  await knex(tableNames.result).insert([
    {
      student_id: 1,
      class_id: 1,
      academic_year: 2020,
      subject: 1,
      score: 90,
      grade_id: 2,
      exam_id: 1,
    },
    {
      student_id: 1,
      class_id: 1,
      academic_year: 2020,
      subject: 2,
      score: 80,
      grade_id: 2,
      exam_id: 2,
    },
    {
      student_id: 1,
      class_id: 1,
      academic_year: 2020,
      subject: 3,
      score: 70,
      grade_id: 3,
      exam_id: 3,
    },
    {
      student_id: 1,
      class_id: 1,
      academic_year: 2020,
      subject: 4,
      score: 50,
      grade_id: 5,
      exam_id: 4,
    },

  ]);
};

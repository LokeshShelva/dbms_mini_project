const bcrypt = require('bcrypt');
const { tableNames, dropOrder } = require('../../src/constants/tableNames');
const getMockData = require('../../mock_data/mock');

exports.seed = async (knex) => {
  await Promise.all(dropOrder.map(async (table) => knex(table).del()))
  await knex(tableNames.grade).insert([{ grade: "S" }, { grade: "A" }, { grade: "B" }, { grade: "C" }, { grade: "D" }, { grade: "E" }, { grade: "F" }]);

  const hashed = await bcrypt.hash('password', 10);

  const blood_group = ['O+', 'O-', 'A+', 'A-', 'AB+', 'AB-'];

  function choose(choice) {
    return choice[Math.floor(Math.random() * choice.length)];
  }

  const mockData = getMockData();

  await knex(tableNames.user).insert([
    {
      email: "lokesh@some.com",
      password: hashed,
      role: 'admin'
    },
    {
      email: "student@some.com",
      password: hashed,
      role: 'student'
    },
    {
      email: "teacher@some.com",
      password: hashed,
      role: 'teacher'
    }
  ]);

  const maxGradeId = 7;

  await knex(tableNames.section).insert([
    { section: "A" },
    { section: "B" }
  ]);

  const maxSectionId = 2;

  await knex(tableNames.role).insert([
    { role: "teaching" },
    { role: "principal" },
    { role: "non-teaching" }
  ]);

  const maxRoleId = 3;

  await knex(tableNames.subject).insert([
    { subject: "maths" },
    { subject: "physics" },
    { subject: "evs" },
    { subject: "english" },
    { subject: "biology" },
    { subject: "chemistry" },
    { subject: "social" },
  ]);

  const maxSubjectId = 7;

  await knex(tableNames.address).insert(mockData.student_address);
  await knex(tableNames.address).insert(mockData.faculty_address);

  const maxAddressId = mockData.student_address.length + mockData.faculty_address.length;

  await knex(tableNames.parent).insert(mockData.father);

  let mother = [];
  mockData.mother.forEach((val) => {
    val.id = parseInt(val.id) + 60;
    mother.push(val);
  })

  await knex(tableNames.parent).insert(mother);

  const maxParentId = mockData.father.length + mockData.mother.length;

  let faculty = [];
  mockData.faculty.forEach(
    (f, i) => {
      f['blood_group'] = choose(blood_group);
      f['role_id'] = Math.floor(Math.random() * maxRoleId) + 1;
      f['address_id'] = i + 60;
      faculty.push(f);
    }
  )

  await knex(tableNames.faculty).insert(faculty);

  await knex(tableNames.class).insert([
    {
      section_id: 1,
      class_teacher_id: 1,
      class: "10",
    },
    {
      section_id: 1,
      class_teacher_id: 2,
      class: "11",
    },
    {
      section_id: 2,
      class_teacher_id: 7,
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

  let classes = []

  for (let i = 1; i <= 5; i++) {
    for (let j = 1; j <= 7; j++) {
      classes.push({
        faculty_id: Math.floor(Math.random() * 15) + 1,
        class_id: i,
        subject_id: j
      })
    }
  }

  await knex(tableNames.teachingClassSubject).insert(classes);

  let students = [];
  mockData.student.forEach((val, i) => {
    val['father_id'] = i + 1;
    val['mother_id'] = i + 61;
    val['class_id'] = Math.floor(Math.random() * 5) + 1;
    val['blood_group'] = choose(blood_group);
    val['address_id'] = i + 1;
    students.push(val);
  })

  await knex(tableNames.student).insert(students);

  const maxStudentsId = students.length;

  const dates = ["2021-11-01", '2021-11-02', '2021-11-03'];

  let attendandes = []

  for (date of dates) {
    let d = new Date(date)
    for (let i = 1; i <= maxStudentsId; i++) {
      attendandes.push({
        student_id: i,
        date: Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())
      })
    }
  }

  await knex(tableNames.attendance).insert(attendandes);

  await knex(tableNames.academicYear).insert([
    {
      academic_year: "2020"
    },
    {
      academic_year: "2021"
    }
  ])

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

  let results = []

  const findGrade = (num) => {
    if (num < 40) {
      return 7
    }
    if (num <= 50) {
      return 6
    }
    if (num <= 60) {
      return 5
    }
    if (num <= 70) {
      return 4
    }
    if (num <= 80) {
      return 3
    }
    if (num <= 90) {
      return 2
    }
    return 1;
  }

  for (let year = 1; year <= 2; year++) {
    for (let exam = 1; exam <= 4; exam++) {
      for (let std = 1; std <= maxStudentsId; std++) {
        for (let sub = 1; sub <= maxSubjectId; sub++) {
          let src = Math.floor(Math.random() * 76 + 25);
          results.push({
            student_id: std,
            academic_year_id: year,
            subject_id: sub,
            score: src,
            grade_id: findGrade(src),
            exam_id: exam
          })
        }
      }
    }
  }

  await knex(tableNames.result).insert(results);
};

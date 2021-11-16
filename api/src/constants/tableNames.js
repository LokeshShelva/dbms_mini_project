const tableNames = {
    user: 'User',
    grade: 'Grade',
    address: 'Address',
    section: 'Section',
    role: 'Role',
    subject: 'Subject',
    parent: 'Parent',
    faculty: 'Faculty',
    // salaryPaidDetail: 'Salary_paid_detail',
    class: 'Class',
    teachingClassSubject: 'Teaching_class_subject',
    student: 'Student',
    // feePaidDetail: 'Fee_paid_detail',
    attendance: 'Attendance',
    academicYear: 'Academic_year',
    exam: 'Exam',
    result: 'Result',
}

const dropOrder = [
    'Result',
    'Exam',
    'Academic_year',
    'Attendance',
    // 'Fee_paid_detail',
    'Student',
    'Teaching_class_subject',
    'Class',
    // 'Salary_paid_detail',
    'Faculty',
    'Parent',
    'Subject',
    'Role',
    'Section',
    'Address',
    'Grade',
    'User'
]

module.exports = {
    tableNames,
    dropOrder
}
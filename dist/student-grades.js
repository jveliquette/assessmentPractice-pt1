import * as fs from 'fs';
export const calculateAverageGrade = (data) => {
    const lines = data.split('\n');
    const students = [];
    // Variant 1
    // Using a traditional for loop:
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (!line) {
            continue;
        }
        const [name, gradeString] = line.split(',');
        if (!name || !gradeString) {
            continue;
        }
        const grade = parseFloat(gradeString);
        if (isNaN(grade) || grade < 0 || grade > 100) {
            console.warn(`Warning: Ignoring invalid grade "${grade}" for student "${name}"`);
            continue;
        }
        students.push({
            name,
            grade: grade,
        });
    }
    // Variant 2
    // Using for of
    // for (const line of lines) {
    //     const [name, gradeString] = line.split(",");
    //
    //     if (!name || !gradeString) {
    //         continue;
    //     }
    //
    //     const grade = parseFloat(gradeString);
    //
    //     if (isNaN(grade) || grade < 0 || grade > 100) {
    //         console.warn(
    //             `Warning: Ignoring invalid grade "${grade}" for student "${name}"`
    //         );
    //         continue;
    //     }
    //
    //     students.push({
    //         name,
    //         grade: grade,
    //     });
    // }
    if (students.length === 0) {
        console.error('Error: No valid grade entries found in the file.');
        return;
    }
    // Variant 1
    // Using a for of loop
    let sum = 0;
    for (const student of students) {
        sum += student.grade;
    }
    // Variant 2
    // Using reduce
    // const sum = students.reduce(
    //     (total, student) => total + student.grade,
    //     0
    // );
    const average = sum / students.length;
    return average;
};
export function main() {
    const data = fs.readFileSync('./grades.csv', 'utf-8');
    const averageGrade = calculateAverageGrade(data);
    if (averageGrade) {
        console.log(`Average Grade = ${averageGrade.toFixed(2)}`);
    }
}
//# sourceMappingURL=student-grades.js.map
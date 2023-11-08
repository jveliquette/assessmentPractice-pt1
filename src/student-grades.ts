import * as fs from 'fs'

// Here we define the student type as an object with a key value of name with type string and grade with type number
type Student = {
    name: string
    grade: number
}

// Here we are declaring a function called calculateAverageGrade with a parameter of data which is of type string.
// The function will return a value of type number or undefined
export const calculateAverageGrade = (data: string): number | undefined => {
    // declaring a variable named lines, setting it equal to the data string.
    // We are then using the split method to divide the list of data into a subset of strings.
    // The data will be split at the next line. All of the split data will go into an array
    const lines = data.split('\n')
    // declaring a variable named students which is of type array of student. We are setting
    // this variable equal to an empty array
    const students: Student[] = []

    // Variant 1
    // Using a traditional for loop:

    // Here we are using a c-style for loop to loop through the lines array (which is all of our data)
    // setting our starting value equal to 0; then we will continue our loop as long as i is les
    //  than the length of our lines array; and then we increment our counter.
    for (let i = 0; i < lines.length; i++) {
        // declaring a variable of line and setting it equal to the index of i in our lines array
        // on the first iteration it will be lines array idex[0], second iteration lines array index[1]
        // and so on until we reach the end of our array
        const line = lines[i]
        // here, we are using an if statement to say: if there is no line, we are going to stop the current iteration
        // and move on to the next iteration
        if (!line) {
            continue
        }
        // in this piece of the code, we are going through each piece of our data, and splitting the string
        // (each index) at the comma
        const [name, gradeString] = line.split(',')
        // here, we are using an if statement to say: if there is no name or no gradeString in the line, we are going to
        // stop the current iteration and move on to the next iteration
        if (!name || !gradeString) {
            continue
        }
        // declaring a variable named grade and setting it equal to a function named parseFloat with a parameter of gradeString
        const grade = parseFloat(gradeString)

        // using an if statement we are checking to see if the given student's grade is not a number, is less than 0, or greater than 100.
        // if any of these cases are true, a warning is returned specifying the invalid grade for the certain student
        if (isNaN(grade) || grade < 0 || grade > 100) {
            console.warn(
                `Warning: Ignoring invalid grade "${grade}" for student "${name}"`
            )
            // stops iteration and moves on to the next iteration
            continue
        }
        // at this point, the rest of the data will be valid and the name and grade will be pushed to the students array.
        students.push({
            name,
            grade: grade,
        })
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

    // here if the length of the students array is strictly equal to 0 we will log an error
    if (students.length === 0) {
        console.error('Error: No valid grade entries found in the file.')
        return
    }

    // Variant 1
    // we are declaring a variable named sum and setting it equal to 0. This is our accumulator.
    // Using a for of loop we are going through the student array and taking each student's grade
    // and adding it to the sum.
    let sum = 0
    for (const student of students) {
        sum += student.grade
    }

    // Variant 2
    // Using reduce
    // const sum = students.reduce(
    //     (total, student) => total + student.grade,
    //     0
    // );

    // declaring a variable named average and setting it equal to the sum of adding all the valid
    // grades together and dividing it by the length of the students array
    // this will return the average
    const average = sum / students.length
    return average
}

// declaring a function named main
export function main() {
    // declaring a variable named data. This is our data file. We are reading the contents of the
    // ./grades.csv file. We are setting utf-8 as our option which is a tool used to encode or decode
    const data = fs.readFileSync('./grades.csv', 'utf-8')
    // declaring a variable named averageGrade and setting it equal to the calculateAverageGrade function
    // which takes data as a parameter (this is our function that loops through our data, adds the valid
    // grades, and returns the average grade)
    const averageGrade = calculateAverageGrade(data)
    // using an if statement, if there is an average grade, we are going to console log our averagegrade.
    // The toFixed method rounds the number leaving behind only two spaces after the decimal
    if (averageGrade) {
        console.log(`Average Grade = ${averageGrade.toFixed(2)}`)
    }
}

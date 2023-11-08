import { describe, expect, test } from 'vitest'
import { calculateAverageGrade } from './student-grades.js'

describe('calculateAverageGrade', () => {
    test('returns correct average for valid data', () => {
        const data = 'John,85\nAlice,95\nBob,90'
        const average = calculateAverageGrade(data)
        expect(average).toBeCloseTo(90, 5)
    })

    test('ignores invalid grades', () => {
        const data = 'John,85\nAlice,105\nBob,90\nCharlie,-5\nDave,text'
        const average = calculateAverageGrade(data)
        expect(average).toBeCloseTo(87.5, 5)
    })

    test('returns undefined for empty input', () => {
        const data = ''
        const average = calculateAverageGrade(data)
        expect(average).toBeUndefined()
    })

    test('returns undefined when all grades are invalid', () => {
        const data = 'Alice,105\nCharlie,-5\nDave,text'
        const average = calculateAverageGrade(data)
        expect(average).toBeUndefined()
    })
})

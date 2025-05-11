import { describe, expect, it, vi } from 'vitest'
import {
  camelCase,
  constantCase,
  dotCase,
  kebabCase,
  pascalCase,
  pathCase,
  sentanceCase,
  snakeCase,
  titleCase,
} from './string-case'

// Mock the isValidString utility
vi.mock('../utils', () => ({
  isValidString: (text: any) => typeof text === 'string' && text.length > 0,
}))

describe('string Case Conversion Functions', () => {
  describe('titleCase', () => {
    it('should convert text to title case with default separator', () => {
      expect(titleCase('hello world')).toBe('Hello World')
      expect(titleCase('HELLO WORLD')).toBe('Hello World')
      expect(titleCase('hello WORLD')).toBe('Hello World')
    })

    it('should handle custom separators', () => {
      expect(titleCase('hello-world', { separators: ['-'] })).toBe('Hello-World')
      expect(titleCase('hello_world', { separators: ['_'] })).toBe('Hello_World')
      expect(titleCase('hello.world', { separators: ['.'] })).toBe('Hello.World')
      expect(titleCase('hello world-example_test.case', { separators: [' ', '-', '_', '.'] }))
        .toBe('Hello World-Example_Test.Case')
    })

    it('should return the original text for invalid input', () => {
      expect(titleCase('')).toBe('')
      // @ts-expect-error Testing invalid input
      expect(titleCase(null)).toBe(null)
      // @ts-expect-error Testing invalid input
      expect(titleCase(undefined)).toBe(undefined)
    })

    it('should handle strings with multiple consecutive separators', () => {
      expect(titleCase('hello  world', { separators: [' '] })).toBe('Hello  World')
      expect(titleCase('hello--world', { separators: ['-'] })).toBe('Hello--World')
    })
  })

  describe('sentanceCase', () => {
    it('should convert text to sentence case', () => {
      expect(sentanceCase('hello world')).toBe('Hello world')
      expect(sentanceCase('HELLO WORLD')).toBe('Hello world')
    })

    it('should return the original text for invalid input', () => {
      expect(sentanceCase('')).toBe('')
      // @ts-expect-error Testing invalid input
      expect(sentanceCase(null)).toBe(null)
      // @ts-expect-error Testing invalid input
      expect(sentanceCase(undefined)).toBe(undefined)
    })
  })

  describe('camelCase', () => {
    it('should convert text to camel case', () => {
      expect(camelCase('hello world')).toBe('helloWorld')
      expect(camelCase('Hello World')).toBe('helloWorld')
      expect(camelCase('HELLO WORLD')).toBe('helloWorld')
    })

    it('should return the original text for invalid input', () => {
      expect(camelCase('')).toBe('')
      // @ts-expect-error Testing invalid input
      expect(camelCase(null)).toBe(null)
      // @ts-expect-error Testing invalid input
      expect(camelCase(undefined)).toBe(undefined)
    })
  })

  describe('pascalCase', () => {
    it('should convert text to pascal case', () => {
      expect(pascalCase('hello world')).toBe('HelloWorld')
      expect(pascalCase('Hello World')).toBe('HelloWorld')
      expect(pascalCase('HELLO WORLD')).toBe('HelloWorld')
    })

    it('should return the original text for invalid input', () => {
      expect(pascalCase('')).toBe('')
      // @ts-expect-error Testing invalid input
      expect(pascalCase(null)).toBe(null)
      // @ts-expect-error Testing invalid input
      expect(pascalCase(undefined)).toBe(undefined)
    })
  })

  describe('snakeCase', () => {
    it('should convert text to snake case', () => {
      expect(snakeCase('hello world')).toBe('hello_world')
      expect(snakeCase('Hello World')).toBe('hello_world')
      expect(snakeCase('HELLO WORLD')).toBe('hello_world')
    })

    it('should return the original text for invalid input', () => {
      expect(snakeCase('')).toBe('')
      // @ts-expect-error Testing invalid input
      expect(snakeCase(null)).toBe(null)
      // @ts-expect-error Testing invalid input
      expect(snakeCase(undefined)).toBe(undefined)
    })
  })

  describe('kebabCase', () => {
    it('should convert text to kebab case', () => {
      expect(kebabCase('hello world')).toBe('hello-world')
      expect(kebabCase('Hello World')).toBe('hello-world')
      expect(kebabCase('HELLO WORLD')).toBe('hello-world')
    })

    it('should return the original text for invalid input', () => {
      expect(kebabCase('')).toBe('')
      // @ts-expect-error Testing invalid input
      expect(kebabCase(null)).toBe(null)
      // @ts-expect-error Testing invalid input
      expect(kebabCase(undefined)).toBe(undefined)
    })
  })

  describe('constantCase', () => {
    it('should convert text to constant case', () => {
      expect(constantCase('hello world')).toBe('HELLO_WORLD')
      expect(constantCase('Hello World')).toBe('HELLO_WORLD')
      expect(constantCase('hello-world')).toBe('HELLO-WORLD')
      expect(constantCase('hello  world')).toBe('HELLO_WORLD')
    })

    it('should return the original text for invalid input', () => {
      expect(constantCase('')).toBe('')
      // @ts-expect-error Testing invalid input
      expect(constantCase(null)).toBe(null)
      // @ts-expect-error Testing invalid input
      expect(constantCase(undefined)).toBe(undefined)
    })
  })

  describe('dotCase', () => {
    it('should convert text to dot case', () => {
      expect(dotCase('hello world')).toBe('hello.world')
      expect(dotCase('Hello World')).toBe('hello.world')
      expect(dotCase('HELLO WORLD')).toBe('hello.world')
      expect(dotCase('hello  world')).toBe('hello.world')
    })

    it('should return the original text for invalid input', () => {
      expect(dotCase('')).toBe('')
      // @ts-expect-error Testing invalid input
      expect(dotCase(null)).toBe(null)
      // @ts-expect-error Testing invalid input
      expect(dotCase(undefined)).toBe(undefined)
    })
  })

  describe('pathCase', () => {
    it('should convert text to path case', () => {
      expect(pathCase('hello world')).toBe('hello/world')
      expect(pathCase('Hello World')).toBe('hello/world')
      expect(pathCase('HELLO WORLD')).toBe('hello/world')
      expect(pathCase('hello  world')).toBe('hello/world')
    })

    it('should return the original text for invalid input', () => {
      expect(pathCase('')).toBe('')
      // @ts-expect-error Testing invalid input
      expect(pathCase(null)).toBe(null)
      // @ts-expect-error Testing invalid input
      expect(pathCase(undefined)).toBe(undefined)
    })
  })

  describe('edge cases across all functions', () => {
    it('should handle single word inputs', () => {
      const singleWord = 'test'
      expect(camelCase(singleWord)).toBe('test')
      expect(pascalCase(singleWord)).toBe('Test')
      expect(snakeCase(singleWord)).toBe('test')
      expect(kebabCase(singleWord)).toBe('test')
      expect(constantCase(singleWord)).toBe('TEST')
      expect(dotCase(singleWord)).toBe('test')
      expect(pathCase(singleWord)).toBe('test')
      expect(sentanceCase(singleWord)).toBe('Test')
      expect(titleCase(singleWord)).toBe('Test')
    })

    it('should handle inputs with special characters', () => {
      const specialChars = 'hello@world!example'
      expect(camelCase(specialChars)).toBe('hello@world!example')
    })

    it('should handle inputs with numbers', () => {
      const withNumbers = 'hello 123 world'
      expect(camelCase(withNumbers)).toBe('hello123World')
      expect(pascalCase(withNumbers)).toBe('Hello123World')
      expect(snakeCase(withNumbers)).toBe('hello_123_world')
      expect(kebabCase(withNumbers)).toBe('hello-123-world')
    })
  })
})

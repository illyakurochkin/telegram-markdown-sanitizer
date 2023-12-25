import { sanitizeMarkdown } from './markdown-sanitizer'

const SPECIAL_CHARACTERS = '_*[]()~`>#+-=|{}.!'.split('')

describe('sanitizeMarkdown', () => {
  describe('multiline code blocks', () => {
    it('should keep multiline code block content without changing', () => {
      const input =
        '```python\n' + 'print("Hello World")\n' + 'print(2 * 2)\n' + '```\n'

      const output =
        '```python\n' + 'print("Hello World")\n' + 'print(2 * 2)\n' + '```\n'

      expect(sanitizeMarkdown(input)).toEqual(output)
    })

    it('should escape "`" characters inside multiline code blocks', () => {
      const input = '```python\n' + 'print("Hello`World")\n' + '```\n'

      const output = '```python\n' + 'print("Hello\\`World")\n' + '```\n'

      expect(sanitizeMarkdown(input)).toEqual(output)
    })

    it('should escape "`" characters inside different multiline code blocks', () => {
      const input =
        'some text before block\n' +
        '```python\n' +
        'print("Hello`World")\n' +
        '```\n' +
        'hello world\n' +
        '```python\n' +
        'print("Hello`World")\n' +
        '```\n'

      const output =
        'some text before block\n' +
        '```python\n' +
        'print("Hello\\`World")\n' +
        '```\n' +
        'hello world\n' +
        '```python\n' +
        'print("Hello\\`World")\n' +
        '```\n'

      expect(sanitizeMarkdown(input)).toEqual(output)
    })

    it('should not escape links in multiline code blocks', () => {
      const input =
        '```python\n' +
        'print("Hello [World](https://example.com)")\n' +
        '```\n'

      const output =
        '```python\n' +
        'print("Hello [World](https://example.com)")\n' +
        '```\n'

      expect(sanitizeMarkdown(input)).toEqual(output)
    })
  })

  describe('links', () => {
    it('should keep link without changing', () => {
      const input = '[hello world](https://example.com)'

      const output = '[hello world](https://example.com)'

      expect(sanitizeMarkdown(input)).toEqual(output)
    })

    it.each(SPECIAL_CHARACTERS.filter((character) => character !== ']'))(
      'should escape special characters inside link (except "]") - "%s"',
      (character) => {
        const input = `[hello ${character} world](https://example.com/hello#world)`

        const output = `[hello \\${character} world](https://example.com/hello#world)`

        expect(sanitizeMarkdown(input)).toEqual(output)
      },
    )
  })

  describe('single line code blocks', () => {
    it('should keep single line code block content without changing', () => {
      const input = 'some text before `hello world` and after'

      const output = 'some text before `hello world` and after'

      expect(sanitizeMarkdown(input)).toEqual(output)
    })

    it.each(SPECIAL_CHARACTERS.filter((character) => character !== '`'))(
      'should not escape special characters (except "`") inside single line code blocks - "%s"',
      (character) => {
        const input = `some text before \`hello${character}world\` and after`

        const output = `some text before \`hello${character}world\` and after`

        expect(sanitizeMarkdown(input)).toEqual(output)
      },
    )

    it('should keep valid and escape invalid single line code blocks', () => {
      const input = 'some text before `hello`world` and after'

      const output = 'some text before `hello`world\\` and after'

      expect(sanitizeMarkdown(input)).toEqual(output)
    })
  })

  describe('special symbols', () => {
    it('should escape "`" characters between different code blocks', () => {
      const input =
        '```python\n' +
        'print("Hello`World")\n' +
        '```\n' +
        'hello`world\n' +
        '```python\n' +
        'print("Hello`World")\n' +
        '```\n'

      const output =
        '```python\n' +
        'print("Hello\\`World")\n' +
        '```\n' +
        'hello\\`world\n' +
        '```python\n' +
        'print("Hello\\`World")\n' +
        '```\n'

      expect(sanitizeMarkdown(input)).toEqual(output)
    })

    it.each(SPECIAL_CHARACTERS)(
      'should escape special characters - "%s"',
      (character) => {
        const input = `some text before ${character} and after`

        const output = `some text before \\${character} and after`

        expect(sanitizeMarkdown(input)).toEqual(output)
      },
    )

    it.each(SPECIAL_CHARACTERS)(
      'should escape special characters between multiline code blocks - "%s"',
      (character) => {
        const input =
          '```python\n' +
          'print("Hello`World")\n' +
          '```\n' +
          `hello${character}world\n` +
          '```python\n' +
          'print("Hello`World")\n' +
          '```\n'

        const output =
          '```python\n' +
          'print("Hello\\`World")\n' +
          '```\n' +
          `hello\\${character}world\n` +
          '```python\n' +
          'print("Hello\\`World")\n' +
          '```\n'

        expect(sanitizeMarkdown(input)).toEqual(output)
      },
    )
  })
})

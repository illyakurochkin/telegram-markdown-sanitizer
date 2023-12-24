const MULTILINE_CODE_REGEX = '(?<=\\n|^)```.*\\n?((?:.|\\n)*?)(?:\\n```|$)'
const SINGLE_LINE_CODE_REGEX = '(`.*?`)'
const SPECIAL_SYMBOL = '([_*\\[\\]()~`>#+\\-=|{}.!])'

/**
 * Sanitize markdown input
 * - Detect multiline code blocks and escape backticks inside
 * - Detect single line code blocks without escaping anything inside
 * - Detect all other special symbols and escape them
 *
 * @param input {string} - markdown input (maybe invalid markdown)
 * @returns {string} - sanitized markdown (always valid markdown)
 */
export const sanitizeMarkdown = (input: string): string => {
  const regex = new RegExp(
    `${MULTILINE_CODE_REGEX}|${SINGLE_LINE_CODE_REGEX}|${SPECIAL_SYMBOL}`,
    'g',
  )

  return input.replace(
    regex,
    (match, g1_multilineCodeContent, g2_singleLineCode, g3_specialSymbol) => {
      if (g1_multilineCodeContent) {
        return match.replace(
          g1_multilineCodeContent,
          g1_multilineCodeContent.replace(/`/g, '\\`'),
        )
      } else if (g2_singleLineCode) {
        return g2_singleLineCode
      } else if (g3_specialSymbol) {
        return `\\${g3_specialSymbol}`
      }
      return match
    },
  )
}

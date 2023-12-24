# telegram-markdown-sanitizer

Telegram markdown sanitizer is a zero-dependency, lightweight library designed to sanitize Markdown input, specifically tailored for Telegram's formatting rules. It ensures that the Markdown text is properly escaped, preserving the intended formatting without compromising the text's integrity.

## Installation

```bash
npm install telegram-markdown-sanitizer
```

## Features

- **Zero Dependencies**: This is a lightweight library with no external dependencies, ensuring a minimal footprint.
- **Multiline Code Blocks**: Detects multiline code blocks and escapes backticks inside.
- **Single Line Code Blocks**: Detects single line code blocks without escaping anything inside.
- **Special Symbols**: Detects all other special symbols and escapes them, ensuring valid markdown output.

### Coming Soon

We are actively working on adding more features, including:

- **Links**: Enhanced handling and sanitization of hyperlinks.
- **Formatting**: Support for bold, italic, underline, and strikethrough text.

## Usage

Here is a basic example of how to use `telegram-markdown-sanitizer`:


```typescript
import { sanitizeMarkdown } from 'telegram-markdown-sanitizer';

const inputMarkdown = "Your markdown string here";
const sanitizedMarkdown = sanitizeMarkdown(inputMarkdown);

console.log(sanitizedMarkdown);
```

## API Documentation

### `sanitizeMarkdown(input: string): string`

Sanitizes markdown input by:

- Escaping backticks inside multiline code blocks.
- Preserving content inside single line code blocks.
- Escaping all other special markdown symbols.

**Parameters:**

input: The markdown input (possibly invalid markdown).

**Returns:**

Sanitized markdown string (always valid markdown).

## Contributing
Contributions are welcome! Please feel free to submit pull requests, report bugs, or suggest features.

## License*__*
This project is licensed under the MIT License.

## Author
[Illia Kurochkin](https://github.com/illyakurochkin)
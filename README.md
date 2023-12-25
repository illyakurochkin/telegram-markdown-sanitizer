# Telegram Markdown Sanitizer

## Overview
`telegram-markdown-sanitizer` is a zero-dependency, TypeScript library ensuring Markdown used with the Telegram Bot API's Markdown V2 mode is valid. It sanitizes Markdown to comply with [Telegram's Markdown Specification](https://core.telegram.org/bots/api), transforming potentially invalid markdown into Telegram-compliant format by escaping invalid characters and maintaining valid markdown structures.

## Problem Description
Using Telegram Bot API with Markdown V2 requires valid markdown conforming to Telegram's specifications. Invalid markdown input can lead to message failures or display errors. This library preprocesses markdown input, converting it to a valid format by escaping all inappropriate characters while preserving valid markdown elements.

## Installation

```bash
npm install telegram-markdown-sanitizer
```

## Features

- **Multiline Code Bloc**ks**: Detects multiline code blocks and escapes backticks inside.
- **Single Line Code Blocks**: Detects single line code blocks without escaping anything inside.
- **Links**: Detects links and escapes special symbols inside them.
- **Special Symbols**: Detects all other special symbols and escapes them, ensuring valid markdown output.

### Upcoming Features

We are actively working on adding more features, including:

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

#### `sanitizeMarkdown(input: string): string`
Sanitizes markdown input by:
- Escaping backticks inside multiline code blocks.
- Preserving content inside single line code blocks.
- Escaping all other special markdown symbols.

#### Parameters:
- `input`: The markdown input (possibly invalid markdown).

#### Returns:
- Sanitized markdown string (always valid markdown).

## Contributing
Contributions are welcome! Please feel free to submit pull requests, report bugs, or suggest features.

## License
This project is licensed under the MIT License.

## Author
[Illia Kurochkin](https://github.com/illyakurochkin)
# Contributing to Stellar Frontend Starter Template

Thank you for your interest in contributing! 🎉

## How to Contribute

### For Beginners

If you're new to Stellar or blockchain development:

1. **Fork this repository**
2. **Make your UI/UX improvements**
3. **Test thoroughly on Testnet**
4. **Submit a Pull Request**

### What to Contribute

We welcome contributions in these areas:

#### 🎨 UI/UX Improvements
- Better color schemes
- Improved layouts
- Enhanced animations
- Better mobile responsive design
- Accessibility improvements

#### 🔧 Component Enhancements
- More reusable components
- Better form validation
- Improved error handling
- Loading state variations

#### 📚 Documentation
- Better README examples
- More code comments
- Tutorial improvements
- Troubleshooting guides

#### ✨ Bonus Features
- Implement placeholder features in `BonusFeatures.tsx`
- Add new creative features
- Performance optimizations

### What NOT to Contribute

❌ **DO NOT** modify `lib/stellar-helper.ts` unless fixing a critical bug
❌ **DO NOT** change the core blockchain logic
❌ **DO NOT** add complex dependencies without discussion

## Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow existing naming conventions
- Add comments for complex logic
- Keep components focused and reusable

```typescript
// Good: Clear component name and comments
export function PaymentConfirmation({ amount, recipient }: Props) {
  // Confirm before sending payment
  // ...
}

// Bad: Unclear naming
export function PC({ a, r }: any) {
  // ...
}
```

### Component Structure

```typescript
/**
 * Component Name
 * 
 * Brief description
 * 
 * Features:
 * - Feature 1
 * - Feature 2
 */

'use client';

import { ... } from '...';

interface Props {
  // Type definitions
}

export default function ComponentName({ ...props }: Props) {
  // Component logic
}
```

### Testing Checklist

Before submitting a PR:

- [ ] Test on Testnet (not Mainnet!)
- [ ] Test wallet connection
- [ ] Test sending payment
- [ ] Test on mobile viewport
- [ ] Check for console errors
- [ ] Verify all loading states
- [ ] Test error scenarios
- [ ] Check TypeScript types

### Commit Messages

Use clear, descriptive commit messages:

```bash
# Good
git commit -m "Add dark mode toggle to header"
git commit -m "Fix transaction history loading state"
git commit -m "Improve mobile layout for payment form"

# Bad
git commit -m "update"
git commit -m "fix bug"
git commit -m "changes"
```

## Pull Request Process

1. **Fork & Clone**
   ```bash
   git clone https://github.com/your-username/stellar-frontend-challenge.git
   cd stellar-frontend-challenge
   npm install
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**
   - Write clean code
   - Test thoroughly
   - Update documentation if needed

4. **Commit & Push**
   ```bash
   git add .
   git commit -m "Clear description of changes"
   git push origin feature/your-feature-name
   ```

5. **Open Pull Request**
   - Go to GitHub
   - Click "New Pull Request"
   - Fill in the template
   - Wait for review

### PR Template

When opening a PR, include:

```markdown
## Description
Brief description of your changes

## Type of Change
- [ ] UI/UX Improvement
- [ ] New Feature
- [ ] Bug Fix
- [ ] Documentation
- [ ] Other (specify)

## Screenshots
If applicable, add screenshots

## Testing
- [ ] Tested on Testnet
- [ ] No console errors
- [ ] Mobile responsive
- [ ] All features working

## Additional Notes
Any other context about the PR
```

## Questions?

- Open an issue for bugs or feature requests
- Join [Stellar Discord](https://discord.gg/stellardev) for questions
- Check [Stellar Docs](https://developers.stellar.org/) for blockchain questions

## Code of Conduct

- Be respectful and inclusive
- Help others learn
- Provide constructive feedback
- Keep discussions professional

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Happy Contributing! 🚀**

Remember: This is a learning-friendly project. Don't be afraid to ask questions!


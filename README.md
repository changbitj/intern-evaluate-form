# InternEval AI - Performance Review Parser

<div align="center">

![InternEval AI Banner](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6)

**AI-powered intern evaluation system using Google Gemini**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff.svg)](https://vitejs.dev/)
[![Code Style](https://img.shields.io/badge/Code%20Style-MSG%20Standards-success.svg)](#coding-standards)

</div>

## 📋 Overview

InternEval AI is a modern web application that transforms unstructured performance review notes into standardized evaluation forms. Using Google Gemini AI, it automatically extracts evaluation criteria and generates consistent scoring templates for multiple candidates.

### ✨ Key Features

- 🤖 **AI-Powered Analysis**: Automatically extracts strengths, weaknesses, and recommendations from review text
- 📊 **Standardized Scoring**: Generates consistent 5-star rating criteria for all candidates
- 👥 **Multi-Candidate Support**: Evaluate multiple interns simultaneously with the same criteria
- 📈 **Real-time Metrics**: Automatic calculation of average scores and completion progress
- 📥 **CSV Export**: Export evaluation results with UTF-8 BOM support for Excel compatibility
- 🌐 **Vietnamese Support**: Full support for Vietnamese characters and diacritics

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Google Gemini API Key** ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/interneval-ai.git
cd interneval-ai

# 2. Install dependencies
npm install

# 3. Set up environment variables
# Create .env.local file and add your API key
echo "GEMINI_API_KEY=your_api_key_here" > .env.local

# 4. Start development server
npm run dev

# 5. Open browser at http://localhost:3000
```

## 📖 Usage Guide

### 1. Define Criteria Source

Paste previous performance reviews or example criteria. The AI will analyze and synthesize them into a standardized scoring form.

**Example Input:**
```
Điểm mạnh:
Nam thể hiện sự nhiệt huyết cao trong công việc.
Có kiến thức cơ bản vững chắc về Java.
Hoàn thành tốt các nhiệm vụ được giao.
Điểm yếu:
Cần cải thiện sự cẩn trọng và chú ý đến chi tiết để đảm bảo chất lượng đầu ra tốt nhất trước khi bàn giao.
Khuyến nghị:
Cần bổ sung các chương trình đào tạo chuyên sâu hoặc huấn luyện thêm về quy trình kiểm soát chất lượng.
```

### 2. Add Candidates

- Set the number of candidates (1-50)
- Enter candidate names (optional - defaults to "Intern 1", "Intern 2", etc.)

### 3. Generate Evaluation Forms

Click "Create Evaluation Forms" to let AI generate standardized criteria for all candidates.

### 4. Score Candidates

Rate each criterion using the 5-star rating system. Progress and average scores update automatically.

### 5. Export Results

Click "Export CSV" to download evaluation results in Excel-compatible format.

**CSV Output Format:**
```csv
Candidate Name,Role,Criterion 1,Criterion 2,...,Average Score,Progress
"Intern 1",Intern/Member,5,4,3,0,4.0,75%
```

## 🛠️ Development

### Project Structure

```
interneval-ai/
├── components/           # React components
│   ├── EvaluationForm.tsx   # Main evaluation interface
│   ├── RawInputStep.tsx     # Initial setup form
│   └── StarRating.tsx       # Star rating component
├── services/            # API services
│   └── geminiService.ts     # Google Gemini integration
├── constants.ts         # Application constants
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main application component
├── vite.config.ts      # Vite configuration
└── .eslintrc.json      # ESLint configuration
```

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npx eslint . --ext .ts,.tsx

# Format code
npx prettier --write "**/*.{ts,tsx,json}"
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

## 📐 Coding Standards

This project follows **MSG TypeScript + React Coding Standards**:

### Formatting
- ✅ Semicolons required
- ✅ Single quotes for strings, double quotes for JSX
- ✅ 2-space indentation
- ✅ Trailing commas in multi-line structures
- ✅ Max line length: 100 characters

### Naming Conventions
- ✅ `camelCase` for variables and functions
- ✅ `PascalCase` for components, classes, interfaces
- ✅ `UPPER_SNAKE_CASE` for constants

### Code Quality
- ✅ JSDoc comments for all exported functions
- ✅ No hardcoded values (use constants)
- ✅ Early return patterns
- ✅ Strict equality (`===`)
- ✅ No unused imports or variables

### React Best Practices
- ✅ `.tsx` extension for React components
- ✅ Proper prop destructuring
- ✅ Self-closing tags where appropriate
- ✅ Fragments for multiple elements

## 🔧 Configuration Files

### ESLint (`.eslintrc.json`)
Enforces coding standards automatically:
- TypeScript rules
- React/JSX rules
- Import/export validation
- Code quality checks

### Prettier (`.prettierrc`)
Consistent code formatting:
- Single quotes
- Semicolons
- Trailing commas
- 100-char line width

## 📦 Build & Deployment

### Production Build

```bash
# Build optimized production bundle
npm run build

# Output will be in dist/ directory
# Upload dist/ to your hosting service
```

### Deployment Options

- **Vercel**: `vercel --prod`
- **Netlify**: Drag & drop `dist/` folder
- **GitHub Pages**: Use `gh-pages` package
- **Custom Server**: Serve `dist/` with any static file server

### Environment Variables for Production

Make sure to set `GEMINI_API_KEY` in your hosting platform's environment variables.

## 🧪 Testing

The application has been thoroughly tested:

- ✅ Build completes with no errors or warnings
- ✅ All UI components render correctly
- ✅ Star rating system works properly
- ✅ CSV export generates correct format with UTF-8 BOM
- ✅ Vietnamese characters display correctly
- ✅ Average score and progress calculations are accurate

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the coding standards
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful text analysis
- **React** and **Vite** for the development framework
- **Lucide React** for beautiful icons
- **MSG** for coding standards

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Contact: [your-email@example.com]

## ☕ Support the Project

If you find this project helpful and would like to support its development, you can buy me a coffee through cryptocurrency donations:

### Crypto Wallets

- **Bitcoin (BTC)**: `your_btc_wallet_address_here`
- **Ethereum (ETH)**: `your_eth_wallet_address_here`
- **USDT (TRC20)**: `your_usdt_trc20_address_here`
- **USDT (ERC20)**: `your_usdt_erc20_address_here`

Your support is greatly appreciated and helps maintain and improve this project! 🙏

---

<div align="center">

**Built with ❤️ using React, TypeScript, and Google Gemini AI**

</div>

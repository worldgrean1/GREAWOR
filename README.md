# Grean Energy Project

A modern, responsive web application for monitoring and managing renewable energy resources. Built with Next.js and TailwindCSS.

## Features

- Dashboard for energy production and consumption metrics
- Interactive visualizations of energy data
- User management and preferences
- Mobile-responsive design
- Dark/light mode support

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - UI library
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Headless UI components
- [Recharts](https://recharts.org/) - Composable charting library
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [GSAP](https://greensock.com/) - Animation library
- [Framer Motion](https://www.framer.com/motion/) - Animation library

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/grean-energy.git
   cd grean-energy
   ```

2. Install dependencies
   ```
   npm install
   # or
   yarn install
   ```

3. Run the development server
   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build for Production

```
npm run build
# or
yarn build
```

## Project Cleanup

To clean up the project and perform a fresh installation:

```bash
node cleanup.js
```

This script will:
1. Remove build artifacts and cache
2. Clean npm cache
3. Remove node_modules
4. Perform a fresh installation of dependencies

## Known Issues

There is an outstanding issue with a missing component:
`@/components/static-nodes/static-solar-panel-node`

This needs to be addressed:
1. The component needs to be created
2. Or the import statement needs to be corrected
3. Or the path needs to be updated

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Benefits of Cleanup

- **Reduced Package Size**: Smaller `node_modules` folder
- **Faster Installation**: Fewer packages to download and install
- **Reduced Security Risks**: Fewer dependencies means fewer potential vulnerabilities
- **Better Maintainability**: Clearer understanding of the project's actual dependencies
- **Improved Build Performance**: Less code to process during builds 
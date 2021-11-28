import React, { Component } from 'react';
// routes
import Router from './routes';

// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';


// ----------------------------------------------------------------------


// class App extends Component {
//   render() {
//     return (
//       <ThemeConfig>
//         <ScrollToTop />
//         <GlobalStyles />
//         <BaseOptionChartStyle />
//         <Router /> 
//       </ThemeConfig>
//     );
//   }
// }


// export default withFirebaseAuth({
//   providers,
//   firebaseAppAuth,
// })(App);




export default function App() {
  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router />
    </ThemeConfig>
  );
}

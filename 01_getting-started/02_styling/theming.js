/* Theming */
//Styled components exports a ThemeProvider that allows us to easily theme our styled components. 
//To make it work we need to do the following:
// - import the ThemeProvider
// - set it as root Element of the App
// - define a theme
// - refer to a property in theme and set that to a desired CSS property

// 1. Set up
//In the component where we intend to use a Theme, we need to import and declare a ThemeProvider. 
//Now this can be either the root element of the entire app or the component you are in. 
//ThemeProvider will inject a theme property inside of either all components or from the component you add it to and all its children. 

//Let’s look at how to add it globally:
ReactDOM.render(
  <ThemeProvider theme={{ color: "white", bgcolor: "red" }}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);

//Now we are ready to change our components accordingly to start using the theme we set out.

//Let’s take the Button component that we defined and have it use our theme, like so:
const Button = styled.button.attrs({ title: "titled" })`
  background: ${props => props.theme.bgcolor};
  color: ${props => props.theme.color};
  border-radius: 7px;
  padding: 20px;
  margin: 10px;
  font-size: 16px;
  :disabled {
    opacity: 0.4;
  }
  :hover {
   box-shadow: 0 0 10px yellow;
  }
  ${props => props.primary && css`
    background: green;
    color: white;
  `}
  border-radius: ${props => (props.round ? "50%" : "7px")}
`

//As you can see we are able to access the themes property by writing 
props.theme.[nameOfThemeProperty]



// 2. Theme as a higher order component factory
//If we want to use the theme inside of a component we can do so but we need to use a helper called withTheme():
import { withTheme } from 'styled-components';

class TextComponent extends React.Component {
  render() {
    console.log('theme ', this.props.theme);
  }
}

export default withTheme(TextComponent);
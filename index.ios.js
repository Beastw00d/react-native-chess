/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

var ChessClockDisplay = require('./ChessClockDisplay');

var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  Component
} = React;

class ChessClock extends Component{
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        navigationBarHidden={false}
        translucent={true}
        initialRoute={{
          title: 'Chess Clock',
          component: ChessClockDisplay
        }}/>
    );
  } 
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('ChessClock', () => ChessClock);

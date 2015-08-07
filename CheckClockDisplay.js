'use strict';

var React = require('react-native');
var TimeSettings = require('./TimeSettings');
var {
  StyleSheet,
  Text,
  View,
  Component,
  TouchableHighlight,
  Image,
  AlertIOS,
} = React;

var timeOnClock = 300;

var originalState = {
      initTime: timeOnClock,
      player1Time: timeOnClock,
      player2Time: timeOnClock,
      player1Turn: true,
      pause: false
    };

class ChessClockDisplay extends Component{
  constructor(props){
    super(props);
    this.state = originalState
  }
  tick1() {
    var time = this.state.player1Time - 1
    if(time < 0) this.gameOver();
    else this.setState({player1Time: time});
  }
  tick2() {
    var time = this.state.player2Time - 1
    if(time < 0) this.gameOver();
    else this.setState({player2Time: time});
    
  }
  gameOver(){
    AlertIOS.alert(
      'Game Over',
      'Time has run out',
      [
        {text: 'Play Again', onPress: () => this.reload()}
      ]
    );
    this.reload();
  }
  switch1(){
    clearInterval(this.interval);
    this.setState({player1Turn: false});
    this.interval = setInterval(this.tick2.bind(this), 1000);
  }
  switch2(){
    clearInterval(this.interval);
    this.setState({player1Turn: true});
    this.interval = setInterval(this.tick1.bind(this), 1000);
  }
  pause(){
    this.setState({pause: true});
    clearInterval(this.interval);
  }
  play(){
    if(this.state.player1Turn) 
      this.interval = setInterval(this.tick1.bind(this), 1000);
    else
      this.interval = setInterval(this.tick2.bind(this), 1000);

    this.setState({pause: false});
  }
  reload(){
    clearInterval(this.interval);
    this.setState(originalState);
  }
  confirmReload(){
    this.pause();
    AlertIOS.alert(
      'Restart',
      'Are you sure you want to restart?',
      [
        {text: 'No', onPress: () => this.play()},
        {text: 'Yes', onPress: () => this.reload()}
      ]
    );
  }
  navToTimePage(){
      this.props.navigator.push({
        title: 'Timer Settings',
        component: TimeSettings,
        passProps: {updateTime: this.updateTime(), currentTime: timeOnClock}
      })
  }
  updateTime(time){
    timeOnClock = time;
    reload();
  }
  render() {
    var p1 = this.state.player1Turn;
    var pause = this.state.pause;

    var playPause = this.state.pause 
      ? (<TouchableHighlight onPress={() => this.play()}>
              <Image style={styles.icon} 
                source={require('image!play')}/>
          </TouchableHighlight>)
      : (<TouchableHighlight onPress={() => this.pause()}>
              <Image style={styles.icon} 
                source={require('image!pause')}/>
          </TouchableHighlight>)
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => p1 && !pause ? this.switch1() : null} 
            underlayColor={p1 && !pause? '#dddddd' : '#ABA9AF'}>
          <View style={p1 && !pause ? styles.box : styles.disabledBox}>
            <Text style={styles.clockText}>
              {formatTime(this.state.player1Time)}
            </Text>
          </View>
        </TouchableHighlight>

        <View style={styles.break}>
          {playPause}
          <TouchableHighlight onPress={() => this.navToTimePage()}>
              <Image style={styles.icon} 
                source={require('image!clock')}/>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.confirmReload()}>
              <Image style={styles.icon} 
                source={require('image!reload')}/>
          </TouchableHighlight>
        </View>
        <TouchableHighlight onPress={() => !p1 && !pause ? this.switch2() : null} 
            underlayColor={!p1 && !pause ? '#dddddd' : '#ABA9AF'}>
          <View style={!p1  && !pause ? styles.box : styles.disabledBox}>
            <Text style={styles.clockText}>
             {formatTime(this.state.player2Time)}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );  
  }
}

function formatTime(time) {

    var mins = Math.floor(time / 60);
    var secs = time - mins * 60;
    var ret = "";
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;

}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#FFFCFF',
  },
  break: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  box: {
      height: 300,
      backgroundColor: "#5CF9C4",
      alignItems: 'center',
      justifyContent: 'center'
  },
  disabledBox : {
      height : 300,
      backgroundColor: "#ABA9AF",
      alignItems: 'center',
      justifyContent: 'center'
  },
  clockText: {
      color: 'white',
      fontSize: 75,
      fontWeight: 'bold'
  },
  icon : {
    width: 30,
    height: 30,
  }
});

module.exports = ChessClockDisplay;
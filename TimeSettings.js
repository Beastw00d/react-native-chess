'use strict';

var React = require('react-native');

var {
	Component,
	View,
	Text,
	StyleSheet,
	TouchableHighlight,
	PickerIOS,
} = React;

var PickerItemIOS = PickerIOS.Item;

class TimeSettings extends Component {
	constructor(props){
		super(props);
		var t = (props.currentTime / 60).toString();
		this.state = {
			minutes: t
		};
	}
	updateTime(){
		this.props.updateTime(this.state.minutes * 60);
		this.props.navigator.pop() // go back
	}
	render() {
		return(

			<View style={styles.container}>
				<View>
					<Text style={styles.description}>
						Select the number of minutes!
					</Text>
					<PickerIOS
						selectedValue={this.state.minutes}
						onValueChange={(minutes) => this.setState({minutes: minutes})}
					>
						{numbers1through59.map((num) => (
							<PickerItemIOS 
								key={num}
								value={num}
								label={num}
							/>
						))}
					</PickerIOS>


					<TouchableHighlight onPress={() => this.updateTime()}
						style={styles.button} underlayColor={'#dddddd'}>
						<Text style={styles.buttonText}>
							Save
						</Text>
					</TouchableHighlight>
				</View>
			</View>
		);
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 65,
		paddingTop: 40,
		paddingLeft: 40,
		paddingRight: 40,
		alignItems: 'stretch',
		justifyContent: 'flex-start',
		backgroundColor: '#ABA9AF'
	},
	button: {
		height: 50, 
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#5CF9C4',
		borderColor: '#5CF9C4',
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 10,
		marginTop: 10,
		alignSelf: 'stretch',
		justifyContent: 'center'
	},
	buttonText: {
		fontSize: 40,
		color: 'white',
		fontWeight: 'bold',
		alignSelf: 'center'
	},
	description: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 20
	}
});

var numbers1through59 = [
	'1','2','3','4','5','6','7','8','9','10',
	'11','12','13','14','15','16','17','18','19','20',
	'21','22','23','24','25','26','27','28','29','30',
	'31','32','33','34','35','36','37','38','39','40',
	'41','42','43','44','45','46','47','48','49','50',
	'51','52','53','54','55','56','57','58','59',
]

module.exports = TimeSettings;
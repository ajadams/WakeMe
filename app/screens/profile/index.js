// /screens/profile/index.js

// libs
import { connect } from 'react-redux'
import React, { PureComponent } from 'react'
import QRCode from 'react-native-qrcode'
import { LoginManager } from 'react-native-fbsdk'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
	View,
	Text,
	Image,
	TouchableOpacity,
} from 'react-native'

// components
import NavHeader from './../../components/navHeader'

// actions
import { signOut } from './../../actions/user'

// styles
import { pro } from './../../styles/profile'
import { darkTheme } from './../../styles/_global'

// constants
import { resetStackAndNavTo } from './../../constants/user'

class Profile extends PureComponent{
	constructor(props){
		super(props);

		this.state = {
			hasSeenFriendsList: false,
		}
	}

	_signOut = () => {
		const { navigation, dispatch } = this.props;
		// logout from fb
		LoginManager.logOut();
		// dispatch reset state
		dispatch( signOut() );
		// reset stack
		navigation.dispatch( resetStackAndNavTo(['Entry']) );
	}

	_qrValue = () => {
		const { 
			name, 
			id: fb_user_id, 
			onesignal_device_token: device_token
		} = this.props._user;

		return JSON.stringify({
            name,
            fb_user_id,
            device_token,
        });
	}

	_goToMyFriends = () => {
		if( !this.state.hasSeenFriendsList ) this.setState({hasSeenFriendsList: true});
		this.props.navigation.navigate('AllFriends');
	}

	_goToFindFriends = () => this.props.navigation.navigate('FindFriends')

	render(){
		const { navigation, _user, _friends } = this.props;
		const { name, picture } = _user;
		const qrValue = this._qrValue();
		const hasOutstandingReq = !!_friends.outstanding_list.length && !this.state.hasSeenFriendsList;

		return (
			<View style={pro.container}>

				<NavHeader
					title="Profile"
					leftIcon="chevron-left"
					leftPress={() => navigation.goBack(null)} />

				<View style={pro.main}>
					<Animatable.View animation="fadeInLeft" style={pro.profilePic}>
						{ !!picture && <Image source={{uri: picture.data.url}} style={pro.pic} /> }
					</Animatable.View>
					<Animatable.Text animation="fadeInRight" style={pro.name}>
						{ name }
					</Animatable.Text>
				</View>

				<View style={pro.qrCode}>
					<Text style={pro.qrText}>Have a friend scan your QR Code to instantly become friends!</Text>
					<View style={pro.qrBg}>
						<QRCode 
							value={ qrValue }
							bgColor={darkTheme.shade4}
							fgColor={darkTheme.shade3} />
					</View>
				</View>

				<View style={pro.links}>
				
					{ !_friends.accepted_list.length && 
						<View>
							<Text style={pro.label}>It looks like you have no friends :(</Text>
							<Text style={pro.label}>Find friends to help wake you up!</Text>
						</View>
					}

					{ !!_friends.friends_list.length && 
						<TouchableOpacity style={pro.link} onPress={ this._goToMyFriends }>
							{ hasOutstandingReq ?
								<Animatable.Text style={[pro.linkText, pro.outReq]} animation="zoomIn" iterationCount={1}>
									My Friends
								</Animatable.Text>
								:
								<Text style={pro.linkText}>My Friends</Text>
							}
						</TouchableOpacity> 
					}
					
					<TouchableOpacity style={pro.link} onPress={ this._goToFindFriends }>
						<Text style={pro.linkText}>Find Friends</Text>
					</TouchableOpacity>
					
				</View>

				<View style={pro.signoutWrapper}>
					<TouchableOpacity style={pro.signout} onPress={ this._signOut }>
						<Text style={pro.signoutText}>Sign Out</Text>
					</TouchableOpacity>
				</View>

			</View>
		);
	}
}

const mapStateToProps = (state, props) => ({
	_user: state._user,
	_friends: state._friends,
})

export default connect(mapStateToProps)(Profile);
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// libs
import { Provider } from 'react-redux'
import store from './app/reducers/store'
import React, { Component } from 'react'
import OneSignal from 'react-native-onesignal' // onesignal register events ONLY works at root file (aka this file)
import { Alert } from 'react-native'

// components
import AppNavigation from './app/navigation'

// actions
import { updateUser } from './app/actions/user'
import { updateAlarm } from './app/actions/alarm'

export default class WakeMe extends Component<{}> {
    componentDidMount(){
      // onesignal init events need to be in this file, but onReceived/onOpened events are handled in PushController
      OneSignal.addEventListener('ids', this._onIds);
      OneSignal.addEventListener('registered', this._onRegistered);
      OneSignal.addEventListener('opened', this._onOpened);
    }

    componentWillUnmount(){
      OneSignal.removeEventListener('ids', this._onIds);
      OneSignal.removeEventListener('registered', this._onRegistered);
      OneSignal.removeEventListener('opened', this._onOpened);
    }

    _onIds = ({ userId: onesignal_device_token, pushToken: onesignal_push_token }) => {
      // on init, should be getting data from onesignal, save ids to store
      store.dispatch( updateUser({ onesignal_device_token, onesignal_push_token }) );
    }

    _onRegistered = (data) => {
      // console.log('register data: ', data);
    }

    _onOpened = ({ action, notification }) => {
      const { notification_type, ...restOf } = notification.payload.additionalData;

      // clear notifications for android - ios done automagically
      if( Platform.OS === 'android' ) OneSignal.clearOneSignalNotifications();

      // if notification type is alarm - start waker
      if( notification_type === 'alarm' ){
        store.dispatch( updateAlarm({receivedAlarm: true}) );

      }else if( notification_type === 'friend_request_inquiry' ){

        // accept friend request only if actionID is 'accept'
        // if( action.actionID === 'accept' ){
        //   const friend = restOf;
        //   // console.log('friend: ', friend);
        //   this._acceptFriendship( friend );
        // }else{
        //   // console.log('no action type');
        //   this._showRequestAlert( notification.payload );
        // }
      }
    }

    _navStateChange = (prevState, currentState) => {
      console.log('=======================');
      console.log('prevState: ', prevState);
      console.log('currentState: ', currentState);
      console.log('=======================');
    }

    render() {
        return (
            <Provider store={store}>
                <AppNavigation />
            </Provider>
        )
    }
}

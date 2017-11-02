// /styles/collection.js

import { StyleSheet, Platform } from 'react-native'

// import global styles
import * as _g from './_global'

const _wake = {
	container: {
		flex: 1,
		// ..._g._border(1, 'red'),
	},
	header: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'space-between',
		height: Platform.OS === 'android' ? _g.header_height + 20 : _g.header_height + 50,
		position: 'absolute',
		width: '100%',
		..._g._padding(0, 15, 0, 15),
		zIndex: 2,
		backgroundColor: 'transparent',
		// ..._g._border(1, 'red'),
	},
	pagination: {
		color: _g.white,
		backgroundColor: 'transparent',
	},
	player: {
		flex: 1,
	},
	file: {
		flex: 1,
	},
	progessWrapper: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
	},
	start: {
		backgroundColor: _g.darkTheme.shade5,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	startText: {
		color: _g.darkTheme.shade1,
		fontSize: 40,
		fontWeight: '200',
		textAlign: 'center',
	},
	timeText: {
		color: _g.darkTheme.shade2,
		fontSize: 100,
	},
	ampm: {
		fontSize: 50,
	},
	nav: {
		backgroundColor: 'transparent',
		zIndex: 2,
	},
	navBtn: {
		..._g._border(1, _g.darkTheme.shade2),
		borderRadius: 3,
		..._g._padding(5, 10, 7, 10),
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	pos1: {
		position: 'absolute',
		bottom: 20,
		right: 20,
	},
	navTitle: {
		color: _g.darkTheme.shade2,
		fontWeight: '100',
		fontSize: 30,
		marginRight: 10,
	},
	navIcon: {
		color: _g.darkTheme.shade2,
	},
	loader: {
		position: 'absolute',
		zIndex: 0,
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		zIndex: 2,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(170, 171, 184, 0.7)',
	},
	from: {
		color: _g.darkTheme.shade2,
		fontSize: 14,
	},
	fromWho: {
		color: _g.darkTheme.shade2,
		fontSize: 28,
	},
	txtShadow: {
		textShadowColor: 'rgba(0,0,0,1)',
		textShadowOffset: {width: -1, height: -1},
		textShadowRadius: 10,
	}
};

if( Platform.OS === 'android' ){
	_wake.startText.fontFamily = _g.androidFontFamily;
	_wake.from.fontFamily = _g.androidFontFamily;
	_wake.fromWho.fontFamily = _g.androidFontFamily;
	_wake.navTitle.fontFamily = _g.androidFontFamily;
}

export const wake = StyleSheet.create(_wake);
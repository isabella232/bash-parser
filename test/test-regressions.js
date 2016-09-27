'use strict';
import 'babel-register';

const test = require('ava');
const bashParser = require('../src');
const utils = require('./_utils');

/* eslint-disable camelcase */
test('Redirect should be allowed immediately following argument', t => {
	const result = bashParser('echo foo>file.txt');

	utils.checkResults(t, result, {
		type: 'complete_command',
		commands: [{
			type: 'simple_command',
			name: {type: 'word', text: 'echo'},
			suffix: [
				{type: 'word', text: 'foo'},
				{
					type: 'io_redirect',
					op: {type: 'great', text: '>'},
					file: {type: 'word', text: 'file.txt'}
				}
			]
		}]
	});
});

test('Equal sign should be allowed in arguments', t => {
	const result = bashParser('echo foo=bar');
	utils.checkResults(t, result, {
		type: 'complete_command',
		commands: [{
			type: 'simple_command',
			name: {type: 'word', text: 'echo'},
			suffix: [{type: 'word', text: 'foo=bar'}]
		}]
	});
});

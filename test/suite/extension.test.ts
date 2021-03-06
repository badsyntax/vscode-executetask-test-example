import * as vscode from 'vscode';
import * as assert from 'assert';

const EXTENSION_NAME = "exampleuser.vscode-test-sample";

describe('Extension Test Suite 1', () => {
	let extension: vscode.Extension<any> | undefined;

	before(() => {
	  extension = vscode.extensions.getExtension(EXTENSION_NAME);
	});

	it('Sample test', async () => {
		const tasks = (await vscode.tasks.fetchTasks({ type: 'tasktype' }));
		const task = tasks.find(({name}) => name === 'Test Task');
		assert.ok(task);		
	});
});

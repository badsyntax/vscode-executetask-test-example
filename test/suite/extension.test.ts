import * as vscode from 'vscode';
import * as assert from 'assert';

suite('Extension Test Suite 1', () => {
	test('Sample test', async () => {
		const extension = vscode.extensions.getExtension("exampleuser.vscode-test-sample");
		const extensionApi = extension!.exports;
		await extensionApi.promise;
		assert.ok(true);
	});
});

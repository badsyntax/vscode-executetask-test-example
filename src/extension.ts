import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
	return {
		promise: new Promise((resolve) => {
			const task = new vscode.Task(
				{
					type: "tasktype",
				},
				vscode.TaskScope.Workspace,
				"Test Task",
				"tasktype",
				new vscode.ShellExecution("read")
			);
			task.presentationOptions = {
				reveal: vscode.TaskRevealKind.Silent, // onDidEndTaskProcess not called when terminal closed
				// reveal: vscode.TaskRevealKind.Always, // onDidEndTaskProcess is called when terminal closed
			};
			context.subscriptions.push(
				vscode.tasks.onDidStartTaskProcess((event) => {
					const isMyTask = event.execution.task.name === task.name;
					if (isMyTask) {
						console.log("task started");
					}
				}),
				vscode.tasks.onDidEndTaskProcess((event) => {
					const isMyTask = event.execution.task.name === task.name;
					if (isMyTask) {
						console.log("task ended");
					}
				})
			);
			vscode.tasks.executeTask(task).then(
				() => {
					console.log("executed task");
				},
				(err) => {
					console.error(err.message);
				}
			);
		})
	}
}

// this method is called when your extension is deactivated
export function deactivate() {}

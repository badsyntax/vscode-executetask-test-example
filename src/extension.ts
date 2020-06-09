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
				new vscode.ProcessExecution("echo", ["hello"])
			);
			task.presentationOptions = {
				showReuseMessage: false,
				clear: true,
				echo: false,
				focus: false,
				panel: vscode.TaskPanelKind.Shared,
				reveal: vscode.TaskRevealKind.Silent,
			};
			vscode.tasks.onDidStartTaskProcess((event) => {
				const isMyTask = event.execution.task.name === task.name;
				if (isMyTask) {
					console.log("task started");
					resolve();
				}
			});
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

import * as vscode from "vscode";

class CustomTerminal implements vscode.Pseudoterminal {
	private readonly writeEmitter = new vscode.EventEmitter<string>();
	public readonly onDidWrite: vscode.Event<string> = this.writeEmitter.event;
	public async close(): Promise<void> {}
	public open(): void {}
}

function buildTask(): vscode.Task {
	const task = new vscode.Task(
		{
			type: 'tasktype',
		},
		vscode.TaskScope.Workspace,
		"Test Task",
		"tasktype",
		// This shows the error (when using `vscode.tasks.fetchTasks`)
		new vscode.CustomExecution(
			async (): Promise<vscode.Pseudoterminal> => {
				return new CustomTerminal();
			}
		)
		// This fixes the error
		// new vscode.ShellExecution('read'),
	);
	return task;
}


export async function activate(context: vscode.ExtensionContext) {
	const taskProvider = vscode.tasks.registerTaskProvider('tasktype', {
		provideTasks: () => {
			return [buildTask()];
		},
		resolveTask(_task: vscode.Task): undefined {
			return undefined;
		}
	});

	// This shows the error
	const task = (await vscode.tasks.fetchTasks({ type: 'tasktype' })).find(({name}) => name === 'Test Task');

	// This works fine for both vscode.ShellExecution and vscode.CustomExecution
	// const task = buildTask();

	vscode.tasks.executeTask(task);
}

// this method is called when your extension is deactivated
export function deactivate() { }

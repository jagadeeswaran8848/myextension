import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  ICommandPalette
} from '@jupyterlab/apputils';

import {
  Widget
} from '@lumino/widgets';

import {
  ILauncher
} from '@jupyterlab/launcher';

import { ISettingRegistry } from '@jupyterlab/settingregistry';


/**
 * Initialization data for the myextension extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'myextension:plugin',
  autoStart: true,
  optional: [ISettingRegistry, ICommandPalette, ILauncher],
  activate: async (app: JupyterFrontEnd, settingRegistry: ISettingRegistry | null, palette: ICommandPalette, launcher: ILauncher) => {
    console.log('JupyterLab extension myextension is activated!');

    if (settingRegistry) {
      try {
        const settings = await settingRegistry.load(plugin.id);
        console.log('myextension settings loaded:', settings.composite);
      } catch (reason) {
        console.error('Failed to load settings for myextension.', reason);
      }
    }

    // Add a command to open your extension
    const commandId = 'myextension:open';
    app.commands.addCommand(commandId, {
      label: 'Open My Extension',
      execute: () => {
        // Create a new widget (in this case, an empty panel with a unique ID)
        const content = new Widget();
        content.id = 'myextension-widget'; // Assign a unique ID to the widget
        content.node.innerText = 'Hello, this is your extension content!';

        // Add the new widget to the main area
        app.shell.add(content, 'main', { activate: true });
      }
    });

    // Add the command to the palette
    if (palette) {
      palette.addItem({
        command: commandId,
        args: { isPalette: false },
        category: 'Other'
      });
    }

    // Add the command to the launcher
    if (launcher) {
      launcher.add({
        command: commandId,
        category: 'My Extension', // Choose an appropriate category for your extension in the launcher
        rank: 1,// Set the rank to control the position in the launcher
      });
    }
  }
};

export default plugin;

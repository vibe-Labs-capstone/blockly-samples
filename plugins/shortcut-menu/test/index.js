/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Plugin test.
 */

import * as Blockly from 'blockly';
import {toolboxCategories, createPlayground} from '@blockly/dev-tools';
import {ShortcutMenu} from '../src/index';

/**
 * Create a workspace.
 * @param {HTMLElement} blocklyDiv The blockly container div.
 * @param {!Blockly.BlocklyOptions} options The Blockly options.
 * @return {!Blockly.WorkspaceSvg} The created workspace.
 */
function createWorkspace(blocklyDiv, options) {
  const workspace = Blockly.inject(blocklyDiv, options);

  // TODO: Initialize your plugin here.
  const plugin = new ShortcutMenu(workspace);
  plugin.init();
  plugin.show();

  // const button = document.createElement('button');
  // button.setAttribute('class', 'shortcutButton');
  // button.addEventListener('click', function() {
  //   plugin.show();
  // });
  // document.getElementById('root').appendChild(button);

  return workspace;
}

document.addEventListener('DOMContentLoaded', function() {
  const defaultOptions = {
    toolbox: toolboxCategories,
  };
  createPlayground(
      document.getElementById('root'),
      createWorkspace,
      defaultOptions
  );
});

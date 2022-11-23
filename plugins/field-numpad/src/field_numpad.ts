/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Numpad input field.
 * @author richardla4@gmail.com (Richard La)
 */

import * as Blockly from 'blockly/core';
import {FieldNumberConfig} from 'blockly/core/field_number';

/**
 * A config object for defining a field numpad.
 */
export type FieldNumpadConfig = FieldNumberConfig;

/**
* Options used to define a field numpad from JSON.
*/
export interface FieldNumpadOptions extends FieldNumpadConfig {
  value?: string | number;
}

/* eslint-disable @typescript-eslint/ban-types */
/**
* NOTE: `Function` is banned by eslint. Eventually, a more precise
* function type should be added at the corresponding source:
* https://github.com/google/blockly/blob/master/core/field.ts
*/
type FieldNumpadValidator = Function;
/* eslint-enable @typescript-eslint/ban-types */

// TODO: Rename field and update description.
/**
 * Field description.
 */
export class FieldNumpad extends Blockly.FieldNumber {
  /**
   * Class for an number numpad field.
   * @param value The initial value of the field. Should
   *    cast to a number. Defaults to 0.
   * @param min Minimum value.
   * @param max Maximum value.
   * @param precision Precision for value.
   * @param validator A function that is called to validate
   *    changes to the field's value. Takes in a number & returns a validated
   *    number, or null to abort the change.`
   * @param config A map of options used to configure the field.
   *    See the [field creation documentation]{@link
   * https://developers.google.com/blockly/guides/create-custom-blocks/fields/built-in-fields/number#creation}
   *    for a list of properties this parameter supports.
   */
  constructor(value?: string | number, min?: string | number,
      max?: string | number, precision?: string | number,
      validator?: FieldNumpadValidator, config?: FieldNumpadConfig) {
    super(value, min, max, precision, validator, config);
  }

  /**
   * Constructs a FieldNumpad from a JSON arg object.
   * @param options A JSON object with options (value, min, max, and
   *                          precision).
   * @return The new field instance.
   * @package
   * @nocollapse
   */
  static fromJson(options: FieldNumpadOptions): FieldNumpad {
    return new FieldNumpad(
        options.value, undefined, undefined, undefined, undefined, options);
  }

  /* eslint-disable @typescript-eslint/naming-convention */
  /**
   * Show the inline free-text editor on top of the text along with the slider
   *    editor.
   * @param e Optional mouse event that triggered the field to
   *     open, or undefined if triggered programmatically.
   * @param quietInput Quiet input (prevent focusing on the editor).
   */
  protected showEditor_(e?: Event, quietInput?: boolean) {
    // Always quiet the input for the super constructor, as we don't want to
    // focus on the text field, and we don't want to display the modal
    // editor on mobile devices.
    super.showEditor_(e, true);

    // Build the DOM.
    const editor = this.dropdownCreate_();

    Blockly.DropDownDiv.getContentDiv().appendChild(editor);

    const sourceBlock = this.getSourceBlock() as Blockly.BlockSvg;

    const primary = sourceBlock.getColour() || '';
    const tertiary = sourceBlock.getColourTertiary() || '';
    Blockly.DropDownDiv.setColour(primary, tertiary);

    Blockly.DropDownDiv.showPositionedByField(
        this, undefined);
  }

  /**
   * Updates the slider when the field rerenders.
   */
  protected render_() {
    super.render_();
  }

  static createCellInRow_(name: string, row: HTMLTableRowElement,
      position: number): HTMLTableCellElement {
    const cell = row.insertCell(position);
    cell.className = 'numpadItem';
    cell.textContent = name;
    return cell;
  }

  /**
   * Creates the slider editor and add event listeners.
   * @return The newly created slider.
   */
  private dropdownCreate_(): HTMLElement {
    const wrapper = document.createElement('div') as HTMLElement;
    wrapper.className = 'fieldNumpadContainer';
    const table = document.createElement('table');
    table.className = 'fieldNumpad';

    const firstRow = table.insertRow(0);
    const key7 = FieldNumpad.createCellInRow_('7', firstRow, 0);
    const key8 = FieldNumpad.createCellInRow_('8', firstRow, 1);
    const key9 = FieldNumpad.createCellInRow_('9', firstRow, 2);
    const keyDel = FieldNumpad.createCellInRow_('Del', firstRow, 3);

    const secondRow = table.insertRow(1);
    const key4 = FieldNumpad.createCellInRow_('4', secondRow, 0);
    const key5 = FieldNumpad.createCellInRow_('5', secondRow, 1);
    const key6 = FieldNumpad.createCellInRow_('6', secondRow, 2);

    const thirdRow = table.insertRow(2);
    const key1 = FieldNumpad.createCellInRow_('1', thirdRow, 0);
    const key2 = FieldNumpad.createCellInRow_('2', thirdRow, 1);
    const key3 = FieldNumpad.createCellInRow_('3', thirdRow, 2);

    const fourthRow = table.insertRow(3);
    const keySign = FieldNumpad.createCellInRow_('±', fourthRow, 0);
    const key0 = FieldNumpad.createCellInRow_('0', fourthRow, 1);
    const keyDecimal = FieldNumpad.createCellInRow_('.', fourthRow, 2);

    key0.addEventListener('click', () => this.onNumClick_('0'));
    key1.addEventListener('click', () => this.onNumClick_('1'));
    key2.addEventListener('click', () => this.onNumClick_('2'));
    key3.addEventListener('click', () => this.onNumClick_('3'));
    key4.addEventListener('click', () => this.onNumClick_('4'));
    key5.addEventListener('click', () => this.onNumClick_('5'));
    key6.addEventListener('click', () => this.onNumClick_('6'));
    key7.addEventListener('click', () => this.onNumClick_('7'));
    key8.addEventListener('click', () => this.onNumClick_('8'));
    key9.addEventListener('click', () => this.onNumClick_('9'));
    keyDel.addEventListener('click', () => this.onDelClick_());
    keySign.addEventListener('click', () => this.onSignClick_());
    keyDecimal.addEventListener('click', () => this.onNumClick_('.'));

    wrapper.appendChild(table);
    return wrapper;
  }

  private onNumClick_(num: string): any {
    const currentValue = this.getValue().toString();
    this.setEditorValue_(currentValue + num);
  }

  private onDelClick_(): any {
    const currentValue = this.getValue().toString();
    this.setEditorValue_(Number(currentValue.substring(0,
        currentValue.length-1)));
  }

  private onSignClick_(): any {
    const currentValue = this.getValue().toString();
    if (currentValue.startsWith('-')) {
      this.setEditorValue_(Number(currentValue.substring(1,
          currentValue.length)));
    } else {
      this.setEditorValue_(Number('-' + currentValue));
    }
  }
  /* eslint-enable @typescript-eslint/naming-convention */
}

Blockly.fieldRegistry.register('field_numpad', FieldNumpad);

/**
 * CSS for slider field.
 */
Blockly.Css.register(`
.fieldNumpadContainer {
  font-family: 
  align-items: center;
  display: flex;
  justify-content: center;
}
.fieldNumpad {
  border-spacing: 7px;
  height: 100%;  
  width: 100%;
}
.fieldNumpad .numpadItem {
  border: 1px solid rgba(1, 1, 1, 0.5);
  border-radius: 4px;
  color: white;
  min-width: auto;
  padding: 5px;
}
.numpadItem:hover {
  cursor: pointer;
  box-shadow: 0 0 0 4px hsla(0, 0%, 100%, .2);
}
`);
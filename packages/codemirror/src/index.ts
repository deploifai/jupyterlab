// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module codemirror
 */

import { IEditorServices } from '@jupyterlab/codeeditor';
import { CodeMirrorEditorFactory } from './factory';
import { CodeMirrorMimeTypeService } from './mimetype';

export * from './editor';
export * from './factory';
export * from './searchprovider';
export * from './mimetype';
export * from './mode';
export * from './syntaxstatus';

/**
 * The default editor services.
 */
export const editorServices: IEditorServices = {
  factoryService: new CodeMirrorEditorFactory(),
  mimeTypeService: new CodeMirrorMimeTypeService()
};

/**
 * FIXME-TRANS: Maybe an option to be able to pass a translator to the factories?
 *

export function getEditorServices(translator: ITranslator): IEditorServices {
  return {
    factoryService: new CodeMirrorEditorFactory({}, translator),
    mimeTypeService: new CodeMirrorMimeTypeService(translator)
  };
}
 */

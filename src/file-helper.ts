import { NestFile, NestImports, NestProviders } from './nest';
import {
  getPascalCase,
  getRelativePathForImport,
  getArraySchematics,
  getLineNoFromString,
  getClassName,
  getCamelCase,
} from './utils';
import * as fs from 'fs-extra';
import { render } from 'mustache';
import { join, basename } from 'path';
import { TextEncoder, TextDecoder } from 'util';
import {
  window,
  Uri,
  workspace,
  WorkspaceEdit,
  Position,
  commands,
  FileType,
} from 'vscode';

export async function createFile(file: NestFile) {
  if (
    fs.existsSync(
      join(file.uri.fsPath, file.name.toLowerCase() + `.${file.type}.ts`),
    )
  ) {
    return window.showErrorMessage('A file already exists with given name');
  } else {
    const stats = await workspace.fs.stat(file.uri);

    if (stats.type === FileType.Directory) {
      file.uri = Uri.parse(file.uri.path + '/' + file.fullName);
    } else {
      file.uri = Uri.parse(
        file.uri.path.replace(basename(file.uri.path), '') +
          '/' +
          file.fullName,
      );
    }

    return getFileTemplate(file)
      .then((data) => {
        return workspace.fs.writeFile(file.uri, new TextEncoder().encode(data));
      })
      .then(() => {
        return addFilesToAppModule(file);
      })
      .then(() => {
        return formatTextDocument(file.uri);
      })
      .then(() => {
        return true;
      })
      .catch((err) => {
        return window.showErrorMessage(err);
      });
  }
}

export async function formatTextDocument(uri: Uri) {
  return workspace
    .openTextDocument(uri)
    .then((doc) => {
      return window.showTextDocument(doc);
    })
    .then(() => {
      return commands.executeCommand('editor.action.formatDocument');
    });
}

export async function addFilesToAppModule(file: NestFile) {
  let moduleFile: Uri[] = [];

  if (file.type === 'service' || file.type === 'controller') {
    moduleFile = await workspace.findFiles(
      `**/${file.name}.module.ts`,
      '**/node_modules/**',
      1,
    );
  }

  if (moduleFile.length === 0 && file.name !== 'app') {
    moduleFile = await workspace.findFiles(
      '**/app.module.ts',
      '**/node_modules/**',
      1,
    );
  }

  if (moduleFile.length !== 0) {
    workspace
      .saveAll()
      .then(() => {
        return workspace.fs.readFile(moduleFile[0]);
      })
      .then((data) => {
        return addToArray(data, file, moduleFile[0]);
      });
  }
}

export async function getFileTemplate(file: NestFile): Promise<string> {
  return fs
    .readFile(join(__dirname, `/templates/${file.type}.mustache`), 'utf8')
    .then((data) => {
      const name = getClassName(file.name);
      const type = getPascalCase(basename(file.uri.path).split('.')[1]);
      const view = {
        Name: name,
        Type: type,
        VarName: getCamelCase(name) + type,
      };
      return render(data, view);
    });
}

export async function getImportTemplate(
  file: NestFile,
  appModule: Uri,
): Promise<string> {
  return fs
    .readFile(join(__dirname, `/templates/import.mustache`), 'utf8')
    .then((data) => {
      const view = {
        Name: getClassName(file.name) + getPascalCase(file.type),
        Path: getRelativePathForImport(appModule, file.uri),
      };
      return render(data, view);
    });
}

export async function addToArray(
  data: Uint8Array,
  file: NestFile,
  modulePath: Uri,
) {
  if (file.associatedArray !== undefined) {
    const pattern = getArraySchematics(file.associatedArray);
    let match;
    let pos: Position;
    const tempStrData = new TextDecoder().decode(data);

    if ((match = pattern.exec(tempStrData))) {
      pos = getLineNoFromString(tempStrData, match);
      const toInsert =
        '\n        ' +
        getClassName(file.name) +
        getPascalCase(file.type) +
        ', ';
      const edit = new WorkspaceEdit();
      if (file.type === 'filter') {
        edit.insert(modulePath, new Position(0, 0), NestImports.filter + '\n');
        edit.insert(modulePath, pos, '\n' + NestProviders.filter);
      } else {
        edit.insert(modulePath, pos, toInsert);
      }
      const importPath = await getImportTemplate(file, modulePath);
      edit.insert(modulePath, new Position(0, 0), importPath + '\n');

      return workspace.applyEdit(edit).then(() => {
        return formatTextDocument(modulePath);
      });
    }
  }
}

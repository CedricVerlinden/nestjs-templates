import { createFile } from './file-helper';
import { invalidFileNames } from './utils';
import { basename } from 'path';
import { workspace, commands, ExtensionContext, window, Uri } from 'vscode';

export function activate(context: ExtensionContext) {
  const disposableModuleCommand = commands.registerCommand(
    'extension.GenerateModule',
    (resource: Uri) => {
      if (workspace === undefined) {
        return window.showErrorMessage('Please select a workspace first');
      } else {
        return window
          .showInputBox({
            placeHolder: 'Please enter module name',
          })
          .then<any>((input) => {
            if (input === undefined) {
              return;
            }
            if (!invalidFileNames.test(input)) {
              return createFile({
                name: input,
                type: 'module',
                associatedArray: 'imports',
                uri: resource,
                fullName: input.toLowerCase() + `.module.ts`,
              });
            } else {
              return window.showErrorMessage('Invalid filename');
            }
          });
      }
    },
  );

  const disposableServiceCommand = commands.registerCommand(
    'extension.GenerateService',
    (resource) => {
      if (workspace === undefined) {
        return window.showErrorMessage('Please select a workspace first');
      } else {
        window
          .showInputBox({
            placeHolder: 'Please enter Service name',
          })
          .then<any>((input) => {
            if (input === undefined) {
              return;
            }
            if (!invalidFileNames.test(input)) {
              return createFile({
                name: input,
                type: 'service',
                associatedArray: 'providers',
                uri: resource,
                fullName: input.toLowerCase() + `.service.ts`,
              });
            } else {
              return window.showErrorMessage('Invalid filename');
            }
          });
      }
    },
  );

  const disposableControllerCommand = commands.registerCommand(
    'extension.GenerateController',
    (resource) => {
      if (workspace === undefined) {
        return window.showErrorMessage('Please select a workspace first');
      } else {
        window
          .showInputBox({
            placeHolder: 'Please enter Controller name',
          })
          .then<any>((input) => {
            if (input === undefined) {
              return;
            }
            if (!invalidFileNames.test(input)) {
              return createFile({
                name: input,
                type: 'controller',
                associatedArray: 'controllers',
                uri: resource,
                fullName: input.toLowerCase() + `.controller.ts`,
              });
            } else {
              return window.showErrorMessage('Invalid filename');
            }
          });
      }
    },
  );

  const disposableExceptionCommand = commands.registerCommand(
    'extension.GenerateException',
    (resource) => {
      if (workspace === undefined) {
        return window.showErrorMessage('Please select a workspace first');
      } else {
        window
          .showInputBox({
            placeHolder: 'Please enter Exception name',
          })
          .then<any>((input) => {
            if (input === undefined) {
              return;
            }
            if (!invalidFileNames.test(input)) {
              return createFile({
                name: input,
                type: 'exception',
                associatedArray: undefined,
                uri: resource,
                fullName: input.toLowerCase() + `.exception.ts`,
              });
            } else {
              return window.showErrorMessage('Invalid filename');
            }
          });
      }
    },
  );

  const disposableMiddlewareCommand = commands.registerCommand(
    'extension.GenerateMiddleware',
    (resource) => {
      if (workspace === undefined) {
        return window.showErrorMessage('Please select a workspace first');
      } else {
        window
          .showInputBox({
            placeHolder: 'Please enter Middleware name',
          })
          .then<any>((input) => {
            if (input === undefined) {
              return;
            }
            if (!invalidFileNames.test(input)) {
              return createFile({
                name: input,
                type: 'middleware',
                associatedArray: undefined,
                uri: resource,
                fullName: input.toLowerCase() + `.middleware.ts`,
              });
            } else {
              return window.showErrorMessage('Invalid filename');
            }
          });
      }
    },
  );

  const disposableInterceptorCommand = commands.registerCommand(
    'extension.GenerateInterceptor',
    (resource) => {
      if (workspace === undefined) {
        return window.showErrorMessage('Please select a workspace first');
      } else {
        window
          .showInputBox({
            placeHolder: 'Please enter Interceptor name',
          })
          .then<any>((input) => {
            if (input === undefined) {
              return;
            }
            if (!invalidFileNames.test(input)) {
              return createFile({
                name: input,
                type: 'interceptor',
                associatedArray: undefined,
                uri: resource,
                fullName: input.toLowerCase() + `.interceptor.ts`,
              });
            } else {
              return window.showErrorMessage('Invalid filename');
            }
          });
      }
    },
  );

  const disposablePipeCommand = commands.registerCommand(
    'extension.GeneratePipe',
    (resource) => {
      if (workspace === undefined) {
        return window.showErrorMessage('Please select a workspace first');
      } else {
        window
          .showInputBox({
            placeHolder: 'Please enter Pipe name',
          })
          .then<any>((input) => {
            if (input === undefined) {
              return;
            }
            if (!invalidFileNames.test(input)) {
              return createFile({
                name: input,
                type: 'pipe',
                associatedArray: undefined,
                uri: resource,
                fullName: input.toLowerCase() + `.pipe.ts`,
              });
            } else {
              return window.showErrorMessage('Invalid filename');
            }
          });
      }
    },
  );

  const disposableGuardCommand = commands.registerCommand(
    'extension.GenerateGuard',
    (resource) => {
      if (workspace === undefined) {
        return window.showErrorMessage('Please select a workspace first');
      } else {
        window
          .showInputBox({
            placeHolder: 'Please enter Guard name',
          })
          .then<any>((input) => {
            if (input === undefined) {
              return;
            }
            if (!invalidFileNames.test(input)) {
              return createFile({
                name: input,
                type: 'guard',
                associatedArray: undefined,
                uri: resource,
                fullName: input.toLowerCase() + `.guard.ts`,
              });
            } else {
              return window.showErrorMessage('Invalid filename');
            }
          });
      }
    },
  );

  const disposableDecoratorCommand = commands.registerCommand(
    'extension.GenerateDecorator',
    (resource) => {
      if (workspace === undefined) {
        return window.showErrorMessage('Please select a workspace first');
      } else {
        window
          .showInputBox({
            placeHolder: 'Please enter Decorator name',
          })
          .then<any>((input) => {
            if (input === undefined) {
              return;
            }
            if (!invalidFileNames.test(input)) {
              return createFile({
                name: input,
                type: 'decorator',
                associatedArray: undefined,
                uri: resource,
                fullName: input.toLowerCase() + `.decorator.ts`,
              });
            } else {
              return window.showErrorMessage('Invalid filename');
            }
          });
      }
    },
  );

  const disposableExceptionFilterCommand = commands.registerCommand(
    'extension.GenerateExceptionFilter',
    (resource) => {
      if (workspace === undefined) {
        return window.showErrorMessage('Please select a workspace first');
      } else {
        return createFile({
          name: 'AllExceptions',
          type: 'filter',
          associatedArray: 'providers',
          uri: resource,
          fullName: 'exception.filter.ts',
        });
      }
    },
  );

  const disposableUnittestCommand = commands.registerCommand(
    'extension.GenerateUnitTest',
    (resource: Uri) => {
      if (workspace === undefined) {
        return window.showErrorMessage('Please select a workspace first');
      } else {
        return createFile({
          name: basename(resource.fsPath).split('.')[0],
          type: 'spec',
          associatedArray: undefined,
          uri: resource,
          fullName: basename(resource.fsPath).replace('.ts', '') + '.spec.ts',
        });
      }
    },
  );

  const disposableGenerateGatewayCommand = commands.registerCommand(
    'extension.GenerateGateway',
    (resource: Uri) => {
      if (workspace === undefined) {
        return window.showErrorMessage('Please select a workspace first');
      } else {
        window
          .showInputBox({
            placeHolder: 'Please enter Gateway name',
          })
          .then<any>((input) => {
            if (input === undefined) {
              return;
            }
            if (!invalidFileNames.test(input)) {
              return createFile({
                name: input,
                type: 'gateway',
                associatedArray: 'providers',
                uri: resource,
                fullName: input.toLowerCase() + `.gateway.ts`,
              });
            } else {
              return window.showErrorMessage('Invalid filename');
            }
          });
      }
    },
  );

  const disposableGenerateRedisAdapterCommand = commands.registerCommand(
    'extension.GenerateRedisAdapter',
    (resource: Uri) => {
      if (workspace === undefined) {
        return window.showErrorMessage('Please select a workspace first');
      } else {
        return createFile({
          name: 'RedisIoAdapter',
          type: 'adapter',
          associatedArray: undefined,
          uri: resource,
          fullName: 'redis.adapter.ts',
        });
      }
    },
  );

  const disposableTransportCommand = commands.registerCommand(
    'extension.GenerateTransport',
    (resource: Uri) => {
      if (workspace === undefined) {
        return window.showErrorMessage('Please select a workspace first');
      } else {
        window
          .showInputBox({
            placeHolder: 'Please enter Transport name',
          })
          .then<any>((input) => {
            if (input === undefined) {
              return;
            }
            if (!invalidFileNames.test(input)) {
              return createFile({
                name: input,
                type: 'transport',
                associatedArray: undefined,
                uri: resource,
                fullName: input.toLowerCase() + `.transport.ts`,
              });
            } else {
              return window.showErrorMessage('Invalid filename');
            }
          });
      }
    },
  );

  const disposableWebPackCommand = commands.registerCommand(
    'extension.GenerateWebpack',
    (resource: Uri) => {
      if (workspace === undefined) {
        return window.showErrorMessage('Please select a workspace first');
      } else {
        return createFile({
          name: 'webpack',
          type: 'webpack',
          associatedArray: undefined,
          uri: resource,
          fullName: 'webpack.config.js',
        });
      }
    },
  );

  context.subscriptions.push(
    disposableModuleCommand,
    disposableServiceCommand,
    disposableControllerCommand,
    disposableExceptionCommand,
    disposableMiddlewareCommand,
    disposableInterceptorCommand,
    disposablePipeCommand,
    disposableGuardCommand,
    disposableDecoratorCommand,
    disposableExceptionFilterCommand,
    disposableUnittestCommand,
    disposableGenerateGatewayCommand,
    disposableGenerateRedisAdapterCommand,
    disposableTransportCommand,
    disposableWebPackCommand,
  );
}

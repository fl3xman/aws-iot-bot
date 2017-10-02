(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __webpack_require__(12);
const aws_1 = __webpack_require__(13);
exports.aws = aws_1.default;
const facebook_1 = __webpack_require__(15);
exports.facebook = facebook_1.default;
const server_1 = __webpack_require__(16);
exports.server = server_1.default;
if (!server_1.default.isProduction) {
    dotenv.config();
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("inversify");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("inversify-express-utils");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("joi");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("http-status-codes");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Generic = __webpack_require__(24);
exports.Generic = Generic;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class BaseError extends Error {
    constructor(message) {
        super(message);
        Object.defineProperty(this, "name", {
            get: () => this.constructor.name,
        });
    }
}
exports.default = BaseError;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = __webpack_require__(4);
const base_error_1 = __webpack_require__(6);
class HttpError extends base_error_1.default {
    constructor(status, message) {
        super(message || HttpStatus.getStatusText(status));
        this._status = status;
    }
    get status() {
        return this._status;
    }
    get description() {
        return this.message;
    }
}
exports.default = HttpError;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const facebook_service_1 = __webpack_require__(33);
exports.Assembly = facebook_service_1.Assembly;
exports.default = facebook_service_1.default;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("aws-iot-device-sdk");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const AWS = __webpack_require__(9);
const config = __webpack_require__(0);
const facebook_1 = __webpack_require__(8);
const Assembly = {
    AWS: {
        thingShadow: {
            name: "thingShadow", type: Symbol("thingShadow"),
        },
    },
};
const registerServices = (container) => {
    container.bind(Assembly.AWS.thingShadow.type).toDynamicValue((context) => {
        return new AWS.thingShadow({
            caPath: config.aws.credentials.ca,
            certPath: config.aws.credentials.crt,
            clientId: config.aws.client,
            host: config.aws.host,
            keyPath: config.aws.credentials.private,
        });
    }).inSingletonScope();
    container.bind(facebook_1.Assembly.type).to(facebook_1.default).inSingletonScope();
};
exports.registerServices = registerServices;
exports.default = Assembly;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const config = __webpack_require__(0);
const Bluebird = __webpack_require__(17);
const http_1 = __webpack_require__(18);
const bootstrap_1 = __webpack_require__(19);
const server = http_1.createServer(bootstrap_1.default);
const port = config.server.port;
const serverListen = Bluebird.promisify(server.listen, { context: server });
serverListen(port)
    .then(() => console.log(`App is listening on port ${port}`))
    .catch((error) => console.log(`Error (${error}) happened during server start`));


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/// <reference types="node" />
Object.defineProperty(exports, "__esModule", { value: true });
const joi = __webpack_require__(3);
const path = __webpack_require__(14);
const schema = joi.object({
    AWS_CLIENT_ID: joi.string()
        .default("576916018733"),
    AWS_HOST: joi.string()
        .default("a2fo0j0u55vbhj.iot.eu-central-1.amazonaws.com"),
    AWS_THING: joi.string()
        .default("DemoLedThing"),
}).unknown()
    .required();
const { error, value: env } = joi.validate(process.env, schema);
if (error) {
    throw new Error(`Server config validation error: ${error.message}`);
}
exports.default = {
    client: env.AWS_CLIENT_ID,
    credentials: {
        ca: path.resolve("cert/root-CA.crt"),
        crt: path.resolve("cert/f84fba1380-certificate.pem.crt"),
        private: path.resolve("cert/f84fba1380-private.pem.key"),
    },
    host: env.AWS_HOST,
    thing: env.AWS_THING,
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const joi = __webpack_require__(3);
const schema = joi.object({
    FB_DEBUG: joi.boolean()
        .truthy("TRUE")
        .truthy("true")
        .falsy("FALSE")
        .falsy("false")
        .default(false),
    FB_PAGE_ACCESS_TOKEN: joi.string()
        .required(),
    FB_VERIFY_TOKEN: joi.string()
        .required(),
}).unknown()
    .required();
const { error, value: env } = joi.validate(process.env, schema);
if (error) {
    throw new Error(`Facebook config validation error: ${error.message}`);
}
exports.default = {
    api: "v2.9",
    debug: env.FB_DEBUG,
    id: env.FB_APP_ID,
    tokens: {
        access: env.FB_PAGE_ACCESS_TOKEN,
        verify: env.FB_VERIFY_TOKEN,
    },
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/// <reference types="node" />
Object.defineProperty(exports, "__esModule", { value: true });
const joi = __webpack_require__(3);
const schema = joi.object({
    NODE_ENV: joi.string()
        .allow(["development", "production", "test"])
        .default("development"),
    PORT: joi.number()
        .default(3070),
}).unknown()
    .required();
const { error, value: env } = joi.validate(process.env, schema);
if (error) {
    throw new Error(`Server config validation error: ${error.message}`);
}
exports.default = {
    env: env.NODE_ENV,
    isProduction: env.NODE_ENV === "production",
    port: env.PORT,
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(20);
const inversify_1 = __webpack_require__(1);
const inversify_express_utils_1 = __webpack_require__(2);
const inversify_logger_middleware_1 = __webpack_require__(21);
const bodyParser = __webpack_require__(22);
const morgan = __webpack_require__(23);
const config = __webpack_require__(0);
const Errors = __webpack_require__(5);
const assembly_1 = __webpack_require__(27);
const assembly_2 = __webpack_require__(10);
const assembly_3 = __webpack_require__(38);
const container = new inversify_1.Container();
if (!config.server.isProduction) {
    const logger = inversify_logger_middleware_1.makeLoggerMiddleware();
    container.applyMiddleware(logger);
}
const registerInjections = (con) => {
    assembly_3.registerMiddlewares(con);
    assembly_2.registerServices(con);
    assembly_1.registerControllers(con);
};
registerInjections(container);
const server = new inversify_express_utils_1.InversifyExpressServer(container);
exports.default = server.setConfig((app) => {
    app.use(morgan("combined"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
}).setErrorConfig((app) => {
    if (config.server.isProduction) {
        app.use(assembly_3.addErrorMiddleware(container, Errors.Generic.Assembly.name));
    }
}).build();


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("reflect-metadata");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("inversify-logger-middleware");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = __webpack_require__(25);
const HttpStatus = __webpack_require__(4);
const Assembly = {
    name: "ErrorGenericMiddleware",
};
exports.Assembly = Assembly;
exports.default = (err, req, res, next) => {
    // tslint:disable-next-line:no-console
    console.log(err.stack);
    const error = errors_1.ErrorFactory.createHttp(HttpStatus.INTERNAL_SERVER_ERROR);
    res
        .status(error.status)
        .json({ error: error.description });
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const base_error_1 = __webpack_require__(6);
exports.BaseError = base_error_1.default;
const error_factory_1 = __webpack_require__(26);
exports.ErrorFactory = error_factory_1.default;
const http_error_1 = __webpack_require__(7);
exports.HttpError = http_error_1.default;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const http_error_1 = __webpack_require__(7);
class ErrorFactory {
    static createHttp(status, message) {
        return new http_error_1.default(status, message);
    }
}
exports.default = ErrorFactory;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const inversify_express_utils_1 = __webpack_require__(2);
const FacebookController = __webpack_require__(28);
const RootController = __webpack_require__(36);
const registerControllers = (container) => {
    const root = RootController.default(container);
    const facebook = FacebookController.default(container);
    container.bind(inversify_express_utils_1.TYPE.Controller).to(root).whenTargetNamed(RootController.Assembly.name);
    container.bind(inversify_express_utils_1.TYPE.Controller).to(facebook).whenTargetNamed(FacebookController.Assembly.name);
};
exports.registerControllers = registerControllers;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const facebook_controller_1 = __webpack_require__(29);
exports.Assembly = facebook_controller_1.Assembly;
exports.default = facebook_controller_1.default;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __webpack_require__(30);
const qs = __webpack_require__(31);
const url = __webpack_require__(32);
const HttpStatus = __webpack_require__(4);
const inversify_1 = __webpack_require__(1);
const inversify_express_utils_1 = __webpack_require__(2);
const config = __webpack_require__(0);
const facebook_1 = __webpack_require__(8);
const Assembly = {
    name: "FacebookController", type: Symbol("FacebookController"),
};
exports.Assembly = Assembly;
exports.default = (container) => {
    let FacebookController = class FacebookController {
        constructor(service) {
            this.service = service;
        }
        static getAssembly() {
            return Assembly;
        }
        verify(req, res) {
            const { tokens } = config.facebook;
            const query = qs.parse(url.parse(req.url).query);
            if (query["hub.verify_token"] === tokens.verify) {
                res.send(query["hub.challenge"]);
            }
            else {
                res.send("Facebook was not verified.");
            }
        }
        receiveMessages(req, res) {
            this.service.replyMessage(req.body);
            res.sendStatus(HttpStatus.OK);
        }
    };
    __decorate([
        inversify_express_utils_1.httpGet("/"),
        __param(0, inversify_express_utils_1.request()),
        __param(1, inversify_express_utils_1.response()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], FacebookController.prototype, "verify", null);
    __decorate([
        inversify_express_utils_1.httpPost("/"),
        __param(0, inversify_express_utils_1.request()),
        __param(1, inversify_express_utils_1.response()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], FacebookController.prototype, "receiveMessages", null);
    FacebookController = __decorate([
        inversify_1.injectable(),
        inversify_express_utils_1.controller("/facebook/webhooks"),
        __param(0, inversify_1.inject(facebook_1.Assembly.type)),
        __metadata("design:paramtypes", [facebook_1.default])
    ], FacebookController);
    return FacebookController;
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("querystring");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = __webpack_require__(9);
const inversify_1 = __webpack_require__(1);
const _ = __webpack_require__(34);
const rp = __webpack_require__(35);
const config = __webpack_require__(0);
const assembly_1 = __webpack_require__(10);
const Assembly = {
    name: "FacebookService", type: Symbol("FacebookService"),
};
exports.Assembly = Assembly;
let FacebookService = class FacebookService {
    constructor(shadow) {
        this.shadow = shadow;
        this.addThingListeners();
    }
    replyMessage(data) {
        if (data.object === "page") {
            data.entry.forEach((entry) => {
                const messaging = entry.messaging;
                messaging.forEach((payload) => {
                    const sender = payload.sender.id;
                    const text = _.toLower(payload.message.text);
                    switch (true) {
                        case (this.checkText(text, ["on", "led on", "turn on"]) && !_.isNull(this.updateThing(true))):
                            {
                                this.reply(sender, "Led was turned on.");
                            }
                            break;
                        case (this.checkText(text, ["off", "led off", "turn off"]) && !_.isNull(this.updateThing(false))):
                            {
                                this.reply(sender, "Led was turned off.");
                            }
                            break;
                        default:
                            {
                                this.reply(sender, "I am sorry :(, I was unable to complete your request.");
                                // tslint:disable-next-line:no-console
                                console.log(`Update thing failed.`);
                            }
                            break;
                    }
                });
            });
        }
    }
    reply(id, text) {
        const { tokens, debug, api } = config.facebook;
        const qs = {
            access_token: tokens.access,
            debug,
        };
        const payload = {
            message: { text },
            recipient: { id },
        };
        return rp({
            json: payload,
            method: "POST",
            qs,
            uri: `https://graph.facebook.com/${api}/me/messages`,
        }).catch((error) => {
            // tslint:disable-next-line:no-console
            console.log(`There was some error with FB: ${error}`);
        });
    }
    checkText(text, values) {
        const re = new RegExp(values.join("|"));
        return re.test(text.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"));
    }
    updateThing(on) {
        return this.shadow.update(config.aws.thing, { state: { desired: { led: on ? "True" : "False" } } });
    }
    connectThing() {
        this.shadow.unregister(config.aws.thing);
        this.shadow.register(config.aws.thing, {}, () => {
            // tslint:disable-next-line:no-console
            console.log(`Thing connected/registered successfully`);
        });
    }
    addThingListeners() {
        const self = this;
        this.shadow.on("connect", () => {
            self.connectThing();
        });
        this.shadow.on("status", (thingName, stat, clientToken, stateObject) => {
            // tslint:disable-next-line:no-console
            console.log(`Thing received status ${stat} on ${thingName}: ${JSON.stringify(stateObject)}`);
        });
        this.shadow.on("delta", (thingName, stateObject) => {
            // tslint:disable-next-line:no-console
            console.log(`Thing received delta on ${thingName}: ${JSON.stringify(stateObject)}`);
        });
        this.shadow.on("timeout", (thingName, clientToken) => {
            // tslint:disable-next-line:no-console
            console.log(`Thing received timeout on ${thingName} with token ${clientToken}`);
            self.connectThing();
        });
        this.shadow.on("close", () => {
            // tslint:disable-next-line:no-console
            console.log("Thing closed");
            self.shadow.unregister(config.aws.thing);
        });
        this.shadow.on("reconnect", () => {
            // tslint:disable-next-line:no-console
            console.log("Thing reconnect");
        });
    }
};
FacebookService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(assembly_1.default.AWS.thingShadow.type)),
    __metadata("design:paramtypes", [AWS.thingShadow])
], FacebookService);
exports.default = FacebookService;


/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("request-promise");

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const root_controller_1 = __webpack_require__(37);
exports.Assembly = root_controller_1.Assembly;
exports.default = root_controller_1.default;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(1);
const inversify_express_utils_1 = __webpack_require__(2);
const Assembly = {
    name: "RootController", type: Symbol("RootController"),
};
exports.Assembly = Assembly;
exports.default = (container) => {
    let RootController = class RootController {
        static getAssembly() {
            return Assembly;
        }
        getRoot() {
            return Promise.resolve("Welcome to iot chatbot.");
        }
    };
    __decorate([
        inversify_express_utils_1.httpGet("/"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], RootController.prototype, "getRoot", null);
    RootController = __decorate([
        inversify_1.injectable(),
        inversify_express_utils_1.controller("/")
    ], RootController);
    return RootController;
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Errors = __webpack_require__(5);
const Assembly = {};
exports.Assembly = Assembly;
const registerMiddlewares = (container) => {
    container.bind(Errors.Generic.Assembly.name).toConstantValue(Errors.Generic.default);
};
exports.registerMiddlewares = registerMiddlewares;
const addMiddleware = (container, name) => {
    return container.get(name);
};
exports.addMiddleware = addMiddleware;
const addErrorMiddleware = (container, name) => {
    return container.get(name);
};
exports.addErrorMiddleware = addErrorMiddleware;


/***/ })
/******/ ])));
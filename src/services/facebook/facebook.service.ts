import * as AWS from "aws-iot-device-sdk";
import { inject, injectable } from "inversify";
import * as _ from "lodash";
import * as rp from "request-promise";

import * as config from "@config";
import ServiceAssembly from "@services/assembly";

const Assembly = {
  name: "FacebookService", type: Symbol("FacebookService"),
};

export {
  Assembly,
};

@injectable()
export default class FacebookService {

  constructor(
    @inject(ServiceAssembly.AWS.thingShadow.type) private shadow: AWS.thingShadow,
  ) {
  }

  public replyMessage(data: any): void {

    if (data.object === "page") {
        data.entry.forEach((entry: any) => {
          const messaging = entry.messaging;
          messaging.forEach((payload: any) => {

            const sender = payload.sender.id;
            const text = _.toLower(payload.message.text);
            switch (true) {
              case this.checkText(text, ["on", "led on", "turn on"]):
              {
                this.executeThing(sender, "True", "Led was turned on.");
              }
              break;
              case this.checkText(text, ["off", "led off", "turn off"]):
              {
                this.executeThing(sender, "False", "Led was turned off.");
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

  private reply(id: string, text: string) {

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
    }).catch((error: any) => {
      // tslint:disable-next-line:no-console
      console.log(`There was some error with FB: ${error}`);
    });
  }

  private checkText(text: string, values: string[]): boolean {
    const re = new RegExp(values.join("|"));
    return re.test(
      text.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"),
    );
  }

  private executeThing(id: string, on: string, text: string): void {
    const self = this;
    this.updateThing(on).then((success) => {
      self.reply(id, success ? text : "Could not do it :(.");
    });
  }

  private updateThingState(on: string): string {
    return this.shadow.update(config.aws.thing, { state: { desired: { led: on }}}  );
  }

  private updateThing(on: string): Promise<boolean> {
    const self = this;
    return new Promise<boolean>((resolve, reject) => {
      this.shadow.on("connect", () => {
        self.shadow.register(config.aws.thing, {}, () => {
          // tslint:disable-next-line:no-console
          console.log(`Thing connected/registered successfully`);
          if (!_.isNull(this.updateThingState(on))) {
            // tslint:disable-next-line:no-console
            console.log(`Thing udpated successfully`);
          } else {
            // tslint:disable-next-line:no-console
            console.log(`Thing failed to update successfully`);
          }
        });
      });
      this.shadow.on("status", (thingName, stat, clientToken, stateObject) => {
        // tslint:disable-next-line:no-console
        console.log(`Thing received status ${stat} on ${thingName}: ${JSON.stringify(stateObject)}`);
        resolve(stat === "accepted" && (on === stateObject.state.desired.led));
      });
      this.shadow.on("delta", (thingName, stateObject) => {
        // tslint:disable-next-line:no-console
        console.log(`Thing received delta on ${thingName}: ${JSON.stringify(stateObject)}`);
      });
      this.shadow.on("timeout", (thingName, clientToken) => {
        // tslint:disable-next-line:no-console
        console.log(`Thing received timeout on ${thingName} with token ${clientToken}`);
      });
    });
  }
}

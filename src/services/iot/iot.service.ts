import * as AWS from "aws-iot-device-sdk";
import { inject, injectable } from "inversify";
import * as _ from "lodash";

import * as config from "@config";
import ServiceAssembly from "@services/assembly";

const Assembly = {
  name: "IotService", type: Symbol("IotService"),
};

export {
  Assembly,
};

@injectable()
export default class IotService {

  constructor(
    @inject(ServiceAssembly.AWS.thingShadow.type) private shadow: AWS.thingShadow,
  ) {
    this.connectThing();
  }

  public processMessage(data: any): void {

    if (data.object === "page") {
        data.entry.forEach((entry: any) => {
          const messaging = entry.messaging;
          messaging.forEach((payload: any) => {

            let success = false;
            // const sender = payload.sender.id;
            const text = _.toLower(payload.message.text);
            switch (true) {
              case this.checkText(text, ["led on", "turn on"]):
              {
                // tslint:disable-next-line:no-console
                console.log(`Will update thing to state on.`);
                success = _.isNull(this.updateThing(true));
              }
              break;
              case this.checkText(text, ["led off", "turn off"]):
              {
                // tslint:disable-next-line:no-console
                console.log(`Will update thing to state off.`);
                success = _.isNull(this.updateThing(false));
              }
              break;
              default: break;
            }

            if (success) {

              // tslint:disable-next-line:no-console
              console.log(`Update thing success.`);
            } else {

              // tslint:disable-next-line:no-console
              console.log(`Update thing failed.`);
            }
          });
      });
    }
  }

  private checkText(text: string, values: string[]): boolean {
    const re = new RegExp(values.join("|"));
    return re.test(
      text.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"),
    );
  }

  private updateThing(on: boolean): string {
    return this.shadow.update(config.aws.thing, { state: { desired: { led: on }}}  );
  }

  private connectThing() {

    const self = this;
    this.shadow.on("connect", () => {
      self.shadow.register(config.aws.thing, {}, () => {
        // tslint:disable-next-line:no-console
        console.log(`Thing connected/registered successfully`);
      });
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
    });
  }
}

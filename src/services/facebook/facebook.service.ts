import * as _ from "lodash";
import * as logger from "winston";

import { injectable } from "inversify";

const Assembly = {
  name: "FacebookService", type: Symbol("FacebookService"),
};

export {
  Assembly,
};

@injectable()
export default class FacebookService {

  public processMessages(data: any): void {

    // tslint:disable-next-line:no-console
    console.log(`Recevied data`);
    logger.debug(`Recevied data`);
    if (data.object === "page" &&
        !_.isUndefined(data.entry) &&
        !_.isArray(data.entry)
      ) {

        data.entry.forEach((entry: any) => {
          const messaging = entry.messaging;
          messaging.forEach((payload: any) => {

            // handle inbound messages
            if (payload.message && !payload.message.is_echo) {
              // tslint:disable-next-line:no-console
              console.log(`Message ${JSON.stringify(payload)}`);
              logger.debug(`Message ${JSON.stringify(payload)}`);
            }
          });
      });
    }
  }
}

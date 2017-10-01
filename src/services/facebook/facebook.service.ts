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
    if (data.object === "page" &&
        !_.isUndefined(data.entry) &&
        !_.isArray(data.entry)
      ) {

        data.entry.forEach((entry: any) => {
        const messaging = entry.messaging;
        messaging.forEach((payload: any) => {

          // handle inbound messages
          if (payload.message && !payload.message.is_echo) {
            logger.info(`Message ${JSON.stringify(payload)}`);
          }
        });
      });
    }
  }
}

// import * as _ from "lodash";
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

    // {"object":"page","entry":[{"id":"793616674072284","time":1506864087839,"messaging":[{"sender":{"id":"1409712342478458"},"recipient":{"id":"793616674072284"},"timestamp":1506864087090,"message":{"mid":"mid.$cAALRymDkH9JlCV6IMle2BlADg24N","seq":54463,"text":"hi"}}]}]}

    // tslint:disable-next-line:no-console
    console.log(`Recevied data ${JSON.stringify(data)}`);
    logger.debug(`Recevied data`);
    if (data.object === "page") {
        data.entry.forEach((entry: any) => {
          const messaging = entry.messaging;
          messaging.forEach((payload: any) => {

            // handle inbound messages
            // tslint:disable-next-line:no-console
            console.log(`Message ${JSON.stringify(payload)}`);
            logger.debug(`Message ${JSON.stringify(payload)}`);
          });
      });
    }
  }
}

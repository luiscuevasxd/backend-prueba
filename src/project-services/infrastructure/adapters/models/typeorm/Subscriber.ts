import { EntitySubscriberInterface, EventSubscriber } from 'typeorm';

@EventSubscriber()
export class TrimSubscriber implements EntitySubscriberInterface {
  afterLoad(event: any) {
    if (!event) return;

    Object.keys(event).forEach((key) => {
      if (typeof event[key] === 'string') {
        event[key] = event[key].trim();
      }
    });
  }
}

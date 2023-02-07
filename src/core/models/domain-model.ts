import { ObjectCopier } from './object-copier';

export abstract class DomainModel extends ObjectCopier {
  abstract toJson(showHidden: boolean): Record<string, any>;

  protected filterHiddenIfNeed(
    data: Record<string, any>,
    showHidden = false,
  ): Record<string, any> {
    if (!showHidden) {
      this.getHidden().forEach((key: string) => {
        delete data[key];
      });
    }
    return data;
  }

  protected getHidden(): string[] {
    return [];
  }
}

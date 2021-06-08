import EasyLightSettings from '../model/easy-light-settings.js';
import RegisterSettings from './register-settings.js';

export default class EasyLightForm extends FormApplication<EasyLightSettings> {
  private data: any;

  constructor(
    object: EasyLightSettings,
    options: FormApplication.Options = {}
  ) {
    super(object, options);
  }

  public static get defaultOptions(): FormApplication.Options {
    return mergeObject(super.defaultOptions, {
      id: 'easy-light-settings',
      title: game.i18n.localize('EASYLIGHT.settings.form.name'),
      template: `modules/${RegisterSettings.moduleName}/templates/easy-light-settings.html`,
      width: 800,
      height: 'auto',
      resizable: true,
      closeOnSubmit: true,
    });
  }

  public getData(): any {
    if (this.data == null) {
      const easyLightSettings: EasyLightSettings = {
        ...new EasyLightSettings(),
        ...duplicate(
          game.settings.get(RegisterSettings.moduleName, 'easyLightSettings')
        ),
      };

      this.data = easyLightSettings;
    }

    return {
      easyLight: this.data,
    };
  }

  public activateListeners(html: JQuery) {
    super.activateListeners(html);
  }

  protected _getSubmitData(_updateData?: object): any {
    return this.data;
  }

  public async _updateObject(_event: Event, formData: any) {
    const easyLightSettings: { [key: string]: any } = duplicate(formData);

    await game.settings.set(
      RegisterSettings.moduleName,
      'easyLightSettings',
      easyLightSettings
    );
  }

  public close(options?: object): Promise<void> {
    this.data = null;
    return super.close(options);
  }
}

import EasyLightForm from './easy-light-form.js';
import EasyLightSettings from '../model/easy-light-settings.js';

export default class RegisterSettings {
  public static moduleName: string;

  public static initSettings() {
    const mainModule = 'easy-light';
    const betaModule = 'easy-light-beta';

    const mainModuleActive = game.modules.get(mainModule)?.active;
    const betaModuleActive = game.modules.get(betaModule)?.active;

    if (mainModuleActive) {
      this.moduleName = mainModule;
      this.registerSettings(mainModule);
    }
    if (betaModuleActive) {
      this.moduleName = betaModule;
      this.registerSettings(betaModule);
    }
  }

  private static registerSettings(moduleName: string) {
    game.settings.registerMenu(moduleName, 'easyLightForm', {
      name: game.i18n.localize('EASYLIGHT.settings.form.name'),
      label: game.i18n.localize('EASYLIGHT.settings.form.label'),
      hint: game.i18n.localize('EASYLIGHT.settings.form.hint'),
      icon: 'fas fa-id-card',
      type: EasyLightForm,
      restricted: true,
    });

    game.settings.register(moduleName, 'easyLightSettings', {
      name: game.i18n.localize('EASYLIGHT.settings.name'),
      hint: game.i18n.localize('EASYLIGHT.settings.hint'),
      default: new EasyLightSettings(),
      scope: 'world',
      type: Object,
      onChange: (_s: any) => {},
    });
  }
}

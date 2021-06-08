import RegisterSettings from './settings/register-settings.js';

Hooks.once('init', () => {
  RegisterSettings.initSettings();
});

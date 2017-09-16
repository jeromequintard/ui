export const models = state => ({
  isAuthenticated: state.App.authentication.isAuthenticated,
  authPath: state.App.settings.authPath,
});

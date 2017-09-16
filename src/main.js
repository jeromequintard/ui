/* eslint-disable import/first */

/* Middlewre =================================================== */

export { default as HistoryMiddleware } from 'components/middleware/history/middleware';

/* Actions ===================================================== */

export { default as DialogActions } from 'components/ui/dialog/actions';
export { default as FileBrowserActions } from 'components/ui/fileBrowser/actions';
export { default as FormActions } from 'components/core/form/actions';
export { default as GravatarActions } from 'components/ui/gravatar/actions';
export { default as GridActions } from 'components/ui/grid/redactions';
export { default as HistoryActions } from 'components/middleware/history/actions';
export { default as NotificationActions } from 'components/ui/notification/actions';
export { default as TranslationActions } from 'components/core/translation/actions';

/* Reducers ==================================================== */

import DialogReducers from 'components/ui/dialog/reducers';
import FileBrowserReducers from 'components/ui/fileBrowser/reducers';
import FormReducers from 'components/core/form/reducers';
import GravatarReducers from 'components/ui/gravatar/reducers';
import GridReducers from 'components/ui/grid/reducers';
import NotificationReducers from 'components/ui/notification/reducers';
import SelectReducers from 'components/ui/select/reducers';
import TranslationReducers from 'components/core/translation/reducers';

// Le nom ayant une grande important pour les reducers
// On définit un objet litéarl qui les regroupes
export const Reducers = {
  Dialog: DialogReducers,
  FileBrowser: FileBrowserReducers,
  Form: FormReducers,
  Gravatar: GravatarReducers,
  Grid: GridReducers,
  Notification: NotificationReducers,
  Select: SelectReducers,
  Translation: TranslationReducers,
};

/* Sagas ====================================================== */

import FileBrowserSagas from 'components/ui/fileBrowser/sagas';
import FormSagas from 'components/core/form/sagas';
import GravatarSagas from 'components/ui/gravatar/sagas';
import GridSagas from 'components/ui/grid/sagas';
import SelectSagas from 'components/ui/select/sagas';

export const Sagas = [
  FileBrowserSagas,
  FormSagas,
  GravatarSagas,
  GridSagas,
  SelectSagas,
];

/* Composants ================================================= */

export { default as Acl } from 'components/core/acl';
export { default as Form } from 'components/core/form';
export { default as Translation } from 'components/core/translation';
export { default as Theme } from 'components/core/theme';
export { default as Validator } from 'components/core/validator';

export { default as Action } from 'components/ui/grid/action';
export { default as Actions } from 'components/ui/grid/actions';
export { default as Button } from 'components/ui/button';
export { default as Checkbox } from 'components/ui/checkbox';
export { default as Columns } from 'components/ui/grid/columns';
export { default as Data } from 'components/ui/grid/data';
export { default as DefaultButton } from 'components/ui/defaultButton';
export { default as Dialog } from 'components/ui/dialog';
export { default as Divider } from 'components/ui/divider';
export { default as FileBrowser } from 'components/ui/fileBrowser';
export { default as FormField } from 'components/ui/formField';
export { default as Gravatar } from 'components/ui/gravatar';
export { default as Grid } from 'components/ui/grid';
export { default as Link } from 'components/ui/link';
export { default as Loader } from 'components/ui/loader';
export { default as Menu } from 'components/ui/menu';
export { default as MenuItem } from 'components/ui/menuItem';
export { default as Notification } from 'components/ui/notification';
export { default as Option } from 'components/ui/option';
export { default as Radio } from 'components/ui/radio';
export { default as Scrollbar } from 'components/ui/scrollbar';
export { default as Select } from 'components/ui/select';
export { default as Status } from 'components/ui/status';
export { default as Subform } from 'components/ui/subform';
export { default as Switch } from 'components/ui/switch';
export { default as Tags } from 'components/ui/tags';
export { default as Tag } from 'components/ui/tag';
export { default as Tabs } from 'components/ui/tabs';
export { default as Tab } from 'components/ui/tab';
export { default as Textinput } from 'components/ui/textinput';
export { default as Toolbar } from 'components/ui/toolbar';

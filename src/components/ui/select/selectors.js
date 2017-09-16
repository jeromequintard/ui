import { createStructuredSelector } from 'reselect';

export const models = createStructuredSelector({
  selects: state => state.Select.uid,
});

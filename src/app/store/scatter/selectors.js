import { createSelector } from 'reselect';

/**
 * Direct selector to the delegate state domain
 */
const selectState = state => state.get('scatter');

/**
 * Other specific selectors
 */

const selectScatter = () => createSelector(selectState, substate => substate.get('scatter'));
const selectClient = () => createSelector(selectState, substate => substate.get('client'));
const selectIdentity = () => createSelector(selectState, substate => substate.get('identity'));

export default selectState;
export { selectState, selectScatter, selectClient, selectIdentity };

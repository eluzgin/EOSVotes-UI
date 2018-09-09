import { createSelector } from 'reselect';
import { store } from 'store';
/**
 * Direct selector to the delegate state domain
 */
const selectState = state => state.scatter;

/**
 * Other specific selectors
 */

const selectScatter = () => createSelector(selectState, substate => substate.scatter);
const selectClient = () => createSelector(selectState, substate => substate.client);
const selectIdentity = () => createSelector(selectState, substate => substate.identity);
const selectAccount = () => createSelector(selectState, substate => substate.account);
const selectStatus = () => createSelector(selectState, substate => substate.status);

export default selectState;
export { selectState, selectScatter, selectClient, selectIdentity, selectAccount,selectStatus };

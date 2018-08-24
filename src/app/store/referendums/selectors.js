import { stringify } from 'helpers';

export const get = ({ filters, page, referendums }) => {

  const key = stringify({ filters, page });

  const list = referendums.byQuery[key];
  if (list) {
    return {
      fetching: list.fetching,
      items: [].concat(list.items).map(id => referendums.byId[id]),
      more: list.more,
    }
  }

  return list;

}

import { Id } from '../../types/id';

export interface User {
  id: Id;
  name: string;
}

export const AndreaUser: User = {
  id: '1644013124977',
  name: 'Andrea',
};

export const PedroUser: User = {
  id: '1644013134223',
  name: 'Pedro',
};

export const MariaUser: User = {
  id: '1644013139690',
  name: 'Maria',
};

export const TomUser: User = {
  id: '1644013226054',
  name: 'Tom',
};

import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgProduct } from '../utils/mockImages';


// ----------------------------------------------------------------------

const products = [
  {
    id: faker.datatype.uuid(),
    cover: mockImgProduct(2),
    code : "EC7501",
    name : 'RF Engineering',
    profName : "Jayanata Ghosh"
  }
];

export default products;

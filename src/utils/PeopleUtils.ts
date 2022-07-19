import { People, Person } from '../types/Person';
import { faker } from '@faker-js/faker';

export const generatePeople = (peopleCount: number): People => {
  if (peopleCount <= 0) return Array<Person>();

  return [...Array(peopleCount).keys()].map((key) => ({
    id: `${key}-${faker.database.mongodbObjectId()}`,
    fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    bio: faker.lorem.words(Math.random() * 100),
  }));
};

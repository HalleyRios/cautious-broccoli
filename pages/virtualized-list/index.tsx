import { forwardRef, Fragment, useEffect, useState } from 'react';
import NoSSR from '../../src/utils/NoSSR';
import { People, Person } from '../../src/types/Person';
import { LIST_SIZE, TICKER_INTERVAL } from '../../src/constants';
import { generatePeople } from '../../src/utils/PeopleUtils';
import { Components, Virtuoso } from 'react-virtuoso';

const PeopleList: Components['List'] = forwardRef(function CustomList(props) {
  // @ts-ignore
  return <ul {...props}></ul>;
});

const PersonItem: Components['Item'] = forwardRef(function CustomItem(props) {
  return <li {...props}></li>;
});

const getItemContent = (index: number, person: Person) => {
  return (
    <Fragment>
      <h3>{person.fullName}</h3>
      <p>{person.bio}</p>
    </Fragment>
  );
};

const VirtualizedList = () => {
  const [people, setPeople] = useState<People>([]);
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    setPeople(generatePeople(LIST_SIZE));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, TICKER_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <NoSSR>
      <h2>
        {time.toLocaleTimeString()} - {people.length} records
      </h2>

      <Virtuoso
        components={{ List: PeopleList, Item: PersonItem }}
        data={people}
        itemContent={getItemContent}
        style={{ height: '80vh' }}
        totalCount={people.length}
      />
    </NoSSR>
  );
};

export default VirtualizedList;

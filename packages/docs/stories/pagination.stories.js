import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { text, boolean, number, array, select } from '@storybook/addon-knobs';
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';

import Pagination, {
  AvResourcePagination,
  PaginationControl,
  defaultButtonText,
  PaginationSelector,
  PaginationInfo,
} from '@availity/pagination';

import README from '@availity/pagination/README.md';
import paginationData from './data/pagination.json';

const mockResponse = {
  postGet(params = {}, config = {}) {
    const { offset = 0, limit = 50 } = params;
    const notifications = paginationData.slice(offset, offset + limit);
    return Promise.resolve({
      config,
      data: {
        totalCount: paginationData.length,
        count: notifications.length,
        offset,
        limit,
        notifications,
      },
    });
  },
};

storiesOf('Components|Pagination', module)
  .addDecorator(withReadme([README]))
  .add('Controls', () => {
    const props = {
      firstBtn: text('First Button Text', defaultButtonText.firstBtn),
      prevBtn: text('Previous Button Text', defaultButtonText.prevBtn),
      nextBtn: text('Next Button Text', defaultButtonText.nextBtn),
      lastBtn: text('Last Button Text', defaultButtonText.lastBtn),
    };

    const usePageCount = select(
      'Pages Type',
      { pageCount: 'page', itemCount: 'item' },
      'page'
    );
    let maxPages = 0;
    if (usePageCount === 'page') {
      props.pageCount = number('Total number of pages', 10, { min: 1 });
      maxPages = props.pageCount;
    } else {
      props.itemsPerPage = number('Items per page', 10, { min: 1 });
      props.totalCount = number('Total number of items', 100, { min: 1 });
      maxPages = Math.ceil(props.totalCount / props.itemsPerPage);
    }
    props.page = number('Page', 1, { min: 1, max: maxPages, step: 1 });

    const pagePaddingType = select(
      'paddingType',
      { Number: 'number', True: 'true', False: 'false' },
      'number'
    );
    const paddingNumber = number('Page Padding', 2);

    if (pagePaddingType === 'number') {
      props.pagePadding = paddingNumber;
    } else {
      props.pagePadding = pagePaddingType === 'true';
    }

    props.unstyled = boolean('Unstyled', false);

    props.size = select('Size', { Small: 'sm', Normal: '', Large: 'lg' }, 'sm');

    props.align = select(
      'Align',
      {
        Start: 'start',
        Center: 'center',
        End: 'end',
        Between: 'between',
      },
      PaginationControl.defaultProps.align
    );

    props.simple = boolean(
      'Simple (just prev/next)',
      PaginationControl.defaultProps.simple
    );

    props.onPageChange = newPage => console.log(`go to page ${newPage}`);
    return <PaginationControl {...props} />;
  })
  .add('Info', () => {
    const props = {};

    props.itemsPerPage = number('Items per page', 10, { min: 1 });
    const withTotalCount = boolean('Use Total Count', true);
    const totalCount = number('Total number of items', 100, { min: 1 });
    if (withTotalCount) {
      props.totalCount = totalCount;
    }
    const maxPages = Math.ceil(props.totalCount / props.itemsPerPage);

    props.page = number('Page', 1, { min: 1, max: maxPages, step: 1 });

    return <PaginationInfo {...props} />;
  })
  .add('Selector', () => {
    const props = {};

    props.itemsPerPage = number('Items per page', 10, { min: 1 });
    props.perPageOptions = array('per Page Options', [5, 10, 15, 20]);

    props.onCountChange = () => {};
    return <PaginationSelector {...props} />;
  })
  .add('default', () => {
    const props = {};

    const rawItems = array('Items', [
      'red',
      'blue',
      'green',
      'yellow',
      'purple',
      'yellow',
      'lime',
      'maroon',
      'dog',
      'cat',
      'fish',
      'lizard',
      'horse',
      'dragon',
      'charmander',
    ]);

    props.page = number('Page', 1, { min: 1, step: 1 });

    props.itemsPerPage = number('Items per page', 10, { min: 1 });

    const loaderBool = boolean('Block UI while loading', true);
    const loaderText = text('Loader message', '');

    props.loader = (loaderBool && loaderText) || loaderBool;
    props.loading = boolean('Block UI loading', false);

    const useAsync = boolean('use Async items', false);
    if (!useAsync) {
      props.items = rawItems;
    } else {
      props.items = ({ page, itemsPerPage }) =>
        new Promise(resolve => {
          setTimeout(() => {
            resolve({
              items: rawItems.slice(
                (page - 1) * itemsPerPage,
                page * itemsPerPage
              ),
              pageCount: Math.ceil(rawItems / itemsPerPage),
              totalCount: rawItems.length,
            });
          }, 1000);
        });
    }

    return (
      <Pagination {...props}>
        {items => {
          const keys = [];
          items.forEach(val => {
            let key = val;
            let index = 0;
            while (keys.indexOf(key) >= 0) {
              index += 1;
              key = `${val}${index}`;
            }
            keys.push(key);
          });

          return (
            <ul>
              {items.map((item, index) => (
                <li key={keys[index]}>{item}</li>
              ))}
            </ul>
          );
        }}
      </Pagination>
    );
  })
  .add('AvResourcePagination', () => {
    const props = {
      resource: mockResponse,
      getResult: 'notifications',
    };

    props.page = number('Page', 1, { min: 1, step: 1 });

    props.itemsPerPage = number('Items per page', 10, { min: 1 });

    const loaderBool = boolean('Block UI while loading', true);
    const loaderText = text('Loader message', '');

    props.loader = (loaderBool && loaderText) || loaderBool;
    props.loading = boolean('Block UI loading', false);

    return (
      <AvResourcePagination {...props}>
        {items =>
          items.map(item => (
            <Card key={item.id}>
              <CardBody>
                <CardTitle>
                  {item.name.first} {item.name.last}
                </CardTitle>
                <CardSubtitle>
                  Registered on {item.registered.split('T')[0]}
                </CardSubtitle>
                <CardText className="mt-2" tag="div">
                  <div className="label">Address</div>
                  {item.address.street} <br />
                  {item.address.city} {item.address.state}{' '}
                  {item.address.postalCode}
                </CardText>
              </CardBody>
            </Card>
          ))
        }
      </AvResourcePagination>
    );
  });

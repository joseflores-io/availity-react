import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { PaginationLink, PaginationItem as RsPaginationItem } from 'reactstrap';

const buttonTypeProps = PropTypes.oneOfType([PropTypes.string, PropTypes.bool]);
export const defaultButtonText = {
  firstBtn: '«« First',
  prevBtn: '« Prev',
  nextBtn: 'Next »',
  lastBtn: 'Last »»',
};

const requirePageCountCheck = (props, propName) => {
  const thisProp = props[propName];
  if (typeof thisProp === 'number' && thisProp <= 0) {
    return new Error(`${propName} must be a positive number`);
  }

  if (!props.pageCount && (!props.totalCount || !props.itemsPerPage)) {
    return new Error(`must define pageCount or totalCount and itemsPerPage`);
  }
};

const propTypes = {
  pagePadding: PropTypes.number,
  page: PropTypes.number,
  pageCount: requirePageCountCheck,
  totalCount: requirePageCountCheck,
  itemsPerPage: requirePageCountCheck,
  onPageChange: PropTypes.func.isRequired,
  prevBtn: buttonTypeProps,
  nextBtn: buttonTypeProps,
  firstBtn: buttonTypeProps,
  lastBtn: buttonTypeProps,
  size: PropTypes.string,
  align: PropTypes.oneOf(['start', 'center', 'end', 'between']),
  simple: PropTypes.bool,
  unstyled: PropTypes.bool,
  className: PropTypes.string,
};

const defaultProps = {
  pagePadding: 2,
  itemsPerPage: 10,
  firstBtn: true,
  prevBtn: true,
  nextBtn: true,
  lastBtn: true,
  align: 'start',
  unstyled: true,
  size: 'sm',
};

class Pages extends Component {
  get pageCount() {
    let output = this.props.pageCount;
    if (!output && this.props.totalCount && this.props.itemsPerPage > 0) {
      output = Math.ceil(this.props.totalCount / this.props.itemsPerPage);
    }
    return output;
  }

  isFirstPage() {
    return this.props.page <= 1;
  }

  isLastPage() {
    const lastPage = this.pageCount;
    return lastPage ? this.props.page >= lastPage : false;
  }

  firstPage = () => {
    this.props.onPageChange(1);
  };

  nextPage = () => {
    let nextPage = this.props.page + 1;
    if (nextPage > this.pageCount) {
      nextPage = this.pageCount;
    }
    this.props.onPageChange(nextPage);
  };

  prevPage = () => {
    this.props.onPageChange(this.props.page > 1 ? this.props.page - 1 : 1);
  };

  lastPage = () => {
    this.props.onPageChange(this.pageCount);
  };

  getStartButtons() {
    const { firstBtn, prevBtn } = this.props;
    const output = [];
    const firstBtnText =
      !firstBtn || typeof firstBtn === 'string'
        ? firstBtn
        : defaultButtonText.firstBtn;

    if (firstBtnText) {
      output.push(
        <RsPaginationItem disabled={this.isFirstPage()} key="firstBtn">
          <PaginationLink
            tag="button"
            type="button"
            onClick={this.firstPage}
            aria-label="First"
          >
            {firstBtnText}
          </PaginationLink>
        </RsPaginationItem>
      );
    }

    const prevBtnText =
      !prevBtn || typeof prevBtn === 'string'
        ? prevBtn
        : defaultButtonText.prevBtn;
    if (prevBtnText) {
      output.push(
        <RsPaginationItem disabled={this.isFirstPage()} key="prevBtn">
          <PaginationLink
            previous
            tag="button"
            type="button"
            onClick={this.prevPage}
          >
            {prevBtnText}
          </PaginationLink>
        </RsPaginationItem>
      );
    }

    return output;
  }

  getPages() {
    const { page, pagePadding } = this.props;
    const lastPage = this.pageCount;
    // start min/max values are page +- padding
    let minPage = page - pagePadding;
    let maxPage = page + pagePadding;

    // if min page is lower than 1, add extra values to maxPage
    if (minPage < 1) {
      maxPage += 1 - minPage;
      minPage = 1;
    }

    // if maxPage is greater than allowed, add values back to minPage
    if (maxPage > lastPage) {
      // don't let min get moved to below 1
      minPage = Math.max(1, minPage - (maxPage - lastPage));
      maxPage = lastPage;
    }

    const output = [];
    if (maxPage >= minPage) {
      for (let i = minPage; i <= maxPage; i += 1) {
        const onClick = () => {
          this.props.onPageChange(i);
        };
        output.push(
          <RsPaginationItem key={i} active={i === page}>
            <PaginationLink tag="button" type="button" onClick={onClick}>
              {i}
            </PaginationLink>
          </RsPaginationItem>
        );
      }
    }
    return output;
  }

  getEndButtons() {
    const { nextBtn, lastBtn } = this.props;
    const output = [];
    const nextBtnText =
      !nextBtn || typeof nextBtn === 'string'
        ? nextBtn
        : defaultButtonText.nextBtn;
    if (nextBtnText) {
      output.push(
        <RsPaginationItem disabled={this.isLastPage()} key="nextBtn">
          <PaginationLink
            next
            tag="button"
            type="button"
            onClick={this.nextPage}
          >
            {nextBtnText}
          </PaginationLink>
        </RsPaginationItem>
      );
    }
    const lastBtnText =
      !lastBtn || typeof lastBtn === 'string'
        ? lastBtn
        : defaultButtonText.lastBtn;
    if (lastBtnText) {
      output.push(
        <RsPaginationItem disabled={this.isLastPage()} key="lastBtn">
          <PaginationLink
            tag="button"
            type="button"
            onClick={this.lastPage}
            aria-label="Last"
          >
            {lastBtnText}
          </PaginationLink>
        </RsPaginationItem>
      );
    }

    return output;
  }

  render() {
    const { size, className, align, unstyled } = this.props;
    const listClassName = classNames(
      className,
      'pagination',
      'flex-grow-1',
      {
        [`pagination-${size}`]: !!size,
        [`justify-content-${align}`]: !!align,
      },
      `pagination-${unstyled ? 'un' : ''}styled`
    );
    return (
      <ul className={listClassName}>
        {this.getStartButtons()}
        {!this.props.simple && this.getPages()}
        {this.getEndButtons()}
      </ul>
    );
  }
}

Pages.propTypes = propTypes;
Pages.defaultProps = defaultProps;

export default Pages;
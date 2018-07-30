
import React, { Component } from 'react';
import ReactGA from 'react-ga';

export default function withTracker(WrappedComponent, options = {}) {
  const trackPage = (page,params = {}) => {
    const userid = page.split('/')[page.split('/').length]
    ReactGA.set({
      page,
      ...params,
      ...options
    });
    ReactGA.pageview(page);
  };

  const HOC = class extends Component {
    componentDidMount() {
      const page = this.props.location.pathname;
      let params = {}
      this.props.match.params ?
      params = {userId: this.props.match.params.userid}
      : ""
      trackPage(page, params);
    }

    componentWillReceiveProps(nextProps) {
      const currentPage = this.props.location.pathname;
      const nextPage = nextProps.location.pathname;

      if (currentPage !== nextPage) {
        trackPage(nextPage);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return HOC;
}
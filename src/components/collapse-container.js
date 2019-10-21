import React from 'react';
import styles from './collapse-container.module.css';

class CollapseContainer extends React.Component {
  constructor(props) {
    // headerText="header for the collapsible container"
    super(props);
    this.componentRef = React.createRef();
    this.state = {
      isOpen: false,
    };
    this.staticState = {
      isInitialRender: true,
      // Computed Height of header and content elements inside the collapsible
      // container
      headerHeight: false,
      contentHeight: false,
      uncollapseHeight: false,
    };
  }

  onHeaderClick = event => {
    this.setState({isOpen: !this.state.isOpen});
  };

  componentDidMount() {
    // Get the updated scroll sizes on each re-render.

    // Get the elements from the DOM
    let containerEl = this.componentRef.current;
    let [headerEl, contentEl] = this.componentRef.current.children;

    // Get the updated styles from each element
    let containerStyle = getComputedStyle(containerEl);
    let headerStyle = getComputedStyle(headerEl);
    let contentStyle = getComputedStyle(contentEl);

    let containerHeight = containerStyle.getPropertyValue('height');
    let containerBorderWidth = containerStyle.getPropertyValue(
      'border-top-width',
    );

    // This is the minimum height for the collapse container. Is necessary to
    // get this values and set them as inline style because the transition
    // doesn't work on 'height: auto' values or 'max-height: auto' values.
    // because this value actually doesnt change on re-renders we only need
    // to get it once on the first componentDidMount()
    let containerMinCollapseHeight = containerHeight + containerBorderWidth;
    console.log(containerHeight, containerBorderWidth);

    if (this.staticState.contentHeight !== contentEl.scrollHeight) {
      // update the header and content height
      this.staticState.contentHeight = contentEl.scrollHeight;
      this.staticState.headerHeight = headerEl.scrollHeight;

      // update the  uncollapsed height. I'm adding 1000px and using
      // max-height instead of height because if I dont the height doesn't
      // updates on resize correctly. In the css file the transition is
      // on max-height instead of height also.
      this.staticState.uncollapseHeight =
        this.staticState.contentHeight + this.staticState.headerHeight + 1000;

      if (this.staticState.isInitialRender) {
        // if this is the initial rendering
        this.staticState.isInitialRender = false;
      }
    }
  }

  render() {
    const elementInlineStyle = this.staticState.isInitialRender
      ? // If this is the first render() am passsing an empty object
        // The initial height is declared in collapse-container.module.css
        // This is to ensure that the containers initial state is collapsed
        {}
      : // If is not the first render() we check if is collapsed or not
      // and adjust the height accordingly
      this.state.isOpen
      ? {maxHeight: `${this.staticState.uncollapseHeight}px`}
      : {maxHeight: `${this.staticState.headerHeight}px`};

    if (!this.props.styledMargin) {
      elementInlineStyle.borderTop = 'none';
    }

    return (
      <section
        ref={this.componentRef}
        className={styles.collapseContainer}
        style={elementInlineStyle}>
        <header onClick={this.onHeaderClick} className={styles.collapseHeader}>
          {this.props.bigHeader ? (
            <h3>{this.props.headerText}</h3>
          ) : (
            <h5>{this.props.headerText}</h5>
          )}
          {this.state.isOpen ? (
            <div
              className={`${styles.headerImgContainer} ${styles.open}`}></div>
          ) : (
            <div className={styles.headerImgContainer}></div>
          )}
        </header>
        <article className={styles.collapseContent}>
          {this.props.children}
        </article>
      </section>
    );
  }
}

CollapseContainer.defaultProps = {
  headerText: 'default value for the header text',
  bigHeader: true,
  styledMargin: true,
};

export default CollapseContainer;

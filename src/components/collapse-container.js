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
    // Get the updated scroll sizes
    let [headerEl, contentEl] = this.componentRef.current.children;

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

    return (
      <section
        ref={this.componentRef}
        className={styles.collapseContainer}
        style={elementInlineStyle}>
        <header onClick={this.onHeaderClick} className={styles.collapseHeader}>
          <h3>{this.props.headerText}</h3>
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
};

export default CollapseContainer;

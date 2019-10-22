import React from 'react';
import styles from './collapse-container.module.css';

class CollapseContainer extends React.Component {
  constructor(props) {
    super(props);
    this.componentRef = React.createRef();
    this.state = {
      isOpen: false,
    };
    this.staticState = {
      isInitialRender: true,
      // Computed Height of header and content elements inside the collapsible
      // container
      minHeight: '',
      maxHeight: '',
    };

    // Handles the initial height value for the component if the
    // inlineStyleMaxHeight prop is passed to the component
    this.staticState.maxHeight =
      this.props.inlineStyleMaxHeight === ''
        ? ''
        : `${parseInt(this.props.inlineStyleMaxHeight)}px`;
  }

  createInitialState = props => {
    // This functions takes the values passed into props and creates an
    // initial state for the component based on those values
  };

  onHeaderClick = event => {
    this.setState({isOpen: !this.state.isOpen});
  };

  componentDidUpdate() {}
  componentDidMount() {
    // Get the element heights only on first call on componentDidMount().
    // This is done to be able to work with any styles declared in the
    // css module and let CollapseContainer be reusable.

    if (this.staticState.isInitialRender) {
      // This will only run one time (on initial rendering)

      // Get the elements from the DOM
      let containerEl = this.componentRef.current;
      let contentEl = this.componentRef.current.children[1];

      // Get the updated styles from each element
      let containerStyle = getComputedStyle(containerEl);
      let contentStyle = getComputedStyle(contentEl);

      // This is the minimum height for the collapse container. Is necessary to
      // get this values and set them as inline style because the transition
      // doesn't work on 'height: auto' values or 'max-height: auto' values.
      // because this value actually doesnt change on re-renders we only need
      // to get it once on the first componentDidMount().
      // If a value is passed to the prop 'inlineStyleMaxHeight' that value
      // is used instead.
      let containerMinCollapseHeight =
        this.props.inlineStyleMaxHeight === ''
          ? parseInt(containerStyle.getPropertyValue('height'))
          : parseInt(this.props.inlineStyleMaxHeight);

      // This is the maximum height for the collapse container, it will depend
      // on the content of itself + and extra margin for handling browser
      // resize.
      let containerMaxCollapseHeight =
        parseInt(contentStyle.getPropertyValue('height')) * 2 +
        containerMinCollapseHeight;

      // Now we pass the max and min container heights to this.staticState
      this.staticState.minHeight = containerMinCollapseHeight;
      this.staticState.maxHeight = containerMaxCollapseHeight;

      // Change the isInitialRender to false so this block wont run again
      this.staticState.isInitialRender = false;
    }
  }

  render() {
    let elementInlineStyle = this.staticState.isInitialRender
      ? // If this is the first render() am passsing an empty object
        // The initial height is declared in collapse-container.module.css
        // This is to ensure that the containers initial state is collapsed
        {height: this.staticState.maxHeight}
      : // If is not the first render() we check if is collapsed or not
      // and adjust the height accordingly
      this.state.isOpen
      ? {maxHeight: `${this.staticState.maxHeight}px`}
      : {maxHeight: `${this.staticState.minHeight}px`};

    if (!this.props.styledMargin) {
      elementInlineStyle.borderTop = 'none';
    }

    let imgStyle = this.props.bigHeader
      ? styles.headerImgContainer
      : `${styles.headerImgContainer} ${styles.small}`;
    if (!this.props.bigHeader) {
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
            <div className={`${imgStyle} ${styles.open}`}></div>
          ) : (
            <div className={imgStyle}></div>
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
  inlineStyleMaxHeight: '', // TODO: type check this to only accept width units
};

export default CollapseContainer;

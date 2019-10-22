import React from 'react';
import styles from './collapse-container.module.css';

// constant declarations
const LARGE_HEIGHT = '58px';
const LARGE_FONT = '20px';
const SMALL_HEIGHT = '34px';
const SMALL_FONT = '15px';

class CollapseContainer extends React.Component {
  /*
   * Props available for this component:
   *  - headerText: 'default value for the header text',
   *  - styledBorder: true,
   *  - borderColor: '#000',
   *  - large: true,
   */
  constructor(props) {
    super(props);
    // create ref for <section />
    this.componentRef = React.createRef();

    // Initial React component state
    this.state = {
      isOpen: false,
    };

    this.baseParams = this.createBaseParams(props);
  }

  createBaseParams = props => {
    let params = {
      initialRender: true,
      maxHeightWhenCollapsed: '',
      maxHeightWhenUncollapsed: '',
    };

    params.maxHeightWhenCollapsed =
      props.large === true ? LARGE_HEIGHT : SMALL_HEIGHT;

    return params;
  };

  onHeaderClick = event => {
    // State change
    this.setState({isOpen: !this.state.isOpen});
  };

  calculateInitialInlineStyles = () => {};

  getInlineStyle = () => {
    // Initializing 'inlineStyles' object
    let inlineStyles = {
      main: {
        // maxHeight
        // borderColor
        // borderTop
      },
      header: {
        maxHeight: this.baseParams.maxHeightWhenCollapsed,
      },
      headerText: {
        // fontSize
      },
      headerIcon: {
        // width
        // height
        // background-size
      },
      content: {},
    };

    // ********************
    // these only need to be calculated once, before the first render
    // TODO: optimize the code, put the calculations in another function and
    // only do them once
    // Border Style preferences
    if (!this.props.styledBorder) {
      inlineStyles.main.border = 'none';
    } else {
      inlineStyles.main.borderTop = `solid 5px ${this.props.borderColor}`;
    }

    // Header img size calculations
    let headerImgSize = parseInt(this.baseParams.maxHeightWhenCollapsed) - 4;

    inlineStyles.headerIcon = {
      width: `${headerImgSize - 8}px`,
      height: `${headerImgSize - 8}px`,
      backgroundSize: `${headerImgSize}px ${headerImgSize}px`,
    };

    // Header label calculations
    inlineStyles.headerText.fontSize =
      this.props.large === true ? LARGE_FONT : SMALL_FONT;
    // ********************

    // Set the maxHeight depending on the state (collapsed/uncollapsed)
    inlineStyles.main.maxHeight = this.state.isOpen
      ? this.baseParams.maxHeightWhenUncollapsed
      : this.baseParams.maxHeightWhenCollapsed;

    return inlineStyles;
  };

  componentDidUpdate() {}
  componentDidMount() {
    // Get the elements from the DOM
    let contentEl = this.componentRef.current.children[1];

    // Get the computed style of element after being mounted in DOM
    let contentStyle = getComputedStyle(contentEl);

    // This is the maximum height for the collapse container, it will depend
    // on the content of itself + and extra margin for handling browser
    // resize.
    this.baseParams.maxHeightWhenUncollapsed =
      parseInt(contentStyle.getPropertyValue('height')) * 2;
  }

  render() {
    const inlineStyles = this.getInlineStyle();
    const iconClassName = this.state.isOpen
      ? `${styles.headerImgContainer} ${styles.open}`
      : styles.headerImgContainer;

    return (
      <section
        ref={this.componentRef}
        className={styles.collapseContainer}
        style={inlineStyles.main}>
        <header
          style={inlineStyles.header}
          onClick={this.onHeaderClick}
          className={styles.collapseHeader}>
          <p style={inlineStyles.headerText} className={styles.headerLabel}>
            {this.props.headerText}
          </p>
          <div style={inlineStyles.headerIcon} className={iconClassName}></div>
        </header>
        <article style={styles.content} className={styles.collapseContent}>
          {this.props.children}
        </article>
      </section>
    );
  }
}

CollapseContainer.defaultProps = {
  headerText: 'default value for the header text',
  styledBorder: true,
  borderColor: '#000',
  large: true,
};

export default CollapseContainer;

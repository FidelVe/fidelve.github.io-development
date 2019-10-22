import React from 'react';
import styles from './collapse-container.module.css';

class CollapseContainer extends React.Component {
  /*
   * Props available for this component:
   *  - headerText: 'default value for the header text',
   *  - styledMargin: true,
   *  - marginColor: 'fff' // TODO
   *  - collapseHeight: '', // TODO: type check this to only accept width units
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
      isInitialRender: true,
      maxHeightWhenCollapsed: '',
      maxHeightWhenUncollapsed: '',
    };

    params.maxHeightWhenCollapsed =
      props.collapseHeight === ''
        ? '57px'
        : `${parseInt(props.collapseHeight)}px`;

    return params;
  };

  onHeaderClick = event => {
    // State change
    this.setState({isOpen: !this.state.isOpen});
  };

  getInlineStyle = () => {
    // Initializing 'inlineStyles' object
    let inlineStyles = {
      main: {
        // maxHeight
      },
      header: {
        maxHeight: this.baseParams.maxHeightWhenCollapsed,
        // borderTop
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

    inlineStyles.main.maxHeight = this.state.isOpen
      ? this.baseParams.maxHeightWhenUncollapsed
      : this.baseParams.maxHeightWhenCollapsed;

    if (!this.props.styledMargin) {
      inlineStyles.header.borderTop = 'none';
    }

    let headerImgSize = parseInt(this.baseParams.maxHeightWhenCollapsed) - 4;

    inlineStyles.headerIcon = {
      width: `${headerImgSize - 8}px`,
      height: `${headerImgSize - 8}px`,
      backgroundSize: `${headerImgSize}px ${headerImgSize}px`,
    };

    return inlineStyles;
  };

  componentDidUpdate() {}
  componentDidMount() {
    // Get the element heights only on first call on componentDidMount().
    // This is done to be able to work with any styles declared in the
    // css module and let CollapseContainer be reusable.

    if (this.baseParams.isInitialRender) {
      // This will only run one time (on initial rendering)

      // Get the elements from the DOM
      let contentEl = this.componentRef.current.children[1];

      // Get the computed style of element after being mounted in DOM
      let contentStyle = getComputedStyle(contentEl);

      // This is the maximum height for the collapse container, it will depend
      // on the content of itself + and extra margin for handling browser
      // resize.
      this.baseParams.maxHeightWhenUncollapsed =
        parseInt(contentStyle.getPropertyValue('height')) * 2;

      // Change the isInitialRender to false so this block wont run again
      this.baseParams.isInitialRender = false;
    }
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
          <p>{this.props.headerText}</p>
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
  styledMargin: true,
  marginColor: 'fff',
  collapseHeight: '', // TODO: type check this to only accept width units
  // headerText: 'default value for the header text',
  // bigHeader: true,
  // styledMargin: true,
};

export default CollapseContainer;

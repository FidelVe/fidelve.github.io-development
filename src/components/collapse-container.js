import React from 'react';
import styles from './collapse-container.module.css';

// constant declarations
const LARGE_HEIGHT = '58px';
const LARGE_FONT = '20px';
const SMALL_HEIGHT = '34px';
const SMALL_FONT = '15px';

const HeaderContainer = props => {
  const {
    headerStyle,
    headerTextStyle,
    headerIconStyle,
    onHeaderClick,
    styleClass,
    headerText,
    iconClassName,
    headerAltChildren,
  } = props;
  return (
    <header
      style={headerStyle}
      onClick={onHeaderClick}
      className={styleClass.collapseHeader}>
      <div>
        <p style={headerTextStyle} className={styleClass.headerLabel}>
          {headerText}
        </p>
        {headerAltChildren || null}
      </div>
      <div style={headerIconStyle} className={iconClassName}></div>
    </header>
  );
};

class CollapseContainer extends React.Component {
  /*
   * Props available for this component:
   *  - headerText: 'default value for the header text',
   *  - styledBorder: true,
   *  - borderColor: '#000',
   *  - large: true,
   *  - headerInlineStyle: {}
   *  - contentInlineStyle: {}
   *  - mainInlineStyle: {},
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
      mainStyle: {
        // maxHeight
        // borderColor
        // borderTop
      },
      headerStyle: {
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
      contentStyle: {},
    };

    // ********************
    // these only need to be calculated once, before the first render
    // TODO: optimize the code, put the calculations in another function and
    // only do them once
    // Border Style preferences
    if (!this.props.styledBorder) {
      inlineStyles.mainStyle.border = 'none';
    } else {
      inlineStyles.mainStyle.borderTop = `solid 5px ${this.props.borderColor}`;
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
    inlineStyles.mainStyle.maxHeight = this.state.isOpen
      ? this.baseParams.maxHeightWhenUncollapsed
      : this.baseParams.maxHeightWhenCollapsed;

    return inlineStyles;
  };

  componentDidUpdate() {}
  componentDidMount() {
    // Get the elements from the DOM
    let contentEl = this.componentRef.current.children[1];

    // Get the computed style of element after being mounted in DOM
    let computedContentStyle = getComputedStyle(contentEl);

    // This is the maximum height for the collapse container, it will depend
    // on the content of itself + and extra margin for handling browser
    // resize.
    this.baseParams.maxHeightWhenUncollapsed =
      parseInt(computedContentStyle.getPropertyValue('height')) * 2;
  }

  render() {
    // Get inline styles for the elements
    const {
      headerStyle,
      contentStyle,
      headerIcon,
      headerText,
      mainStyle,
    } = this.getInlineStyle();

    // Get calculated inline styles for the header and content styles, and
    // override with custom values passed as props (if any is passed)
    const contentInlineStyle = {
      ...contentStyle,
      ...this.props.contentInlineStyle,
    };
    const headerInlineStyle = {
      ...headerStyle,
      ...this.props.headerInlineStyle,
    };

    const mainInlineStyle = {
      ...mainStyle,
      ...this.props.mainInlineStyle,
    };

    const iconClassName = this.state.isOpen
      ? `${styles.headerImgContainer} ${styles.open}`
      : styles.headerImgContainer;

    return (
      <section
        ref={this.componentRef}
        className={styles.collapseContainer}
        style={mainInlineStyle}>
        <HeaderContainer
          headerInlineStyle={headerInlineStyle}
          headerTextStyle={headerText}
          headerIconStyle={headerIcon}
          styleClass={styles}
          onHeaderClick={this.onHeaderClick}
          headerText={this.props.headerText}
          iconClassName={iconClassName}
        />
        <article style={contentInlineStyle} className={styles.collapseContent}>
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
  headerInlineStyle: {},
  contentInlineStyle: {},
  mainInlineStyle: {},
};

export default CollapseContainer;
